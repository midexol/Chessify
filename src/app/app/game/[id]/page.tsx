'use client'

import dynamic from 'next/dynamic'

const GameClient = dynamic(
  () => import('@/components/game/GameClient'),
  { ssr: false }
)

export default function GamePage() {
  return <GameClient />
}


// ⟳ echo · src\components\faucet\FaucetContent.tsx
//   const connected = activeChain === 'celo' ? isConnected : isStacksConnected
//   const userAddress = activeChain === 'celo' ? celoAddress : stacksAddress
//   /* ── Fetch Balance ── */
//   const refreshBalance = useCallback(async () => {
//     if (activeChain === 'stacks' && stacksAddress) {