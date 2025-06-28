import { useState, useEffect } from "react";

interface Link {
  platform: string;
  url: string;
}

interface CardPreviewProps {
  name: string;
  bio: string;
  links?: Link[];
  avatar?: string;
  isPreview?: boolean;
  className?: string;
}

const getInitials = (fullName: string) => {
  return fullName
    .split(" ")
    .map((word) => word.charAt(0))
    .join("")
    .toUpperCase()
    .slice(0, 2);
};

const getPlatformIcon = (platform: string) => {
  const platformLower = platform.toLowerCase();
  
  if (platformLower.includes('facebook')) return '📘';
  if (platformLower.includes('instagram')) return '📷';
  if (platformLower.includes('twitter') || platformLower.includes('x')) return '🐦';
  if (platformLower.includes('linkedin')) return '💼';
  if (platformLower.includes('youtube')) return '📺';
  if (platformLower.includes('tiktok')) return '🎵';
  if (platformLower.includes('github')) return '💻';
  if (platformLower.includes('website') || platformLower.includes('portfolio')) return '🌐';
  if (platformLower.includes('email') || platformLower.includes('mail')) return '📧';
  if (platformLower.includes('phone') || platformLower.includes('call')) return '📞';
  if (platformLower.includes('whatsapp')) return '💬';
  if (platformLower.includes('telegram')) return '📱';
  if (platformLower.includes('discord')) return '🎮';
  if (platformLower.includes('spotify')) return '🎵';
  if (platformLower.includes('behance')) return '🎨';
  if (platformLower.includes('dribbble')) return '🏀';
  if (platformLower.includes('pinterest')) return '📌';
  if (platformLower.includes('snapchat')) return '👻';
  if (platformLower.includes('twitch')) return '🎮';
  if (platformLower.includes('zalo')) return '💙';
  if (platformLower.includes('messenger')) return '💬';
  
  return '🔗';
};

const getPlatformColor = (platform: string) => {
  const platformLower = platform.toLowerCase();
  
  if (platformLower.includes('facebook')) return 'from-blue-600 to-blue-700';
  if (platformLower.includes('instagram')) return 'from-pink-500 to-purple-600';
  if (platformLower.includes('twitter') || platformLower.includes('x')) return 'from-blue-400 to-blue-500';
  if (platformLower.includes('linkedin')) return 'from-blue-700 to-blue-800';
  if (platformLower.includes('youtube')) return 'from-red-500 to-red-600';
  if (platformLower.includes('tiktok')) return 'from-pink-500 to-purple-500';
  if (platformLower.includes('github')) return 'from-gray-700 to-gray-800';
  if (platformLower.includes('website') || platformLower.includes('portfolio')) return 'from-indigo-500 to-purple-600';
  if (platformLower.includes('email') || platformLower.includes('mail')) return 'from-green-500 to-green-600';
  if (platformLower.includes('phone') || platformLower.includes('call')) return 'from-green-600 to-green-700';
  if (platformLower.includes('whatsapp')) return 'from-green-500 to-green-600';
  if (platformLower.includes('telegram')) return 'from-blue-500 to-blue-600';
  if (platformLower.includes('discord')) return 'from-indigo-500 to-purple-600';
  if (platformLower.includes('spotify')) return 'from-green-500 to-green-600';
  if (platformLower.includes('behance')) return 'from-blue-600 to-blue-700';
  if (platformLower.includes('dribbble')) return 'from-pink-500 to-red-500';
  if (platformLower.includes('pinterest')) return 'from-red-500 to-red-600';
  if (platformLower.includes('snapchat')) return 'from-yellow-400 to-yellow-500';
  if (platformLower.includes('twitch')) return 'from-purple-500 to-purple-600';
  if (platformLower.includes('zalo')) return 'from-blue-500 to-blue-600';
  if (platformLower.includes('messenger')) return 'from-blue-500 to-blue-600';
  
  return 'from-indigo-500 to-purple-600';
};

const getGreeting = () => {
  const hour = new Date().getHours();
  if (hour >= 5 && hour < 12) return 'Good morning ☀️';
  if (hour < 18) return 'Good afternoon 🌤️';
  return 'Good night 🌙';
};

