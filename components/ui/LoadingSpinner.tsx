import React from 'react'

interface LoadingSpinnerProps {
  size?: 'sm' | 'md' | 'lg'
  text?: string
  className?: string
}

export default function LoadingSpinner({
  size = 'md',
  text = 'Loading...',
  className = ''
}: LoadingSpinnerProps) {
  const sizeClasses = {
    sm: 'w-6 h-6',
    md: 'w-12 h-12',
    lg: 'w-16 h-16'
  }

  return (
    <div className={`flex flex-col items-center justify-center ${className}`}>
      {/* Animated spinner */}
      <div className="relative">
        <div
          className={`${sizeClasses[size]} border-4 border-white/20 border-t-yellow-400 rounded-full animate-spin`}
        ></div>

        {/* Inner glow effect */}
        <div
          className={`absolute inset-0 ${sizeClasses[size]} border-4 border-transparent border-t-yellow-400/30 rounded-full animate-spin`}
          style={{ animationDuration: '1.5s' }}
        ></div>

        {/* Pulse effect */}
        <div
          className={`absolute inset-0 ${sizeClasses[size]} bg-yellow-400/20 rounded-full animate-ping`}
        ></div>
      </div>

      {/* Loading text */}
      {text && (
        <div className="mt-4 text-center">
          <p className="text-white/80 text-sm font-medium">{text}</p>
          <div className="flex justify-center mt-2 space-x-1">
            <div
              className="w-1 h-1 bg-yellow-400 rounded-full animate-bounce"
              style={{ animationDelay: '0ms' }}
            ></div>
            <div
              className="w-1 h-1 bg-yellow-400 rounded-full animate-bounce"
              style={{ animationDelay: '150ms' }}
            ></div>
            <div
              className="w-1 h-1 bg-yellow-400 rounded-full animate-bounce"
              style={{ animationDelay: '300ms' }}
            ></div>
          </div>
        </div>
      )}
    </div>
  )
}

// Full screen loading component
export function FullScreenLoading({ text = 'Loading your card...' }: { text?: string }) {
  return (
    <div className="min-h-screen dark-gradient-bg starry-bg shooting-stars flex items-center justify-center">
      <div className="relative z-10">
        <LoadingSpinner size="lg" text={text} />
      </div>
    </div>
  )
}
