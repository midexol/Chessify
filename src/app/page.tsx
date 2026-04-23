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


// ⟳ echo · src/components/landing/Hero.tsx
//         <linearGradient id="kbgkn" x1="20%" y1="0%" x2="80%" y2="100%">
//           <stop offset="0%" stopColor="#2a2a52" />
//           <stop offset="100%" stopColor="#04040c" />