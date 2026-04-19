;; ============================================================
;; chess-game.clar
;; On-chain Chess Protocol -- Game Engine, Escrow, Elo
;; Contract 2 of 2 -- Chessify Protocol on Stacks
;;
;; MIRRORS: ChessGame.sol (Celo)
;;
;; DEPLOYMENT ORDER:
;;   1. Deploy chess-token.clar
;;   2. Deploy chess-game.clar
;;
;; CLARITY 4 TOKEN FLOW:
;;   IN  (wager deposit):
;;       Player calls chess-token.transfer with recipient = .chess-token-v3
;;       This happens inside create-game and join-game below by
;;       passing .chess-token-v3 as the recipient of ft-transfer.
;;   OUT (payout / refund):
;;       chess-game calls chess-token.gateway-release(amount, recipient)
;;       chess-token.gateway-release uses ft-transfer? internally,
;;       which runs in chess-token's context -- no as-contract needed.
;;
;; GAME LIFECYCLE:
;;   create-game  -> status: waiting (0)
;;   join-game    -> status: active  (1)
;;   [moves]      -> submit-move (turn flip + timeout reset)
;;   end via one of:
;;     resign        -> caller loses, opponent wins
;;     report-win    -> caller claims checkmate win
;;     propose-draw  -> caller offers draw
;;     accept-draw   -> opponent accepts, both refunded
;;     claim-timeout -> opponent missed their move window
;;     cancel-game   -> creator cancels before anyone joins
;;
;; TRUST MODEL:
;;   - resign():        caller can only hurt themselves
;;   - claim-timeout(): verified on-chain via block height
;;   - propose/accept-draw(): requires both parties
;;   - report-win():    caller claims checkmate (same as Solidity)
;;     Chess rules are validated client-side by chess.js.
;;     Since CHESS tokens are free-to-claim via faucet,
;;     the risk of abuse is minimal.
;;
;; ELO RATING:
;;   Standard expected-score formula (integer approximation).
;;   Mirrors the Solidity _updateElo() implementation exactly.
;;     K = 32, diff capped at 400
;;     winner_change = K * (400 + diff) / 800
;;     loser_change  = K * (400 - diff) / 800
;;     min change = 1, min rating = 100
;; ============================================================

;; -------------------------------------------------------
;; Constants -- Status Codes  (mirrors Solidity GameStatus enum)
;; -------------------------------------------------------

(define-constant STATUS-WAITING   u0) ;; created, waiting for opponent
(define-constant STATUS-ACTIVE    u1) ;; both joined, in progress
(define-constant STATUS-FINISHED  u2) ;; win/loss result
(define-constant STATUS-CANCELLED u3) ;; creator cancelled before join
(define-constant STATUS-DRAW      u4) ;; agreed draw

;; -------------------------------------------------------
;; Constants -- Elo  (mirrors Solidity)
;; -------------------------------------------------------

(define-constant STARTING-ELO u1200)
(define-constant K-FACTOR      u32)
(define-constant MIN-RATING    u100)
(define-constant ELO-DIFF-CAP  u400) ;; max diff used in formula

;; -------------------------------------------------------
;; Constants -- Timeout
;; ~30 min on Stacks at 10-min block time = 3 blocks.
;; Set to 432 for ~3 days (conservative default, owner can adjust).
;; -------------------------------------------------------

(define-constant DEFAULT-TIMEOUT u432)

;; -------------------------------------------------------
;; Constants -- Owner
;; -------------------------------------------------------

(define-constant CONTRACT-OWNER tx-sender)

;; -------------------------------------------------------
;; Error Codes  (mirrors Solidity custom errors)
;; -------------------------------------------------------

(define-constant ERR-NOT-AUTHORIZED   (err u700))
(define-constant ERR-GAME-NOT-FOUND   (err u701))
(define-constant ERR-NOT-YOUR-TURN    (err u702))
(define-constant ERR-INVALID-OPPONENT (err u703))
(define-constant ERR-GAME-NOT-ACTIVE  (err u705))
(define-constant ERR-GAME-NOT-WAITING (err u706))
(define-constant ERR-NOT-YOUR-GAME    (err u707))
(define-constant ERR-TIMEOUT-NOT-MET  (err u708))
(define-constant ERR-NO-DRAW-PROPOSED (err u709))
(define-constant ERR-ALREADY-PROPOSED (err u710))
(define-constant ERR-CANT-ACCEPT-OWN  (err u711))
(define-constant ERR-TRANSFER-FAILED  (err u712))

