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


// ⟳ echo · src\components\ui\LoadingState.tsx
//   // If progress is provided, we calculate the X position (-5 to 5)
//   // If not, we use a jumping/looping animation
//   const isInfinite = progress === undefined
//   return (
//     <div className="flex flex-col items-center justify-center w-full py-24 gap-12 relative overflow-hidden">