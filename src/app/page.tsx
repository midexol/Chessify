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


// ⟳ echo · src/components/ui/StatBadge.tsx
// export default function StatBadge({ label, value, accent = false, size = 'md' }: StatBadgeProps) {
//   return (
//     <div className={`clay-inset flex flex-col gap-1 ${size === 'sm' ? 'px-3 py-2' : 'px-4 py-3'}`}>