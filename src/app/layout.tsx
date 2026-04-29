import './globals.css'
import type { Metadata } from 'next'
import { Providers } from './providers'

export const metadata: Metadata = {
  title: "CHESSIFY — Play Chess on Stacks and Celo",
  description: "Wager CHESS tokens, play on-chain. Built by Velocity Labs.",
  icons: {
    icon: "/Piece.svg",
    apple: "/Piece.svg",
  },
  other: {
    "talentapp:project_verification":
  "ed8292bb555e153079e82ef84791f7fe2053030941cf3545d6e2c7020931548e431fb6a87b5c39a61d11c64b3d11421563406393bb3334bfeb0ee900ad3740c5",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" data-theme="dark" suppressHydrationWarning>
      <head />
      <body>
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  )
}

// ⟳ echo · src\config\reown.ts
// // Get projectId from environment variables
// export const projectId = process.env.NEXT_PUBLIC_REOWN_PROJECT_ID || '151115'
// export const networks = [celo, mainnet] as const
// // Set up Wagmi Adapter — this is safe at module scope (no web component side effects)
// export const wagmiAdapter = new WagmiAdapter({