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

const base = `
  relative inline-flex items-center justify-center gap-2
  font-display font-600 tracking-wide
  transition-all duration-200
  disabled:opacity-40 disabled:cursor-not-allowed
  active:scale-[0.97]
  select-none outline-none
  cursor-pointer
`

const variants = {
  primary: `
    bg-[var(--cyan)] text-[#0a0a1a]
    rounded-[var(--r-pill)]
    shadow-[0_2px_0_rgba(255,255,255,0.25)_inset,0_-2px_0_rgba(0,0,0,0.2)_inset,0_8px_24px_rgba(0,204,255,0.35)]
    hover:shadow-[0_2px_0_rgba(255,255,255,0.25)_inset,0_-2px_0_rgba(0,0,0,0.2)_inset,0_12px_32px_rgba(0,204,255,0.5)]
    hover:brightness-110
    font-semibold
  `,
  secondary: `
    bg-[var(--bg-card)] text-[var(--text-primary)]
    border border-[var(--border-hover)]
    rounded-[var(--r-pill)]
    shadow-[var(--clay-shadow)]
    hover:border-[var(--border-strong)]
    hover:shadow-[var(--clay-shadow-hover)]
  `,
  ghost: `
    bg-transparent text-[var(--cyan)]
    border border-[var(--border)]
    rounded-[var(--r-pill)]
    hover:bg-[var(--cyan-soft)]
    hover:border-[var(--border-hover)]
  `,
  danger: `
    bg-red-500/10 text-red-400
    border border-red-500/20
    rounded-[var(--r-pill)]
    hover:bg-red-500/20
    hover:border-red-500/40
  `,
}

const sizes = {
  sm: 'px-4 py-2 text-sm',
  md: 'px-6 py-3 text-sm',
  lg: 'px-8 py-4 text-base',
}

const GlowButton = forwardRef<HTMLButtonElement, GlowButtonProps>(
  (
    {
      variant = 'primary',
      size = 'md',
      loading = false,
      icon,
      iconPosition = 'left',
      fullWidth = false,
      className = '',
      children,
      disabled,
      ...props
    },
    ref
  ) => {
    const classes = [
      base,
      variants[variant],
      sizes[size],
      fullWidth ? 'w-full' : '',
      className,
    ]
      .join(' ')
      .replace(/\s+/g, ' ')
      .trim()

    return (
      <button
        ref={ref}
        className={classes}
        disabled={disabled || loading}
        {...props}
      >
        {loading && (
          <span className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
        )}
        {!loading && icon && iconPosition === 'left' && icon}
        {children}
        {!loading && icon && iconPosition === 'right' && icon}
      </button>
    )
  }
)

GlowButton.displayName = 'GlowButton'

export default GlowButton
