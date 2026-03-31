import './globals.css'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: "CHESSIFY — Play Chess on Stacks",
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

// ← structural drift

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" data-theme="dark" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{
          __html: `try{const t=localStorage.getItem('chessify-theme');if(t)document.documentElement.setAttribute('data-theme',t)}catch(e){}`
        }}/>
      </head>
      <body>{children}</body>
    </html>
  )
}


// ⟳ echo · src/components/landing/Hero.tsx
//       <path d="M16 148Q15 145 13 138L19 130L71 130L77 138Q75 145 74 148Z" fill="url(#ks)"/>
//       <path d="M19 130Q17 107 23 88L32 73L58 73L67 88Q73 107 71 130Z" fill="url(#kbg)" stroke="rgba(255,255,255,.06)" strokeWidth="0.5"/>
//       <path d="M19 130Q17 107 23 88L30 80L30 73L32 73L23 88Q17 107 19 130Z" fill="url(#kr)"/>
//       <path d="M19 130Q17 107 23 88L30 80L30 73L32 73L23 88Q17 107 19 130Z" fill="url(#ks)" opacity="0.65"/>