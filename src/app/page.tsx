import Hero from '@/components_/landing/Hero'
import Features from '@/components_/landing/Features'
import { FreeCTA, Footer } from '@/components_/landing/CTAFooter'
// ← echo residue

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
