'use client'

import Link from 'next/link'
import GlowButton from '@/components/ui/GlowButton'
import ThemeToggle from '@/components/ui/ThemeToggle'

/* -------------------------------------------------------
   SVG Chess Pieces — styled with claymorphism shadows
   ------------------------------------------------------- */

function KingPiece({ className = '' }: { className?: string }) {
  return (
    <svg viewBox="0 0 80 120" className={className} style={{ filter: 'drop-shadow(0 20px 40px rgba(0,204,255,0.25)) drop-shadow(0 8px 16px rgba(0,0,0,0.5))' }}>
      <defs>
        <linearGradient id="king-body" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#2a2a3e"/>
          <stop offset="100%" stopColor="#0e0e1a"/>
        </linearGradient>
        <linearGradient id="king-shine" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="rgba(255,255,255,0.15)"/>
          <stop offset="100%" stopColor="rgba(255,255,255,0)"/>
        </linearGradient>
      </defs>
      {/* Base */}
      <ellipse cx="40" cy="110" rx="28" ry="7" fill="rgba(0,0,0,0.4)"/>
      {/* Body */}
      <path d="M18 105 Q16 80 22 65 L30 50 L50 50 L58 65 Q64 80 62 105 Z" fill="url(#king-body)" stroke="rgba(0,204,255,0.3)" strokeWidth="0.5"/>
      {/* Waist */}
      <rect x="22" y="78" width="36" height="8" rx="4" fill="rgba(0,204,255,0.1)" stroke="rgba(0,204,255,0.3)" strokeWidth="0.5"/>
      {/* Neck */}
      <rect x="30" y="42" width="20" height="12" rx="3" fill="url(#king-body)" stroke="rgba(0,204,255,0.2)" strokeWidth="0.5"/>
      {/* Head */}
      <path d="M24 42 Q24 22 40 18 Q56 22 56 42 Z" fill="url(#king-body)" stroke="rgba(0,204,255,0.3)" strokeWidth="0.5"/>
      {/* Cross vertical */}
      <rect x="38" y="6" width="4" height="16" rx="2" fill="var(--cyan, #00ccff)"/>
      {/* Cross horizontal */}
      <rect x="31" y="11" width="18" height="4" rx="2" fill="var(--cyan, #00ccff)"/>
      {/* Shine */}
      <path d="M24 42 Q24 22 40 18 Q32 22 28 42 Z" fill="url(#king-shine)"/>
      {/* Crown points */}
      <circle cx="27" cy="38" r="2.5" fill="var(--cyan, #00ccff)" opacity="0.8"/>
      <circle cx="40" cy="34" r="2.5" fill="var(--cyan, #00ccff)"/>
      <circle cx="53" cy="38" r="2.5" fill="var(--cyan, #00ccff)" opacity="0.8"/>
    </svg>
  )
}

function QueenPiece({ className = '' }: { className?: string }) {
  return (
    <svg viewBox="0 0 80 120" className={className} style={{ filter: 'drop-shadow(0 20px 40px rgba(255,255,255,0.1)) drop-shadow(0 8px 16px rgba(0,0,0,0.6))' }}>
      <defs>
        <linearGradient id="queen-body" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#e8e8f0"/>
          <stop offset="100%" stopColor="#9090a8"/>
        </linearGradient>
        <linearGradient id="queen-shine" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="rgba(255,255,255,0.5)"/>
          <stop offset="100%" stopColor="rgba(255,255,255,0)"/>
        </linearGradient>
      </defs>
      <ellipse cx="40" cy="110" rx="28" ry="7" fill="rgba(0,0,0,0.4)"/>
      <path d="M18 105 Q16 80 22 65 L30 52 L50 52 L58 65 Q64 80 62 105 Z" fill="url(#queen-body)" stroke="rgba(255,255,255,0.2)" strokeWidth="0.5"/>
      <rect x="22" y="78" width="36" height="8" rx="4" fill="rgba(0,204,255,0.15)" stroke="rgba(0,204,255,0.4)" strokeWidth="0.5"/>
      <rect x="30" y="44" width="20" height="12" rx="3" fill="url(#queen-body)" stroke="rgba(255,255,255,0.15)" strokeWidth="0.5"/>
      <path d="M25 44 Q25 24 40 20 Q55 24 55 44 Z" fill="url(#queen-body)" stroke="rgba(255,255,255,0.15)" strokeWidth="0.5"/>
      {/* Crown */}
      <path d="M22 36 L28 44 L40 28 L52 44 L58 36 L53 44 L27 44 Z" fill="url(#queen-body)" stroke="rgba(255,255,255,0.3)" strokeWidth="0.5"/>
      <circle cx="22" cy="34" r="3" fill="var(--cyan, #00ccff)"/>
      <circle cx="40" cy="26" r="3" fill="var(--cyan, #00ccff)"/>
      <circle cx="58" cy="34" r="3" fill="var(--cyan, #00ccff)"/>
      <path d="M25 44 Q25 24 40 20 Q32 24 28 44 Z" fill="url(#queen-shine)"/>
    </svg>
  )
}

