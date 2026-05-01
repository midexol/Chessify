'use client'

import dynamic from 'next/dynamic'

// Shell to prevent block-chain SDKs from leaking into the server build
const LobbyContent = dynamic(
  () => import('@/components/lobby/LobbyContent'),
  { ssr: false }
)

export default function LobbyPage() {
  return <LobbyContent />
}


// ⟳ echo · src\config\contracts.ts
//   token: { address: 'SP6X0MXEEGZX14ZTK7XQXJ76W35ZJDP9NZBT6F39', name: 'chess-token-v3' },
//   game:  { address: 'SP6X0MXEEGZX14ZTK7XQXJ76W35ZJDP9NZBT6F39', name: 'chess-game'     },
// } as const
// // Celo contracts configuration