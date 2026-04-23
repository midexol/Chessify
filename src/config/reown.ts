import { createAppKit } from '@reown/appkit/react'
import { WagmiAdapter } from '@reown/appkit-adapter-wagmi'
import { celo, mainnet } from '@reown/appkit-networks'

// Get projectId from environment variables
// Ensure this is set in your .env as NEXT_PUBLIC_REOWN_PROJECT_ID
export const projectId = process.env.NEXT_PUBLIC_REOWN_PROJECT_ID || '151115' // Fallback for local dev if missing

export const networks = [celo, mainnet]

// Set up Wagmi Adapter
export const wagmiAdapter = new WagmiAdapter({
  projectId,
  networks
})

// Initialize AppKit
createAppKit({
  adapters: [wagmiAdapter],
  networks,
  projectId,
  metadata: {
    name: 'Chessify Protocol',
    description: 'Decentralized Chess on Stacks and Celo',
    url: 'https://chessify.xyz', // Update to your domain
    icons: ['https://chessify.xyz/logo.png']
  },
  features: {
    analytics: true,
    email: false, // Set to true if you want social/email login
    socials: []
  },
  themeMode: 'dark'
})
