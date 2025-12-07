import { ReactNode } from 'react'

interface CardProps {
  children: ReactNode
  className?: string
  padding?: 'sm' | 'md' | 'lg'
  border?: 'normal' | 'thick'
  onClick?: () => void
  style?: React.CSSProperties
}

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