function BishopPiece({ className = '' }: { className?: string }) {
  return (
    <svg viewBox="0 0 70 110" className={className} style={{ filter: 'drop-shadow(0 16px 32px rgba(0,204,255,0.2)) drop-shadow(0 6px 12px rgba(0,0,0,0.5))' }}>
      <defs>
        <linearGradient id="bishop-body" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#1e1e2e"/>
          <stop offset="100%" stopColor="#0a0a14"/>
        </linearGradient>
      </defs>
      <ellipse cx="35" cy="102" rx="24" ry="6" fill="rgba(0,0,0,0.4)"/>
      <path d="M14 98 Q12 76 18 62 L25 48 L45 48 L52 62 Q58 76 56 98 Z" fill="url(#bishop-body)" stroke="rgba(0,204,255,0.2)" strokeWidth="0.5"/>
      <rect x="18" y="74" width="34" height="7" rx="3.5" fill="rgba(0,204,255,0.08)" stroke="rgba(0,204,255,0.25)" strokeWidth="0.5"/>
      <ellipse cx="35" cy="36" rx="14" ry="16" fill="url(#bishop-body)" stroke="rgba(0,204,255,0.2)" strokeWidth="0.5"/>
      <circle cx="35" cy="14" r="5" fill="rgba(0,204,255,0.15)" stroke="rgba(0,204,255,0.5)" strokeWidth="1"/>
      <circle cx="35" cy="14" r="2" fill="var(--cyan, #00ccff)"/>
      <rect x="33" y="6" width="4" height="6" rx="2" fill="rgba(0,204,255,0.6)"/>
    </svg>
  )
}

function KnightPiece({ className = '' }: { className?: string }) {
  return (
    <svg viewBox="0 0 75 115" className={className} style={{ filter: 'drop-shadow(0 18px 36px rgba(255,255,255,0.08)) drop-shadow(0 6px 12px rgba(0,0,0,0.6))' }}>
      <defs>
        <linearGradient id="knight-body" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#d0d0e0"/>
          <stop offset="100%" stopColor="#7070888"/>
        </linearGradient>
      </defs>
      <ellipse cx="37" cy="107" rx="26" ry="6" fill="rgba(0,0,0,0.4)"/>
      <path d="M14 103 Q12 80 18 66 L25 52 L50 52 L55 66 Q60 80 58 103 Z" fill="url(#knight-body)" stroke="rgba(255,255,255,0.15)" strokeWidth="0.5"/>
      <rect x="18" y="76" width="36" height="7" rx="3.5" fill="rgba(0,204,255,0.12)" stroke="rgba(0,204,255,0.3)" strokeWidth="0.5"/>
      {/* Horse head silhouette */}
      <path d="M22 52 Q20 30 30 22 Q38 14 52 18 Q60 20 58 32 Q56 42 48 46 Q42 50 22 52 Z" fill="url(#knight-body)" stroke="rgba(255,255,255,0.15)" strokeWidth="0.5"/>
      <circle cx="50" cy="26" r="2" fill="#0a0a14"/>
      <path d="M38 52 Q36 48 34 44 L28 44 Q26 48 24 52 Z" fill="url(#knight-body)"/>
    </svg>
  )
}

