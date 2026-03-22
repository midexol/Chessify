'use client'

const feats = [
  { id:'wager', variant:'purple', tag:'CORE FEATURE', tagCls:'tp', title:'Real Wagers', titleColor:'#c090ff', desc:'Stake CHESS tokens before each game. Winner takes the full pot — on-chain, instant, zero middlemen.', metrics:[{v:'2×',l:'PAYOUT'},{v:'0%',l:'FEES'},{v:'∞',l:'GAMES'}], iconColor:'#a060ff', icon:<svg viewBox="0 0 24 24" fill="none"><circle cx="12" cy="12" r="10" stroke="#a060ff" strokeWidth="0.8"/><path d="M12 3a9 9 0 0 1 9 9" stroke="#a060ff" strokeWidth="1.5" strokeLinecap="round"/><circle cx="12" cy="12" r="4" fill="#a060ff" opacity=".3"/><line x1="12" y1="12" x2="17" y2="9" stroke="#a060ff" strokeWidth="1.2" strokeLinecap="round"/><line x1="12" y1="12" x2="12" y2="6" stroke="#a060ff" strokeWidth="1" strokeLinecap="round"/></svg> },
  { id:'onchain', variant:'cyan', tag:'ON-CHAIN', tagCls:'tc', title:'Every Move Recorded', titleColor:'#00ccff', desc:'Each move is a Stacks transaction. Provably fair, permanently on-chain.', icon:<svg viewBox="0 0 24 24" fill="none"><path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" fill="#00ccff" strokeWidth="0.3"/></svg> },
  { id:'elo', variant:'green', title:'Elo Rankings', titleColor:'#00dc78', desc:'Win to climb. Lose to fall. Permanent on-chain rating.', icon:<svg viewBox="0 0 24 24" fill="none"><polyline points="2 17 8.5 10.5 13.5 15.5 22 7" stroke="#00dc78" strokeWidth="1" strokeLinecap="round" fill="none"/><polyline points="16 7 22 7 22 13" stroke="#00dc78" strokeWidth="1" strokeLinecap="round" fill="none"/></svg> },
  { id:'faucet', variant:'amber', title:'Daily Faucet', titleColor:'#ffb400', desc:'Claim 1,000 CHESS tokens every day — completely free.', icon:<svg viewBox="0 0 24 24" fill="none"><path d="M12 2.69l5.66 5.66a8 8 0 1 1-11.31 0z" fill="#ffb400" strokeWidth="0.3"/></svg> },
  { id:'wallets', variant:'dark', title:'Protected', titleColor:'#eeeeff', desc:'Timeout protection. Leather & Xverse. Mobile ready.', icon:<svg viewBox="0 0 24 24" fill="none"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" fill="#fff" strokeWidth="0.3"/></svg> },
]

const cardClass: Record<string, string> = {
  purple: 'clay-purple', cyan: 'clay-cyan-card',
  green: 'clay-green', amber: 'clay-amber', dark: 'clay-dark-card',
}

const tagStyle: React.CSSProperties = { fontFamily:'var(--fd)', fontSize:9, letterSpacing:'.12em', borderRadius:999, padding:'5px 13px', display:'inline-block', marginBottom:16 }
const tagPurple: React.CSSProperties = { ...tagStyle, background:'rgba(160,100,255,.15)', border:'1px solid rgba(160,100,255,.3)', color:'#c090ff' }
const tagCyan: React.CSSProperties = { ...tagStyle, background:'rgba(0,204,255,.1)', border:'1px solid rgba(0,204,255,.25)', color:'#00ccff' }
const hStyle: React.CSSProperties = { fontFamily:'var(--fd)', fontWeight:800, lineHeight:1.05, letterSpacing:'-.02em', marginBottom:10 }
const pStyle: React.CSSProperties = { fontSize:14, color:'rgba(255,255,255,.45)', lineHeight:1.65, fontWeight:300 }
const wPillBase: React.CSSProperties = { fontFamily:'var(--fd)', fontSize:10, fontWeight:600, padding:'8px 18px', borderRadius:999, display:'inline-block', marginTop:14, marginRight:8 }

export default function Features() {
  const hover = (e: React.MouseEvent<HTMLDivElement>, on: boolean) => {
    if (on) e.currentTarget.style.transform = 'translateY(-6px) scale(1.01)'
    else e.currentTarget.style.transform = ''
  }
  return (
    <section id="how-it-works" style={{ padding:'80px 52px', background:'var(--bg)' }}>
      <div style={{ textAlign:'center', marginBottom:60 }}>
        <div style={{ display:'inline-flex', alignItems:'center', background:'linear-gradient(145deg,rgba(160,100,255,.12),rgba(160,100,255,.05))', border:'1px solid rgba(160,100,255,.22)', borderRadius:999, padding:'7px 18px', marginBottom:20 }}>
          <span style={{ fontFamily:'var(--fd)', fontSize:9, fontWeight:600, color:'#c090ff', letterSpacing:'.15em' }}>WHY CHESSIFY</span>
        </div>
        <h2 style={{ fontFamily:'var(--fd)', fontWeight:900, fontSize:'clamp(30px,4vw,46px)', lineHeight:1.05, letterSpacing:'-.03em', marginBottom:16, color:'var(--t1)' }}>
          Chess, rewired<br/><span style={{ color:'#00ccff' }}>for the chain</span>
        </h2>
        <p style={{ fontSize:16, color:'rgba(255,255,255,.45)', maxWidth:420, margin:'0 auto', lineHeight:1.7, fontWeight:300 }}>
          Real stakes, verifiable moves, and permanent on-chain reputation.
        </p>
      </div>

      <div style={{ maxWidth:960, margin:'0 auto', display:'flex', flexDirection:'column', gap:14 }}>
        {/* Row 1 */}
        <div style={{ display:'grid', gridTemplateColumns:'1.6fr 1fr', gap:14 }}>
          {/* Wager — big purple */}
          <div className={cardClass.purple} style={{ minHeight:280 }} onMouseEnter={e=>hover(e,true)} onMouseLeave={e=>hover(e,false)}>
            <svg className="bg-icon-col" viewBox="0 0 24 24" fill="none"><circle cx="12" cy="12" r="10" stroke="#a060ff" strokeWidth="0.8"/><path d="M12 3a9 9 0 0 1 9 9" stroke="#a060ff" strokeWidth="1.5" strokeLinecap="round"/><circle cx="12" cy="12" r="4" fill="#a060ff" opacity=".3"/><line x1="12" y1="12" x2="17" y2="9" stroke="#a060ff" strokeWidth="1.2" strokeLinecap="round"/><line x1="12" y1="12" x2="12" y2="6" stroke="#a060ff" strokeWidth="1" strokeLinecap="round"/></svg>
            <div style={{ padding:30, position:'relative', zIndex:2, height:'100%', display:'flex', flexDirection:'column', justifyContent:'space-between' }}>
              <div>
                <span style={tagPurple}>CORE FEATURE</span>
                <div style={{ ...hStyle, fontSize:24, color:'#c090ff' }}>Real Wagers</div>
                <div style={pStyle}>Stake CHESS tokens before each game. Winner takes the full pot — on-chain, instant, zero middlemen.</div>
              </div>
              <div style={{ display:'flex', gap:24, paddingTop:20, borderTop:'1px solid rgba(255,255,255,.07)' }}>
                {[{v:'2×',l:'PAYOUT'},{v:'0%',l:'FEES'},{v:'∞',l:'GAMES'}].map(m=>(
                  <div key={m.l}>
                    <div style={{ fontFamily:'var(--fd)', fontWeight:800, fontSize:28, color:'#c090ff' }}>{m.v}</div>
                    <div style={{ fontFamily:'var(--fd)', fontSize:9, opacity:.35, letterSpacing:'.13em', marginTop:3 }}>{m.l}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
          {/* On-chain — cyan */}
          <div className={cardClass.cyan} style={{ minHeight:280 }} onMouseEnter={e=>hover(e,true)} onMouseLeave={e=>hover(e,false)}>
            <svg className="bg-icon-col" viewBox="0 0 24 24" fill="none"><path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" fill="#00ccff" strokeWidth="0.3"/></svg>
            <div style={{ padding:30, position:'relative', zIndex:2, height:'100%', display:'flex', flexDirection:'column', justifyContent:'flex-end' }}>
              <span style={tagCyan}>ON-CHAIN</span>
              <div style={{ ...hStyle, fontSize:20, color:'#00ccff' }}>Every Move Recorded</div>
              <div style={pStyle}>Each move is a Stacks transaction. Provably fair, permanently on-chain.</div>
            </div>
          </div>
        </div>

        {/* Row 2 — three equal */}
        <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr 1fr', gap:14 }}>
          {/* Elo green */}
          <div className={cardClass.green} style={{ minHeight:230 }} onMouseEnter={e=>hover(e,true)} onMouseLeave={e=>hover(e,false)}>
            <svg className="bg-icon" viewBox="0 0 24 24" fill="none"><polyline points="2 17 8.5 10.5 13.5 15.5 22 7" stroke="#00dc78" strokeWidth="1" strokeLinecap="round" fill="none"/><polyline points="16 7 22 7 22 13" stroke="#00dc78" strokeWidth="1" strokeLinecap="round" fill="none"/></svg>
            <div style={{ padding:30, position:'relative', zIndex:2, height:'100%', display:'flex', flexDirection:'column', justifyContent:'flex-end' }}>
              <div style={{ ...hStyle, fontSize:18, color:'#00dc78' }}>Elo Rankings</div>
              <div style={pStyle}>Win to climb. Lose to fall. Permanent on-chain rating.</div>
            </div>
          </div>
          {/* Faucet amber */}
          <div className={cardClass.amber} style={{ minHeight:230 }} onMouseEnter={e=>hover(e,true)} onMouseLeave={e=>hover(e,false)}>
            <svg className="bg-icon" viewBox="0 0 24 24" fill="none"><path d="M12 2.69l5.66 5.66a8 8 0 1 1-11.31 0z" fill="#ffb400" strokeWidth="0.3"/></svg>
            <div style={{ padding:30, position:'relative', zIndex:2, height:'100%', display:'flex', flexDirection:'column', justifyContent:'flex-end' }}>
              <div style={{ ...hStyle, fontSize:18, color:'#ffb400' }}>Daily Faucet</div>
              <div style={pStyle}>Claim 1,000 CHESS tokens every day — completely free.</div>
            </div>
          </div>
          {/* Wallets dark */}
          <div className={cardClass.dark} style={{ minHeight:230 }} onMouseEnter={e=>hover(e,true)} onMouseLeave={e=>hover(e,false)}>
            <svg className="bg-icon" viewBox="0 0 24 24" fill="none"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" fill="#fff" strokeWidth="0.3"/></svg>
            <div style={{ padding:30, position:'relative', zIndex:2, height:'100%', display:'flex', flexDirection:'column', justifyContent:'flex-end' }}>
              <div style={{ ...hStyle, fontSize:18, color:'var(--t1)' }}>Protected</div>
              <div style={pStyle}>Leather & Xverse supported. Mobile & desktop ready.</div>
              <div>
                <span style={{ ...wPillBase, background:'linear-gradient(180deg,rgba(0,204,255,.2),rgba(0,204,255,.08))', border:'1px solid rgba(0,204,255,.3)', color:'#00ccff', boxShadow:'0 2px 0 rgba(255,255,255,.1) inset,0 -1px 0 rgba(0,0,0,.5) inset' }}>Leather</span>
                <span style={{ ...wPillBase, background:'linear-gradient(180deg,rgba(255,255,255,.1),rgba(255,255,255,.04))', border:'1px solid rgba(255,255,255,.15)', color:'rgba(255,255,255,.75)', boxShadow:'0 2px 0 rgba(255,255,255,.1) inset,0 -1px 0 rgba(0,0,0,.5) inset' }}>Xverse</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
