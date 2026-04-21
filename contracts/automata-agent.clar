;; Automata Agent Attestation v1.1
;; Optimized for Stacks Mainnet Volume Testing

(define-constant ERR_NOT_AUTHORIZED (err u401))

;; Map to store the last attestation hash for each user
(define-map agent-attestations 
    principal ;; The User Address
    {
        plan-hash: (buff 32),    ;; Hash of the Gemini execution plan
        timestamp: uint,        ;; Block height of attestation
        nonce: uint             ;; Incrementing count of agent actions
    }
)

;; @desc Records a verifiable attestation of an agent's intended action
;; @param user: The principal the agent is acting for
;; @param plan-hash: SHA-256 hash of the execution JSON
(define-public (attest-action (user principal) (plan-hash (buff 32)))
    (let (
        (previous-state (default-to {plan-hash: 0x00, timestamp: u0, nonce: u0} (map-get? agent-attestations user)))
    )
        ;; In a production environment, you'd add a check here to ensure 
        ;; only the Automata Backend address can call this.
        (ok (map-set agent-attestations user 
            {
                plan-hash: plan-hash,
                timestamp: block-height,
                nonce: (+ (get nonce previous-state) u1)
            }
        ))
    )
)

;; @desc Read-only: Fetch the latest attestation for verification
(define-read-only (get-latest-attestation (user principal))
    (map-get? agent-attestations user)
)
