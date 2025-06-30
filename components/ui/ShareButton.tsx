import React from 'react'

interface ShareButtonProps {
  url: string
  title: string
  description?: string
  platform?: 'facebook' | 'twitter' | 'linkedin' | 'whatsapp'
  className?: string
}

const getShareUrl = (platform: string, url: string, title: string, description?: string) => {
  switch (platform) {
    case 'facebook':
      return `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`
    case 'twitter':
      return `https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}&text=${encodeURIComponent(title)}`
    case 'linkedin':
      return `https://www.linkedin.com/shareArticle?mini=true&url=${encodeURIComponent(url)}&title=${encodeURIComponent(title)}&summary=${encodeURIComponent(description || '')}`
    case 'whatsapp':
      return `https://wa.me/?text=${encodeURIComponent(title + ' ' + url)}`
    default:
      return url
  }
}

export default function ShareButton({ url, title, description, platform, className }: ShareButtonProps) {
  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault()
    if (platform) {
      window.open(getShareUrl(platform, url, title, description), '_blank', 'noopener,noreferrer')
    } else if (navigator.share) {
      navigator.share({ title, text: description, url })
    } else {
      window.open(url, '_blank', 'noopener,noreferrer')
    }
  }

  return (
    <button type="button" className={className} onClick={handleClick}>
      {platform ? `Share on ${platform.charAt(0).toUpperCase() + platform.slice(1)}` : 'Share'}
    </button>
  )
} 