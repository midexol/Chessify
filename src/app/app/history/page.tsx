import { HistoryContent } from '@/components/lobby/HistoryContent'

export default function HistoryPage() {
  return <HistoryContent />
}


// ⟳ echo · src\components\wallet-provider.tsx
//           const userData = userSession.loadUserData()
//           setStacksAddress(userData.profile.stxAddress.mainnet || userData.profile.stxAddress.testnet)
//           setActiveChain('stacks')
//           setShowChainSelect(false)
//         },