;; -------------------------------------------------------
;; Storage -- Game Nonce
;; -------------------------------------------------------

(define-data-var game-nonce uint u0)

;; -------------------------------------------------------
;; Storage -- Timeout Duration (owner-adjustable)
;; -------------------------------------------------------

(define-data-var timeout-blocks uint DEFAULT-TIMEOUT)

;; -------------------------------------------------------
;; Storage -- Games Map
;;
;; Mirrors Solidity Game struct exactly:
;;   white, black, wager, status, turn,
;;   move-count, created-at, last-move-block, draw-proposer
;; -------------------------------------------------------

(define-map games
  uint  ;; game-id
  {
    white:           principal,
    black:           (optional principal),
    wager:           uint,
    status:          uint,             ;; STATUS-* constant
    turn:            principal,        ;; whose move it is
    move-count:      uint,
    created-at:      uint,             ;; block height
    last-move-block: uint,             ;; block height of last move
    draw-proposer:   (optional principal)
  }
)

;; -------------------------------------------------------
;; Storage -- Player Stats
;;
;; Mirrors Solidity PlayerStats struct:
;;   wins, losses, draws, rating, games-played
;; -------------------------------------------------------

(define-map player-stats
  principal
  {
    wins:         uint,
    losses:       uint,
    draws:        uint,
    rating:       uint,
    games-played: uint
  }
)

;; -------------------------------------------------------
;; Private -- Init Player Stats on First Game
;; Mirrors Solidity _initPlayerIfNeeded()
;; -------------------------------------------------------

(define-private (init-player-if-needed (player principal))
  (match (map-get? player-stats player)
    existing-stats true  ;; already initialised, no-op
    (map-set player-stats player {
      wins:         u0,
      losses:       u0,
      draws:        u0,
      rating:       STARTING-ELO,
      games-played: u0
    })
  )
)

;; -------------------------------------------------------
;; Private -- Elo Update
;;
;; Mirrors Solidity _updateElo() exactly.
;; Uses integer expected-score approximation:
;;   If winner was favoured  (winner_rating >= loser_rating):
;;     diff = winner_rating - loser_rating (capped at 400)
;;     winner_change = K * (400 - diff) / 800  (smaller gain)
;;     loser_change  = K * (400 + diff) / 800  (bigger loss)
;;   If winner was underdog (winner_rating < loser_rating):
;;     diff = loser_rating - winner_rating (capped at 400)
;;     winner_change = K * (400 + diff) / 800  (bigger gain)
;;     loser_change  = K * (400 - diff) / 800  (smaller loss)
;;   Minimum change of 1 in either direction.
;;   Loser rating floor = MIN-RATING.
;; -------------------------------------------------------

(define-private (update-elo (winner principal) (loser principal))
  (let
    (
      (w-stats (default-to
        { wins: u0, losses: u0, draws: u0, rating: STARTING-ELO, games-played: u0 }
        (map-get? player-stats winner)))
      (l-stats (default-to
        { wins: u0, losses: u0, draws: u0, rating: STARTING-ELO, games-played: u0 }
        (map-get? player-stats loser)))
      (w-rating (get rating w-stats))
      (l-rating (get rating l-stats))
    )
    (if (>= w-rating l-rating)
      ;; Winner was favoured
      (let
        (
          (raw-diff      (- w-rating l-rating))
          (diff          (if (> raw-diff ELO-DIFF-CAP) ELO-DIFF-CAP raw-diff))
          (w-change-calc (/ (* K-FACTOR (- ELO-DIFF-CAP diff)) u800))
          (l-change-calc (/ (* K-FACTOR (+ ELO-DIFF-CAP diff)) u800))
          (w-change      (if (is-eq w-change-calc u0) u1 w-change-calc))
          (l-change      (if (is-eq l-change-calc u0) u1 l-change-calc))
        )
        (map-set player-stats winner
          (merge w-stats { rating: (+ w-rating w-change) }))
        (map-set player-stats loser
          (merge l-stats {
            rating: (if (> l-rating (+ l-change MIN-RATING))
                      (- l-rating l-change)
                      MIN-RATING)
          }))
      )
      ;; Winner was underdog
      (let
        (
          (raw-diff      (- l-rating w-rating))
          (diff          (if (> raw-diff ELO-DIFF-CAP) ELO-DIFF-CAP raw-diff))
          (w-change-calc (/ (* K-FACTOR (+ ELO-DIFF-CAP diff)) u800))
          (l-change-calc (/ (* K-FACTOR (- ELO-DIFF-CAP diff)) u800))
          (w-change      (if (is-eq w-change-calc u0) u1 w-change-calc))
          (l-change      (if (is-eq l-change-calc u0) u1 l-change-calc))
        )
        (map-set player-stats winner
          (merge w-stats { rating: (+ w-rating w-change) }))
        (map-set player-stats loser
          (merge l-stats {
            rating: (if (> l-rating (+ l-change MIN-RATING))
                      (- l-rating l-change)
                      MIN-RATING)
          }))
      )
    )
  )
)

