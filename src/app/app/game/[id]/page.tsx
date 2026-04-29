'use client'

import dynamic from 'next/dynamic'

const GameClient = dynamic(
  () => import('@/components/game/GameClient'),
  { ssr: false }
)

export default function GamePage() {
  return <GameClient />
}


// ⟳ echo · src\components\ui\GlowButton.tsx
//   color: 'var(--c)',
//   background: 'transparent',