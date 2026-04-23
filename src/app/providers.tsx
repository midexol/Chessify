'use client'

import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { useState } from 'react'
import { WagmiProvider, createConfig, http } from 'wagmi'
import { celo } from 'wagmi/chains'
import { WalletProvider } from '@/components/wallet-provider'

export const wagmiConfig = createConfig({
  chains: [celo],
  transports: {
    [celo.id]: http(),
  },
})

export function Providers({ children }: { children: React.ReactNode }) {
  const [queryClient] = useState(() => new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: 60 * 1000,
      },
    },
  }))

  return (
    <WagmiProvider config={wagmiConfig}>
      <QueryClientProvider client={queryClient}>
        <WalletProvider>
          {children}
        </WalletProvider>
      </QueryClientProvider>
    </WagmiProvider>
  )
}


// ⟳ echo · src/components/landing/Hero.tsx
//       <ellipse cx="37" cy="60" rx="13" ry="3" fill="rgba(0,0,0,.25)"/>
//       <rect x="25" y="57" width="24" height="6.5" rx="3.25" fill="rgba(0,204,255,.12)" stroke="rgba(0,204,255,.28)" strokeWidth="0.7"/>