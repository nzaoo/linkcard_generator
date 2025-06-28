import { useState } from "react";

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
  if (platformLower.includes('email') || platformLower.includes('mail')) return '✉️';
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
  
  return 'from-indigo-500 to-purple-600';
};

export default function CardPreview({ 
  name, 
  bio, 
  links = [], 
  avatar, 
  isPreview = false,
  className = ""
}: CardPreviewProps) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div 
      className={`bg-white/95 backdrop-blur-lg rounded-3xl p-8 shadow-2xl border border-white/30 transition-all duration-300 ${className}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{
        transform: isHovered ? 'scale(1.02)' : 'scale(1)',
        boxShadow: isHovered 
          ? '0 25px 50px -12px rgba(0, 0, 0, 0.25)' 
          : '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)'
      }}
    >
      <div className="text-center">
        {/* Avatar */}
        <div className="relative inline-block mb-6">
          <div className="w-32 h-32 rounded-full bg-gradient-to-r from-indigo-500 to-purple-600 flex items-center justify-center text-4xl font-bold text-white mx-auto shadow-lg">
            {avatar ? (
              <img
                src={avatar}
                alt={name}
                className="w-full h-full rounded-full object-cover"
              />
            ) : (
              getInitials(name)
            )}
          </div>
          {!isPreview && (
            <div className="absolute -bottom-2 -right-2 w-8 h-8 bg-green-500 rounded-full border-4 border-white animate-pulse"></div>
          )}
        </div>

        {/* Name */}
        <h2 className="text-3xl font-bold text-gray-800 mb-4">
          {name || "Tên của bạn"}
        </h2>

        {/* Bio */}
        <p className="text-gray-600 leading-relaxed mb-6 max-w-sm mx-auto">
          {bio || "Giới thiệu của bạn sẽ xuất hiện ở đây..."}
        </p>

        {/* Social Links */}
        <div className="space-y-3">
          {links && links.length > 0 ? (
            links.map((link, index) => (
              <a
                key={index}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className={`block w-full bg-gradient-to-r ${getPlatformColor(link.platform)} text-white p-4 rounded-xl text-center font-semibold hover:shadow-lg transform hover:scale-105 transition-all duration-200 animate-slide-in-up`}
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="flex items-center justify-center space-x-3">
                  <span className="text-xl">{getPlatformIcon(link.platform)}</span>
                  <span>{link.platform}</span>
                </div>
              </a>
            ))
          ) : (
            <div className="text-center py-6">
              <div className="text-4xl mb-3">🔗</div>
              <p className="text-gray-400 text-sm">
                {isPreview ? "Thêm liên kết để xem chúng ở đây" : "Chưa có liên kết nào"}
              </p>
            </div>
          )}
        </div>

        {/* Footer for shared cards */}
        {!isPreview && (
          <div className="text-center mt-6 pt-6 border-t border-gray-200">
            <p className="text-sm text-gray-500">
              Được tạo bởi <span className="font-semibold text-indigo-600">IntroCard</span>
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
