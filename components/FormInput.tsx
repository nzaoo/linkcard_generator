import { useState } from 'react'

interface FormInputProps {
  label: string
  value: string
  onChange: (value: string) => void
  error?: string
  onErrorClear: () => void
  placeholder?: string
  type?: 'text' | 'textarea' | 'url'
  required?: boolean
}

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

  return (
    <div className="space-y-2">
      <label className="block text-sm font-medium text-gray-200">
        {label}
        {required && <span className="text-red-400 ml-1">*</span>}
      </label>

      <div className="relative">
        {type === 'textarea' ? (
          <textarea
            value={value}
            onChange={handleChange}
            onFocus={handleFocus}
            onBlur={handleBlur}
            placeholder={placeholder}
            required={required}
            rows={4}
            className={`w-full px-4 py-3 bg-white/10 border rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-transparent transition-all duration-200 ${
              error ? 'border-red-400' : isFocused ? 'border-yellow-400' : 'border-white/20'
            }`}
          />
        ) : (
          <input
            type={type}
            value={value}
            onChange={handleChange}
            onFocus={handleFocus}
            onBlur={handleBlur}
            placeholder={placeholder}
            required={required}
            className={`w-full px-4 py-3 bg-white/10 border rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-transparent transition-all duration-200 ${
              error ? 'border-red-400' : isFocused ? 'border-yellow-400' : 'border-white/20'
            }`}
          />
        )}

        {/* Animated focus indicator */}
        {isFocused && (
          <div className="absolute inset-0 rounded-xl border-2 border-yellow-400 pointer-events-none animate-pulse"></div>
        )}
      </div>

      {error && (
        <div className="flex items-center space-x-2 text-red-400 text-sm animate-fade-in">
          <span>⚠️</span>
          <span>{error}</span>
        </div>
      )}
    </div>
  )
}
