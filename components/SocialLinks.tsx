// components/SocialLinks.tsx
type Link = {
  platform: string;
  url: string;
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

export default function SocialLinks({ links }: { links: Link[] }) {
  if (!links || links.length === 0) {
    return (
      <div className="text-center py-8">
        <div className="text-4xl mb-3">🔗</div>
        <p className="text-gray-500 text-sm">Chưa có liên kết nào</p>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      {links.map((link, index) => (
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
      ))}
    </div>
  );
}
