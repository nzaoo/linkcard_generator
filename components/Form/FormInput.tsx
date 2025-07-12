import { useState } from 'react'
import { FormInputProps } from '@/types'

export default function FormInput({
  label,
  value,
  onChange,
  error,
  onErrorClear,
  placeholder,
  type = 'text',
  required = false
}: FormInputProps) {
  const [isFocused, setIsFocused] = useState(false)
  
  // Generate unique ID for accessibility
  const inputId = `input-${label.toLowerCase().replace(/\s+/g, '-')}`
  const errorId = `${inputId}-error`

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    onChange(e.target.value)
    if (error) {
      onErrorClear()
    }
  }

  const handleFocus = () => {
    setIsFocused(true)
    if (error) {
      onErrorClear()
    }
  }

  const handleBlur = () => {
    setIsFocused(false)
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    // Allow form submission with Enter key
    if (e.key === 'Enter' && type === 'textarea') {
      e.preventDefault()
    }
  }

  return (
    <div className="space-y-2">
      <label 
        htmlFor={inputId}
        className="block text-sm font-medium text-gray-200"
      >
        {label}
        {required && <span className="text-red-400 ml-1" aria-label="required">*</span>}
      </label>

      <div className="relative">
        {type === 'textarea' ? (
          <textarea
            id={inputId}
            value={value}
            onChange={handleChange}
            onFocus={handleFocus}
            onBlur={handleBlur}
            onKeyDown={handleKeyDown}
            placeholder={placeholder}
            required={required}
            rows={4}
            aria-describedby={error ? errorId : undefined}
            aria-invalid={error ? 'true' : 'false'}
            aria-required={required}
            className={`w-full px-4 py-3 bg-white/10 border rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-transparent transition-all duration-200 ${
              error ? 'border-red-400' : isFocused ? 'border-yellow-400' : 'border-white/20'
            }`}
          />
        ) : (
          <input
            id={inputId}
            type={type}
            value={value}
            onChange={handleChange}
            onFocus={handleFocus}
            onBlur={handleBlur}
            onKeyDown={handleKeyDown}
            placeholder={placeholder}
            required={required}
            aria-describedby={error ? errorId : undefined}
            aria-invalid={error ? 'true' : 'false'}
            aria-required={required}
            className={`w-full px-4 py-3 bg-white/10 border rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-transparent transition-all duration-200 ${
              error ? 'border-red-400' : isFocused ? 'border-yellow-400' : 'border-white/20'
            }`}
          />
        )}

        {/* Animated focus indicator */}
        {isFocused && (
          <div 
            className="absolute inset-0 rounded-xl border-2 border-yellow-400 pointer-events-none animate-pulse"
            aria-hidden="true"
          />
        )}
      </div>

      {error && (
        <div 
          id={errorId}
          className="flex items-center space-x-2 text-red-400 text-sm animate-fade-in"
          role="alert"
          aria-live="polite"
        >
          <span aria-hidden="true">⚠️</span>
          <span>{error}</span>
        </div>
      )}
    </div>
  )
}
