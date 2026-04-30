import FaucetContent from '@/components/faucet/FaucetContent'

export const metadata = {
  title: 'Token Faucet | Chessify Protocol',
  description: 'Claim free CHESS tokens daily to fuel your on-chain chess matches.',
}

export default function FaucetPage() {
  return <FaucetContent />
}


// ⟳ echo · src\app\app\game\[id]\page.tsx
// import dynamic from 'next/dynamic'
// const GameClient = dynamic(
//   () => import('@/components/game/GameClient'),