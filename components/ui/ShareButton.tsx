import React, { useState } from 'react';
import { ShareButtonProps } from '@/types'

export default function ShareButton({
  url,
  title = 'Check out my card!',
  description = 'I created this beautiful personal card with NZaoCard',
  className = '',
  platform
}: ShareButtonProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [copied, setCopied] = useState(false);

  const shareOptions = [
    {
      name: 'Copy Link',
      icon: '🔗',
      action: () => copyToClipboard(url),
      color: 'bg-blue-500 hover:bg-blue-600',
      platform: 'copy'
    },
    {
      name: 'WhatsApp',
      icon: '💬',
      action: () => shareToWhatsApp(url, title),
      color: 'bg-green-500 hover:bg-green-600',
      platform: 'whatsapp'
    },
    {
      name: 'Telegram',
      icon: '📱',
      action: () => shareToTelegram(url, title),
      color: 'bg-blue-400 hover:bg-blue-500',
      platform: 'telegram'
    },
    {
      name: 'Twitter',
      icon: '🐦',
      action: () => shareToTwitter(url, title),
      color: 'bg-sky-500 hover:bg-sky-600',
      platform: 'twitter'
    },
    {
      name: 'Facebook',
      icon: '📘',
      action: () => shareToFacebook(url, title),
      color: 'bg-blue-600 hover:bg-blue-700',
      platform: 'facebook'
    },
    {
      name: 'LinkedIn',
      icon: '💼',
      action: () => shareToLinkedIn(url, title),
      color: 'bg-blue-700 hover:bg-blue-800',
      platform: 'linkedin'
    },
    {
      name: 'Email',
      icon: '📧',
      action: () => shareToEmail(url, title, description),
      color: 'bg-gray-500 hover:bg-gray-600',
      platform: 'email'
    }
  ];

  const copyToClipboard = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy: ', err);
    }
  };

  const shareToWhatsApp = (url: string, title: string) => {
    const text = `${title}\n\n${url}`;
    window.open(`https://wa.me/?text=${encodeURIComponent(text)}`, '_blank');
  };

  const shareToTelegram = (url: string, title: string) => {
    const text = `${title}\n\n${url}`;
    window.open(`https://t.me/share/url?url=${encodeURIComponent(url)}&text=${encodeURIComponent(title)}`, '_blank');
  };

  const shareToTwitter = (url: string, title: string) => {
    const text = `${title}\n\n${url}`;
    window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}`, '_blank');
  };

  const shareToFacebook = (url: string, title: string) => {
    window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`, '_blank');
  };

  const shareToLinkedIn = (url: string, title: string) => {
    window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`, '_blank');
  };

  const shareToEmail = (url: string, title: string, description: string) => {
    const subject = encodeURIComponent(title);
    const body = encodeURIComponent(`${description}\n\n${url}`);
    window.open(`mailto:?subject=${subject}&body=${body}`, '_blank');
  };

  // Handle specific platform sharing
  const handleSpecificPlatform = () => {
    if (platform) {
      const option = shareOptions.find(opt => opt.platform === platform);
      if (option) {
        option.action();
        return;
      }
    }
    // If no specific platform or platform not found, use native share
    shareNative();
  };

  // Native Web Share API (if available)
  const shareNative = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title,
          text: description,
          url
        });
      } catch (err) {
        console.error('Error sharing:', err);
        setIsOpen(true); // Fallback to custom share menu
      }
    } else {
      setIsOpen(true);
    }
  };

  // If specific platform is requested, render single button
  if (platform) {
    const option = shareOptions.find(opt => opt.platform === platform);
    if (option) {
      return (
        <button
          onClick={option.action}
          className={`${option.color} text-white px-4 py-3 rounded-xl font-semibold transition-all duration-200 transform hover:scale-105 shadow-lg flex items-center space-x-2 ${className}`}
        >
          <span className="text-lg">{option.icon}</span>
          <span>{option.name}</span>
        </button>
      );
    }
  }

  return (
    <div className={`relative ${className}`}>
      {/* Main Share Button */}
      <button
        onClick={handleSpecificPlatform}
        className="bg-gradient-to-r from-yellow-400 to-orange-500 text-gray-900 px-6 py-3 rounded-full font-semibold hover:from-yellow-500 hover:to-orange-600 transition-all duration-200 transform hover:scale-105 shadow-lg flex items-center space-x-2"
      >
        <span>📤</span>
        <span>Share</span>
      </button>

      {/* Custom Share Menu */}
      {isOpen && (
        <>
          {/* Backdrop */}
          <div
            className="fixed inset-0 z-40"
            onClick={() => setIsOpen(false)}
          />

          {/* Share Menu */}
          <div className="absolute top-full mt-2 right-0 z-50 bg-white/10 backdrop-blur-lg rounded-2xl p-4 border border-white/20 shadow-2xl min-w-64">
            <div className="text-center mb-4">
              <h3 className="text-white font-semibold">Share this card</h3>
            </div>

            <div className="grid grid-cols-2 gap-2">
              {shareOptions.map((option, index) => (
                <button
                  key={index}
                  onClick={() => {
                    option.action();
                    setIsOpen(false);
                  }}
                  className={`${option.color} text-white p-3 rounded-xl font-medium transition-all duration-200 transform hover:scale-105 flex flex-col items-center space-y-1`}
                >
                  <span className="text-xl">{option.icon}</span>
                  <span className="text-xs">{option.name}</span>
                </button>
              ))}
            </div>

            {/* Copy Link with Feedback */}
            {copied && (
              <div className="mt-3 p-2 bg-green-500/20 border border-green-400/30 rounded-lg text-center">
                <span className="text-green-400 text-sm">✅ Link copied to clipboard!</span>
              </div>
            )}
          </div>
        </>
      )}
    </div>
  );
}

// Floating Share Button for Card Pages
export function FloatingShareButton({ url, title, description }: ShareButtonProps) {
  return (
    <div className="fixed bottom-6 right-6 z-50">
      <ShareButton
        url={url}
        title={title}
        description={description}
        className="animate-bounce"
      />
    </div>
  );
}
