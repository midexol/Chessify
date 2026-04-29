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


// ⟳ echo · src\components\ui\ChessModels.tsx
//     const offset = position[0] * 0.1 + position[1] * 0.2
//     meshRef.current.rotation.y = (t + offset) * 0.3
//     meshRef.current.rotation.z = Math.sin((t + offset) * 0.5) * 0.05
//   })