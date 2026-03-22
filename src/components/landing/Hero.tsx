'use client'
import Image from 'next/image'
import Link from 'next/link'
import GlowButton from '@/components/ui/GlowButton'
import ThemeToggle from '@/components/ui/ThemeToggle'

/* Keyframes injected directly so Next.js inline styles can reference them */
const KEYFRAMES = `
@keyframes king-move {
  0%,100%{transform:translate(0,0) rotate(0deg)}
  20%{transform:translate(0,-12px) rotate(0deg)}
  40%{transform:translate(12px,-12px) rotate(1deg)}
  60%{transform:translate(12px,0) rotate(0deg)}
  80%{transform:translate(0,0) rotate(-.5deg)}
}
@keyframes queen-move {
  0%,100%{transform:translate(0,0)}
  25%{transform:translate(-40px,-28px)}
  50%{transform:translate(-40px,14px)}
  75%{transform:translate(20px,-20px)}
}
@keyframes bishop-move {
  0%,100%{transform:translate(0,0) rotate(0deg)}
  30%{transform:translate(32px,-32px) rotate(2deg)}
  60%{transform:translate(60px,0px) rotate(-1.5deg)}
  80%{transform:translate(32px,18px) rotate(0deg)}
}
@keyframes knight-move {
  0%,12%{transform:translate(0,0) rotate(0deg)}
  28%{transform:translate(0,-50px) rotate(-6deg)}
  44%{transform:translate(25px,-50px) rotate(6deg)}
  50%,65%{transform:translate(25px,-25px) rotate(0deg)}
  80%{transform:translate(25px,-75px) rotate(-6deg)}
  94%{transform:translate(50px,-75px) rotate(6deg)}
  100%{transform:translate(0,0) rotate(0deg)}
}
@keyframes rook-move {
  0%,100%{transform:translate(0,0)}
  25%{transform:translate(0,-42px)}
  50%{transform:translate(38px,-42px)}
  75%{transform:translate(38px,0)}
}
@keyframes rspin {
  to{transform:translate(-50%,-50%) rotate(360deg)}
}
@keyframes pulseDot {
  0%,100%{box-shadow:0 0 8px #00ccff,0 0 18px rgba(0,204,255,.4)}
  50%{box-shadow:0 0 14px #00ccff,0 0 32px rgba(0,204,255,.7)}
}
@keyframes fadeUp {
  from{opacity:0;transform:translateY(24px)}
  to{opacity:1;transform:translateY(0)}
}
`

