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
import Head from 'next/head'

interface SocialLink {
  platform: string
  url: string
}

export default function Home() {
  const router = useRouter()
  const { toasts, removeToast, showSuccess, showError } = useToast()

  const [name, setName] = useState('')
  const [bio, setBio] = useState('')
  const [socialLinks, setSocialLinks] = useState<SocialLink[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [errors, setErrors] = useState<{ [key: string]: string }>({})
  const [isClient, setIsClient] = useState(false)

  useEffect(() => {
    setIsClient(true)
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
        createdAt: new Date()
      }

      const docRef = await addDoc(collection(db, 'cards'), cardData)

      showSuccess('Card created successfully! Redirecting...')

      // Redirect to the success page
      setTimeout(() => {
        router.push(`/success?slug=${cardData.slug}`)
      }, 1500)
    } catch (error) {
      console.error('Error creating card:', error)
      showError('Có lỗi xảy ra khi tạo thẻ. Vui lòng thử lại!')
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

  return (
    <>
      <Head>
        <title>NZaoCard - Create Beautiful Personal Introduction Cards</title>
        <meta
          name="description"
          content="Create beautiful personal introduction cards with stunning animations and professional design. Share your digital presence with the world."
        />
      </Head>

      <div className="min-h-screen dark-gradient-bg starry-bg shooting-stars text-white font-sans overflow-x-hidden relative">
        {/* Enhanced animated background */}
        <div className="absolute inset-0 -z-10">
          <div className="absolute w-32 h-32 bg-white/5 rounded-full top-[10%] left-[10%] animate-float"></div>
          <div className="absolute w-24 h-24 bg-white/5 rounded-full top-[60%] right-[20%] animate-float delay-300"></div>
          <div className="absolute w-16 h-16 bg-white/5 rounded-full bottom-[20%] left-[30%] animate-float delay-600"></div>
          <div className="absolute w-20 h-20 bg-white/5 rounded-full top-[30%] right-[60%] animate-float delay-900"></div>
        </div>

        {/* Floating bubbles */}
        {isClient && [...Array(15)].map((_, i) => (
          <div
            key={i}
            className="bubble"
            style={{
              left: `${Math.random() * 100}%`,
              width: `${Math.random() * 20 + 10}px`,
              height: `${Math.random() * 20 + 10}px`,
              animationDelay: `${Math.random() * 8}s`,
              animationDuration: `${Math.random() * 4 + 6}s`
            }}
          />
        ))}

        <main className="pt-16">
          {/* Hero Section */}
          <section className="container mx-auto px-4 py-20 relative z-10">
            <div className="text-center mb-16 animate-fade-in">
              <h1 className="text-6xl md:text-7xl font-bold gold-gradient-text drop-shadow-lg mb-6">
                Create Your Digital Identity
              </h1>
              <p className="text-xl md:text-2xl opacity-90 max-w-3xl mx-auto leading-relaxed mb-8">
                Transform your digital presence with stunning personal introduction cards. Beautiful
                animations, professional design, and seamless sharing.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button
                  onClick={() =>
                    document.getElementById('create-form')?.scrollIntoView({ behavior: 'smooth' })
                  }
                  className="bg-gradient-to-r from-yellow-400 to-orange-500 text-gray-900 px-8 py-4 rounded-full font-bold text-lg hover:from-yellow-500 hover:to-orange-600 transition-all duration-200 transform hover:scale-105 shadow-xl"
                >
                  🚀 Start Creating
                </button>
                <button
                  onClick={() =>
                    document.getElementById('features')?.scrollIntoView({ behavior: 'smooth' })
                  }
                  className="bg-white/20 backdrop-blur-lg text-white px-8 py-4 rounded-full font-bold text-lg hover:bg-white/30 transition-all duration-200 border border-white/30"
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
                  <h2 className="text-gray-100 text-3xl font-bold mb-8 text-center">
                    Create Your Card
                  </h2>

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
                      className={`w-full py-4 text-lg font-bold rounded-xl transition-all duration-300 transform hover:scale-105 focus-ring ${
                        isLoading
                          ? 'bg-gray-600 cursor-not-allowed'
                          : 'bg-gradient-to-r from-yellow-400 to-orange-500 hover:from-yellow-500 hover:to-orange-600 hover:shadow-xl text-gray-900'
                      }`}
                    >
                      {isLoading ? (
                        <div className="flex items-center justify-center">
                          <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-gray-900 mr-3"></div>
                          Creating your card<span className="loading-dots"></span>
                        </div>
                      ) : (
                        '✨ Create My Card'
                      )}
                    </button>
                  </form>
                </div>
              </div>

              {/* Preview Section */}
              <div className="animate-slide-in-up" style={{ animationDelay: '200ms' }}>
                <div className="sticky top-24">
                  <h3 className="text-2xl font-bold text-center mb-6 text-gray-100">
                    Live Preview
                  </h3>
                  <CardPreview
                    name={name}
                    bio={bio}
                    links={socialLinks}
                    isPreview={true}
                    className="animate-scale-in"
                  />
                </div>
              </div>
            </div>
          </section>

          {/* Features Section */}
          <section id="features" className="container mx-auto px-4 py-20 relative z-10">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold gold-gradient-text mb-6">
                Why Choose NZaoCard?
              </h2>
              <p className="text-xl opacity-90 max-w-2xl mx-auto">
                Professional features designed to make your digital presence stand out
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[
                {
                  icon: '🎨',
                  title: 'Beautiful Design',
                  description:
                    'Stunning animations and glassmorphism effects that captivate your audience'
                },
                {
                  icon: '📱',
                  title: 'Mobile Responsive',
                  description: 'Perfect display on all devices - desktop, tablet, and mobile'
                },
                {
                  icon: '🔗',
                  title: 'Rich Social Links',
                  description: 'Support for 20+ social media platforms with custom icons and colors'
                },
                {
                  icon: '⚡',
                  title: 'Lightning Fast',
                  description: 'Optimized performance for instant loading and smooth interactions'
                },
                {
                  icon: '🔒',
                  title: 'Secure & Private',
                  description: "Your data is safe with Firebase's enterprise-grade security"
                },
                {
                  icon: '🎯',
                  title: 'SEO Optimized',
                  description: 'Built for search engines to help you get discovered online'
                }
              ].map((feature, index) => (
                <div
                  key={index}
                  className="glass-card rounded-2xl p-6 text-center hover:transform hover:scale-105 transition-all duration-300"
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
                  onClick={() =>
                    document.getElementById('create-form')?.scrollIntoView({ behavior: 'smooth' })
                  }
                  className="bg-gradient-to-r from-yellow-400 to-orange-500 text-gray-900 px-8 py-4 rounded-full font-bold text-lg hover:from-yellow-500 hover:to-orange-600 transition-all duration-200 transform hover:scale-105 shadow-xl"
                >
                  🚀 Create My Card Now
                </button>
                <a
                  href="https://github.com/nzaoo/linkcard_generator"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-white/20 backdrop-blur-lg text-white px-8 py-4 rounded-full font-bold text-lg hover:bg-white/30 transition-all duration-200 border border-white/30"
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