;; -------------------------------------------------------
;; Private -- End Game (win/loss path)
;;
;; Updates status, pays out total pot to winner,
;; increments stats, and updates Elo.
;; Mirrors Solidity _endGame().
;; -------------------------------------------------------

(define-private (end-game-with-winner
  (game-id uint)
  (game    { white: principal, black: (optional principal), wager: uint,
             status: uint, turn: principal, move-count: uint,
             created-at: uint, last-move-block: uint,
             draw-proposer: (optional principal) })
  (winner  principal)
  (loser   principal)
)
  (let
    (
      (total-pot (* (get wager game) u2))
    )
    ;; Mark finished
    (map-set games game-id (merge game { status: STATUS-FINISHED }))

    ;; Pay winner -- total pot (both wagers)
    (if (> total-pot u0)
      (unwrap! (contract-call? .chess-token-v3 gateway-release total-pot winner)
               ERR-TRANSFER-FAILED)
      true
    )

    ;; Update winner stats
    (map-set player-stats winner
      (merge
        (default-to
          { wins: u0, losses: u0, draws: u0, rating: STARTING-ELO, games-played: u0 }
          (map-get? player-stats winner))
        (let ((s (default-to
                   { wins: u0, losses: u0, draws: u0, rating: STARTING-ELO, games-played: u0 }
                   (map-get? player-stats winner))))
          { wins:         (+ (get wins s) u1),
            games-played: (+ (get games-played s) u1) }
        )
      )
    )

    ;; Update loser stats
    (map-set player-stats loser
      (merge
        (default-to
          { wins: u0, losses: u0, draws: u0, rating: STARTING-ELO, games-played: u0 }
          (map-get? player-stats loser))
        (let ((s (default-to
                   { wins: u0, losses: u0, draws: u0, rating: STARTING-ELO, games-played: u0 }
                   (map-get? player-stats loser))))
          { losses:       (+ (get losses s) u1),
            games-played: (+ (get games-played s) u1) }
        )
      )
    )

    ;; Update Elo
    (update-elo winner loser)
    (ok winner)
  )
)

;; ============================================================
;; PUBLIC -- Game Lifecycle
;; ============================================================

;; -------------------------------------------------------
;; Create Game
;;
;; White player creates the game.
;; If wager > 0, white transfers CHESS into the .chess-token-v3
;; vault by calling chess-token.transfer with recipient = .chess-token-v3.
;; Mirrors Solidity createGame().
;; -------------------------------------------------------

(define-public (create-game (wager uint))
  (let
    (
      (game-id (var-get game-nonce))
    )
    ;; Lock white wager into token vault
    (if (> wager u0)
      (try! (contract-call? .chess-token-v3 transfer
        wager
        tx-sender
        .chess-token-v3
        none
      ))
      true
    )

    ;; Init player if first game
    (init-player-if-needed tx-sender)

    ;; Store game
    (map-set games game-id {
      white:           tx-sender,
      black:           none,
      wager:           wager,
      status:          STATUS-WAITING,
      turn:            tx-sender,
      move-count:      u0,
      created-at:      block-height,
      last-move-block: block-height,
      draw-proposer:   none
    })

    ;; Increment nonce
    (var-set game-nonce (+ game-id u1))

    (ok game-id)
  )
)