function KingPiece() {
  return (
    <svg viewBox="0 0 90 160" width="100%">
      <defs>
        <radialGradient id="kbg" cx="32%" cy="25%" r="68%">
          <stop offset="0%" stopColor="#2a2a55"/><stop offset="45%" stopColor="#14143a"/><stop offset="100%" stopColor="#05050f"/>
        </radialGradient>
        <radialGradient id="khl" cx="25%" cy="20%" r="40%">
          <stop offset="0%" stopColor="rgba(255,255,255,.18)"/><stop offset="100%" stopColor="rgba(255,255,255,0)"/>
        </radialGradient>
      </defs>
      <ellipse cx="45" cy="153" rx="30" ry="8" fill="rgba(0,0,0,.6)"/>
      <path d="M15 148 Q14 145 12 138 L18 130 L72 130 L78 138 Q76 145 75 148Z" fill="url(#kbg)" stroke="rgba(0,204,255,.2)" strokeWidth="0.8"/>
      <path d="M18 130 Q16 108 22 90 L30 75 L60 75 L68 90 Q74 108 72 130Z" fill="url(#kbg)" stroke="rgba(255,255,255,.07)" strokeWidth="0.5"/>
      <path d="M18 130 Q16 108 22 90 L28 82 L28 75 L30 75 L22 90 Q16 108 18 130Z" fill="url(#khl)" opacity="0.6"/>
      <path d="M24 96 Q24 90 45 88 Q66 90 66 96 Q66 102 45 104 Q24 102 24 96Z" fill="url(#kbg)" stroke="rgba(0,204,255,.35)" strokeWidth="0.9"/>
      <rect x="33" y="62" width="24" height="16" rx="5" fill="url(#kbg)" stroke="rgba(0,204,255,.25)" strokeWidth="0.8"/>
      <path d="M24 62 Q24 36 45 28 Q66 36 66 62Z" fill="url(#kbg)" stroke="rgba(255,255,255,.09)" strokeWidth="0.5"/>
      <path d="M24 62 Q24 36 45 28 Q33 36 28 62Z" fill="url(#khl)"/>
      <rect x="42.5" y="5" width="5" height="26" rx="2.5" fill="#00ccff" style={{filter:'drop-shadow(0 0 8px #00ccff) drop-shadow(0 0 16px rgba(0,204,255,.6))'}}/>
      <rect x="32" y="12" width="26" height="5" rx="2.5" fill="#00ccff" style={{filter:'drop-shadow(0 0 8px #00ccff)'}}/>
      <circle cx="28" cy="55" r="4" fill="#00ccff" style={{filter:'drop-shadow(0 0 8px #00ccff) drop-shadow(0 0 18px rgba(0,204,255,.7))'}}/>
      <circle cx="45" cy="48" r="4" fill="#00ccff" style={{filter:'drop-shadow(0 0 10px #00ccff) drop-shadow(0 0 20px rgba(0,204,255,.7))'}}/>
      <circle cx="62" cy="55" r="4" fill="#00ccff" style={{filter:'drop-shadow(0 0 8px #00ccff) drop-shadow(0 0 18px rgba(0,204,255,.7))'}}/>
    </svg>
  )
}

function QueenPiece() {
  return (
    <svg viewBox="0 0 85 155" width="100%">
      <defs>
        <linearGradient id="qbg" x1="20%" y1="0%" x2="80%" y2="100%">
          <stop offset="0%" stopColor="#e8e8ff"/><stop offset="35%" stopColor="#aaaac8"/>
          <stop offset="70%" stopColor="#606080"/><stop offset="100%" stopColor="#282840"/>
        </linearGradient>
        <radialGradient id="qhl" cx="25%" cy="20%" r="45%">
          <stop offset="0%" stopColor="rgba(255,255,255,.45)"/><stop offset="100%" stopColor="rgba(255,255,255,0)"/>
        </radialGradient>
      </defs>
      <ellipse cx="42" cy="148" rx="28" ry="8" fill="rgba(0,0,0,.5)"/>
      <path d="M13 143 Q12 140 10 133 L16 126 L68 126 L74 133 Q72 140 71 143Z" fill="url(#qbg)" stroke="rgba(255,255,255,.15)" strokeWidth="0.8"/>
      <path d="M16 126 Q14 104 20 86 L28 72 L56 72 L64 86 Q70 104 68 126Z" fill="url(#qbg)" stroke="rgba(255,255,255,.08)" strokeWidth="0.5"/>
      <path d="M16 126 Q14 104 20 86 L26 78 L26 72 L28 72 L20 86 Q14 104 16 126Z" fill="url(#qhl)" opacity="0.7"/>
      <path d="M26 92 Q26 86 42 84 Q58 86 58 92 Q58 98 42 100 Q26 98 26 92Z" fill="url(#qbg)" stroke="rgba(0,204,255,.4)" strokeWidth="0.8"/>
      <path d="M22 58 Q22 32 42 24 Q62 32 62 58Z" fill="url(#qbg)"/>
      <path d="M22 58 Q22 32 42 24 Q30 32 27 58Z" fill="url(#qhl)"/>
      <path d="M20 50 L26 58 L42 32 L58 58 L64 50 L59 58 L25 58Z" fill="url(#qbg)" stroke="rgba(255,255,255,.2)" strokeWidth="0.7"/>
      <circle cx="20" cy="47" r="4.5" fill="#00ccff" style={{filter:'drop-shadow(0 0 9px #00ccff) drop-shadow(0 0 18px rgba(0,204,255,.7))'}}/>
      <circle cx="42" cy="29" r="4.5" fill="#00ccff" style={{filter:'drop-shadow(0 0 10px #00ccff) drop-shadow(0 0 20px rgba(0,204,255,.7))'}}/>
      <circle cx="64" cy="47" r="4.5" fill="#00ccff" style={{filter:'drop-shadow(0 0 9px #00ccff) drop-shadow(0 0 18px rgba(0,204,255,.7))'}}/>
    </svg>
  )
}

