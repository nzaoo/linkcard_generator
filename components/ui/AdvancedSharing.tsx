import React, { useState } from 'react'
import { trackShare } from '@/lib/analytics'

interface AdvancedSharingProps {
  url: string
  title: string
  description: string
  slug: string
  className?: string
}

interface EmailTemplate {
  id: string
  name: string
  subject: string
  body: string
}

const emailTemplates: EmailTemplate[] = [
  {
    id: 'professional',
    name: 'Professional',
    subject: 'Check out my professional card',
    body: `Hi there,

I wanted to share my professional card with you. You can find all my contact information and social links here:

{url}

Best regards,
{name}`
  },
  {
    id: 'casual',
    name: 'Casual',
    subject: 'Hey! Here\'s my card',
    body: `Hey!

Just wanted to share my card with you. You can find all my links and info here:

{url}

Cheers!`
  },
  {
    id: 'networking',
    name: 'Networking',
    subject: 'Let\'s connect - My digital card',
    body: `Hello,

I'd love to connect with you! Here's my digital card with all my professional information:

{url}

Looking forward to connecting!

Best regards,
{name}`
  }
]

export default function AdvancedSharing({ 
  url, 
  title, 
  description, 
  slug,
  className = '' 
}: AdvancedSharingProps) {
  const [activeTab, setActiveTab] = useState<'quick' | 'email' | 'sms' | 'bulk'>('quick')
  const [selectedTemplate, setSelectedTemplate] = useState<EmailTemplate>(emailTemplates[0])
  const [emailAddresses, setEmailAddresses] = useState<string>('')
  const [phoneNumbers, setPhoneNumbers] = useState<string>('')
  const [customMessage, setCustomMessage] = useState<string>('')
  const [isSharing, setIsSharing] = useState(false)

  // Quick share platforms
  const quickSharePlatforms = [
    { name: 'Facebook', icon: '📘', url: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}` },
    { name: 'Twitter', icon: '🐦', url: `https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}&text=${encodeURIComponent(title)}` },
    { name: 'LinkedIn', icon: '💼', url: `https://www.linkedin.com/shareArticle?mini=true&url=${encodeURIComponent(url)}&title=${encodeURIComponent(title)}&summary=${encodeURIComponent(description)}` },
    { name: 'WhatsApp', icon: '💬', url: `https://wa.me/?text=${encodeURIComponent(title + ' ' + url)}` },
    { name: 'Telegram', icon: '📱', url: `https://t.me/share/url?url=${encodeURIComponent(url)}&text=${encodeURIComponent(title)}` },
    { name: 'Email', icon: '📧', action: 'email' }
  ]

  const handleQuickShare = async (platform: any) => {
    if (platform.action === 'email') {
      setActiveTab('email')
      return
    }

    try {
      setIsSharing(true)
      window.open(platform.url, '_blank', 'noopener,noreferrer')
      await trackShare(slug, platform.name.toLowerCase())
    } catch (error) {
      console.error('Error sharing:', error)
    } finally {
      setIsSharing(false)
    }
  }

  const handleEmailShare = async () => {
    if (!emailAddresses.trim()) return

    const emails = emailAddresses.split(',').map(email => email.trim()).filter(Boolean)
    const processedBody = selectedTemplate.body
      .replace('{url}', url)
      .replace('{name}', title.split(' ')[0] || 'User')

    const subject = encodeURIComponent(selectedTemplate.subject)
    const body = encodeURIComponent(processedBody)

    try {
      setIsSharing(true)
      
      // Open email client for each email
      emails.forEach(email => {
        const mailtoUrl = `mailto:${email}?subject=${subject}&body=${body}`
        window.open(mailtoUrl, '_blank')
      })

      await trackShare(slug, 'email')
    } catch (error) {
      console.error('Error sharing via email:', error)
    } finally {
      setIsSharing(false)
    }
  }

  const handleSMSShare = async () => {
    if (!phoneNumbers.trim()) return

    const phones = phoneNumbers.split(',').map(phone => phone.trim()).filter(Boolean)
    const message = customMessage || `Check out my card: ${url}`

    try {
      setIsSharing(true)
      
      // Open SMS for each phone number
      phones.forEach(phone => {
        const smsUrl = `sms:${phone}?body=${encodeURIComponent(message)}`
        window.open(smsUrl, '_blank')
      })

      await trackShare(slug, 'sms')
    } catch (error) {
      console.error('Error sharing via SMS:', error)
    } finally {
      setIsSharing(false)
    }
  }

  const handleBulkShare = async () => {
    const platforms = ['facebook', 'twitter', 'linkedin', 'whatsapp']
    
    try {
      setIsSharing(true)
      
      // Open all platforms in sequence
      for (const platform of platforms) {
        const platformData = quickSharePlatforms.find(p => p.name.toLowerCase() === platform)
        if (platformData && platformData.url) {
          window.open(platformData.url, '_blank', 'noopener,noreferrer')
          await new Promise(resolve => setTimeout(resolve, 500)) // Delay between opens
        }
      }

      await trackShare(slug, 'bulk')
    } catch (error) {
      console.error('Error bulk sharing:', error)
    } finally {
      setIsSharing(false)
    }
  }

  const copyToClipboard = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text)
      // You could show a toast notification here
    } catch (error) {
      console.error('Error copying to clipboard:', error)
    }
  }

  return (
    <div className={`bg-white rounded-2xl p-6 shadow-xl ${className}`}>
      <h3 className="text-xl font-bold text-gray-900 mb-6 text-center">
        Share Your Card
      </h3>

      {/* Tab Navigation */}
      <div className="flex space-x-1 mb-6 bg-gray-100 rounded-lg p-1">
        {[
          { id: 'quick', label: 'Quick', icon: '⚡' },
          { id: 'email', label: 'Email', icon: '📧' },
          { id: 'sms', label: 'SMS', icon: '💬' },
          { id: 'bulk', label: 'Bulk', icon: '📤' }
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id as any)}
            className={`flex-1 flex items-center justify-center space-x-2 py-2 px-3 rounded-md text-sm font-medium transition-colors ${
              activeTab === tab.id
                ? 'bg-white text-blue-600 shadow-sm'
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            <span>{tab.icon}</span>
            <span>{tab.label}</span>
          </button>
        ))}
      </div>

      {/* Quick Share */}
      {activeTab === 'quick' && (
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-3">
            {quickSharePlatforms.map((platform) => (
              <button
                key={platform.name}
                onClick={() => handleQuickShare(platform)}
                disabled={isSharing}
                className="flex items-center justify-center space-x-2 p-3 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors disabled:opacity-50"
              >
                <span className="text-xl">{platform.icon}</span>
                <span className="font-medium">{platform.name}</span>
              </button>
            ))}
          </div>
          
          <div className="pt-4 border-t border-gray-200">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Direct Link
            </label>
            <div className="flex">
              <input
                type="text"
                value={url}
                readOnly
                className="flex-1 px-3 py-2 border border-gray-300 rounded-l-lg bg-gray-50 text-gray-600"
              />
              <button
                onClick={() => copyToClipboard(url)}
                className="px-4 py-2 bg-blue-600 text-white rounded-r-lg hover:bg-blue-700 transition-colors"
              >
                Copy
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Email Share */}
      {activeTab === 'email' && (
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Email Template
            </label>
            <select
              value={selectedTemplate.id}
              onChange={(e) => setSelectedTemplate(emailTemplates.find(t => t.id === e.target.value) || emailTemplates[0])}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              {emailTemplates.map((template) => (
                <option key={template.id} value={template.id}>
                  {template.name}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Email Addresses (comma-separated)
            </label>
            <input
              type="text"
              value={emailAddresses}
              onChange={(e) => setEmailAddresses(e.target.value)}
              placeholder="john@example.com, jane@example.com"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Preview
            </label>
            <div className="p-3 bg-gray-50 rounded-lg text-sm">
              <div className="font-medium">Subject: {selectedTemplate.subject}</div>
              <div className="mt-2 whitespace-pre-wrap text-gray-600">
                {selectedTemplate.body.replace('{url}', url).replace('{name}', title.split(' ')[0] || 'User')}
              </div>
            </div>
          </div>

          <button
            onClick={handleEmailShare}
            disabled={!emailAddresses.trim() || isSharing}
            className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg font-medium hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isSharing ? 'Opening Email...' : 'Send Email'}
          </button>
        </div>
      )}

      {/* SMS Share */}
      {activeTab === 'sms' && (
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Phone Numbers (comma-separated)
            </label>
            <input
              type="text"
              value={phoneNumbers}
              onChange={(e) => setPhoneNumbers(e.target.value)}
              placeholder="+1234567890, +0987654321"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Message (optional)
            </label>
            <textarea
              value={customMessage}
              onChange={(e) => setCustomMessage(e.target.value)}
              placeholder="Check out my card:"
              rows={3}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          <button
            onClick={handleSMSShare}
            disabled={!phoneNumbers.trim() || isSharing}
            className="w-full bg-green-600 text-white py-2 px-4 rounded-lg font-medium hover:bg-green-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isSharing ? 'Opening SMS...' : 'Send SMS'}
          </button>
        </div>
      )}

      {/* Bulk Share */}
      {activeTab === 'bulk' && (
        <div className="space-y-4">
          <div className="text-center">
            <p className="text-gray-600 mb-4">
              Share your card across multiple platforms at once
            </p>
            <button
              onClick={handleBulkShare}
              disabled={isSharing}
              className="bg-purple-600 text-white py-3 px-6 rounded-lg font-medium hover:bg-purple-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSharing ? 'Opening Platforms...' : 'Share to All Platforms'}
            </button>
          </div>
          
          <div className="grid grid-cols-2 gap-2 text-sm text-gray-600">
            <div>✅ Facebook</div>
            <div>✅ Twitter</div>
            <div>✅ LinkedIn</div>
            <div>✅ WhatsApp</div>
          </div>
        </div>
      )}
    </div>
  )
} 