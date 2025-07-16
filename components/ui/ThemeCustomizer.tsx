import React, { useState } from 'react'
import { useAnimations } from '@/hooks/useAnimations'

interface Theme {
  id: string
  name: string
  primaryColor: string
  secondaryColor: string
  backgroundColor: string
  textColor: string
  gradient: string
  preview: string
}

interface ThemeCustomizerProps {
  onThemeChange: (theme: Theme) => void
  currentTheme: Theme
  className?: string
}

const defaultThemes: Theme[] = [
  {
    id: 'sunset',
    name: 'Sunset',
    primaryColor: '#fbbf24',
    secondaryColor: '#f59e0b',
    backgroundColor: '#1f2937',
    textColor: '#ffffff',
    gradient: 'from-yellow-400 to-orange-500',
    preview: '🌅'
  },
  {
    id: 'ocean',
    name: 'Ocean',
    primaryColor: '#3b82f6',
    secondaryColor: '#1d4ed8',
    backgroundColor: '#0f172a',
    textColor: '#ffffff',
    gradient: 'from-blue-400 to-blue-600',
    preview: '🌊'
  },
  {
    id: 'forest',
    name: 'Forest',
    primaryColor: '#10b981',
    secondaryColor: '#059669',
    backgroundColor: '#064e3b',
    textColor: '#ffffff',
    gradient: 'from-green-400 to-green-600',
    preview: '🌲'
  },
  {
    id: 'rose',
    name: 'Rose',
    primaryColor: '#ec4899',
    secondaryColor: '#be185d',
    backgroundColor: '#4c0519',
    textColor: '#ffffff',
    gradient: 'from-pink-400 to-rose-500',
    preview: '🌹'
  },
  {
    id: 'purple',
    name: 'Purple',
    primaryColor: '#8b5cf6',
    secondaryColor: '#7c3aed',
    backgroundColor: '#2e1065',
    textColor: '#ffffff',
    gradient: 'from-purple-400 to-purple-600',
    preview: '💜'
  },
  {
    id: 'minimal',
    name: 'Minimal',
    primaryColor: '#6b7280',
    secondaryColor: '#374151',
    backgroundColor: '#111827',
    textColor: '#ffffff',
    gradient: 'from-gray-400 to-gray-600',
    preview: '⚪'
  }
]

export default function ThemeCustomizer({ 
  onThemeChange, 
  currentTheme, 
  className = '' 
}: ThemeCustomizerProps) {
  const [selectedTheme, setSelectedTheme] = useState(currentTheme)
  const [isOpen, setIsOpen] = useState(false)
  const { useHoverAnimation } = useAnimations()
  const { isHovered, handlers } = useHoverAnimation()

  const handleThemeSelect = (theme: Theme) => {
    setSelectedTheme(theme)
    onThemeChange(theme)
  }

  return (
    <div className={`relative ${className}`}>
      {/* Theme Selector Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center space-x-2 bg-white/10 backdrop-blur-lg text-white px-4 py-2 rounded-xl hover:bg-white/20 transition-all duration-200 border border-white/20"
        {...handlers}
      >
        <span className="text-lg">{selectedTheme.preview}</span>
        <span className="font-medium">{selectedTheme.name}</span>
        <svg 
          className={`w-4 h-4 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}
          fill="none" 
          stroke="currentColor" 
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {/* Theme Dropdown */}
      {isOpen && (
        <div className="absolute top-full mt-2 left-0 bg-gray-900/95 backdrop-blur-xl rounded-xl border border-white/20 shadow-2xl z-50 animate-fade-in min-w-[220px] max-w-[320px] w-max overflow-x-auto">
          <div className="p-4">
            <h3 className="text-white font-semibold mb-3">Choose Theme</h3>
            <div className="grid grid-cols-2 gap-3">
              {defaultThemes.map((theme) => (
                <button
                  key={theme.id}
                  onClick={() => {
                    handleThemeSelect(theme)
                    setIsOpen(false)
                  }}
                  className={`p-3 rounded-lg border-2 transition-all duration-200 hover:scale-105 ${
                    selectedTheme.id === theme.id
                      ? 'border-yellow-400 bg-yellow-400/10'
                      : 'border-white/20 hover:border-white/40'
                  }`}
                >
                  <div className="flex items-center space-x-2 whitespace-nowrap overflow-x-auto">
                    <span className="text-2xl">{theme.preview}</span>
                    <div className="text-left">
                      <div className="text-white font-medium text-sm whitespace-nowrap overflow-x-auto">{theme.name}</div>
                      <div className="flex space-x-1 mt-1">
                        <div 
                          className="w-3 h-3 rounded-full" 
                          style={{ backgroundColor: theme.primaryColor }}
                        />
                        <div 
                          className="w-3 h-3 rounded-full" 
                          style={{ backgroundColor: theme.secondaryColor }}
                        />
                      </div>
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Click outside to close */}
      {isOpen && (
        <div 
          className="fixed inset-0 z-40" 
          onClick={() => setIsOpen(false)}
        />
      )}
    </div>
  )
}

// Custom color picker component
export const ColorPicker = ({ 
  color, 
  onChange, 
  label 
}: { 
  color: string
  onChange: (color: string) => void
  label: string 
}) => {
  return (
    <div className="flex items-center space-x-3">
      <label className="text-white text-sm font-medium">{label}</label>
      <input
        type="color"
        value={color}
        onChange={(e) => onChange(e.target.value)}
        className="w-10 h-10 rounded-lg border-2 border-white/20 cursor-pointer"
      />
    </div>
  )
} 