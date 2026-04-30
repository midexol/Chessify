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


// ⟳ echo · src\app\not-found.tsx
//         </Canvas>
//       </div>
//       <div className="relative z-10 flex flex-col items-center justify-center flex-1 text-center px-6">
//         <motion.div 