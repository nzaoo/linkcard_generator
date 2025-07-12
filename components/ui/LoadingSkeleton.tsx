import React from 'react'

interface LoadingSkeletonProps {
  type?: 'card' | 'text' | 'avatar' | 'button' | 'form'
  className?: string
  lines?: number
  height?: string
  width?: string
}

export default function LoadingSkeleton({ 
  type = 'text', 
  className = '', 
  lines = 1, 
  height = 'h-4',
  width = 'w-full'
}: LoadingSkeletonProps) {
  const renderSkeleton = () => {
    switch (type) {
      case 'card':
        return (
          <div className={`bg-gray-800/50 rounded-3xl p-8 animate-pulse ${className}`}>
            <div className="flex items-center space-x-4 mb-4">
              <div className="w-16 h-16 bg-gray-700 rounded-full"></div>
              <div className="flex-1">
                <div className="h-4 bg-gray-700 rounded w-3/4 mb-2"></div>
                <div className="h-3 bg-gray-700 rounded w-1/2"></div>
              </div>
            </div>
            <div className="space-y-3">
              <div className="h-3 bg-gray-700 rounded"></div>
              <div className="h-3 bg-gray-700 rounded w-5/6"></div>
              <div className="h-3 bg-gray-700 rounded w-4/6"></div>
            </div>
            <div className="mt-6 space-y-2">
              <div className="h-10 bg-gray-700 rounded-xl"></div>
              <div className="h-10 bg-gray-700 rounded-xl"></div>
            </div>
          </div>
        )

      case 'avatar':
        return (
          <div className={`bg-gray-700 rounded-full animate-pulse ${height} ${width} ${className}`}></div>
        )

      case 'button':
        return (
          <div className={`bg-gray-700 rounded-xl animate-pulse ${height} ${width} ${className}`}></div>
        )

      case 'form':
        return (
          <div className={`space-y-4 ${className}`}>
            {Array.from({ length: lines }).map((_, i) => (
              <div key={i} className="space-y-2">
                <div className="h-4 bg-gray-700 rounded w-1/4"></div>
                <div className="h-12 bg-gray-700 rounded-xl"></div>
              </div>
            ))}
          </div>
        )

      case 'text':
      default:
        return (
          <div className={`space-y-2 ${className}`}>
            {Array.from({ length: lines }).map((_, i) => (
              <div
                key={i}
                className={`bg-gray-700 rounded animate-pulse ${height} ${
                  i === lines - 1 ? 'w-3/4' : 'w-full'
                }`}
              ></div>
            ))}
          </div>
        )
    }
  }

  return (
    <div className="relative overflow-hidden">
      {renderSkeleton()}
      <div className="absolute inset-0 -translate-x-full animate-shimmer bg-gradient-to-r from-transparent via-white/10 to-transparent"></div>
    </div>
  )
}

// Shimmer animation for skeleton loading
export const ShimmerEffect = ({ children, className = '' }: { children: React.ReactNode; className?: string }) => {
  return (
    <div className={`relative overflow-hidden ${className}`}>
      {children}
      <div className="absolute inset-0 -translate-x-full animate-shimmer bg-gradient-to-r from-transparent via-white/10 to-transparent"></div>
    </div>
  )
} 