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


// ⟳ echo · src\components\landing\Hero.tsx
//               <Environment files="/textures/environment/city.hdr" />
//               <King position={[0, 4, -2]} scale={5.6} color="#00ccff" emissive="#00ccff" emissiveIntensity={0.6} floatIntensity={1.8} floatSpeed={1.5} />
//               <Queen position={[-9, 5, -8]} rotation={[0.2, 0.4, 0]} scale={3.4} color="#ffffff" emissive="#ffffff" emissiveIntensity={0.5} floatIntensity={2.5} floatSpeed={1.2} />