/* -------------------------------------------------------
   Floating grid background
   ------------------------------------------------------- */

function GridBackground() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {/* Radial glow */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full opacity-20"
        style={{ background: 'radial-gradient(circle, rgba(0,204,255,0.3) 0%, transparent 70%)' }}
      />
      {/* Grid lines */}
      <svg className="absolute inset-0 w-full h-full opacity-[0.04]" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <pattern id="grid" width="60" height="60" patternUnits="userSpaceOnUse">
            <path d="M 60 0 L 0 0 0 60" fill="none" stroke="var(--cyan, #00ccff)" strokeWidth="1"/>
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#grid)"/>
      </svg>
      {/* Corner accents */}
      <div className="absolute top-0 left-0 w-64 h-64 opacity-30"
        style={{ background: 'radial-gradient(circle at top left, rgba(0,204,255,0.15), transparent 70%)' }}/>
      <div className="absolute bottom-0 right-0 w-64 h-64 opacity-30"
        style={{ background: 'radial-gradient(circle at bottom right, rgba(0,204,255,0.1), transparent 70%)' }}/>
    </div>
  )
}

/* -------------------------------------------------------
   Navbar
   ------------------------------------------------------- */

function Navbar() {
  return (
    <nav className="fixed top-0 inset-x-0 z-50 flex items-center justify-between px-6 md:px-12 py-4">
      <div className="clay px-4 py-2 flex items-center gap-2">
        <span className="font-display font-extrabold text-sm tracking-wider" style={{ color: 'var(--cyan)' }}>
          CHESSIFY
        </span>
        <span className="text-xs" style={{ color: 'var(--text-tertiary)', fontFamily: 'var(--font-display)' }}>
          by Velocity Labs
        </span>
      </div>

      <div className="clay px-4 py-2 hidden md:flex items-center gap-6">
        {['How it works', 'Leaderboard', 'Faucet'].map((item) => (
          <a
            key={item}
            href={`#${item.toLowerCase().replace(' ', '-')}`}
            className="text-sm transition-colors hover:text-accent"
            style={{ color: 'var(--text-secondary)', fontFamily: 'var(--font-display)' }}
          >
            {item}
          </a>
        ))}
      </div>

      <div className="flex items-center gap-3">
        <ThemeToggle />
        <Link href="/app/lobby">
          <GlowButton size="sm">Launch App</GlowButton>
        </Link>
      </div>
    </nav>
  )
}

/* -------------------------------------------------------
   Hero
   ------------------------------------------------------- */

