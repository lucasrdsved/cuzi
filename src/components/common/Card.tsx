import { ReactNode } from 'react'

/**
 * Props for the Card component.
 */
interface CardProps {
  /** The content to be displayed inside the card. */
  children: ReactNode
  /** Additional CSS classes for custom styling. */
  className?: string
  /** The amount of padding inside the card. Defaults to 'md'. */
  padding?: 'sm' | 'md' | 'lg'
  /** The thickness of the card's border. Defaults to 'normal'. */
  border?: 'normal' | 'thick'
  /** Optional click handler for the card. */
  onClick?: () => void
  /** Optional inline styles. */
  style?: React.CSSProperties
}

/**
 * A container component with brutalist styling options.
 *
 * @param props - The properties for the card.
 * @returns A styled div element representing a card.
 */
export default function Card({
  children,
  className = '',
  padding = 'md',
  border = 'normal',
  onClick,
  style,
}: CardProps) {
  const paddingClasses = {
    sm: 'p-4',
    md: 'p-6',
    lg: 'p-8',
  }
  
  const borderClasses = {
    normal: 'border-brutal',
    thick: 'border-brutal-thick',
  }

  return (
    <div
      className={`border-brutal-black bg-brutal-white ${borderClasses[border]} ${paddingClasses[padding]} ${className}`}
      onClick={onClick}
      style={style}
    >
      {children}
    </div>
  )
}
