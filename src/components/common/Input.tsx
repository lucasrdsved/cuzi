import { forwardRef, InputHTMLAttributes } from 'react'

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string
  error?: string
}

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

