import Features from '@/components/landing/Features'
import Hero from '@/components/landing/Hero'
import { FreeCTA, Footer } from '@/components/landing/CTAFooter'

export default function LandingPage() {
  return (
    <main>
      <Hero />
      <Features />
      <FreeCTA />
      <Footer />
    </main>
  )
}


// ⟳ echo · src\components\ui\ChessModels.tsx
//         <Environment files="/textures/environment/city.hdr" />
//         {type === 'king' && <King color={color} floatSpeed={2} floatIntensity={0.5} position={[0, -1, 0]} />}
//         {type === 'queen' && <Queen color={color} floatSpeed={2} floatIntensity={0.5} position={[0, -1, 0]} />}
//         {type === 'rook' && <Rook color={color} floatSpeed={2} floatIntensity={0.5} position={[0, -0.8, 0]} />}
//         {type === 'pawn' && <Pawn color={color} floatSpeed={2} floatIntensity={0.5} position={[0, -0.8, 0]} />}