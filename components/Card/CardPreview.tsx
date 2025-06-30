import { useState, useEffect } from 'react'
import { CardPreviewProps, SocialLink } from '@/types'
import { PLATFORM_ICONS, PLATFORM_COLORS } from '@/constants/platforms'
import React from 'react'
import Image from 'next/image'

const getInitials = (fullName: string) => {
  return fullName
    .split(' ')
    .map((word) => word.charAt(0))
    .join('')
    .toUpperCase()
    .slice(0, 2)
}

const getPlatformIcon = (platform: string) => {
  const platformLower = platform.toLowerCase()
  
  // Check if platform exists in our constants
  for (const [key, value] of Object.entries(PLATFORM_ICONS)) {
    if (platformLower.includes(key.toLowerCase())) {
      return value
    }
  }
  
  return '🔗'
}

const getPlatformColor = (platform: string) => {
  const platformLower = platform.toLowerCase()
  
  // Check if platform exists in our constants
  for (const [key, value] of Object.entries(PLATFORM_COLORS)) {
    if (platformLower.includes(key.toLowerCase())) {
      return value
    }
  }
  
  return 'from-indigo-500 to-purple-600'
}

const getGreeting = () => {
  const hour = new Date().getHours()
  if (hour >= 5 && hour < 12) return 'Good morning ☀️'
  if (hour < 18) return 'Good afternoon 🌤️'
  return 'Good night 🌙'
}

export default function CardPreview({
  name,
  bio,
  links = [],
  avatar,
  isPreview = false,
  className = ''
}: CardPreviewProps) {
  const [isHovered, setIsHovered] = useState(false)
  const [typedBio, setTypedBio] = useState('')
  const [showParticles, setShowParticles] = useState(false)
  const [isClient, setIsClient] = useState(false)

  useEffect(() => {
    setIsClient(true)
  }, [])

  // Typing effect for bio
  useEffect(() => {
    if (!bio || isPreview) {
      setTypedBio(bio)
      return
    }

    setTypedBio('')
    let i = 0
    const typeInterval = setInterval(() => {
      if (i < bio.length) {
        setTypedBio((prev) => prev + bio.charAt(i))
        i++
      } else {
        clearInterval(typeInterval)
      }
    }, 30)

    return () => clearInterval(typeInterval)
  }, [bio, isPreview])

  // Particle effect on hover
  useEffect(() => {
    if (isHovered) {
      setShowParticles(true)
      const timer = setTimeout(() => setShowParticles(false), 1000)
      return () => clearTimeout(timer)
    }
  }, [isHovered])

  return (
    <div className="relative">
      {/* Enhanced wind particles effect */}
      {isClient && (
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          {[...Array(30)].map((_, i) => (
            <div
              key={i}
              className="absolute w-1 h-1 bg-white/10 rounded-full animate-float"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 5}s`,
                animationDuration: `${5 + Math.random() * 10}s`
              }}
            />
          ))}
        </div>
      )}

      {/* Hover particles effect */}
      {showParticles && (
        <div className="absolute inset-0 pointer-events-none">
          {[...Array(15)].map((_, i) => (
            <div
              key={i}
              className="absolute w-2 h-2 bg-yellow-400/60 rounded-full animate-bubble"
              style={{
                left: `${50 + (Math.random() - 0.5) * 20}%`,
                top: `${50 + (Math.random() - 0.5) * 20}%`,
                animationDelay: `${Math.random() * 0.5}s`,
                animationDuration: `${1 + Math.random() * 2}s`
              }}
            />
          ))}
        </div>
      )}

      <div
        className={`dark-card rounded-3xl p-8 transition-all duration-500 ${className}`}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <div className="text-center">
          {/* Enhanced Avatar with animated border */}
          <div className="relative inline-block mb-6">
            <div className="relative w-32 h-32 mx-auto">
              {/* Animated border with multiple layers */}
              <div
                className="absolute inset-0 rounded-full bg-gradient-to-r from-yellow-400 via-orange-500 to-pink-500 animate-spin"
                style={{ animationDuration: '3s' }}
              ></div>
              <div
                className="absolute inset-1 rounded-full bg-gradient-to-r from-purple-500 to-blue-500 animate-spin"
                style={{ animationDuration: '4s', animationDirection: 'reverse' }}
              ></div>
              <div className="absolute inset-2 rounded-full bg-gray-900 flex items-center justify-center">
                {avatar ? (
                  <Image
                    src={avatar}
                    alt={name}
                    width={96}
                    height={96}
                    className="w-24 h-24 rounded-full object-cover border-4 border-yellow-400 shadow-lg mb-4"
                  />
                ) : (
                  <span className="text-4xl font-bold gold-gradient-text">{getInitials(name)}</span>
                )}
              </div>
            </div>
            {!isPreview && (
              <div className="absolute -bottom-2 -right-2 w-8 h-8 bg-green-500 rounded-full border-4 border-gray-900 animate-pulse"></div>
            )}
          </div>

          {/* Name with enhanced gradient text */}
          <h2 className="text-3xl font-bold mb-2 gold-gradient-text drop-shadow-lg">
            {name || 'Your Name'}
          </h2>

          {/* Time-based greeting with animation */}
          <p className="text-yellow-400 text-lg mb-4 font-medium animate-fade-in">
            {getGreeting()}
          </p>

          {/* Bio with enhanced typing effect */}
          <p className="text-gray-300 leading-relaxed mb-6 max-w-sm mx-auto min-h-[4rem] relative">
            {typedBio || 'Your bio will appear here...'}
            {!isPreview && bio && (
              <span className="inline-block w-1 h-6 bg-yellow-400 ml-1 animate-pulse"></span>
            )}
          </p>

          {/* Enhanced Social Links */}
          <div className="space-y-3">
            {links && links.length > 0 ? (
              links.map((link, index) => (
                <div
                  key={index}
                  className="group relative"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <a
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`block w-full bg-gradient-to-r ${getPlatformColor(
                      link.platform
                    )} text-white p-4 rounded-xl text-center font-semibold hover:shadow-lg transform hover:scale-105 transition-all duration-300 relative overflow-hidden`}
                  >
                    {/* Enhanced hover effect overlay */}
                    <div className="absolute inset-0 bg-white/20 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left"></div>

                    {/* Platform icon and text */}
                    <div className="relative z-10 flex items-center justify-center space-x-3">
                      <span className="text-2xl">{getPlatformIcon(link.platform)}</span>
                      <span>{link.platform}</span>
                    </div>
                  </a>
                </div>
              ))
            ) : (
              <div className="text-gray-500 text-center py-8">
                <div className="text-4xl mb-2">🔗</div>
                <p>Thêm liên kết để kết nối</p>
              </div>
            )}
          </div>

          {/* Footer with creation info */}
          {!isPreview && (
            <div className="mt-6 pt-4 border-t border-white/10">
              <p className="text-xs text-gray-500">
                Tạo bởi <span className="text-yellow-400">NZaoCard</span>
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
