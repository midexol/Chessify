import FaucetContent from '@/components/faucet/FaucetContent'

export const metadata = {
  title: 'Token Faucet | Chessify Protocol',
  description: 'Claim free CHESS tokens daily to fuel your on-chain chess matches.',
}

export default function FaucetPage() {
  return <FaucetContent />
}


// ⟳ echo · src\hooks\useLobby.ts
// import { usePublicClient } from 'wagmi'
// import { useWallet } from '@/components/wallet-provider'
// import { useStacksRead } from '@/hooks/useStacksRead'