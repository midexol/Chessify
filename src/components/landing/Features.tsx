'use client'

const iconBox = (children: React.ReactNode) => (
  <div className="icon-box" style={{ marginBottom:18 }}>{children}</div>
)

const features = [
  {
    id:'wager', big:true, tag:'CORE FEATURE', title:'Real Wagers', desc:'Stake CHESS tokens before each game. Winner takes the full pot — on-chain, instant, zero middlemen.',
    metrics:[{v:'2×',l:'PAYOUT'},{v:'0%',l:'FEES'},{v:'∞',l:'GAMES'}],
    icon:<svg width="24" height="24" viewBox="0 0 24 24" fill="none"><circle cx="12" cy="12" r="9" stroke="rgba(0,204,255,.3)" strokeWidth="1"/><path d="M12 3a9 9 0 0 1 9 9" stroke="#00ccff" strokeWidth="2" strokeLinecap="round"/><circle cx="12" cy="12" r="3" fill="rgba(0,204,255,.2)" stroke="#00ccff" strokeWidth="1"/></svg>,
  },
  {
    id:'onchain', title:'Every Move On-Chain', desc:'Each move is a Stacks transaction. Provably fair, permanently recorded.',
    icon:<svg width="24" height="24" viewBox="0 0 24 24" fill="none"><path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" stroke="#00ccff" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" fill="rgba(0,204,255,.08)"/></svg>,
  },
  {
    id:'elo', title:'Elo Rankings', desc:'Win to climb. Lose to fall. Your on-chain Elo rating is permanent.',
    icon:<svg width="24" height="24" viewBox="0 0 24 24" fill="none"><polyline points="22 7 13.5 15.5 8.5 10.5 2 17" stroke="#00ccff" strokeWidth="1.5" strokeLinecap="round" fill="none"/><polyline points="16 7 22 7 22 13" stroke="#00ccff" strokeWidth="1.5" strokeLinecap="round" fill="none"/></svg>,
  },
  {
    id:'faucet', title:'Daily Faucet', desc:'Claim 1,000 CHESS tokens every day — completely free. Start playing immediately.',
    icon:<svg width="24" height="24" viewBox="0 0 24 24" fill="none"><path d="M12 2.69l5.66 5.66a8 8 0 1 1-11.31 0z" stroke="#00ccff" strokeWidth="1.5" fill="rgba(0,204,255,.08)"/></svg>,
  },
  {
    id:'timeout', title:'Timeout Protection', desc:'Opponent ghosted? Claim the win after 10 days. Your wager is always protected.',
    icon:<svg width="24" height="24" viewBox="0 0 24 24" fill="none"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" stroke="#00ccff" strokeWidth="1.5" fill="rgba(0,204,255,.08)"/></svg>,
  },
  {
    id:'wallets', title:'Leather & Xverse', desc:'Both leading Stacks wallets supported. Mobile and desktop ready.',
    icon:<svg width="24" height="24" viewBox="0 0 24 24" fill="none"><rect x="2" y="7" width="20" height="14" rx="3" stroke="#00ccff" strokeWidth="1.5" fill="rgba(0,204,255,.08)"/><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" stroke="#00ccff" strokeWidth="1.5"/></svg>,
  },
]

const card: React.CSSProperties = {
  padding:32, borderRadius:24,
  background:'linear-gradient(145deg,#161628 0%,#0e0e1f 60%,#0a0a16 100%)',
  border:'1px solid rgba(255,255,255,.07)',
  boxShadow:'0 1px 0 rgba(255,255,255,.07) inset,0 -1px 0 rgba(0,0,0,.5) inset,0 20px 50px rgba(0,0,0,.6),0 4px 12px rgba(0,0,0,.35)',
  transition:'transform .25s ease,box-shadow .25s ease',
}
const cardHero: React.CSSProperties = {
  padding:36, borderRadius:24, position:'relative', overflow:'hidden',
  background:'linear-gradient(145deg,#0d1a2a 0%,#091018 100%)',
  border:'1px solid rgba(0,204,255,.2)',
  boxShadow:'0 1px 0 rgba(0,204,255,.14) inset,0 -1px 0 rgba(0,0,0,.5) inset,0 20px 60px rgba(0,204,255,.12),0 4px 16px rgba(0,0,0,.5)',
  transition:'transform .25s',
}
const h3: React.CSSProperties = { fontFamily:'var(--fd)', fontWeight:700, fontSize:17, color:'var(--t1)', marginBottom:8, letterSpacing:'-.01em' }
const p: React.CSSProperties  = { fontSize:13, color:'var(--t2)', lineHeight:1.65, fontWeight:300 }

