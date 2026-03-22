'use client'

import Link from 'next/link'
import GlowButton from '@/components/ui/GlowButton'

export function CTA() {
  return (
    <section className="relative px-6 md:px-12 py-32 overflow-hidden" style={{ background: 'var(--bg-surface)' }}>
      {/* Glow */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] rounded-full opacity-20 pointer-events-none"
        style={{ background: 'radial-gradient(ellipse, rgba(0,204,255,0.4) 0%, transparent 70%)' }}
      />

      <div className="relative z-10 max-w-3xl mx-auto text-center">
        <h2
          className="font-display font-800 mb-6 leading-tight"
          style={{ fontSize: 'clamp(2rem, 5vw, 4rem)', color: 'var(--text-primary)' }}
        >
          Your next move
          <br />
          <span style={{ color: 'var(--cyan)' }} className="text-glow">is on-chain</span>
        </h2>
        <p className="text-lg mb-10 max-w-md mx-auto" style={{ color: 'var(--text-secondary)' }}>
          Connect your wallet, claim free CHESS tokens, and start your first wager game in under two minutes.
        </p>
        <div className="flex flex-wrap gap-4 justify-center">
          <Link href="/app/lobby">
            <GlowButton size="lg">Open the App</GlowButton>
          </Link>
          <Link href="/app/faucet">
            <GlowButton variant="ghost" size="lg">Get Free CHESS</GlowButton>
          </Link>
        </div>

        {/* Built by badge */}
        <div className="mt-16 flex items-center justify-center gap-2 opacity-40">
          <span className="text-sm font-display" style={{ color: 'var(--text-secondary)' }}>
            Built by
          </span>
          <span className="text-sm font-display font-700" style={{ color: 'var(--text-primary)' }}>
            Velocity Labs
          </span>
        </div>
      </div>
    </section>
  )
}

export function Footer() {
  return (
    <footer className="px-6 md:px-12 py-8 border-t" style={{ borderColor: 'var(--border)', background: 'var(--bg-base)' }}>
      <div className="max-w-5xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          <span className="font-display font-800 text-sm" style={{ color: 'var(--cyan)' }}>CHESSIFY</span>
          <span className="text-xs" style={{ color: 'var(--text-tertiary)' }}>by Velocity Labs</span>
        </div>

        <div className="flex gap-6">
          {[
            { label: 'App', href: '/app/lobby' },
            { label: 'Faucet', href: '/app/faucet' },
            { label: 'Leaderboard', href: '/app/leaderboard' },
          ].map(({ label, href }) => (
            <Link
              key={label}
              href={href}
              className="text-sm font-display transition-colors hover:text-accent"
              style={{ color: 'var(--text-tertiary)' }}
            >
              {label}
            </Link>
          ))}
        </div>

        <p className="text-xs font-display" style={{ color: 'var(--text-tertiary)' }}>
          CHESS Protocol — Stacks Blockchain
        </p>
      </div>
    </footer>
  )
}
