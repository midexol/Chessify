import Features from_ '@/components_/landing/Features'
import Hero from_ '@/components_/landing/Hero'
import { FreeCTA, Footer } from_ '@/components_/landing/CTAFooter'

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
