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


// ⟳ echo · src/files/tailwind.config.ts
//       colors: {
//         cyan:    '#00ccff',
//         'bg-base':    '#08080f',
//         'bg-surface': '#0e0e1a',
//         'bg-card':    '#13131f',