export default function Features() {
  const hover = (e: React.MouseEvent<HTMLDivElement>, on: boolean) => {
    (e.currentTarget as HTMLElement).style.transform = on ? 'translateY(-3px)' : ''
  }

  return (
    <section id="how-it-works" style={{ padding:'80px 52px', background:'var(--bg)' }}>
      {/* Header */}
      <div style={{ textAlign:'center', marginBottom:64 }}>
        <div style={{ display:'inline-flex', alignItems:'center', background:'linear-gradient(145deg,rgba(0,204,255,.1),rgba(0,204,255,.04))', border:'1px solid rgba(0,204,255,.18)', borderRadius:999, padding:'6px 18px', marginBottom:20 }}>
          <span style={{ fontFamily:'var(--fd)', fontSize:9, fontWeight:600, color:'var(--c)', letterSpacing:'.15em' }}>WHY CHESSIFY</span>
        </div>
        <h2 style={{ fontFamily:'var(--fd)', fontWeight:900, fontSize:'clamp(32px,4vw,44px)', lineHeight:1.05, letterSpacing:'-.03em', marginBottom:16, color:'var(--t1)' }}>
          Chess, rewired<br/><span style={{ color:'var(--c)' }}>for the chain</span>
        </h2>
        <p style={{ fontSize:15, color:'var(--t2)', maxWidth:420, margin:'0 auto', lineHeight:1.7, fontWeight:300 }}>
          Everything you love about chess — plus real stakes, verifiable moves, and permanent on-chain reputation.
        </p>
      </div>

      <div style={{ maxWidth:960, margin:'0 auto', display:'flex', flexDirection:'column', gap:16 }}>

        {/* Row 1: wager hero + two stacked */}
        <div style={{ display:'grid', gridTemplateColumns:'2fr 1fr', gap:16 }}>
          <div style={cardHero} onMouseEnter={e=>hover(e,true)} onMouseLeave={e=>hover(e,false)}>
            <div style={{ position:'absolute', bottom:-40, right:-40, width:180, height:180, borderRadius:'50%', background:'radial-gradient(circle,rgba(0,204,255,.14),transparent)', pointerEvents:'none' }}/>
            <div style={{ display:'flex', justifyContent:'space-between', alignItems:'flex-start', marginBottom:20 }}>
              {iconBox(features[0].icon)}
              <span style={{ fontFamily:'var(--fd)', fontSize:9, letterSpacing:'.12em', color:'var(--c)', background:'rgba(0,204,255,.08)', border:'1px solid rgba(0,204,255,.15)', borderRadius:999, padding:'3px 10px' }}>
                CORE FEATURE
              </span>
            </div>
            <div style={{ ...h3, fontSize:26, marginBottom:12 }}>{features[0].title}</div>
            <div style={{ ...p, fontSize:14 }}>{features[0].desc}</div>
            <div style={{ display:'flex', gap:24, marginTop:24, paddingTop:20, borderTop:'1px solid rgba(255,255,255,.06)' }}>
              {features[0].metrics!.map(m => (
                <div key={m.l}>
                  <div style={{ fontFamily:'var(--fd)', fontWeight:700, fontSize:22, color:'var(--c)' }}>{m.v}</div>
                  <div style={{ fontFamily:'var(--fd)', fontSize:9, color:'var(--t3)', letterSpacing:'.12em', marginTop:2 }}>{m.l}</div>
                </div>
              ))}
            </div>
          </div>

          <div style={{ display:'flex', flexDirection:'column', gap:16 }}>
            {features.slice(1,3).map(f => (
              <div key={f.id} style={{ ...card, flex:1 }} onMouseEnter={e=>hover(e,true)} onMouseLeave={e=>hover(e,false)}>
                {iconBox(f.icon)}
                <div style={h3}>{f.title}</div>
                <div style={p}>{f.desc}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Row 2: three equal */}
        <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr 1fr', gap:16 }}>
          {features.slice(3,6).map(f => (
            <div key={f.id} style={card} onMouseEnter={e=>hover(e,true)} onMouseLeave={e=>hover(e,false)}>
              {iconBox(f.icon)}
              <div style={h3}>{f.title}</div>
              <div style={p}>{f.desc}</div>
              {f.id === 'wallets' && (
                <div style={{ display:'flex', gap:10, marginTop:16 }}>
                  {['Leather','Xverse'].map(w => (
                    <span key={w} style={{ fontFamily:'var(--fd)', fontSize:11, fontWeight:600, color:'var(--t1)', padding:'7px 18px', background:'linear-gradient(145deg,#1a1a32,#0e0e20)', border:'1px solid rgba(255,255,255,.1)', borderRadius:999, boxShadow:'0 1px 0 rgba(255,255,255,.07) inset,0 -1px 0 rgba(0,0,0,.4) inset' }}>
                      {w}
                    </span>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
