// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/token/ERC20/utils/SafeERC20.sol";
import "@openzeppelin/contracts/utils/ReentrancyGuard.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

/// @title ChessGame — On-chain chess protocol for Chessify on Celo
/// @notice Handles game lifecycle, wagers (CHESS token), escrow, and player stats.
///         Chess rules are validated client-side by chess.js — only results are submitted on-chain.
///         Designed for Remix → deploy to Celo Sepolia / Mainnet.
///
/// DEPLOYMENT ORDER:
///   1. Deploy ChessToken
///   2. Deploy ChessGame(chessTokenAddress)
///   3. Players call ChessToken.approve(chessGameAddress, amount) before wagering
///
/// TRUST MODEL (free-to-play):
///   - resign()         → caller loses (can only hurt yourself)
///   - claimTimeout()   → verified on-chain via block height
///   - proposeDraw()    → requires opponent's acceptDraw()
///   - reportWin()      → caller claims checkmate (acceptable for free tokens)

contract ChessGame is ReentrancyGuard, Ownable {
    using SafeERC20 for IERC20;

    // ══════════════════════════════════════════════
    //  Types
    // ══════════════════════════════════════════════

    enum GameStatus {
        Waiting,    // 0 — created, waiting for opponent
        Active,     // 1 — both players joined, game in progress
        Finished,   // 2 — game ended (win/loss)
        Cancelled,  // 3 — creator cancelled before opponent joined
        Draw        // 4 — game ended in draw
    }

    enum GameResult {
        None,       // 0 — game still in progress
        WhiteWins,  // 1
        BlackWins,  // 2
        DrawResult, // 3 — stalemate, agreement, repetition, etc.
        Cancelled   // 4
    }

    struct Game {
        address white;
        address black;
        uint256 wager;           // 0 = free game
        GameStatus status;
        GameResult result;
        address turn;            // whose turn it is (for timeout)
        uint256 moveCount;
        uint256 createdAt;       // block number
        uint256 lastMoveBlock;   // block number of last move (for timeout)
        address drawProposer;    // who proposed draw (address(0) if none)
    }

    struct PlayerStats {
        uint256 wins;
        uint256 losses;
        uint256 draws;
        uint256 rating;          // Elo rating (starts at 1200)
        uint256 gamesPlayed;
    }

    // ══════════════════════════════════════════════
    //  State
    // ══════════════════════════════════════════════

    IERC20 public immutable chessToken;

    uint256 public gameNonce;                           // auto-incrementing game ID
    uint256 public timeoutBlocks = 360;                 // ~30 min on Celo (5s blocks)
    uint256 public constant STARTING_ELO = 1200;
    uint256 public constant K_FACTOR = 32;
    uint256 public constant MIN_RATING = 100;

    mapping(uint256 => Game) public games;              // gameId → Game
    mapping(address => PlayerStats) public playerStats;  // player → stats

    // ══════════════════════════════════════════════
    //  Errors
    // ══════════════════════════════════════════════

    error GameNotFound();
    error NotYourGame();
    error NotYourTurn();
    error GameNotWaiting();
    error GameNotActive();
    error CannotJoinOwnGame();
    error InsufficientAllowance();
    error TimeoutNotReached();
    error NoDrawProposed();
    error AlreadyProposedDraw();
    error CannotAcceptOwnDraw();
    error InvalidWager();

    // ══════════════════════════════════════════════
    //  Events
    // ══════════════════════════════════════════════

    event GameCreated(uint256 indexed gameId, address indexed white, uint256 wager);
    event GameJoined(uint256 indexed gameId, address indexed black);
    event MoveMade(uint256 indexed gameId, address indexed player, uint256 moveCount);
    event GameResigned(uint256 indexed gameId, address indexed loser, address indexed winner);
    event TimeoutClaimed(uint256 indexed gameId, address indexed winner, address indexed loser);
    event DrawProposed(uint256 indexed gameId, address indexed proposer);
    event DrawAccepted(uint256 indexed gameId);
    event CheckmateReported(uint256 indexed gameId, address indexed winner, address indexed loser);
    event GameCancelled(uint256 indexed gameId, address indexed creator);

    // ══════════════════════════════════════════════
    //  Constructor
    // ══════════════════════════════════════════════

    /// @param _chessToken Address of deployed ChessToken contract
    constructor(address _chessToken) Ownable(msg.sender) {
        chessToken = IERC20(_chessToken);
    }

    // ══════════════════════════════════════════════
    //  Game Lifecycle
    // ══════════════════════════════════════════════

    /// @notice Create a new game. Pass wager = 0 for free game.
    ///         If wagering, caller must have approved this contract to spend CHESS tokens.
    function createGame(uint256 wager) external nonReentrant returns (uint256 gameId) {
        gameId = gameNonce++;

        // Lock wager if not free
        if (wager > 0) {
            chessToken.safeTransferFrom(msg.sender, address(this), wager);
        }

        // Initialize player stats if first game
        _initPlayerIfNeeded(msg.sender);

        games[gameId] = Game({
            white: msg.sender,
            black: address(0),
            wager: wager,
            status: GameStatus.Waiting,
            result: GameResult.None,
            turn: msg.sender,         // white moves first
            moveCount: 0,
            createdAt: block.number,
            lastMoveBlock: block.number,
            drawProposer: address(0)
        });

        emit GameCreated(gameId, msg.sender, wager);
    }

    /// @notice Join an open game. Wager is automatically matched.
    function joinGame(uint256 gameId) external nonReentrant {
        Game storage game = games[gameId];
        if (game.white == address(0)) revert GameNotFound();
        if (game.status != GameStatus.Waiting) revert GameNotWaiting();
        if (msg.sender == game.white) revert CannotJoinOwnGame();

        // Lock matching wager
        if (game.wager > 0) {
            chessToken.safeTransferFrom(msg.sender, address(this), game.wager);
        }

        // Initialize player stats if first game
        _initPlayerIfNeeded(msg.sender);

        game.black = msg.sender;
        game.status = GameStatus.Active;
        game.lastMoveBlock = block.number;

        emit GameJoined(gameId, msg.sender);
    }

    /// @notice Record that a move was made (turn flip + timeout reset).
    ///         No move data stored on-chain — chess.js validates client-side.
    function submitMove(uint256 gameId) external {
        Game storage game = games[gameId];
        if (game.status != GameStatus.Active) revert GameNotActive();
        if (msg.sender != game.turn) revert NotYourTurn();

        // Flip turn
        game.turn = (msg.sender == game.white) ? game.black : game.white;
        game.moveCount++;
        game.lastMoveBlock = block.number;

        // Clear any pending draw proposal when a move is made
        game.drawProposer = address(0);

        emit MoveMade(gameId, msg.sender, game.moveCount);
    }

    /// @notice Resign — caller loses, opponent wins automatically.
    ///         "You can only hurt yourself" — no one can claim they won.
    function resign(uint256 gameId) external nonReentrant {
        Game storage game = games[gameId];
        if (game.status != GameStatus.Active) revert GameNotActive();
        if (msg.sender != game.white && msg.sender != game.black) revert NotYourGame();

        address winner = (msg.sender == game.white) ? game.black : game.white;
        GameResult result = (winner == game.white) ? GameResult.WhiteWins : GameResult.BlackWins;

        _endGame(gameId, game, GameStatus.Finished, result, winner, msg.sender);

        emit GameResigned(gameId, msg.sender, winner);
    }

    /// @notice Claim timeout win — opponent hasn't moved in `timeoutBlocks`.
    ///         Verified on-chain via block height. Cannot be faked.
    function claimTimeout(uint256 gameId) external nonReentrant {
        Game storage game = games[gameId];
        if (game.status != GameStatus.Active) revert GameNotActive();
        if (msg.sender != game.white && msg.sender != game.black) revert NotYourGame();

        // Timeout: the player whose turn it is has been AFK
        // The CLAIMER must NOT be the one whose turn it is
        if (msg.sender == game.turn) revert NotYourTurn();

        // Verify timeout period has passed
        if (block.number - game.lastMoveBlock < timeoutBlocks) revert TimeoutNotReached();

        address winner = msg.sender;
        address loser  = game.turn;  // the one who timed out
        GameResult result = (winner == game.white) ? GameResult.WhiteWins : GameResult.BlackWins;

        _endGame(gameId, game, GameStatus.Finished, result, winner, loser);

        emit TimeoutClaimed(gameId, winner, loser);
    }

    /// @notice Propose a draw (stalemate, agreement, repetition, 50-move rule, etc.)
    function proposeDraw(uint256 gameId) external {
        Game storage game = games[gameId];
        if (game.status != GameStatus.Active) revert GameNotActive();
        if (msg.sender != game.white && msg.sender != game.black) revert NotYourGame();
        if (game.drawProposer == msg.sender) revert AlreadyProposedDraw();

        game.drawProposer = msg.sender;

        emit DrawProposed(gameId, msg.sender);
    }

    /// @notice Accept a pending draw proposal. Both players get their wager back.
    function acceptDraw(uint256 gameId) external nonReentrant {
        Game storage game = games[gameId];
        if (game.status != GameStatus.Active) revert GameNotActive();
        if (msg.sender != game.white && msg.sender != game.black) revert NotYourGame();
        if (game.drawProposer == address(0)) revert NoDrawProposed();
        if (game.drawProposer == msg.sender) revert CannotAcceptOwnDraw();

        // End as draw — each player gets their wager back
        game.status = GameStatus.Draw;
        game.result = GameResult.DrawResult;

        // Refund both players
        if (game.wager > 0) {
            chessToken.safeTransfer(game.white, game.wager);
            chessToken.safeTransfer(game.black, game.wager);
        }

        // Update stats
        playerStats[game.white].draws++;
        playerStats[game.white].gamesPlayed++;
        playerStats[game.black].draws++;
        playerStats[game.black].gamesPlayed++;

        emit DrawAccepted(gameId);
    }

    /// @notice Report checkmate — caller claims they won.
    ///         Trust model: since CHESS tokens are free, the risk of false reports is minimal.
    ///         Chess.js validates the actual game state on the frontend.
    function reportWin(uint256 gameId) external nonReentrant {
        Game storage game = games[gameId];
        if (game.status != GameStatus.Active) revert GameNotActive();
        if (msg.sender != game.white && msg.sender != game.black) revert NotYourGame();

        address winner = msg.sender;
        address loser  = (msg.sender == game.white) ? game.black : game.white;
        GameResult result = (winner == game.white) ? GameResult.WhiteWins : GameResult.BlackWins;

        _endGame(gameId, game, GameStatus.Finished, result, winner, loser);

        emit CheckmateReported(gameId, winner, loser);
    }

    /// @notice Cancel a game that hasn't started yet. Only the creator can cancel.
    function cancelGame(uint256 gameId) external nonReentrant {
        Game storage game = games[gameId];
        if (game.status != GameStatus.Waiting) revert GameNotWaiting();
        if (msg.sender != game.white) revert NotYourGame();

        game.status = GameStatus.Cancelled;
        game.result = GameResult.Cancelled;

        // Refund creator's wager
        if (game.wager > 0) {
            chessToken.safeTransfer(game.white, game.wager);
        }

        emit GameCancelled(gameId, msg.sender);
    }

    // ══════════════════════════════════════════════
    //  Read Functions
    // ══════════════════════════════════════════════

    /// @notice Get full game data
    function getGame(uint256 gameId) external view returns (Game memory) {
        return games[gameId];
    }

    /// @notice Get a player's stats
    function getPlayerStats(address player) external view returns (PlayerStats memory) {
        return playerStats[player];
    }

    /// @notice Get total number of games created
    function totalGames() external view returns (uint256) {
        return gameNonce;
    }

    /// @notice Check if a game can be timed out right now
    function canClaimTimeout(uint256 gameId) external view returns (bool) {
        Game storage game = games[gameId];
        if (game.status != GameStatus.Active) return false;
        return block.number - game.lastMoveBlock >= timeoutBlocks;
    }

    /// @notice Get blocks remaining until timeout is claimable
    function blocksUntilTimeout(uint256 gameId) external view returns (uint256) {
        Game storage game = games[gameId];
        if (game.status != GameStatus.Active) return 0;

        uint256 elapsed = block.number - game.lastMoveBlock;
        if (elapsed >= timeoutBlocks) return 0;
        return timeoutBlocks - elapsed;
    }

    // ══════════════════════════════════════════════
    //  Owner Admin
    // ══════════════════════════════════════════════

    /// @notice Update the timeout duration (in blocks)
    function setTimeoutBlocks(uint256 _blocks) external onlyOwner {
        timeoutBlocks = _blocks;
    }

    // ══════════════════════════════════════════════
    //  Internal — Game End + Elo
    // ══════════════════════════════════════════════

    /// @dev End a game with a winner and loser. Transfers pot + updates Elo.
    function _endGame(
        uint256 /* gameId */,
        Game storage game,
        GameStatus status,
        GameResult result,
        address winner,
        address loser
    ) internal {
        game.status = status;
        game.result = result;

        // Transfer total pot to winner
        uint256 totalPot = game.wager * 2;
        if (totalPot > 0) {
            chessToken.safeTransfer(winner, totalPot);
        }

        // Update stats
        playerStats[winner].wins++;
        playerStats[winner].gamesPlayed++;
        playerStats[loser].losses++;
        playerStats[loser].gamesPlayed++;

        // Update Elo ratings
        _updateElo(winner, loser);
    }

    /// @dev Simplified Elo calculation using integer math.
    ///      Underdog wins = bigger gain. Favorite wins = smaller gain.
    function _updateElo(address winner, address loser) internal {
        uint256 winnerRating = playerStats[winner].rating;
        uint256 loserRating  = playerStats[loser].rating;

        uint256 diff;
        uint256 winnerChange;
        uint256 loserChange;

        if (winnerRating >= loserRating) {
            // Winner was favored — smaller gain
            diff = winnerRating - loserRating;
            if (diff > 400) diff = 400;
            winnerChange = K_FACTOR * (400 - diff) / 800;
            loserChange  = K_FACTOR * (400 + diff) / 800;
        } else {
            // Winner was underdog — bigger gain
            diff = loserRating - winnerRating;
            if (diff > 400) diff = 400;
            winnerChange = K_FACTOR * (400 + diff) / 800;
            loserChange  = K_FACTOR * (400 - diff) / 800;
        }

        // Minimum change of 1
        if (winnerChange == 0) winnerChange = 1;
        if (loserChange == 0) loserChange = 1;

        playerStats[winner].rating += winnerChange;

        if (playerStats[loser].rating > loserChange + MIN_RATING) {
            playerStats[loser].rating -= loserChange;
        } else {
            playerStats[loser].rating = MIN_RATING;
        }
    }

    /// @dev Initialize a player's stats if this is their first game
    function _initPlayerIfNeeded(address player) internal {
        if (playerStats[player].rating == 0) {
            playerStats[player].rating = STARTING_ELO;
        }
    }
}
