import React from 'react'

interface LoadingSpinnerProps {
  text?: string
}

export default function LoadingSpinner({ text }: LoadingSpinnerProps) {
  return (
    <div className="flex flex-col items-center justify-center min-h-[200px]">
      <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-yellow-400 mb-4"></div>
      {text && <div className="text-white text-lg mt-2">{text}</div>}
    </div>
  )
} 