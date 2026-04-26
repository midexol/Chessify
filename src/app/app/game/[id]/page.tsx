'use client'

import dynamic from 'next/dynamic'

const GameClient = dynamic(
  () => import('@/components/game/GameClient'),
  { ssr: false }
)

export default function GamePage() {
  return <GameClient />
}


// ⟳ echo · src/components/wallet-provider.tsx
//     } catch (e) {
//       console.error("Failed to open Stacks connect", e)
//     }
//   }, [userSession, setActiveChain])
//   const disconnect = useCallback(() => {