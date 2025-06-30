import { useState, useEffect } from 'react'

interface StatsProps {
  className?: string
}

export default function Stats({ className = '' }: StatsProps) {
  const [stats, setStats] = useState({
    cardsCreated: 1000,
    totalViews: 50000,
    userRating: 4.9
  })

  useEffect(() => {
    // Simulate real-time updates
    const interval = setInterval(() => {
      setStats(prev => ({
        cardsCreated: prev.cardsCreated + Math.floor(Math.random() * 3),
        totalViews: prev.totalViews + Math.floor(Math.random() * 50),
        userRating: Math.max(4.5, Math.min(5.0, prev.userRating + (Math.random() - 0.5) * 0.1))
      }))
    }, 5000)

    return () => clearInterval(interval)
  }, [])

  return (
    <div className={`grid grid-cols-3 gap-8 max-w-2xl mx-auto ${className}`}>
      <div className="text-center">
        <div className="text-3xl font-bold gold-gradient-text mb-2">
          {stats.cardsCreated.toLocaleString()}+
        </div>
        <div className="text-white/70 text-sm">Cards Created</div>
      </div>
      <div className="text-center">
        <div className="text-3xl font-bold gold-gradient-text mb-2">
          {stats.totalViews.toLocaleString()}+
        </div>
        <div className="text-white/70 text-sm">Total Views</div>
      </div>
      <div className="text-center">
        <div className="text-3xl font-bold gold-gradient-text mb-2">
          {stats.userRating.toFixed(1)}★
        </div>
        <div className="text-white/70 text-sm">User Rating</div>
      </div>
    </div>
  )
} 