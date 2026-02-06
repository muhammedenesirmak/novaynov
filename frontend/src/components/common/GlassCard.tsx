import { HTMLAttributes, forwardRef } from 'react'

interface GlassCardProps extends HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode
  variant?: 'default' | 'brutal' | 'hover'
}

const GlassCard = forwardRef<HTMLDivElement, GlassCardProps>(
  ({ children, variant = 'default', className = '', ...props }, ref) => {
    const variantClasses = {
      default: 'glass-card',
      brutal: 'glass-card-brutal',
      hover: 'glass-card-hover',
    }

    return (
      <div
        ref={ref}
        className={`${variantClasses[variant]} ${className}`}
        {...props}
      >
        {children}
      </div>
    )
  }
)

GlassCard.displayName = 'GlassCard'

export default GlassCard
