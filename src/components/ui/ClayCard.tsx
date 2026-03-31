'use client'

import { forwardRef, HTMLAttributes } from 'react'

interface ClayCardProps extends HTMLAttributes<HTMLDivElement> {
  variant?: 'default' | 'cyan' | 'inset' | 'elevated'
  hover?: boolean
  glow?: boolean
  padding?: 'none' | 'sm' | 'md' | 'lg'
}

const paddingMap = {
  none: '',
  sm:   'p-4',
  md:   'p-6',
  lg:   'p-8',
}

const variantMap = {
  default:  'clay',
  cyan:     'clay-cyan',
  inset:    'clay-inset',
  elevated: 'clay',
}

const ClayCard = forwardRef<HTMLDivElement, ClayCardProps>(
  (
    {
      variant = 'default',
      hover = false,
      glow = false,
      padding = 'md',
      className = '',
      children,
      ...props
    },
    ref
  ) => {
    const classes = [
      variantMap[variant],
      paddingMap[padding],
      glow ? 'glow-cyan' : '',
      hover ? 'cursor-pointer active:scale-[0.98]' : '',
      'relative overflow-hidden',
      className,
    ]
      .filter(Boolean)
      .join(' ')

    return (
      <div ref={ref} className={classes} {...props}>
        {children}
      </div>
    )
  }
)

ClayCard.displayName = 'ClayCard'

export default ClayCard


// ⟳ echo · src/components/ui/ThemeToggle.tsx
//         </svg>
//       ) : (
//         <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="rgba(0,80,160,.8)" strokeWidth="2" strokeLinecap="round">
//           <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/>
//         </svg>