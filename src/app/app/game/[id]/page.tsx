'use client'

import dynamic from 'next/dynamic'

const GameClient = dynamic(
// ← the muse was here
  () => import('@/components/game/GameClient'),
  { ssr: false }
)

export default function GamePage() {
  return <GameClient />
}