export default function Hero() {
  return (
    <section className="relative min-h-screen flex flex-col overflow-hidden" style={{ background: 'var(--bg-base)' }}>
      <GridBackground />
      <Navbar />

      <div className="relative z-10 flex-1 flex flex-col lg:flex-row items-center justify-center gap-12 px-6 md:px-12 pt-24 pb-16">

        {/* Left — Copy */}
        <div className="flex-1 max-w-xl">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 clay px-3 py-1.5 mb-6 animate-fade-up">
            <span className="w-1.5 h-1.5 rounded-full bg-[var(--cyan)] animate-pulse-cyan"/>
            <span className="text-xs font-display tracking-widest" style={{ color: 'var(--cyan)' }}>
              ON-CHAIN CHESS — STACKS BLOCKCHAIN
            </span>
          </div>

          {/* Headline */}
          <h1
            className="font-display font-extrabold leading-[0.95] mb-6 animate-fade-up delay-100"
            style={{ fontSize: 'clamp(3rem, 8vw, 5.5rem)', color: 'var(--text-primary)' }}
          >
            Be the
            <br />
            <span style={{ color: 'var(--cyan)' }} className="text-glow">King</span>
            <br />
            of Chess
          </h1>

          {/* Sub */}
          <p
            className="text-lg leading-relaxed mb-8 animate-fade-up delay-200"
            style={{ color: 'var(--text-secondary)', maxWidth: '420px' }}
          >
            Wager CHESS tokens, play on-chain. Every move recorded on Stacks.
            Your rating, your winnings — fully on-chain.
          </p>

          {/* CTAs */}
          <div className="flex flex-wrap gap-3 animate-fade-up delay-300">
            <Link href="/app/lobby">
              <GlowButton size="lg">Play Now</GlowButton>
            </Link>
            <Link href="/app/faucet">
              <GlowButton variant="secondary" size="lg">Get CHESS Tokens</GlowButton>
            </Link>
          </div>

          {/* Stats row */}
          <div className="flex gap-6 mt-10 animate-fade-up delay-400">
            {[
              { label: 'Token', value: 'CHESS' },
              { label: 'Blockchain', value: 'Stacks' },
              { label: 'Timeout', value: '~10 days' },
            ].map(({ label, value }) => (
              <div key={label}>
                <div
                  className="font-display font-bold text-lg"
                  style={{ color: 'var(--cyan)' }}
                >
                  {value}
                </div>
                <div className="text-xs tracking-widest uppercase" style={{ color: 'var(--text-tertiary)', fontFamily: 'var(--font-display)' }}>
                  {label}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right — Floating Chess Pieces */}
        <div className="relative flex-1 flex items-center justify-center w-full max-w-lg" style={{ minHeight: '480px' }}>

          {/* Glow orb behind pieces */}
          <div
            className="absolute inset-0 m-auto w-72 h-72 rounded-full opacity-30"
            style={{ background: 'radial-gradient(circle, rgba(0,204,255,0.25) 0%, transparent 70%)' }}
          />

          {/* King — large, center-left */}
          <div className="absolute animate-float" style={{ left: '5%', top: '5%', width: '160px', animationDelay: '0s' }}>
            <KingPiece className="w-full h-full" />
          </div>

          {/* Queen — large, center-right */}
          <div className="absolute animate-float" style={{ right: '5%', top: '15%', width: '140px', animationDelay: '0.8s' }}>
            <QueenPiece className="w-full h-full" />
          </div>

          {/* Bishop — medium, bottom-left */}
          <div className="absolute animate-float-slow" style={{ left: '20%', bottom: '5%', width: '100px', animationDelay: '1.4s' }}>
            <BishopPiece className="w-full h-full" />
          </div>

          {/* Knight — medium, bottom-right */}
          <div className="absolute animate-float-slow" style={{ right: '18%', bottom: '8%', width: '110px', animationDelay: '0.4s' }}>
            <KnightPiece className="w-full h-full" />
          </div>

          {/* Decorative rings */}
          <div
            className="absolute inset-0 m-auto w-64 h-64 rounded-full border opacity-10 animate-spin-slow"
            style={{ borderColor: 'var(--cyan)', borderStyle: 'dashed' }}
          />
          <div
            className="absolute inset-0 m-auto w-80 h-80 rounded-full border opacity-[0.05]"
            style={{ borderColor: 'var(--cyan)' }}
          />

          {/* Floating cards */}
          <div
            className="absolute clay-cyan animate-fade-up delay-500"
            style={{ right: '-5%', top: '42%', padding: '10px 16px' }}
          >
            <div className="text-xs font-display" style={{ color: 'var(--text-tertiary)' }}>CURRENT LEADER</div>
            <div className="font-display font-bold" style={{ color: 'var(--cyan)', fontSize: '0.9rem' }}>ELO 2,418</div>
          </div>

          <div
            className="absolute clay animate-fade-up delay-600"
            style={{ left: '-2%', top: '55%', padding: '10px 16px' }}
          >
            <div className="text-xs font-display" style={{ color: 'var(--text-tertiary)' }}>PRIZE POOL</div>
            <div className="font-display font-bold text-sm" style={{ color: 'var(--text-primary)' }}>1,000 CHESS</div>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="relative z-10 flex flex-col items-center gap-2 pb-8 animate-fade-in delay-700">
        <span className="text-xs tracking-widest font-display" style={{ color: 'var(--text-tertiary)' }}>SCROLL</span>
        <div className="w-px h-8 animate-pulse" style={{ background: 'linear-gradient(to bottom, var(--cyan), transparent)' }}/>
      </div>
    </section>
  )
}
