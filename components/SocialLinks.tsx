// components/SocialLinks.tsx
import { useState } from 'react'

interface SocialLink {
  platform: string
  url: string
}

interface SocialLinksProps {
  links: SocialLink[]
  onChange: (links: SocialLink[]) => void
}

const SOCIAL_PLATFORMS = [
  { key: 'facebook', name: 'Facebook', icon: '📘', placeholder: 'https://facebook.com/username' },
  {
    key: 'instagram',
    name: 'Instagram',
    icon: '📷',
    placeholder: 'https://instagram.com/username'
  },
  { key: 'twitter', name: 'Twitter/X', icon: '🐦', placeholder: 'https://twitter.com/username' },
  {
    key: 'linkedin',
    name: 'LinkedIn',
    icon: '💼',
    placeholder: 'https://linkedin.com/in/username'
  },
  { key: 'youtube', name: 'YouTube', icon: '📺', placeholder: 'https://youtube.com/@username' },
  { key: 'tiktok', name: 'TikTok', icon: '🎵', placeholder: 'https://tiktok.com/@username' },
  { key: 'github', name: 'GitHub', icon: '💻', placeholder: 'https://github.com/username' },
  { key: 'website', name: 'Website', icon: '🌐', placeholder: 'https://yourwebsite.com' },
  { key: 'email', name: 'Email', icon: '📧', placeholder: 'your.email@example.com' },
  { key: 'phone', name: 'Phone', icon: '📞', placeholder: '+84 123 456 789' },
  { key: 'whatsapp', name: 'WhatsApp', icon: '💬', placeholder: '+84 123 456 789' },
  { key: 'telegram', name: 'Telegram', icon: '📱', placeholder: '@username' },
  { key: 'discord', name: 'Discord', icon: '🎮', placeholder: 'username#1234' },
  {
    key: 'spotify',
    name: 'Spotify',
    icon: '🎵',
    placeholder: 'https://open.spotify.com/user/username'
  },
  { key: 'behance', name: 'Behance', icon: '🎨', placeholder: 'https://behance.net/username' },
  { key: 'dribbble', name: 'Dribbble', icon: '🏀', placeholder: 'https://dribbble.com/username' },
  {
    key: 'pinterest',
    name: 'Pinterest',
    icon: '📌',
    placeholder: 'https://pinterest.com/username'
  },
  { key: 'snapchat', name: 'Snapchat', icon: '👻', placeholder: 'username' },
  { key: 'twitch', name: 'Twitch', icon: '🎮', placeholder: 'https://twitch.tv/username' },
  { key: 'zalo', name: 'Zalo', icon: '💙', placeholder: 'https://zalo.me/username' },
  { key: 'messenger', name: 'Messenger', icon: '💬', placeholder: 'https://m.me/username' }
]

export default function SocialLinks({ links, onChange }: SocialLinksProps) {
  const [showAddForm, setShowAddForm] = useState(false)
  const [selectedPlatform, setSelectedPlatform] = useState('')
  const [newUrl, setNewUrl] = useState('')

  const addLink = () => {
    if (selectedPlatform && newUrl.trim()) {
      const platform = SOCIAL_PLATFORMS.find((p) => p.key === selectedPlatform)
      if (platform) {
        const newLink: SocialLink = {
          platform: platform.name,
          url: newUrl.trim()
        }
        onChange([...links, newLink])
        setSelectedPlatform('')
        setNewUrl('')
        setShowAddForm(false)
      }
    }
  }

  const removeLink = (index: number) => {
    const newLinks = links.filter((_, i) => i !== index)
    onChange(newLinks)
  }

  const getPlatformIcon = (platformName: string) => {
    const platform = SOCIAL_PLATFORMS.find((p) => p.name === platformName)
    return platform?.icon || '🔗'
  }

  return (
    <div className="space-y-4">
      <label className="block text-sm font-medium text-gray-200">
        Liên kết mạng xã hội (tùy chọn)
      </label>

      {/* Existing links */}
      {links.map((link, index) => (
        <div
          key={index}
          className="flex items-center space-x-3 p-3 bg-white/5 rounded-xl border border-white/10"
        >
          <span className="text-2xl">{getPlatformIcon(link.platform)}</span>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-white truncate">{link.platform}</p>
            <p className="text-xs text-gray-400 truncate">{link.url}</p>
          </div>
          <button
            onClick={() => removeLink(index)}
            className="text-red-400 hover:text-red-300 transition-colors"
          >
            🗑️
          </button>
        </div>
      ))}

      {/* Add new link form */}
      {showAddForm ? (
        <div className="p-4 bg-white/5 rounded-xl border border-white/10 space-y-3">
          <div className="grid grid-cols-2 gap-3">
            <select
              value={selectedPlatform}
              onChange={(e) => setSelectedPlatform(e.target.value)}
              className="px-3 py-2 bg-white/10 border border-white/20 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-yellow-400"
            >
              <option value="">Chọn nền tảng</option>
              {SOCIAL_PLATFORMS.map((platform) => (
                <option key={platform.key} value={platform.key}>
                  {platform.icon} {platform.name}
                </option>
              ))}
            </select>

            <input
              type="url"
              value={newUrl}
              onChange={(e) => setNewUrl(e.target.value)}
              placeholder="Nhập URL"
              className="px-3 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-yellow-400"
            />
          </div>

          <div className="flex space-x-2">
            <button
              onClick={addLink}
              disabled={!selectedPlatform || !newUrl.trim()}
              className="px-4 py-2 bg-gradient-to-r from-yellow-400 to-orange-500 text-gray-900 rounded-lg font-medium hover:from-yellow-500 hover:to-orange-600 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
            >
              Thêm
            </button>
            <button
              onClick={() => {
                setShowAddForm(false)
                setSelectedPlatform('')
                setNewUrl('')
              }}
              className="px-4 py-2 bg-gray-600 text-white rounded-lg font-medium hover:bg-gray-700 transition-colors"
            >
              Hủy
            </button>
          </div>
        </div>
      ) : (
        <button
          onClick={() => setShowAddForm(true)}
          className="w-full p-3 border-2 border-dashed border-white/20 rounded-xl text-white hover:border-yellow-400 hover:text-yellow-400 transition-all duration-200 flex items-center justify-center space-x-2"
        >
          <span>➕</span>
          <span>Thêm liên kết</span>
        </button>
      )}
    </div>
  )
}
