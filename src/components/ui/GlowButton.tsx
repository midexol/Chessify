'use client'
import { ButtonHTMLAttributes, forwardRef, ReactNode } from 'react'

interface GlowButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'ghost' | 'danger'
  size?: 'sm' | 'md' | 'lg'
  loading?: boolean
  icon?: ReactNode
  iconPosition?: 'left' | 'right'
  fullWidth?: boolean
}

const styles = {
  base: {
    position: 'relative' as const,
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '8px',
    fontFamily: "'Unbounded', sans-serif",
    fontWeight: 700,
    letterSpacing: '.05em',
    cursor: 'pointer',
    transition: 'all .15s ease',
    border: 'none',
    outline: 'none',
    userSelect: 'none' as const,
    borderRadius: '999px',
    padding: 0,
  },
  sizes: {
    sm: { fontSize: '11px', padding: '10px 22px' },
    md: { fontSize: '12px', padding: '13px 28px' },
    lg: { fontSize: '13px', padding: '15px 34px' },
  },
  variants: {
    primary: {
      background: 'linear-gradient(180deg,#33ddff 0%,#00b8e6 50%,#009acc 100%)',
      color: '#000',
      boxShadow: '0 1px 0 rgba(255,255,255,.5) inset,0 -2px 0 rgba(0,0,0,.4) inset,0 8px 30px rgba(0,204,255,.5),0 2px 8px rgba(0,0,0,.4),0 0 0 1px rgba(0,150,200,.6)',
    },
    secondary: {
      background: 'linear-gradient(180deg,#1e1e38 0%,#14142a 60%,#0e0e20 100%)',
      color: '#eeeeff',
      boxShadow: '0 1px 0 rgba(255,255,255,.1) inset,0 -1px 0 rgba(0,0,0,.6) inset,0 6px 20px rgba(0,0,0,.5),0 0 0 1px rgba(255,255,255,.08)',
    },
    ghost: {
      background: 'transparent',
      color: '#00ccff',
      boxShadow: '0 0 0 1px rgba(0,204,255,.3)',
    },
    danger: {
      background: 'rgba(239,68,68,.1)',
      color: 'rgb(248,113,113)',
      boxShadow: '0 0 0 1px rgba(239,68,68,.25)',
    },
  },
  hover: {
    primary:   { background: 'linear-gradient(180deg,#44eeff 0%,#00ccff 50%,#00aadd 100%)', boxShadow: '0 1px 0 rgba(255,255,255,.5) inset,0 -2px 0 rgba(0,0,0,.4) inset,0 14px 40px rgba(0,204,255,.65),0 2px 8px rgba(0,0,0,.4),0 0 0 1px rgba(0,170,220,.7)' },
    secondary: { background: 'linear-gradient(180deg,#24243e 0%,#181830 60%,#121222 100%)', boxShadow: '0 1px 0 rgba(255,255,255,.12) inset,0 -1px 0 rgba(0,0,0,.6) inset,0 8px 28px rgba(0,0,0,.6),0 0 0 1px rgba(0,204,255,.2)' },
    ghost:     { background: 'rgba(0,204,255,.06)', boxShadow: '0 0 0 1px rgba(0,204,255,.55),0 0 20px rgba(0,204,255,.15)' },
    danger:    { background: 'rgba(239,68,68,.18)', boxShadow: '0 0 0 1px rgba(239,68,68,.4)' },
  },
}

const GlowButton = forwardRef<HTMLButtonElement, GlowButtonProps>(
  ({ variant = 'primary', size = 'md', loading = false, icon, iconPosition = 'left', fullWidth = false, className = '', children, disabled, style, ...props }, ref) => {
    const v = variant
    const combined = {
      ...styles.base,
      ...styles.sizes[size],
      ...styles.variants[v],
      opacity: disabled || loading ? 0.4 : 1,
      cursor: disabled || loading ? 'not-allowed' : 'pointer',
      width: fullWidth ? '100%' : undefined,
      ...style,
    }
    return (
      <button
        ref={ref}
        disabled={disabled || loading}
        style={combined}
        onMouseEnter={e => {
          if (disabled || loading) return
          Object.assign(e.currentTarget.style, styles.hover[v])
          e.currentTarget.style.transform = 'translateY(-1px)'
        }}
        onMouseLeave={e => {
          if (disabled || loading) return
          Object.assign(e.currentTarget.style, styles.variants[v])
          e.currentTarget.style.transform = ''
        }}
        onMouseDown={e => { e.currentTarget.style.transform = 'scale(.97) translateY(1px)' }}
        onMouseUp={e => { e.currentTarget.style.transform = 'translateY(-1px)' }}
        className={className}
        {...props}
      >
        {loading && <span style={{ width:14,height:14,border:'2px solid currentColor',borderTopColor:'transparent',borderRadius:'50%',display:'inline-block',animation:'spin .6s linear infinite' }} />}
        {!loading && icon && iconPosition === 'left' && icon}
        {children}
        {!loading && icon && iconPosition === 'right' && icon}
      </button>
    )
  }
)
GlowButton.displayName = 'GlowButton'
export default GlowButton
