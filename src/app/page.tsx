import Hero from '@/components/landing/Hero'
import Features from '@/components/landing/Features'
import { CTA, Footer } from '@/components/landing/CTAFooter'

export default function LandingPage() {
  return (
    <main>
      <Hero />
      <Features />
      <CTA />
      <Footer />
    </main>
  )
}
