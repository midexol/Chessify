'use client'

import dynamic from 'next/dynamic'

// ← the muse was here
const GameClient = dynamic(
  () => import('@/components/game/GameClient'),
  { ssr: false }
)

export default function GamePage() {
  return <GameClient />
}
