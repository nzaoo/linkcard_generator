// pages/index.tsx
import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import { db } from '@/lib/firebase'
import { addDoc, collection } from 'firebase/firestore'
import generateSlug from '@/utils/generateSlug'
import CardPreview from '@/components/Card/CardPreview'
import FormInput from '@/components/Form/FormInput'
import SocialLinks from '@/components/Form/SocialLinks'
import { useToast, ToastContainer } from '@/components/ui/Toast'
import LoadingSkeleton from '@/components/ui/LoadingSkeleton'
import ThemeCustomizer from '@/components/ui/ThemeCustomizer'
import { useAnimations } from '@/hooks/useAnimations'
import Head from 'next/head'

interface SocialLink {
  platform: string
  url: string
}

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

const defaultTheme: Theme = {
  id: 'sunset',
  name: 'Sunset',
  primaryColor: '#fbbf24',
  secondaryColor: '#f59e0b',
  backgroundColor: '#1f2937',
  textColor: '#ffffff',
  gradient: 'from-yellow-400 to-orange-500',
  preview: '🌅'
}

export default function Home() {
  const router = useRouter()
  const { toasts, removeToast, showSuccess, showError } = useToast()
  const { useTypingEffect, useIntersectionObserver, scrollToElement } = useAnimations()

  const [name, setName] = useState('')
  const [bio, setBio] = useState('')
  const [socialLinks, setSocialLinks] = useState<SocialLink[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [errors, setErrors] = useState<{ [key: string]: string }>({})
  const [isClient, setIsClient] = useState(false)
  const [currentTheme, setCurrentTheme] = useState<Theme>(defaultTheme)
  const [autoSaveStatus, setAutoSaveStatus] = useState<'saved' | 'saving' | 'error'>('saved')

  // Animation hooks
  const { ref: heroRef, isIntersecting: isHeroVisible } = useIntersectionObserver(0.3)
  const { displayText: heroText, isTyping } = useTypingEffect(
    'Create Your Digital Identity',
    80
  )

  useEffect(() => {
    setIsClient(true)
  }, [])

  // Auto-save functionality
  useEffect(() => {
    if (!name && !bio && socialLinks.length === 0) return

    const autoSaveTimer = setTimeout(() => {
      setAutoSaveStatus('saving')
      
      // Simulate auto-save
      setTimeout(() => {
        setAutoSaveStatus('saved')
        // Here you could save to localStorage or send to backend
        localStorage.setItem('nzaocard-draft', JSON.stringify({
          name,
          bio,
          socialLinks,
          theme: currentTheme
        }))
      }, 1000)
    }, 2000)

    return () => clearTimeout(autoSaveTimer)
  }, [name, bio, socialLinks, currentTheme])

  // Load draft on mount
  useEffect(() => {
    const savedDraft = localStorage.getItem('nzaocard-draft')
    if (savedDraft) {
      try {
        const draft = JSON.parse(savedDraft)
        setName(draft.name || '')
        setBio(draft.bio || '')
        setSocialLinks(draft.socialLinks || [])
        setCurrentTheme(draft.theme || defaultTheme)
      } catch (error) {
        console.error('Error loading draft:', error)
      }
    }
  }, [])

  const getInitials = (fullName: string) => {
    return fullName
      .split(' ')
      .map((word) => word.charAt(0))
      .join('')
      .toUpperCase()
      .slice(0, 2)
  }

  const validateForm = () => {
    const newErrors: { [key: string]: string } = {}

    if (!name.trim()) {
      newErrors.name = 'Tên là bắt buộc'
    } else if (name.trim().length < 2) {
      newErrors.name = 'Tên phải có ít nhất 2 ký tự'
    }

    if (!bio.trim()) {
      newErrors.bio = 'Giới thiệu là bắt buộc'
    } else if (bio.trim().length < 10) {
      newErrors.bio = 'Giới thiệu phải có ít nhất 10 ký tự'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!validateForm()) return

    setIsLoading(true)

    try {
      const cardData = {
        name: name.trim(),
        bio: bio.trim(),
        links: socialLinks,
        slug: generateSlug(name),
        theme: currentTheme,
        createdAt: new Date()
      }

      const docRef = await addDoc(collection(db, 'cards'), cardData)

      showSuccess('Card created successfully! Redirecting...')

      // Clear draft after successful creation
      localStorage.removeItem('nzaocard-draft')

      // Redirect to the success page
      setTimeout(() => {
        router.push(`/success?slug=${cardData.slug}`)
      }, 1500)
    } catch (error) {
      console.error('Error creating card:', error)
      showError('An error occurred while creating the card. Please try again later.')
    } finally {
      setIsLoading(false)
    }
  }

  const clearError = (field: string) => {
    setErrors((prev) => {
      const newErrors = { ...prev }
      delete newErrors[field]
      return newErrors
    })
  }

  const handleThemeChange = (theme: Theme) => {
    setCurrentTheme(theme)
  }

  return (
    <>
      <Head>
        <title>NZaoCard - Create Beautiful Personal Introduction Cards</title>
        <meta
          name="description"
          content="Create beautiful personal introduction cards with stunning animations and professional design. Share your digital presence with the world. Free, fast, and easy to use."
        />
        <meta name="keywords" content="digital business card, personal card, introduction card, social media links, portfolio, contact card, digital identity" />
        <meta name="author" content="NZaoCard" />
        <meta name="robots" content="index, follow" />
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=5" />
        
        {/* PWA Manifest */}
        <link rel="manifest" href="/manifest.json" />
        <meta name="theme-color" content="#fbbf24" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <meta name="apple-mobile-web-app-title" content="NZaoCard" />
        
        {/* Open Graph */}
        <meta property="og:type" content="website" />
        <meta property="og:title" content="NZaoCard - Create Beautiful Personal Introduction Cards" />
        <meta property="og:description" content="Create beautiful personal introduction cards with stunning animations and professional design. Share your digital presence with the world." />
        <meta property="og:url" content="https://nzaocard.vercel.app" />
        <meta property="og:site_name" content="NZaoCard" />
        <meta property="og:image" content="/og-image.png" />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta property="og:locale" content="en_US" />
        
        {/* Twitter Card */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="NZaoCard - Create Beautiful Personal Introduction Cards" />
        <meta name="twitter:description" content="Create beautiful personal introduction cards with stunning animations and professional design. Share your digital presence with the world." />
        <meta name="twitter:image" content="/og-image.png" />
        <meta name="twitter:site" content="@nzaocard" />
        
        {/* Favicon */}
        <link rel="icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" href="/icon-192x192.png" />
        
        {/* Structured Data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebApplication",
              "name": "NZaoCard",
              "description": "Create beautiful personal introduction cards with stunning animations and professional design",
              "url": "https://nzaocard.vercel.app",
              "applicationCategory": "ProductivityApplication",
              "operatingSystem": "Web Browser",
              "offers": {
                "@type": "Offer",
                "price": "0",
                "priceCurrency": "USD"
              },
              "author": {
                "@type": "Organization",
                "name": "NZaoCard"
              }
            })
          }}
        />
      </Head>

      <div className="min-h-screen dark-gradient-bg starry-bg shooting-stars text-white font-sans overflow-x-hidden relative">
        {/* Enhanced animated background with parallax */}
        <div className="absolute inset-0 -z-10">
          <div className="absolute w-32 h-32 bg-white/5 rounded-full top-[10%] left-[10%] animate-float parallax"></div>
          <div className="absolute w-24 h-24 bg-white/5 rounded-full top-[60%] right-[20%] animate-float delay-300 parallax"></div>
          <div className="absolute w-16 h-16 bg-white/5 rounded-full bottom-[20%] left-[30%] animate-float delay-600 parallax"></div>
          <div className="absolute w-20 h-20 bg-white/5 rounded-full top-[30%] right-[60%] animate-float delay-900 parallax"></div>
        </div>

        {/* Floating bubbles */}
        {isClient && [...Array(15)].map((_, i) => (
          <div
            key={i}
            className="bubble particle"
            style={{
              left: `${Math.random() * 100}%`,
              width: `${Math.random() * 20 + 10}px`,
              height: `${Math.random() * 20 + 10}px`,
              animationDelay: `${Math.random() * 8}s`,
              animationDuration: `${Math.random() * 4 + 6}s`
            }}
          />
        ))}

        {/* Navigation */}
        <nav className="absolute top-6 right-6 z-20">
          <div className="flex items-center space-x-4">
            <button
              onClick={() => router.push('/dashboard')}
              className="bg-white/20 backdrop-blur-lg text-white px-4 py-2 rounded-xl font-semibold hover:bg-white/30 transition-all duration-200 border border-white/30"
            >
              📊 Dashboard
            </button>
          </div>
        </nav>

        <main className="pt-16">
          {/* Hero Section with typing effect */}
          <section ref={heroRef} className="container mx-auto px-4 py-20 relative z-10">
            <div className={`text-center mb-16 transition-all duration-1000 ${
              isHeroVisible ? 'animate-fade-in opacity-100' : 'opacity-0'
            }`}>
              <h1 className="text-6xl md:text-7xl font-bold gold-gradient-text drop-shadow-lg mb-6">
                {heroText}
                {isTyping && <span className="typing-cursor">|</span>}
              </h1>
              <p className="text-xl md:text-2xl opacity-90 max-w-3xl mx-auto leading-relaxed mb-8">
                Transform your digital presence with stunning personal introduction cards. Beautiful
                animations, professional design, and seamless sharing.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button
                  onClick={() => scrollToElement('create-form', 80)}
                  className="bg-gradient-to-r from-yellow-400 to-orange-500 text-gray-900 px-8 py-4 rounded-full font-bold text-lg hover:from-yellow-500 hover:to-orange-600 transition-all duration-200 transform hover:scale-105 shadow-xl hover-lift"
                >
                  🚀 Start Creating
                </button>
                <button
                  onClick={() => scrollToElement('features', 80)}
                  className="bg-white/20 backdrop-blur-lg text-white px-8 py-4 rounded-full font-bold text-lg hover:bg-white/30 transition-all duration-200 border border-white/30 hover-lift"
                >
                  ✨ Learn More
                </button>
              </div>
            </div>
          </section>

          {/* Create Form Section */}
          <section id="create-form" className="container mx-auto px-4 py-20 relative z-10">
            <div className="grid lg:grid-cols-2 gap-16 items-start">
              {/* Form Section */}
              <div className="animate-slide-in-up">
                <div className="glass-card rounded-3xl p-8 shadow-2xl">
                  <div className="flex items-center justify-between mb-8">
                    <h2 className="text-gray-100 text-3xl font-bold">
                      Create Your Card
                    </h2>
                    <ThemeCustomizer 
                      onThemeChange={handleThemeChange}
                      currentTheme={currentTheme}
                    />
                  </div>

                  {/* Auto-save indicator */}
                  <div className="mb-4 flex items-center space-x-2">
                    <div className={`w-2 h-2 rounded-full ${
                      autoSaveStatus === 'saved' ? 'bg-green-400' :
                      autoSaveStatus === 'saving' ? 'bg-yellow-400 animate-pulse' :
                      'bg-red-400'
                    }`} />
                    <span className="text-sm text-gray-400">
                      {autoSaveStatus === 'saved' ? 'All changes saved' :
                       autoSaveStatus === 'saving' ? 'Saving...' :
                       'Save failed'}
                    </span>
                  </div>

                  <form onSubmit={handleSubmit} className="space-y-6">
                    <FormInput
                      label="Your Name"
                      value={name}
                      onChange={setName}
                      error={errors.name}
                      onErrorClear={() => clearError('name')}
                      placeholder="Enter your name..."
                      required
                    />

                    <FormInput
                      label="Bio"
                      value={bio}
                      onChange={setBio}
                      error={errors.bio}
                      onErrorClear={() => clearError('bio')}
                      placeholder="Tell us about yourself..."
                      type="textarea"
                      required
                    />

                    <SocialLinks links={socialLinks} onChange={setSocialLinks} />

                    <button
                      type="submit"
                      disabled={isLoading}
                      className="w-full bg-gradient-to-r from-yellow-400 to-orange-500 text-gray-900 py-4 rounded-xl font-bold text-lg hover:from-yellow-500 hover:to-orange-600 transition-all duration-200 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed hover-lift"
                    >
                      {isLoading ? (
                        <div className="flex items-center justify-center space-x-2">
                          <div className="w-5 h-5 border-2 border-gray-900 border-t-transparent rounded-full animate-spin" />
                          <span>Creating...</span>
                        </div>
                      ) : (
                        '✨ Create My Card'
                      )}
                    </button>
                  </form>
                </div>
              </div>

              {/* Card Preview Section */}
              <div className="animate-slide-in-up" style={{ animationDelay: '200ms' }}>
                <h3 className="text-2xl font-bold text-center mb-6 text-gray-100">
                  Live Preview
                </h3>
                {name || bio || socialLinks.length > 0 ? (
                  <CardPreview
                    name={name || 'Your Name'}
                    bio={bio || 'Your bio will appear here...'}
                    links={socialLinks}
                    isPreview={true}
                    className="animate-scale-in"
                  />
                ) : (
                  <LoadingSkeleton type="card" className="animate-pulse" />
                )}
              </div>
            </div>
          </section>

          {/* Features Section */}
          <section id="features" className="container mx-auto px-4 py-20 relative z-10">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold gold-gradient-text mb-6">
                Why Choose NZaoCard?
              </h2>
              <p className="text-xl text-white/80 max-w-3xl mx-auto">
                Experience the perfect blend of beauty, functionality, and performance
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              {[
                {
                  icon: '🎨',
                  title: 'Beautiful Themes',
                  description: 'Choose from multiple stunning themes or create your own custom design'
                },
                {
                  icon: '⚡',
                  title: 'Lightning Fast',
                  description: 'Optimized for speed with lazy loading and performance enhancements'
                },
                {
                  icon: '📱',
                  title: 'Mobile First',
                  description: 'Perfect experience on all devices with PWA support'
                },
                {
                  icon: '🔒',
                  title: 'Secure & Private',
                  description: 'Your data is safe with our secure infrastructure'
                },
                {
                  icon: '🚀',
                  title: 'Easy Sharing',
                  description: 'Share your card instantly across all social platforms'
                },
                {
                  icon: '📊',
                  title: 'Analytics',
                  description: 'Track views and engagement with built-in analytics'
                }
              ].map((feature, index) => (
                <div
                  key={index}
                  className="glass-card rounded-2xl p-6 text-center hover-lift transition-all duration-300"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <div className="text-4xl mb-4">{feature.icon}</div>
                  <h3 className="text-xl font-bold text-white mb-3">{feature.title}</h3>
                  <p className="text-white/70">{feature.description}</p>
                </div>
              ))}
            </div>
          </section>

          {/* Examples Section */}
          <section id="examples" className="container mx-auto px-4 py-20 relative z-10">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold gold-gradient-text mb-6">
                See It In Action
              </h2>
              <p className="text-xl opacity-90 max-w-2xl mx-auto">
                Check out these example cards created with NZaoCard
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[
                {
                  name: 'John Doe',
                  bio: 'Full-stack developer passionate about creating amazing web experiences',
                  links: [
                    { platform: 'GitHub', url: 'https://github.com' },
                    { platform: 'LinkedIn', url: 'https://linkedin.com' }
                  ]
                },
                {
                  name: 'Jane Smith',
                  bio: 'Creative designer and digital artist with 5+ years of experience',
                  links: [
                    { platform: 'Behance', url: 'https://behance.net' },
                    { platform: 'Instagram', url: 'https://instagram.com' }
                  ]
                },
                {
                  name: 'Mike Johnson',
                  bio: 'Marketing specialist helping brands grow their digital presence',
                  links: [
                    { platform: 'Twitter', url: 'https://twitter.com' },
                    { platform: 'Website', url: 'https://example.com' }
                  ]
                }
              ].map((example, index) => (
                <div
                  key={index}
                  className="animate-slide-in-up"
                  style={{ animationDelay: `${index * 200}ms` }}
                >
                  <CardPreview
                    name={example.name}
                    bio={example.bio}
                    links={example.links}
                    isPreview={true}
                    className="hover:transform hover:scale-105 transition-all duration-300"
                  />
                </div>
              ))}
            </div>
          </section>

          {/* Recent Cards Section */}
          <section className="container mx-auto px-4 py-20 relative z-10">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold gold-gradient-text mb-6">
                Recently Created Cards
              </h2>
              <p className="text-xl opacity-90 max-w-2xl mx-auto">
                See what others are creating with NZaoCard
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[
                {
                  name: 'Sarah Wilson',
                  bio: 'UX/UI Designer crafting beautiful digital experiences',
                  links: [
                    { platform: 'Dribbble', url: 'https://dribbble.com' },
                    { platform: 'Instagram', url: 'https://instagram.com' },
                    { platform: 'Behance', url: 'https://behance.net' }
                  ]
                },
                {
                  name: 'Alex Chen',
                  bio: 'Software engineer building the future of technology',
                  links: [
                    { platform: 'GitHub', url: 'https://github.com' },
                    { platform: 'LinkedIn', url: 'https://linkedin.com' },
                    { platform: 'Twitter', url: 'https://twitter.com' }
                  ]
                },
                {
                  name: 'Emma Davis',
                  bio: 'Content creator sharing knowledge and inspiring others',
                  links: [
                    { platform: 'YouTube', url: 'https://youtube.com' },
                    { platform: 'Instagram', url: 'https://instagram.com' },
                    { platform: 'TikTok', url: 'https://tiktok.com' }
                  ]
                }
              ].map((example, index) => (
                <div
                  key={index}
                  className="animate-slide-in-up"
                  style={{ animationDelay: `${index * 200}ms` }}
                >
                  <CardPreview
                    name={example.name}
                    bio={example.bio}
                    links={example.links}
                    isPreview={true}
                    className="hover:transform hover:scale-105 transition-all duration-300"
                  />
                </div>
              ))}
            </div>
          </section>

          {/* CTA Section */}
          <section className="container mx-auto px-4 py-20 relative z-10">
            <div className="glass-card rounded-3xl p-12 text-center border border-white/20">
              <h2 className="text-4xl md:text-5xl font-bold gold-gradient-text mb-6">
                Ready to Create Your Card?
              </h2>
              <p className="text-xl text-white/80 max-w-2xl mx-auto mb-8">
                Join thousands of people who have already created their beautiful personal cards. 
                It only takes a few minutes to get started!
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button
                  onClick={() => scrollToElement('create-form', 80)}
                  className="bg-gradient-to-r from-yellow-400 to-orange-500 text-gray-900 px-8 py-4 rounded-full font-bold text-lg hover:from-yellow-500 hover:to-orange-600 transition-all duration-200 transform hover:scale-105 shadow-xl hover-lift"
                >
                  🚀 Create My Card Now
                </button>
                <a
                  href="https://github.com/nzaoo/linkcard_generator"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-white/20 backdrop-blur-lg text-white px-8 py-4 rounded-full font-bold text-lg hover:bg-white/30 transition-all duration-200 border border-white/30 hover-lift"
                >
                  ⭐ Give me a Star
                </a>
              </div>
            </div>
          </section>
        </main>

        {/* Toast Notifications */}
        <ToastContainer />
      </div>
    </>
  )
}