;; -------------------------------------------------------
;; Join Game
;;
;; Black player joins and locks matching wager.
;; Mirrors Solidity joinGame().
;; -------------------------------------------------------

(define-public (join-game (game-id uint))
  (let
    (
      (game (unwrap! (map-get? games game-id) ERR-GAME-NOT-FOUND))
    )
    (asserts! (is-eq (get status game) STATUS-WAITING) ERR-GAME-NOT-WAITING)
    (asserts! (not (is-eq tx-sender (get white game)))  ERR-INVALID-OPPONENT)

    ;; Lock black's matching wager into token vault
    (if (> (get wager game) u0)
      (try! (contract-call? .chess-token-v3 transfer
        (get wager game)
        tx-sender
        .chess-token-v3
        none
      ))
      true
    )

    ;; Init player if first game
    (init-player-if-needed tx-sender)

    ;; Activate game -- black is now set
    (map-set games game-id (merge game {
      black:           (some tx-sender),
      status:          STATUS-ACTIVE,
      last-move-block: block-height
    }))

    (ok true)
  )
)

;; -------------------------------------------------------
;; Submit Move
;;
;; Records that a move was made: flips turn, increments
;; move-count, resets timeout clock, clears draw proposal.
;; No move string stored on-chain -- chess.js validates client-side.
;; Mirrors Solidity submitMove().
;; -------------------------------------------------------

(define-public (submit-move (game-id uint))
  (let
    (
      (game (unwrap! (map-get? games game-id) ERR-GAME-NOT-FOUND))
    )
    (asserts! (is-eq (get status game) STATUS-ACTIVE) ERR-GAME-NOT-ACTIVE)
    (asserts! (is-eq tx-sender (get turn game))        ERR-NOT-YOUR-TURN)

    ;; Flip turn to the other player
    (let
      (
        (next-turn (if (is-eq tx-sender (get white game))
                     (unwrap! (get black game) ERR-GAME-NOT-FOUND)
                     (get white game)))
      )
      (map-set games game-id (merge game {
        turn:            next-turn,
        move-count:      (+ (get move-count game) u1),
        last-move-block: block-height,
        draw-proposer:   none  ;; clear any pending draw proposal on move
      }))
      (ok true)
    )
  )
)

;; -------------------------------------------------------
;; Resign
;;
;; Caller concedes -- opponent wins automatically.
;; Caller can only hurt themselves: no one can force a resign.
;; Payout: total pot (both wagers) goes to winner.
;; Mirrors Solidity resign().
;; -------------------------------------------------------

(define-public (resign (game-id uint))
  (let
    (
      (game   (unwrap! (map-get? games game-id) ERR-GAME-NOT-FOUND))
      (caller tx-sender)
    )
    (asserts! (is-eq (get status game) STATUS-ACTIVE) ERR-GAME-NOT-ACTIVE)
    (asserts!
      (or (is-eq caller (get white game))
          (is-some (filter-eq (get black game) caller)))
      ERR-NOT-YOUR-GAME
    )

    (let
      (
        (winner (if (is-eq caller (get white game))
                  (unwrap! (get black game) ERR-GAME-NOT-FOUND)
                  (get white game)))
      )
      (end-game-with-winner game-id game winner caller)
    )
  )
)

;; -------------------------------------------------------
;; Report Win (Checkmate)
;;
;; Caller claims they checkmated the opponent.
;; Chess rules validated client-side. Trust model matches Solidity:
;; since CHESS is freely claimable, abuse risk is minimal.
;; Payout: total pot goes to caller.
;; Mirrors Solidity reportWin().
;; -------------------------------------------------------

(define-public (report-win (game-id uint))
  (let
    (
      (game   (unwrap! (map-get? games game-id) ERR-GAME-NOT-FOUND))
      (caller tx-sender)
    )
    (asserts! (is-eq (get status game) STATUS-ACTIVE) ERR-GAME-NOT-ACTIVE)
    (asserts!
      (or (is-eq caller (get white game))
          (is-some (filter-eq (get black game) caller)))
      ERR-NOT-YOUR-GAME
    )

    (let
      (
        (loser (if (is-eq caller (get white game))
                 (unwrap! (get black game) ERR-GAME-NOT-FOUND)
                 (get white game)))
      )
      (end-game-with-winner game-id game caller loser)
    )
  )
)

