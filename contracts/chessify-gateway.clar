;; ============================================================
;; chessify-gateway.clar
;; Master Orchestrator + Token Vault — Single Entry Point
;; Replaces router.clar (Contract 7 of 7)
;; 
;; KEY FIX OVER router.clar:
;;   Real ft-transfer? calls added to create-game, join-game,
;;   resign, claim-timeout, and cancel-game.
;;   The gateway contract itself holds wagers in escrow.
;;   Uses (as-contract ...) to release tokens outward.
;;
;; Built by Velocity Labs — CHESSIFY Protocol
;; ============================================================

;; -------------------------------------------------------
;; Constants
;; -------------------------------------------------------

(define-constant CONTRACT-OWNER tx-sender)

(define-constant ERR-NOT-AUTHORIZED      (err u700))
(define-constant ERR-GAME-NOT-FOUND      (err u701))
(define-constant ERR-NOT-YOUR-TURN       (err u702))
(define-constant ERR-INVALID-OPPONENT    (err u703))
(define-constant ERR-INSUFFICIENT-FUNDS  (err u704))
(define-constant ERR-GAME-NOT-ACTIVE     (err u705))
(define-constant ERR-TRANSFER-FAILED     (err u706))

;; -------------------------------------------------------
;; Create Game
;; 
;; NEW: If wager > 0, white player transfers CHESS tokens
;;      to this contract immediately on game creation.
;;      Tokens sit in the gateway until the game resolves.
;; -------------------------------------------------------

(define-public (create-game (wager uint))
  (let
    (
      (game-id (unwrap! (contract-call? .registry create-game tx-sender wager) ERR-GAME-NOT-FOUND))
    )
    ;; Lock white's wager in this contract (skip if free game)
    (if (> wager u0)
      (try! (contract-call? .chess-token transfer
        wager
        tx-sender
        (as-contract tx-sender)
        none
      ))
      true
    )

    ;; Initialize escrow accounting record
    (unwrap! (contract-call? .chess-escrow init-game game-id tx-sender wager) ERR-GAME-NOT-FOUND)

    ;; Initialize timeout clock
    (unwrap! (contract-call? .timer init-timeout game-id) ERR-GAME-NOT-FOUND)

    (ok game-id)
  )
)

;; -------------------------------------------------------
;; Join Game
;;
;; NEW: If wager > 0, black player transfers matching CHESS
;;      tokens to this contract. Both sides now locked.
;; -------------------------------------------------------

(define-public (join-game (game-id uint))
  (let
    (
      (game-opt (unwrap! (contract-call? .registry get-game game-id) ERR-GAME-NOT-FOUND))
      (game     (unwrap! game-opt ERR-GAME-NOT-FOUND))
      (wager    (get wager game))
      (white-player (get white game))
    )
    ;; Caller cannot be the white player
    (asserts! (not (is-eq tx-sender white-player)) ERR-INVALID-OPPONENT)

    ;; Lock black's wager in this contract (skip if free game)
    (if (> wager u0)
      (try! (contract-call? .chess-token transfer
        wager
        tx-sender
        (as-contract tx-sender)
        none
      ))
      true
    )

    ;; Register black player in registry
    (unwrap! (contract-call? .registry assign-black game-id tx-sender) ERR-GAME-NOT-FOUND)

    ;; Update escrow accounting
    (unwrap! (contract-call? .chess-escrow add-black-wager game-id tx-sender wager) ERR-GAME-NOT-FOUND)

    ;; Activate game — both players locked in
    (unwrap! (contract-call? .registry activate-game game-id) ERR-GAME-NOT-FOUND)

    (ok true)
  )
)

;; -------------------------------------------------------
;; Submit Move
;; (No token changes — logic unchanged from router.clar)
;; -------------------------------------------------------

(define-public (submit-move (game-id uint) (move-str (string-ascii 10)))
  (let
    (
      (game-opt (unwrap! (contract-call? .registry get-game game-id) ERR-GAME-NOT-FOUND))
      (game     (unwrap! game-opt ERR-GAME-NOT-FOUND))
      (current-turn (get turn game))
      (move-count   (get move-count game))
      (white-player (get white game))
      (black-player-opt (get black game))
    )
    ;; Only the player whose turn it is may submit
    (asserts! (is-eq tx-sender current-turn) ERR-NOT-YOUR-TURN)

    ;; Record move on-chain in logic contract
    (unwrap! (contract-call? .logic record-move game-id move-count tx-sender move-str) ERR-GAME-NOT-FOUND)

    (let
      (
        (next-player (if (is-eq tx-sender white-player)
                       (unwrap! black-player-opt ERR-GAME-NOT-FOUND)
                       white-player))
      )
      ;; Flip turn in registry
      (unwrap! (contract-call? .registry update-turn game-id next-player) ERR-GAME-NOT-FOUND)

      ;; Reset timeout clock
      (unwrap! (contract-call? .timer reset-timer game-id) ERR-GAME-NOT-FOUND)

      (ok true)
    )
  )
)

;; -------------------------------------------------------
;; Resign
;;
;; NEW: After updating game state, the gateway releases the
;;      full combined wager to the winner using (as-contract).
;;      (as-contract) flips tx-sender to the contract itself,
;;      allowing the contract to sign the outgoing transfer.
;; -------------------------------------------------------

