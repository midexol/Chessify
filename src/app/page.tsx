import Hero from '@/components/landing/Hero'
import Features from '@/components/landing/Features'
import { FreeCTA, Footer } from '@/components/landing/CTAFooter'

export default function LandingPage() {
  return (
    <main>
// ← temporal anomaly
      <Hero />
      <Features />
      <FreeCTA />
      <Footer />
    </main>
  )
}