;; -------------------------------------------------------
;; Propose Draw
;;
;; Caller offers a draw. Opponent must call accept-draw.
;; Making a move clears any pending draw proposal.
;; Mirrors Solidity proposeDraw().
;; -------------------------------------------------------

(define-public (propose-draw (game-id uint))
  (let
    (
      (game   (unwrap! (map-get? games game-id) ERR-GAME-NOT-FOUND))
      (caller tx-sender)
    )
    (asserts! (is-eq (get status game) STATUS-ACTIVE) ERR-GAME-NOT-ACTIVE)
    (asserts!
      (or (is-eq caller (get white game))
          (is-some (filter-eq (get black game) caller)))
      ERR-NOT-YOUR-GAME
    )
    (asserts! (not (is-eq (get draw-proposer game) (some caller))) ERR-ALREADY-PROPOSED)

    (map-set games game-id (merge game { draw-proposer: (some caller) }))
    (ok true)
  )
)

;; -------------------------------------------------------
;; Accept Draw
;;
;; Opponent accepts the pending draw proposal.
;; Both players are refunded their original wager.
;; Elo and stats updated as draw.
;; Mirrors Solidity acceptDraw().
;; -------------------------------------------------------

(define-public (accept-draw (game-id uint))
  (let
    (
      (game   (unwrap! (map-get? games game-id) ERR-GAME-NOT-FOUND))
      (caller tx-sender)
    )
    (asserts! (is-eq (get status game) STATUS-ACTIVE) ERR-GAME-NOT-ACTIVE)
    (asserts!
      (or (is-eq caller (get white game))
          (is-some (filter-eq (get black game) caller)))
      ERR-NOT-YOUR-GAME
    )
    (asserts! (is-some (get draw-proposer game))                      ERR-NO-DRAW-PROPOSED)
    (asserts! (not (is-eq (get draw-proposer game) (some caller)))    ERR-CANT-ACCEPT-OWN)

    (let
      (
        (black-player (unwrap! (get black game) ERR-GAME-NOT-FOUND))
        (wager        (get wager game))
      )
      ;; Mark game as draw
      (map-set games game-id (merge game { status: STATUS-DRAW }))

      ;; Refund both players their individual wagers
      (if (> wager u0)
        (begin
          (try! (contract-call? .chess-token-v3 gateway-release wager (get white game)))
          (try! (contract-call? .chess-token-v3 gateway-release wager black-player))
        )
        true
      )

      ;; Update draw stats for both players
      (let
        (
          (w-stats (default-to
            { wins: u0, losses: u0, draws: u0, rating: STARTING-ELO, games-played: u0 }
            (map-get? player-stats (get white game))))
          (b-stats (default-to
            { wins: u0, losses: u0, draws: u0, rating: STARTING-ELO, games-played: u0 }
            (map-get? player-stats black-player)))
        )
        (map-set player-stats (get white game)
          (merge w-stats {
            draws:        (+ (get draws w-stats) u1),
            games-played: (+ (get games-played w-stats) u1)
          }))
        (map-set player-stats black-player
          (merge b-stats {
            draws:        (+ (get draws b-stats) u1),
            games-played: (+ (get games-played b-stats) u1)
          }))
      )

      (ok true)
    )
  )
)

;; -------------------------------------------------------
;; Claim Timeout
;;
;; If the player whose turn it is hasn't moved within
;; timeout-blocks, their opponent can claim the win.
;; Timeout is verified on-chain via block height -- cannot be faked.
;; Mirrors Solidity claimTimeout().
;; -------------------------------------------------------

(define-public (claim-timeout (game-id uint))
  (let
    (
      (game    (unwrap! (map-get? games game-id) ERR-GAME-NOT-FOUND))
      (caller  tx-sender)
    )
    (asserts! (is-eq (get status game) STATUS-ACTIVE) ERR-GAME-NOT-ACTIVE)
    ;; Caller must be a participant
    (asserts!
      (or (is-eq caller (get white game))
          (is-some (filter-eq (get black game) caller)))
      ERR-NOT-YOUR-GAME
    )
    ;; Caller must NOT be the one whose turn it is
    ;; (the one who timed out is on-turn; the claimer is off-turn)
    (asserts! (not (is-eq caller (get turn game))) ERR-NOT-YOUR-TURN)
    ;; Verify timeout has actually elapsed
    (asserts!
      (>= (- block-height (get last-move-block game))
          (var-get timeout-blocks))
      ERR-TIMEOUT-NOT-MET
    )

    (let
      (
        (loser  (get turn game))  ;; the one who timed out
        (winner caller)
      )
      (end-game-with-winner game-id game winner loser)
    )
  )
)

