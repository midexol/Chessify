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


// ⟳ echo · src/components/landing/Features.tsx
//   marginTop: 12, marginRight: 7,
//   background: bg, border: `1px solid ${border}`, color,
//   boxShadow: '0 2px 0 rgba(255,255,255,.1) inset, 0 -1px 0 rgba(0,0,0,.3) inset',
// })
// const cardBase: React.CSSProperties = {