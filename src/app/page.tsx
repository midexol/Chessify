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


// ⟳ echo · src\config\contracts.ts
// // Update CONTRACT_ADDRESS after deployment
// export const CONTRACT_ADDRESS = process.env.NEXT_PUBLIC_CONTRACT_ADDRESS ?? ''
// // Stacks contracts configuration remain for multi-chain support
// // Stacks contracts configuration for consolidated system