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


// ⟳ echo · src/components/ui/GlowButton.tsx
//   borderRadius: 999,
//   padding: '16px 40px',
//   cursor: 'pointer',
//   display: 'inline-block',
//   boxShadow: '0 0 0 1px var(--b2), 0 4px 0 rgba(0,50,70,.5), 0 8px 24px rgba(0,204,255,.1)',