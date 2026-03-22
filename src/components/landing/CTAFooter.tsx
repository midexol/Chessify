'use client'
import Link from 'next/link'
import GlowButton from '@/components/ui/GlowButton'

export function CTA() {
  return (
    <section style={{ padding:'100px 52px', textAlign:'center', position:'relative', overflow:'hidden', background:'linear-gradient(180deg,var(--bg) 0%,#0a0a1a 100%)', borderTop:'1px solid rgba(255,255,255,.05)' }}>
      <div style={{ position:'absolute', top:'50%', left:'50%', transform:'translate(-50%,-50%)', width:600, height:300, borderRadius:'50%', background:'radial-gradient(ellipse,rgba(0,204,255,.09) 0%,transparent 70%)', pointerEvents:'none' }}/>
      <div style={{ position:'relative', zIndex:2 }}>
        <h2 style={{ fontFamily:'var(--fd)', fontWeight:900, fontSize:'clamp(36px,5vw,52px)', lineHeight:1.0, letterSpacing:'-.03em', marginBottom:20, color:'var(--t1)' }}>
          Your next move<br/><span style={{ color:'var(--c)', textShadow:'0 0 50px rgba(0,204,255,.4)' }}>is on-chain</span>
        </h2>
        <p style={{ fontSize:15, color:'var(--t2)', maxWidth:400, margin:'0 auto 40px', lineHeight:1.7, fontWeight:300 }}>
          Connect your wallet, claim free CHESS tokens, and start your first wager game in under two minutes.
        </p>
        <div style={{ display:'flex', gap:14, justifyContent:'center', marginBottom:64, flexWrap:'wrap' }}>
          <Link href="/app/lobby"><GlowButton size="lg">Open the App</GlowButton></Link>
          <Link href="/app/faucet"><GlowButton variant="ghost" size="lg">Get Free CHESS</GlowButton></Link>
        </div>
        <div style={{ fontFamily:'var(--fd)', fontSize:9, fontWeight:600, letterSpacing:'.14em', color:'var(--t3)' }}>BUILT BY VELOCITY LABS</div>
      </div>
    </section>
  )
}

export function Footer() {
  return (
    <footer style={{ padding:'24px 52px', display:'flex', alignItems:'center', justifyContent:'space-between', borderTop:'1px solid rgba(255,255,255,.05)', flexWrap:'wrap', gap:16, background:'var(--bg)' }}>
      <div style={{ display:'flex', alignItems:'center', gap:10 }}>
        <span style={{ fontFamily:'var(--fd)', fontWeight:800, fontSize:12, color:'var(--c)', letterSpacing:'.1em' }}>CHESSIFY</span>
        <div className="vel-pill">
          <span style={{ fontFamily:'var(--fd)', fontSize:9, fontWeight:600, color:'rgba(0,204,255,.7)', letterSpacing:'.12em' }}>BY VELOCITY LABS</span>
        </div>
      </div>
      <div style={{ display:'flex', gap:24 }}>
        {[{l:'App',h:'/app/lobby'},{l:'Faucet',h:'/app/faucet'},{l:'Leaderboard',h:'/app/leaderboard'}].map(({l,h}) => (
          <Link key={l} href={h} style={{ fontFamily:'var(--fd)', fontSize:10, color:'var(--t3)', textDecoration:'none', letterSpacing:'.06em' }}>{l}</Link>
        ))}
      </div>
      <span style={{ fontFamily:'var(--fd)', fontSize:10, color:'var(--t3)', letterSpacing:'.06em' }}>CHESS PROTOCOL — STACKS BLOCKCHAIN</span>
    </footer>
  )
}
