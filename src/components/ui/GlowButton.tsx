'use client'
import { ButtonHTMLAttributes, forwardRef, ReactNode } from 'react'

interface GlowButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'ghost'
  size?: 'sm' | 'md' | 'lg'
  loading?: boolean
  parallelogram?: boolean
  fullWidth?: boolean
  icon?: ReactNode
}

const GlowButton = forwardRef<HTMLButtonElement, GlowButtonProps>(
  ({ variant = 'primary', size = 'md', loading = false, parallelogram = false, fullWidth = false, className = '', children, disabled, style, icon, ...props }, ref) => {
    if (parallelogram) {
      return (
        <button
          ref={ref}
          disabled={disabled || loading}
          className={`btn-para ${className}`}
          style={{ opacity: disabled || loading ? 0.4 : 1, width: fullWidth ? '100%' : undefined, ...style }}
          {...props}
        >
          {loading && <span style={{ width:14,height:14,border:'2px solid currentColor',borderTopColor:'transparent',borderRadius:'50%',display:'inline-block',animation:'spin .6s linear infinite',marginRight:8 }} />}
          {children}
        </button>
      )
    }
    const cls = variant === 'secondary' ? 'btn-secondary' : 'btn-ghost-cyan'
    const sizeMap = { sm: { padding:'10px 22px', fontSize:'11px' }, md: { padding:'15px 32px', fontSize:'13px' }, lg: { padding:'18px 40px', fontSize:'14px' } }
    return (
      <button
        ref={ref}
        disabled={disabled || loading}
        className={`${cls} ${className}`}
        style={{ ...sizeMap[size], opacity: disabled || loading ? 0.4 : 1, width: fullWidth ? '100%' : undefined, ...style }}
        {...props}
      >
        {loading && <span style={{ width:14,height:14,border:'2px solid currentColor',borderTopColor:'transparent',borderRadius:'50%',display:'inline-block',animation:'spin .6s linear infinite',marginRight:8 }} />}
        {icon && <span style={{ marginRight:8, display:'inline-flex', alignItems:'center' }}>{icon}</span>}
        {children}
      </button>
    )
  }
)
GlowButton.displayName = 'GlowButton'
export default GlowButton
