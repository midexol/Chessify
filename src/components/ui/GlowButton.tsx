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

const GlowButton = forwardRef<HTMLButtonElement, GlowButtonProps>(
  ({ variant = 'primary', size = 'md', loading = false, icon, iconPosition = 'left', fullWidth = false, className = '', children, disabled, style, ...props }, ref) => {

    const base: React.CSSProperties = {
      position: 'relative',
      display: 'inline-flex',
      alignItems: 'center',
      justifyContent: 'center',
      gap: '8px',
      fontFamily: 'var(--font-display)',
      fontWeight: 600,
      letterSpacing: '0.03em',
      cursor: disabled || loading ? 'not-allowed' : 'pointer',
      opacity: disabled || loading ? 0.4 : 1,
      transition: 'all 0.2s ease',
      border: 'none',
      outline: 'none',
      userSelect: 'none',
      whiteSpace: 'nowrap',
      width: fullWidth ? '100%' : undefined,
      borderRadius: 'var(--radius-pill)',
    }

    const sizeStyles: React.CSSProperties =
      size === 'sm' ? { padding: '8px 18px', fontSize: '13px' } :
      size === 'lg' ? { padding: '14px 32px', fontSize: '15px' } :
                     { padding: '10px 24px', fontSize: '14px' }

    const variantStyles: React.CSSProperties =
      variant === 'primary' ? {
        background: 'var(--cyan)',
        color: '#0a0a1a',
        boxShadow: '0 2px 0 rgba(255,255,255,0.25) inset, 0 -2px 0 rgba(0,0,0,0.2) inset, 0 8px 24px rgba(0,204,255,0.35)',
      } :
      variant === 'secondary' ? {
        background: 'var(--bg-card)',
        color: 'var(--text-primary)',
        border: '1px solid var(--border-hover)',
        boxShadow: 'var(--clay-shadow)',
      } :
      variant === 'ghost' ? {
        background: 'transparent',
        color: 'var(--cyan)',
        border: '1px solid var(--border)',
      } : {
        background: 'rgba(239,68,68,0.1)',
        color: 'rgb(248,113,113)',
        border: '1px solid rgba(239,68,68,0.2)',
      }

    return (
      <button
        ref={ref}
        disabled={disabled || loading}
        style={{ ...base, ...sizeStyles, ...variantStyles, ...style }}
        onMouseEnter={(e) => {
          if (disabled || loading) return
          const el = e.currentTarget
          el.style.transform = 'translateY(-1px)'
          if (variant === 'primary') {
            el.style.filter = 'brightness(1.1)'
            el.style.boxShadow = '0 2px 0 rgba(255,255,255,0.25) inset, 0 -2px 0 rgba(0,0,0,0.2) inset, 0 12px 32px rgba(0,204,255,0.5)'
          }
          if (variant === 'ghost') { el.style.background = 'var(--cyan-soft)'; el.style.borderColor = 'var(--border-hover)' }
          if (variant === 'secondary') { el.style.borderColor = 'var(--border-strong)' }
        }}
        onMouseLeave={(e) => {
          if (disabled || loading) return
          const el = e.currentTarget
          el.style.transform = ''
          el.style.filter = ''
          if (variant === 'primary') el.style.boxShadow = '0 2px 0 rgba(255,255,255,0.25) inset, 0 -2px 0 rgba(0,0,0,0.2) inset, 0 8px 24px rgba(0,204,255,0.35)'
          if (variant === 'ghost') { el.style.background = 'transparent'; el.style.borderColor = 'var(--border)' }
          if (variant === 'secondary') el.style.borderColor = 'var(--border-hover)'
        }}
        onMouseDown={(e) => { e.currentTarget.style.transform = 'scale(0.97)' }}
        onMouseUp={(e) => { e.currentTarget.style.transform = 'translateY(-1px)' }}
        className={className}
        {...props}
      >
        {loading && <span style={{ width: '14px', height: '14px', border: '2px solid currentColor', borderTopColor: 'transparent', borderRadius: '50%', display: 'inline-block', animation: 'spin 0.6s linear infinite' }} />}
        {!loading && icon && iconPosition === 'left' && icon}
        {children}
        {!loading && icon && iconPosition === 'right' && icon}
      </button>
    )
  }
)

GlowButton.displayName = 'GlowButton'
export default GlowButton
