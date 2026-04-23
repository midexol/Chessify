import { createAppKit } from '@reown/appkit/react'
import { WagmiAdapter } from '@reown/appkit-adapter-wagmi'
import { celo, mainnet } from '@reown/appkit/networks'

// Get projectId from environment variables
export const projectId = process.env.NEXT_PUBLIC_REOWN_PROJECT_ID || '151115'

export const networks = [celo, mainnet]

// Set up Wagmi Adapter
export const wagmiAdapter = new WagmiAdapter({
  projectId,
  networks
})

// Initialize AppKit only on client side
if (typeof window !== 'undefined') {
  createAppKit({
    adapters: [wagmiAdapter],
    networks: [celo, mainnet] as [any, ...any[]],
    projectId,
    metadata: {
      name: 'Chessify Protocol',
      description: 'Decentralized Chess on Stacks and Celo',
      url: 'https://chessify.xyz',
      icons: ['https://chessify.xyz/logo.png']
    },
    features: {
      analytics: true,
      email: false,
      socials: []
    },
    themeMode: 'dark'
  })
}
