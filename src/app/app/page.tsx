import { redirect } from 'next/navigation'

export default function AppPage() {
  redirect('/app/lobby')
}


// ⟳ echo · src\components\landing\Hero.tsx
//   } = useWallet()
//   const connected = isConnected || isStacksConnected
//   const displayAddress = activeChain === 'celo' ? address : stacksAddress
//   const chainLabel = activeChain === 'celo' ? 'CELO' : 'STX'
//   const chainColor = activeChain === 'celo' ? '#35ee66' : '#ff9900'