import { HTMLAttributes, forwardRef } from 'react'

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode
  hover?: boolean
}

const Card = forwardRef<HTMLDivElement, CardProps>(
  ({ children, hover = false, className = '', ...props }, ref) => {
    const baseClass = hover ? 'card-hover' : 'card'

    return (
      <div
        ref={ref}
        className={`${baseClass} ${className}`}
        {...props}
      >
        {children}
      </div>
    )
  }
)

Card.displayName = 'Card'

export default Card