function BishopPiece() {
  return (
    <svg viewBox="0 0 75 148" width="100%">
      <defs>
        <radialGradient id="bbg" cx="32%" cy="25%" r="65%">
          <stop offset="0%" stopColor="#252548"/><stop offset="100%" stopColor="#04040c"/>
        </radialGradient>
        <radialGradient id="bhl" cx="25%" cy="20%" r="40%">
          <stop offset="0%" stopColor="rgba(255,255,255,.14)"/><stop offset="100%" stopColor="rgba(255,255,255,0)"/>
        </radialGradient>
      </defs>
      <ellipse cx="37" cy="141" rx="24" ry="7" fill="rgba(0,0,0,.55)"/>
      <path d="M13 136 Q12 133 10 127 L16 120 L58 120 L64 127 Q62 133 61 136Z" fill="url(#bbg)" stroke="rgba(0,204,255,.18)" strokeWidth="0.8"/>
      <path d="M16 120 Q14 98 20 80 L28 64 L46 64 L54 80 Q60 98 58 120Z" fill="url(#bbg)" stroke="rgba(255,255,255,.06)" strokeWidth="0.5"/>
      <path d="M16 120 Q14 98 20 80 L26 70 L26 64 L28 64 L20 80 Q14 98 16 120Z" fill="url(#bhl)"/>
      <path d="M22 86 Q22 80 37 78 Q52 80 52 86 Q52 92 37 94 Q22 92 22 86Z" fill="url(#bbg)" stroke="rgba(0,204,255,.28)" strokeWidth="0.8"/>
      <ellipse cx="37" cy="42" rx="16" ry="24" fill="url(#bbg)" stroke="rgba(0,204,255,.22)" strokeWidth="0.8"/>
      <ellipse cx="34" cy="36" rx="7" ry="11" fill="url(#bhl)"/>
      <rect x="24" y="58" width="26" height="7" rx="3.5" fill="rgba(0,204,255,.12)" stroke="rgba(0,204,255,.28)" strokeWidth="0.7"/>
      <circle cx="37" cy="13" r="7" fill="rgba(0,204,255,.1)" stroke="rgba(0,204,255,.4)" strokeWidth="1.2"/>
      <circle cx="37" cy="13" r="4" fill="#00ccff" style={{filter:'drop-shadow(0 0 8px #00ccff) drop-shadow(0 0 18px rgba(0,204,255,.6))'}}/>
    </svg>
  )
}

