import { forwardRef, InputHTMLAttributes } from 'react'

/**
 * Props for the Input component.
 * Extends standard HTML input attributes.
 */
interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  /** Optional label text to display above the input. */
  label?: string
  /** Optional error message to display below the input. */
  error?: string
}

/**
 * A custom input component with label and error handling support, styled with brutalist design.
 *
 * @param props - The properties for the input.
 * @param ref - The ref forwarded to the underlying input element.
 * @returns A container div with label, input, and error message.
 */
const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, className = '', ...props }, ref) => {
    return (
      <div className="w-full">
        {label && (
          <label className="block text-lg font-brutal mb-2">
            {label}
          </label>
        )}
        <input
          ref={ref}
          className={`w-full border-brutal border-brutal-black bg-brutal-white px-4 py-3 font-bold text-brutal-black placeholder:text-gray-500 focus:outline-none focus:ring-0 ${error ? 'border-brutal-red' : ''} ${className}`}
          {...props}
        />
        {error && (
          <p className="mt-2 text-sm font-bold text-brutal-red">
            {error}
          </p>
        )}
      </div>
    )
  }
)

Input.displayName = 'Input'

export default Input
