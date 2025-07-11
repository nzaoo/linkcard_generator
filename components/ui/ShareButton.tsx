import React, { useRef } from 'react'

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
  const btnRef = useRef<HTMLButtonElement>(null);

  const handleClick = (e: React.MouseEvent) => {
    // Hiệu ứng ripple
    const button = btnRef.current;
    if (button) {
      const circle = document.createElement('span');
      circle.className = 'ripple';
      const rect = button.getBoundingClientRect();
      circle.style.left = `${e.clientX - rect.left}px`;
      circle.style.top = `${e.clientY - rect.top}px`;
      button.appendChild(circle);
      setTimeout(() => circle.remove(), 600);
    }

    // Chia sẻ như cũ
    setTimeout(() => {
      if (platform) {
        window.open(getShareUrl(platform, url, title, description), '_blank', 'noopener,noreferrer')
      } else if (navigator.share) {
        navigator.share({ title, text: description, url })
      } else {
        window.open(url, '_blank', 'noopener,noreferrer')
      }
    }, 200); // delay nhỏ để thấy hiệu ứng
  }

  return (
    <button
      ref={btnRef}
      type="button"
      className={`relative overflow-hidden ${className || ''}`}
      onClick={handleClick}
    >
      {platform ? `Share on ${platform.charAt(0).toUpperCase() + platform.slice(1)}` : 'Share'}
    </button>
  )
} 