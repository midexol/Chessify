'use client'
import { useEffect, useState } from 'react'

export default function ThemeToggle() {
  const [theme, setTheme] = useState<'dark'|'light'>('dark')
  useEffect(() => {
    const saved = localStorage.getItem('chessify-theme') as 'dark'|'light'|null
    const t = saved ?? 'dark'
    setTheme(t)
    document.documentElement.setAttribute('data-theme', t)
  }, [])
  const toggle = () => {
    const next = theme === 'dark' ? 'light' : 'dark'
    setTheme(next)
    document.documentElement.setAttribute('data-theme', next)
    localStorage.setItem('chessify-theme', next)
  }
  return (
    <button onClick={toggle} aria-label="Toggle theme" style={{
      width:40, height:40, borderRadius:12, cursor:'pointer', border:'none',
      background:'linear-gradient(145deg,#161628,#0e0e1f)',
      boxShadow:'0 1px 0 rgba(255,255,255,.07) inset,0 -1px 0 rgba(0,0,0,.5) inset,0 4px 12px rgba(0,0,0,.4)',
      display:'flex', alignItems:'center', justifyContent:'center',
      transition:'transform .15s ease',
    }}
    onMouseEnter={e => { e.currentTarget.style.transform = 'scale(1.05)' }}
    onMouseLeave={e => { e.currentTarget.style.transform = '' }}
    >
      {theme === 'dark' ? (
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="rgba(0,204,255,.8)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M6.34 17.66l-1.41 1.41M19.07 4.93l-1.41 1.41"/>
        </svg>
      ) : (
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="rgba(0,100,180,.8)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/>
        </svg>
      )}
    </button>
  )
}
