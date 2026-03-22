'use client'

import ClayCard from '@/components/ui/ClayCard'

const features = [
  {
    id: 'wager',
    title: 'Real Wagers',
    desc: 'Stake CHESS tokens before each game. Winner takes the full pot — no middleman, no delay.',
    icon: <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="var(--cyan)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/></svg>,
  },
  {
    id: 'onchain',
    title: 'Every Move On-Chain',
    desc: 'Each move is a Stacks transaction. Provably fair, forever recorded.',
    icon: <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="var(--cyan)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"/></svg>,
  },
  {
    id: 'elo',
    title: 'Elo Rankings',
    desc: 'Win to climb. Lose to fall. Your on-chain Elo is yours forever.',
    icon: <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="var(--cyan)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="22 7 13.5 15.5 8.5 10.5 2 17"/><polyline points="16 7 22 7 22 13"/></svg>,
  },
  {
    id: 'faucet',
    title: 'Daily Faucet',
    desc: 'Claim 1,000 CHESS tokens daily — free. Start playing immediately.',
    icon: <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="var(--cyan)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2.69l5.66 5.66a8 8 0 1 1-11.31 0z"/></svg>,
  },
  {
    id: 'timeout',
    title: 'Timeout Protection',
    desc: 'Opponent ghosted? Claim a timeout win after 10 days. Your wager stays safe.',
    icon: <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="var(--cyan)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>,
  },
  {
    id: 'wallets',
    title: 'Leather & Xverse',
    desc: 'Connect with both leading Stacks wallets. Mobile and desktop ready.',
    icon: <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="var(--cyan)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="7" width="20" height="14" rx="2"/><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"/></svg>,
  },
]

function IconBox({ icon }: { icon: React.ReactNode }) {
  return (
    <div style={{
      width: '48px', height: '48px',
      borderRadius: 'var(--radius-md)',
      background: 'var(--cyan-soft)',
      border: '1px solid var(--border-hover)',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      flexShrink: 0,
    }}>
      {icon}
    </div>
  )
}

export default function Features() {
  return (
    <section id="how-it-works" style={{ background: 'var(--bg-base)', padding: '96px 24px' }}>

      {/* Header */}
      <div style={{ textAlign: 'center', marginBottom: '64px' }}>
        <div className="clay" style={{ display: 'inline-flex', alignItems: 'center', padding: '6px 14px', marginBottom: '16px' }}>
          <span style={{ fontSize: '11px', fontFamily: 'var(--font-display)', letterSpacing: '0.15em', color: 'var(--cyan)' }}>WHY CHESSIFY</span>
        </div>
        <h2 style={{
          fontFamily: 'var(--font-display)', fontWeight: 800, lineHeight: 1.1,
          fontSize: 'clamp(2rem, 5vw, 3.5rem)', color: 'var(--text-primary)',
          marginBottom: '16px',
        }}>
          Chess, rewired<br/>
          <span style={{ color: 'var(--cyan)' }}>for the chain</span>
        </h2>
        <p style={{ fontSize: '18px', color: 'var(--text-secondary)', maxWidth: '480px', margin: '0 auto' }}>
          Everything you love about chess — plus real stakes, verifiable moves, and on-chain reputation.
        </p>
      </div>

      {/* Bento grid - all inline styles, no Tailwind grid */}
      <div style={{ maxWidth: '960px', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '16px' }}>

        {/* Row 1: Large wager card + on-chain card */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '16px' }}>

          {/* Wager - large */}
          <div style={{ gridColumn: 'span 1' }}>
            <div className="clay-cyan" style={{
              padding: '32px', minHeight: '220px',
              display: 'flex', flexDirection: 'column', justifyContent: 'space-between',
              position: 'relative', overflow: 'hidden',
              borderRadius: 'var(--radius-lg)',
            }}>
              <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between' }}>
                <IconBox icon={features[0].icon} />
                <span style={{
                  fontSize: '10px', fontFamily: 'var(--font-display)', letterSpacing: '0.12em',
                  padding: '4px 10px', borderRadius: 'var(--radius-pill)',
                  background: 'var(--cyan-soft)', color: 'var(--cyan)', border: '1px solid var(--border)',
                }}>CORE</span>
              </div>
              <div>
                <h3 style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: '24px', color: 'var(--text-primary)', marginBottom: '8px' }}>
                  {features[0].title}
                </h3>
                <p style={{ color: 'var(--text-secondary)', fontSize: '15px', lineHeight: 1.6 }}>{features[0].desc}</p>
              </div>
              {/* Decorative glow */}
              <div style={{
                position: 'absolute', bottom: '-40px', right: '-40px',
                width: '140px', height: '140px', borderRadius: '50%',
                background: 'radial-gradient(circle, var(--cyan), transparent)',
                opacity: 0.08, pointerEvents: 'none',
              }} />
            </div>
          </div>

          {/* On-chain */}
          <div>
            <ClayCard padding="lg" hover style={{ minHeight: '220px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
              <IconBox icon={features[1].icon} />
              <div>
                <h3 style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: '20px', color: 'var(--text-primary)', marginBottom: '8px' }}>
                  {features[1].title}
                </h3>
                <p style={{ color: 'var(--text-secondary)', fontSize: '14px', lineHeight: 1.6 }}>{features[1].desc}</p>
              </div>
            </ClayCard>
          </div>
        </div>

        {/* Row 2: Three equal cards */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '16px' }}>
          {features.slice(2, 5).map((f) => (
            <ClayCard key={f.id} padding="lg" hover style={{ minHeight: '180px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
              <IconBox icon={f.icon} />
              <div>
                <h3 style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: '18px', color: 'var(--text-primary)', marginBottom: '6px' }}>
                  {f.title}
                </h3>
                <p style={{ color: 'var(--text-secondary)', fontSize: '13px', lineHeight: 1.6 }}>{f.desc}</p>
              </div>
            </ClayCard>
          ))}
        </div>

        {/* Row 3: Wallets full width */}
        <ClayCard padding="lg" hover style={{ display: 'flex', alignItems: 'center', gap: '24px', flexWrap: 'wrap' }}>
          <IconBox icon={features[5].icon} />
          <div style={{ flex: 1, minWidth: '200px' }}>
            <h3 style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: '18px', color: 'var(--text-primary)', marginBottom: '4px' }}>
              {features[5].title}
            </h3>
            <p style={{ color: 'var(--text-secondary)', fontSize: '13px' }}>{features[5].desc}</p>
          </div>
          <div style={{ display: 'flex', gap: '10px' }}>
            {['Leather', 'Xverse'].map((w) => (
              <span key={w} style={{
                padding: '8px 18px', borderRadius: 'var(--radius-pill)', fontSize: '13px',
                fontFamily: 'var(--font-display)', fontWeight: 600,
                background: 'var(--bg-surface)', border: '1px solid var(--border-hover)',
                color: 'var(--text-primary)',
              }}>
                {w}
              </span>
            ))}
          </div>
        </ClayCard>
      </div>
    </section>
  )
}