function KnightPiece() {
  return (
    <svg viewBox="0 0 90 150" width="100%">
      <defs>
        <linearGradient id="ngbg" x1="18%" y1="0%" x2="82%" y2="100%">
          <stop offset="0%" stopColor="#d0d0e8"/><stop offset="40%" stopColor="#8888a8"/>
          <stop offset="80%" stopColor="#404060"/><stop offset="100%" stopColor="#181828"/>
        </linearGradient>
        <radialGradient id="nhl" cx="22%" cy="18%" r="45%">
          <stop offset="0%" stopColor="rgba(255,255,255,.4)"/><stop offset="100%" stopColor="rgba(255,255,255,0)"/>
        </radialGradient>
      </defs>
      <ellipse cx="45" cy="143" rx="27" ry="8" fill="rgba(0,0,0,.55)"/>
      <path d="M17 138 Q16 135 14 128 L20 121 L70 121 L76 128 Q74 135 73 138Z" fill="url(#ngbg)" stroke="rgba(255,255,255,.12)" strokeWidth="0.8"/>
      <path d="M20 121 Q18 99 24 81 L32 65 L58 65 L66 81 Q72 99 70 121Z" fill="url(#ngbg)" stroke="rgba(255,255,255,.07)" strokeWidth="0.5"/>
      <path d="M20 121 Q18 99 24 81 L30 71 L30 65 L32 65 L24 81 Q18 99 20 121Z" fill="url(#nhl)" opacity="0.5"/>
      <path d="M26 87 Q26 81 45 79 Q64 81 64 87 Q64 93 45 95 Q26 93 26 87Z" fill="url(#ngbg)" stroke="rgba(0,204,255,.3)" strokeWidth="0.8"/>
      <path d="M22 65 Q18 42 26 30 Q32 20 46 16 Q62 14 70 24 Q78 34 76 48 Q74 58 64 63 Q56 67 22 65Z" fill="url(#ngbg)" stroke="rgba(255,255,255,.1)" strokeWidth="0.7"/>
      <path d="M22 65 Q18 42 26 30 Q24 40 24 65Z" fill="url(#nhl)" opacity="0.6"/>
      <path d="M28 42 Q30 34 38 28 Q46 24 56 24" fill="none" stroke="rgba(255,255,255,.12)" strokeWidth="1.5" strokeLinecap="round"/>
      <path d="M28 65 Q24 55 24 44 Q24 34 30 26" fill="none" stroke="rgba(0,0,0,.35)" strokeWidth="3" strokeLinecap="round"/>
      <circle cx="62" cy="30" r="4.5" fill="#0a0a1a"/>
      <circle cx="60.5" cy="28.5" r="1.5" fill="rgba(255,255,255,.5)"/>
      <ellipse cx="70" cy="46" rx="2.5" ry="2" fill="rgba(0,0,0,.5)"/>
    </svg>
  )
}

function RookPiece() {
  return (
    <svg viewBox="0 0 80 140" width="100%">
      <defs>
        <radialGradient id="rbg" cx="32%" cy="25%" r="65%">
          <stop offset="0%" stopColor="#222240"/><stop offset="100%" stopColor="#04040c"/>
        </radialGradient>
        <radialGradient id="rhl" cx="22%" cy="18%" r="40%">
          <stop offset="0%" stopColor="rgba(255,255,255,.14)"/><stop offset="100%" stopColor="rgba(255,255,255,0)"/>
        </radialGradient>
      </defs>
      <ellipse cx="40" cy="133" rx="26" ry="7" fill="rgba(0,0,0,.55)"/>
      <path d="M14 128 Q12 124 10 117 L16 110 L64 110 L70 117 Q68 124 66 128Z" fill="url(#rbg)" stroke="rgba(0,204,255,.18)" strokeWidth="0.8"/>
      <path d="M16 110 Q14 88 20 70 L26 54 L54 54 L60 70 Q66 88 64 110Z" fill="url(#rbg)" stroke="rgba(255,255,255,.06)" strokeWidth="0.5"/>
      <path d="M16 110 Q14 88 20 70 L24 60 L24 54 L26 54 L20 70 Q14 88 16 110Z" fill="url(#rhl)"/>
      <path d="M22 76 Q22 70 40 68 Q58 70 58 76 Q58 82 40 84 Q22 82 22 76Z" fill="url(#rbg)" stroke="rgba(0,204,255,.25)" strokeWidth="0.8"/>
      <rect x="18" y="38" width="44" height="18" rx="3" fill="url(#rbg)" stroke="rgba(0,204,255,.22)" strokeWidth="0.8"/>
      <rect x="18" y="38" width="15" height="18" rx="3" fill="url(#rhl)" opacity="0.5"/>
      <rect x="18" y="28" width="10" height="14" rx="2" fill="url(#rbg)" stroke="rgba(0,204,255,.25)" strokeWidth="0.8"/>
      <rect x="35" y="28" width="10" height="14" rx="2" fill="url(#rbg)" stroke="rgba(0,204,255,.25)" strokeWidth="0.8"/>
      <rect x="52" y="28" width="10" height="14" rx="2" fill="url(#rbg)" stroke="rgba(0,204,255,.25)" strokeWidth="0.8"/>
      <rect x="28" y="34" width="7" height="8" rx="1" fill="rgba(0,204,255,.06)"/>
      <rect x="45" y="34" width="7" height="8" rx="1" fill="rgba(0,204,255,.06)"/>
    </svg>
  )
}

