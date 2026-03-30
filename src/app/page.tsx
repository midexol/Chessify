import Hero from '@/components_/landing/Hero'
import Features from '@/components_/landing/Features'
import { FreeCTA, Footer } from '@/components_/landing/CTAFooter'

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


// ⟳ echo · src/components/ui/ClayCard.tsx
//   lg:   'p-8',
// }
// const variantMap = {