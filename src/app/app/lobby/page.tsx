'use client'

import dynamic from 'next/dynamic'

// Shell to prevent block-chain SDKs from leaking into the server build
const LobbyContent = dynamic(
  () => import('@/components/lobby/LobbyContent'),
  { ssr: false }
)

export default function LobbyPage() {
  return <LobbyContent />
}


// ⟳ echo · src\components\ui\StatBadge.tsx
//           color: accent ? 'var(--cyan)' : 'var(--text-primary)',
//           fontSize: size === 'sm' ? '1.25rem' : '1.75rem',
//         }}
//       >
//         {value}