function Navbar() {
  return (
    <nav style={{display:'flex',alignItems:'center',justifyContent:'space-between',padding:'20px 52px',position:'relative',zIndex:20}}>
      <div style={{height:42,padding:'0 18px',background:'linear-gradient(145deg,#16162e,#0e0e20)',border:'1px solid rgba(255,255,255,.09)',borderRadius:999,display:'flex',alignItems:'center',gap:10,boxShadow:'0 2px 0 rgba(255,255,255,.07) inset,0 -2px 0 rgba(0,0,0,.6) inset,0 6px 20px rgba(0,0,0,.5)'}}>
        <Image src="/piece.png" alt="" width={22} height={22} style={{objectFit:'contain',borderRadius:4}}/>
        <Image src="/chessify.png" alt="Chessify" width={82} height={18} style={{objectFit:'contain'}}/>
      </div>
      <div style={{display:'flex',alignItems:'center',gap:28,background:'linear-gradient(145deg,#141430,#0c0c1e)',border:'1px solid rgba(255,255,255,.07)',borderRadius:999,padding:'11px 30px',boxShadow:'0 2px 0 rgba(255,255,255,.05) inset,0 -2px 0 rgba(0,0,0,.6) inset'}}>
        {['How it works','Leaderboard','Faucet'].map(l=>(
          <a key={l} href={`#${l.toLowerCase().replace(' ','-')}`}
            style={{fontFamily:'var(--fd)',fontSize:10,fontWeight:500,color:'rgba(255,255,255,.45)',textDecoration:'none',letterSpacing:'.06em',transition:'color .2s'}}
            onMouseEnter={e=>(e.target as HTMLElement).style.color='#00ccff'}
            onMouseLeave={e=>(e.target as HTMLElement).style.color='rgba(255,255,255,.45)'}
          >{l}</a>
        ))}
      </div>
      <div style={{display:'flex',gap:10,alignItems:'center'}}>
        <ThemeToggle/>
        <Link href="/app/lobby"><GlowButton variant="secondary" size="sm">Launch App</GlowButton></Link>
      </div>
    </nav>
  )
}