;; -------------------------------------------------------
;; Cancel Game
;;
;; Creator cancels before anyone has joined.
;; White's wager is refunded in full.
;; Mirrors Solidity cancelGame().
;; -------------------------------------------------------

(define-public (cancel-game (game-id uint))
  (let
    (
      (game (unwrap! (map-get? games game-id) ERR-GAME-NOT-FOUND))
    )
    (asserts! (is-eq (get status game) STATUS-WAITING) ERR-GAME-NOT-WAITING)
    (asserts! (is-eq tx-sender (get white game))        ERR-NOT-AUTHORIZED)

    ;; Mark cancelled
    (map-set games game-id (merge game { status: STATUS-CANCELLED }))

    ;; Refund white's wager
    (if (> (get wager game) u0)
      (try! (contract-call? .chess-token-v3 gateway-release
        (get wager game)
        (get white game)
      ))
      true
    )

    (ok true)
  )
)

;; ============================================================
;; READ-ONLY -- Game Queries
;; ============================================================

;; Get full game data -- mirrors Solidity getGame()
(define-read-only (get-game (game-id uint))
  (ok (map-get? games game-id))
)

;; Get game status code only
(define-read-only (get-game-status (game-id uint))
  (ok (get status (unwrap! (map-get? games game-id) ERR-GAME-NOT-FOUND)))
)

;; Get whose turn it is
(define-read-only (get-current-turn (game-id uint))
  (ok (get turn (unwrap! (map-get? games game-id) ERR-GAME-NOT-FOUND)))
)

;; Get total games ever created
(define-read-only (get-total-games)
  (ok (var-get game-nonce))
)

;; Check if timeout is claimable right now -- mirrors Solidity canClaimTimeout()
(define-read-only (can-claim-timeout (game-id uint))
  (match (map-get? games game-id)
    game (ok (and
               (is-eq (get status game) STATUS-ACTIVE)
               (>= (- block-height (get last-move-block game))
                   (var-get timeout-blocks))))
    (ok false)
  )
)

;; Blocks remaining until timeout is claimable -- mirrors Solidity blocksUntilTimeout()
(define-read-only (get-blocks-until-timeout (game-id uint))
  (match (map-get? games game-id)
    game
      (if (not (is-eq (get status game) STATUS-ACTIVE))
        (ok u0)
        (let
          (
            (elapsed  (- block-height (get last-move-block game)))
            (limit    (var-get timeout-blocks))
          )
          (if (>= elapsed limit)
            (ok u0)
            (ok (- limit elapsed))
          )
        )
      )
    (ok u0)
  )
)

;; ============================================================
;; READ-ONLY -- Player Queries
;; ============================================================

;; Get full player stats -- mirrors Solidity getPlayerStats()
(define-read-only (get-player-stats (player principal))
  (ok (default-to
    { wins: u0, losses: u0, draws: u0, rating: STARTING-ELO, games-played: u0 }
    (map-get? player-stats player)
  ))
)

;; Get Elo rating only
(define-read-only (get-rating (player principal))
  (ok (get rating (default-to
    { wins: u0, losses: u0, draws: u0, rating: STARTING-ELO, games-played: u0 }
    (map-get? player-stats player)
  )))
)

;; ============================================================
;; OWNER ADMIN
;; ============================================================

;; Adjust timeout window -- mirrors Solidity setTimeoutBlocks()
(define-public (set-timeout-blocks (blocks uint))
  (begin
    (asserts! (is-eq tx-sender CONTRACT-OWNER) ERR-NOT-AUTHORIZED)
    (var-set timeout-blocks blocks)
    (ok blocks)
  )
)

;; ============================================================
;; PRIVATE -- Utility
;; ============================================================

;; Helper: returns (some principal) if opt matches target, else none
;; Used to check if a principal is a game participant via optional black.
(define-private (filter-eq (opt (optional principal)) (target principal))
  (match opt
    val (if (is-eq val target) (some val) none)
    none
  )
)
