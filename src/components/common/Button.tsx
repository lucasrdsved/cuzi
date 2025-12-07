import { motion } from 'framer-motion'
import { ReactNode } from 'react'

/**
 * Props for the Button component.
 */
interface ButtonProps {
  /** The content to display inside the button. */
  children: ReactNode
  /** Function to call when the button is clicked. */
  onClick?: (e?: React.MouseEvent<HTMLButtonElement>) => void
  /** The visual style of the button. Defaults to 'primary'. */
  variant?: 'primary' | 'secondary' | 'success' | 'danger'
  /** The size of the button. Defaults to 'md'. */
  size?: 'sm' | 'md' | 'lg'
  /** Whether the button is disabled. Defaults to false. */
  disabled?: boolean
  /** The HTML type of the button. Defaults to 'button'. */
  type?: 'button' | 'submit' | 'reset'
  /** Additional CSS classes to apply to the button. */
  className?: string
}

/**
 * A customizable button component with motion effects and brutalist design.
 *
 * @param props - The properties for the button.
 * @returns A styled motion button element.
 */
export default function Button({
  children,
  onClick,
  variant = 'primary',
  size = 'md',
  disabled = false,
  type = 'button',
  className = '',
}: ButtonProps) {
  const baseClasses = 'border-brutal-thick font-brutal uppercase transition-colors duration-200'
  
  const variantClasses = {
    primary: 'border-brutal-black bg-brutal-white hover:bg-brutal-black hover:text-brutal-white text-brutal-black',
    secondary: 'border-brutal-black bg-brutal-black text-brutal-white hover:bg-brutal-white hover:text-brutal-black',
    success: 'border-brutal-green bg-brutal-white hover:bg-brutal-green hover:text-brutal-black text-brutal-black',
    danger: 'border-brutal-red bg-brutal-white hover:bg-brutal-red hover:text-brutal-white text-brutal-black',
  }
  
  const sizeClasses = {
    sm: 'px-4 py-2 text-sm',
    md: 'px-6 py-3 text-base',
    lg: 'px-8 py-4 text-lg',
  }
  
  const disabledClasses = disabled
    ? 'opacity-50 cursor-not-allowed'
    : 'cursor-pointer'

  return (
    <motion.button
      type={type}
      onClick={onClick}
      disabled={disabled}
      whileHover={!disabled ? { scale: 1.02 } : {}}
      whileTap={!disabled ? { scale: 0.98 } : {}}
      transition={{ duration: 0.2, ease: 'linear' }}
      className={`${baseClasses} ${variantClasses[variant]} ${sizeClasses[size]} ${disabledClasses} ${className}`}
    >
      {children}
    </motion.button>
  )
}