export default function Hero() {
  return (
    <section style={{background:'var(--bg)',position:'relative',overflow:'hidden'}}>
      {/* Inject keyframes so animation property works on inline styles */}
      <style>{KEYFRAMES}</style>

      {/* Ambient bg */}
      <div style={{position:'absolute',inset:0,background:'radial-gradient(ellipse 70% 60% at 50% 40%,rgba(0,204,255,.07) 0%,transparent 60%),radial-gradient(ellipse 40% 30% at 20% 80%,rgba(120,60,220,.06) 0%,transparent 60%)',pointerEvents:'none'}}/>
      {/* Grid */}
      <div style={{position:'absolute',inset:0,backgroundImage:'linear-gradient(rgba(0,204,255,.06) 1px,transparent 1px),linear-gradient(90deg,rgba(0,204,255,.06) 1px,transparent 1px)',backgroundSize:'54px 54px',pointerEvents:'none',WebkitMaskImage:'radial-gradient(ellipse 90% 90% at 50% 50%,black 30%,transparent 80%)',maskImage:'radial-gradient(ellipse 90% 90% at 50% 50%,black 30%,transparent 80%)'}}/>

      <Navbar/>

      {/* HERO BODY */}
      <div style={{position:'relative',minHeight:'calc(100vh - 82px)',display:'flex',flexDirection:'column',alignItems:'center',justifyContent:'center',textAlign:'center',padding:'60px 48px 80px'}}>

        {/* TEXT — z:3 (behind pieces) */}
        <div style={{position:'relative',zIndex:3}}>
          {/* Badge */}
          <div style={{display:'inline-flex',alignItems:'center',gap:8,background:'linear-gradient(145deg,rgba(0,204,255,.12),rgba(0,204,255,.04))',border:'1px solid rgba(0,204,255,.22)',borderRadius:999,padding:'8px 20px',marginBottom:28,boxShadow:'0 2px 0 rgba(0,204,255,.1) inset',animation:'fadeUp .6s cubic-bezier(.16,1,.3,1) both'}}>
            <span style={{width:7,height:7,borderRadius:'50%',background:'#00ccff',animation:'pulseDot 2s ease-in-out infinite',flexShrink:0,boxShadow:'0 0 10px #00ccff,0 0 20px rgba(0,204,255,.5)'}}/>
            <span style={{fontFamily:'var(--fd)',fontSize:9,fontWeight:600,color:'#00ccff',letterSpacing:'.14em'}}>ON-CHAIN CHESS — STACKS BLOCKCHAIN</span>
          </div>

          {/* Headline */}
          <h1 style={{fontFamily:'var(--fd)',fontWeight:900,fontSize:'clamp(58px,10vw,118px)',lineHeight:.88,letterSpacing:'-.04em',marginBottom:28,textTransform:'uppercase',color:'var(--t1)',textShadow:'0 4px 40px rgba(0,0,0,.8)',animation:'fadeUp .6s cubic-bezier(.16,1,.3,1) .1s both'}}>
            Be the<br/>
            <span style={{color:'#00ccff',textShadow:'0 0 80px rgba(0,204,255,.5),0 0 160px rgba(0,204,255,.2),0 4px 40px rgba(0,0,0,.8)'}}>King</span><br/>
            of Chess
          </h1>

          {/* Sub */}
          <p style={{fontSize:17,color:'rgba(255,255,255,.5)',lineHeight:1.7,marginBottom:44,maxWidth:500,fontWeight:300,textShadow:'0 2px 16px rgba(0,0,0,.8)',margin:'0 auto 44px',animation:'fadeUp .6s cubic-bezier(.16,1,.3,1) .2s both'}}>
            Wager CHESS tokens, play on-chain.<br/>Every move permanently recorded. Your rating, your winnings — provably yours.
          </p>

          {/* Stats */}
          <div style={{display:'flex',justifyContent:'center',marginBottom:48,animation:'fadeUp .6s cubic-bezier(.16,1,.3,1) .3s both'}}>
            <div style={{paddingRight:28,borderRight:'1px solid rgba(255,255,255,.07)'}}>
              <div style={{fontFamily:'var(--fd)',fontWeight:800,fontSize:20,color:'#00ccff'}}>CHESS</div>
              <div style={{fontFamily:'var(--fd)',fontSize:9,color:'rgba(255,255,255,.28)',letterSpacing:'.15em',marginTop:4}}>TOKEN</div>
            </div>
            <div style={{paddingLeft:28}}>
              <div style={{fontFamily:'var(--fd)',fontWeight:800,fontSize:20,color:'#00ccff'}}>Stacks</div>
              <div style={{fontFamily:'var(--fd)',fontSize:9,color:'rgba(255,255,255,.28)',letterSpacing:'.15em',marginTop:4}}>BLOCKCHAIN</div>
            </div>
          </div>

          {/* Parallelogram CTA */}
          <div style={{animation:'fadeUp .6s cubic-bezier(.16,1,.3,1) .4s both'}}>
            <Link href="/app/lobby">
              <GlowButton parallelogram size="lg">Play Now</GlowButton>
            </Link>
          </div>
        </div>

        {/* PIECES — z:5 (in FRONT of text) */}
        <div style={{position:'absolute',inset:0,pointerEvents:'none',zIndex:5}}>
          {/* Decorative rings */}
          <div style={{position:'absolute',top:'50%',left:'50%',width:280,height:280,border:'1px dashed rgba(0,204,255,.1)',borderRadius:'50%',transform:'translate(-50%,-50%)',animation:'rspin 28s linear infinite'}}/>
          <div style={{position:'absolute',top:'50%',left:'50%',width:460,height:460,border:'1px solid rgba(0,204,255,.04)',borderRadius:'50%',transform:'translate(-50%,-50%)'}}/>

          {/* King — center top */}
          <div style={{position:'absolute',left:'50%',top:'4%',width:170,transform:'translateX(-50%)',animation:'king-move 5s ease-in-out infinite',filter:'drop-shadow(0 0 20px rgba(0,204,255,.4)) drop-shadow(0 20px 40px rgba(0,0,0,.9))'}}>
            <KingPiece/>
          </div>
          {/* Queen — left */}
          <div style={{position:'absolute',left:'14%',top:'8%',width:148,animation:'queen-move 6.2s ease-in-out infinite',filter:'drop-shadow(0 20px 40px rgba(0,0,0,.8))'}}>
            <QueenPiece/>
          </div>
          {/* Bishop — right */}
          <div style={{position:'absolute',right:'10%',top:'10%',width:118,animation:'bishop-move 5.5s ease-in-out infinite',filter:'drop-shadow(0 0 16px rgba(0,204,255,.2)) drop-shadow(0 16px 32px rgba(0,0,0,.8))'}}>
            <BishopPiece/>
          </div>
          {/* Knight — bottom left */}
          <div style={{position:'absolute',left:'7%',bottom:'12%',width:128,animation:'knight-move 4.2s ease-in-out infinite',filter:'drop-shadow(0 16px 32px rgba(0,0,0,.8))'}}>
            <KnightPiece/>
          </div>
          {/* Rook — bottom right */}
          <div style={{position:'absolute',right:'6%',bottom:'14%',width:112,animation:'rook-move 4.6s ease-in-out infinite',filter:'drop-shadow(0 0 14px rgba(0,204,255,.15)) drop-shadow(0 14px 28px rgba(0,0,0,.8))'}}>
            <RookPiece/>
          </div>

          {/* Float cards */}
          <div style={{position:'absolute',right:'3%',top:'42%',padding:'13px 20px',borderRadius:16,background:'linear-gradient(145deg,#041a2c,#020f1a)',border:'1px solid rgba(0,204,255,.25)',boxShadow:'0 2px 0 rgba(0,204,255,.12) inset,0 -1px 0 rgba(0,0,0,.6) inset,0 14px 40px rgba(0,180,240,.15)'}}>
            <div style={{fontFamily:'var(--fd)',fontSize:9,letterSpacing:'.12em',color:'rgba(255,255,255,.35)',marginBottom:4}}>CURRENT LEADER</div>
            <div style={{fontFamily:'var(--fd)',fontWeight:800,fontSize:15,color:'#00ccff'}}>ELO 2,418</div>
          </div>
          <div style={{position:'absolute',left:'2%',top:'60%',padding:'13px 20px',borderRadius:16,background:'linear-gradient(145deg,#14142c,#0c0c1e)',border:'1px solid rgba(255,255,255,.1)',boxShadow:'0 2px 0 rgba(255,255,255,.07) inset,0 -1px 0 rgba(0,0,0,.6) inset,0 14px 40px rgba(0,0,0,.5)'}}>
            <div style={{fontFamily:'var(--fd)',fontSize:9,letterSpacing:'.12em',color:'rgba(255,255,255,.35)',marginBottom:4}}>PRIZE POOL</div>
            <div style={{fontFamily:'var(--fd)',fontWeight:800,fontSize:15,color:'#fff'}}>1,000 CHESS</div>
          </div>
        </div>
      </div>

      {/* Scroll */}
      <div style={{textAlign:'center',paddingBottom:40,display:'flex',flexDirection:'column',alignItems:'center',gap:8,position:'relative',zIndex:6}}>
        <span style={{fontFamily:'var(--fd)',fontSize:9,letterSpacing:'.2em',color:'rgba(255,255,255,.22)'}}>SCROLL</span>
        <div style={{width:1,height:36,background:'linear-gradient(#00ccff,transparent)'}}/>
      </div>
    </section>
  )
}
