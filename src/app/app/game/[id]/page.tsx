'use client'

import dynamic from 'next/dynamic'

const GameClient = dynamic(
  () => import('@/components/game/GameClient'),
  { ssr: false }
)

export default function GamePage() {
  return <GameClient />
}


// ⟳ echo · src\hooks\useHistory.ts
// 'use client'
// import { useState, useEffect, useCallback } from 'react'
// import { useAccount, usePublicClient } from 'wagmi'