export default function CardPreviewNew({ 
  name, 
  bio, 
  links = [], 
  avatar, 
  isPreview = false,
  className = ""
}: CardPreviewProps) {
  const [isHovered, setIsHovered] = useState(false);
  const [typedBio, setTypedBio] = useState("");

  // Typing effect for bio
  useEffect(() => {
    if (!bio || isPreview) {
      setTypedBio(bio);
      return;
    }

    setTypedBio("");
    let i = 0;
    const typeInterval = setInterval(() => {
      if (i < bio.length) {
        setTypedBio(prev => prev + bio.charAt(i));
        i++;
      } else {
        clearInterval(typeInterval);
      }
    }, 30);

    return () => clearInterval(typeInterval);
  }, [bio, isPreview]);

  return (
    <div className="relative">
      {/* Wind particles effect */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {[...Array(20)].map((_, i) => (
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

      <div 
        className={`bg-gray-900/85 backdrop-blur-xl rounded-3xl p-8 shadow-2xl border border-white/10 transition-all duration-300 ${className}`}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        style={{
          transform: isHovered ? 'translateY(-8px) rotateX(2deg) rotateY(-2deg)' : 'translateY(0)',
          boxShadow: isHovered 
            ? '0 20px 60px rgba(0, 0, 0, 0.4), 0 0 30px rgba(255, 215, 0, 0.3), 0 0 0 1px rgba(255, 215, 0, 0.2)' 
            : '0 8px 32px rgba(0, 0, 0, 0.3), 0 0 0 1px rgba(255, 255, 255, 0.05)'
        }}
      >
        <div className="text-center">
          {/* Avatar with animated border */}
          <div className="relative inline-block mb-6">
            <div className="relative w-32 h-32 mx-auto">
              {/* Animated border */}
              <div className="absolute inset-0 rounded-full bg-gradient-to-r from-yellow-400 via-orange-500 to-pink-500 animate-spin" style={{ animationDuration: '3s' }}></div>
              <div className="absolute inset-1 rounded-full bg-gray-900 flex items-center justify-center">
                {avatar ? (
                  <img
                    src={avatar}
                    alt={name}
                    className="w-full h-full rounded-full object-cover"
                  />
                ) : (
                  <span className="text-4xl font-bold text-white">
                    {getInitials(name)}
                  </span>
                )}
              </div>
            </div>
            {!isPreview && (
              <div className="absolute -bottom-2 -right-2 w-8 h-8 bg-green-500 rounded-full border-4 border-gray-900 animate-pulse"></div>
            )}
          </div>

          {/* Name with gradient text */}
          <h2 className="text-3xl font-bold mb-2 bg-gradient-to-r from-yellow-400 via-orange-500 to-pink-500 bg-clip-text text-transparent">
            {name || "Your Name"}
          </h2>

          {/* Time-based greeting */}
          <p className="text-yellow-400 text-lg mb-4 font-medium">
            {getGreeting()}
          </p>

          {/* Bio with typing effect */}
          <p className="text-gray-300 leading-relaxed mb-6 max-w-sm mx-auto min-h-[4rem]">
            {typedBio || "Your bio will appear here..."}
          </p>

          {/* Social Links */}
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
                    className={`block w-full bg-gradient-to-r ${getPlatformColor(link.platform)} text-white p-4 rounded-xl text-center font-semibold hover:shadow-lg transform hover:scale-105 transition-all duration-200 relative overflow-hidden`}
                  >
                    {/* Hover effect overlay */}
                    <div className="absolute inset-0 bg-white/20 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></div>
                    
                    <div className="flex items-center justify-center space-x-3 relative z-10">
                      <span className="text-xl">{getPlatformIcon(link.platform)}</span>
                      <span>{link.platform}</span>
                    </div>
                  </a>
                </div>
              ))
            ) : (
              <div className="text-center py-8">
                <div className="text-4xl mb-3">🔗</div>
                <p className="text-gray-500 text-sm">
                  {isPreview ? "Add links to see them here" : "No links yet"}
                </p>
              </div>
            )}
          </div>

          {/* Footer for shared cards */}
          {!isPreview && (
            <div className="text-center mt-6 pt-6 border-t border-gray-700">
              <p className="text-sm text-gray-500">
                Created with <span className="text-yellow-400">❤️</span> by <span className="font-semibold text-yellow-400">NZaoCard</span>
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
} 