import { useState, useEffect } from 'react'

interface SuccessNotificationProps {
  message: string
  onClose?: () => void
  duration?: number
}

export default function SuccessNotification({ 
  message, 
  onClose, 
  duration = 3000 
}: SuccessNotificationProps) {
  const [isVisible, setIsVisible] = useState(true)
  const [isAnimating, setIsAnimating] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsAnimating(true)
      setTimeout(() => {
        setIsVisible(false)
        onClose?.()
      }, 500)
    }, duration)

    return () => clearTimeout(timer)
  }, [duration, onClose])

  if (!isVisible) return null

  return (
    <div className={`fixed top-4 right-4 z-50 transition-all duration-500 ${
      isAnimating ? 'opacity-0 translate-x-full' : 'opacity-100 translate-x-0'
    }`}>
      <div className="bg-gradient-to-r from-green-500 to-emerald-600 text-white px-6 py-4 rounded-xl shadow-2xl border border-green-400/30 backdrop-blur-lg">
        <div className="flex items-center space-x-3">
          <div className="text-2xl animate-bounce">🎉</div>
          <div>
            <div className="font-semibold">Success!</div>
            <div className="text-sm opacity-90">{message}</div>
          </div>
          <button
            onClick={() => {
              setIsAnimating(true)
              setTimeout(() => {
                setIsVisible(false)
                onClose?.()
              }, 500)
            }}
            className="text-white/70 hover:text-white transition-colors"
          >
            ✕
          </button>
        </div>
      </div>
    </div>
  )
} 