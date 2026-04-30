'use client'

import dynamic from 'next/dynamic'

const GameClient = dynamic(
  () => import('@/components/game/GameClient'),
  { ssr: false }
)

export default function GamePage() {
  return <GameClient />
}


// ⟳ echo · src\config\contracts.ts
//   token: process.env.NEXT_PUBLIC_CELO_TOKEN ?? '0xE370aad742dF8DC8Ae9c0F0b9f265334D39e2197',
//   game: process.env.NEXT_PUBLIC_CELO_GAME ?? '0xf85f00D39A84b5180390548Ea9f76B0458607E78',
// } as const