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


// ⟳ echo · src\app\providers.tsx
// export function Providers({ children }: { children: React.ReactNode }) {
//   const [queryClient] = useState(() => new QueryClient({
//     defaultOptions: {
//       queries: {