(define-public (resign (game-id uint))
  (let
    (
      (game-opt (unwrap! (contract-call? .registry get-game game-id) ERR-GAME-NOT-FOUND))
      (game     (unwrap! game-opt ERR-GAME-NOT-FOUND))
      (white-player (get white game))
      (black-player-opt (get black game))
      (winner (if (is-eq tx-sender white-player)
                (unwrap! black-player-opt ERR-GAME-NOT-FOUND)
                white-player))
      (total-payout (* (get wager game) u2))
    )
    ;; Record resignation in logic contract
    (unwrap! (contract-call? .logic record-resignation game-id tx-sender) ERR-GAME-NOT-FOUND)

    ;; Mark game finished in registry
    (unwrap! (contract-call? .registry finish-game game-id (some winner)) ERR-GAME-NOT-FOUND)

    ;; Mark escrow claimed
    (unwrap! (contract-call? .chess-escrow release-to-winner game-id winner) ERR-GAME-NOT-FOUND)

    ;; Release tokens to winner — contract signs as itself
    (if (> total-payout u0)
      (try! (as-contract (contract-call? .chess-token transfer
        total-payout
        tx-sender   ;; inside as-contract, tx-sender = this contract
        winner
        none
      )))
      true
    )

    ;; Update Elo ratings
    (unwrap! (contract-call? .ranking record-win winner tx-sender) ERR-GAME-NOT-FOUND)

    (ok winner)
  )
)

;; -------------------------------------------------------
;; Claim Timeout Win
;;
;; NEW: Same payout pattern as resign — gateway releases
;;      combined wager to the non-timed-out player.
;; -------------------------------------------------------

(define-public (claim-timeout (game-id uint))
  (let
    (
      (game-opt (unwrap! (contract-call? .registry get-game game-id) ERR-GAME-NOT-FOUND))
      (game     (unwrap! game-opt ERR-GAME-NOT-FOUND))
      (white-player (get white game))
      (black-player-opt (get black game))
      (current-turn (get turn game))
      ;; The player whose turn it is has timed out — opponent wins
      (winner (if (is-eq current-turn white-player)
                (unwrap! black-player-opt ERR-GAME-NOT-FOUND)
                white-player))
      (loser current-turn)
      (total-payout (* (get wager game) u2))
    )
    ;; Validate timeout has actually elapsed
    (unwrap! (contract-call? .timer validate-timeout game-id) ERR-GAME-NOT-FOUND)

    ;; Mark game finished
    (unwrap! (contract-call? .registry finish-game game-id (some winner)) ERR-GAME-NOT-FOUND)

    ;; Mark escrow claimed
    (unwrap! (contract-call? .chess-escrow release-to-winner game-id winner) ERR-GAME-NOT-FOUND)

    ;; Release tokens to winner
    (if (> total-payout u0)
      (try! (as-contract (contract-call? .chess-token transfer
        total-payout
        tx-sender
        winner
        none
      )))
      true
    )

    ;; Update Elo ratings
    (unwrap! (contract-call? .ranking record-win winner loser) ERR-GAME-NOT-FOUND)

    (ok winner)
  )
)

;; -------------------------------------------------------
;; Cancel Game
;;
;; NEW: If white cancels before anyone joins, their wager
;;      is refunded from the gateway back to them.
;;      Only callable while game is STATUS-WAITING.
;; -------------------------------------------------------

(define-public (cancel-game (game-id uint))
  (let
    (
      (game-opt (unwrap! (contract-call? .registry get-game game-id) ERR-GAME-NOT-FOUND))
      (game     (unwrap! game-opt ERR-GAME-NOT-FOUND))
      (white-player (get white game))
      (wager (get wager game))
    )
    ;; Only white player can cancel their own open game
    (asserts! (is-eq tx-sender white-player) ERR-NOT-AUTHORIZED)

    ;; Cancel in registry (also validates STATUS-WAITING)
    (unwrap! (contract-call? .registry cancel-game game-id) ERR-GAME-NOT-FOUND)

    ;; Mark escrow as refunded
    (unwrap! (contract-call? .chess-escrow refund-game game-id) ERR-GAME-NOT-FOUND)

    ;; Refund white's wager from the gateway back to them
    (if (> wager u0)
      (try! (as-contract (contract-call? .chess-token transfer
        wager
        tx-sender   ;; inside as-contract = this contract
        white-player
        none
      )))
      true
    )

    (ok true)
  )
)

;; -------------------------------------------------------
;; Read-Only: Delegate to registry and ranking
;; -------------------------------------------------------

(define-read-only (get-game-info (game-id uint))
  (contract-call? .registry get-game game-id)
)

(define-read-only (get-game-status (game-id uint))
  (contract-call? .registry get-game-status game-id)
)

(define-read-only (get-player-stats (player principal))
  (contract-call? .ranking get-player-stats player)
)

(define-read-only (get-move-history (game-id uint) (move-number uint))
  (contract-call? .logic get-move game-id move-number)
)

(define-read-only (get-escrow-info (game-id uint))
  (contract-call? .chess-escrow get-escrow game-id)
)
