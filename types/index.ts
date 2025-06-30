// Common interfaces used throughout the application

export interface SocialLink {
  platform: string
  url: string
}

export interface CardData {
  name: string
  bio: string
  links: SocialLink[]
  slug: string
  avatar?: string
  createdAt: Date
}

export interface User {
  name: string
  bio: string
  links: SocialLink[]
  slug: string
  avatar?: string
  createdAt: Date
}

export interface ShareButtonProps {
  url: string
  title?: string
  description?: string
  className?: string
  platform?: 'facebook' | 'twitter' | 'linkedin' | 'whatsapp' | 'telegram' | 'email' | 'copy'
}

export interface CardPreviewProps {
  name: string
  bio: string
  links?: SocialLink[]
  avatar?: string
  isPreview?: boolean
  className?: string
}

export interface FormInputProps {
  label: string
  value: string
  onChange: (value: string) => void
  error?: string
  onErrorClear: () => void
  placeholder?: string
  type?: 'text' | 'textarea'
  required?: boolean
}

export interface SocialLinksProps {
  links: SocialLink[]
  onChange: (links: SocialLink[]) => void
}

export interface StatsProps {
  className?: string
}

export interface SuccessNotificationProps {
  message: string
  onClose?: () => void
  duration?: number
}

export interface ToastProps {
  onClose: () => void;
  id: string;
  message: string;
  type: 'success' | 'error' | 'info' | 'warning';
  duration?: number;
}

export interface LoadingSpinnerProps {
  text?: string
  size?: 'small' | 'medium' | 'large'
}

// Analytics types
declare global {
  interface Window {
    dataLayer?: any[]
    gtag?: (...args: any[]) => void
  }
} 