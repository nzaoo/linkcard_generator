import React from 'react'
import Image from 'next/image'
import { CardPreviewProps, SocialLink } from '@/types'
import { PLATFORM_ICONS, PLATFORM_COLORS } from '@/constants/platforms'

const getInitials = (fullName: string) => {
  return fullName
    .split(' ')
    .map(name => name.charAt(0))
    .join('')
    .toUpperCase()
    .slice(0, 2)
}

export default function CardPreviewNew({ 
  name, 
  bio, 
  links = [], 
  avatar, 
  isPreview = true, 
  className = '' 
}: CardPreviewProps) {
  const initials = getInitials(name)

  return (
    <div className={`glass-card rounded-3xl p-8 shadow-2xl relative overflow-hidden ${className}`}>
      {/* Background gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-400/20 to-purple-500/20 opacity-50"></div>
      
      {/* Content */}
      <div className="relative z-10">
        {/* Avatar Section */}
        <div className="text-center mb-6">
          <div className="relative inline-block">
            <div className="w-24 h-24 rounded-full bg-gradient-to-r from-blue-400 to-purple-500 p-1">
              <div className="absolute inset-1 rounded-full bg-gray-900 flex items-center justify-center">
                {avatar ? (
                  <Image
                    src={avatar}
                    alt={`${name}'s profile picture`}
                    width={96}
                    height={96}
                    className="w-full h-full rounded-full object-cover"
                    loading="lazy"
                    placeholder="blur"
                    blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAIAAoDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWGRkqGx0f/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAGhEAAgIDAAAAAAAAAAAAAAAAAAECEgMRkf/aAAwDAQACEQMRAD8AltJagyeH0AthI5xdrLcNM91BF5pX2HaH9bcfaSXWGaRmknyJckliyjqTzSlT54b6bk+h0R//2Q=="
                  />
                ) : (
                  <span className="text-2xl font-bold text-white">{initials}</span>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Name */}
        <h2 className="text-2xl font-bold text-center text-white mb-3">{name}</h2>
        
        {/* Bio */}
        {bio && (
          <p className="text-white/80 text-center mb-6 leading-relaxed">
            {bio}
          </p>
        )}

        {/* Social Links */}
        {links.length > 0 && (
          <div className="space-y-3">
            {links.map((link: SocialLink, index: number) => {
              const platform = link.platform.toLowerCase()
              const Icon = PLATFORM_ICONS[platform] || PLATFORM_ICONS.default
              const color = PLATFORM_COLORS[platform] || PLATFORM_COLORS.default
              
              return (
                <a
                  key={index}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`flex items-center justify-center p-3 rounded-xl text-white font-medium transition-all duration-200 transform hover:scale-105 hover:shadow-lg ${color}`}
                  aria-label={`Visit ${name}'s ${platform} profile`}
                >
                  <Icon className="w-5 h-5 mr-3" />
                  <span className="capitalize">{platform}</span>
                </a>
              )
            })}
          </div>
        )}

        {/* Preview indicator */}
        {isPreview && (
          <div className="absolute top-4 right-4">
            <span className="bg-blue-400 text-white px-2 py-1 rounded-full text-xs font-medium">
              Preview
            </span>
          </div>
        )}
      </div>
    </div>
  )
} 