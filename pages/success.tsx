import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { db } from '@/lib/firebase'
import { collection, query, where, getDocs } from 'firebase/firestore'
import CardPreview from '@/components/Card/CardPreview'
import ShareButton from '@/components/ui/ShareButton'
import ErrorBoundary from '@/components/ui/ErrorBoundary'
import FullScreenLoading from '@/components/ui/LoadingSpinner'
import { useToast, ToastContainer } from '@/components/ui/Toast'
import Head from 'next/head'

// Type declaration for gtag
declare global {
  interface Window {
    gtag?: (...args: any[]) => void
  }
}

export default function SuccessPage() {
  const router = useRouter()
  const { slug } = router.query
  const { toasts, removeToast, showSuccess } = useToast()

  const [user, setUser] = useState<any>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [showConfetti, setShowConfetti] = useState(false)
  const [isClient, setIsClient] = useState(false)
  const [cardUrl, setCardUrl] = useState('')

  useEffect(() => {
    setIsClient(true)
  }, [])

  useEffect(() => {
    if (isClient && typeof window !== 'undefined') {
      setCardUrl(`${window.location.origin}/u/${slug}`)
    }
  }, [isClient, slug])

  useEffect(() => {
    const fetchUser = async () => {
      if (!slug) return

      try {
        const q = query(collection(db, 'cards'), where('slug', '==', slug))
        const querySnapshot = await getDocs(q)

        if (!querySnapshot.empty) {
          const userData = querySnapshot.docs[0].data()
          setUser(userData)
          
          // Only show confetti on client-side
          if (isClient) {
            setShowConfetti(true)
            // Hide confetti after 3 seconds
            setTimeout(() => setShowConfetti(false), 3000)
          }

          // Track success event
          if (typeof window !== 'undefined' && window.gtag) {
            window.gtag('event', 'card_created', {
              card_name: userData.name,
              card_slug: slug
            })
          }
        } else {
          setUser(undefined)
        }
      } catch (error) {
        console.error('Error fetching user:', error)
        setUser(undefined)
      } finally {
        setIsLoading(false)
      }
    }

    fetchUser()
  }, [slug, isClient])

  if (isLoading) {
    return <FullScreenLoading text="Loading your card..." />
  }

  if (user === undefined) {
    return (
      <div className="min-h-screen dark-gradient-bg starry-bg shooting-stars flex items-center justify-center p-4">
        <div className="text-center glass-card rounded-2xl p-8 border border-white/20 relative z-10 max-w-md">
          <div className="text-6xl mb-4">😔</div>
          <h1 className="text-2xl font-bold text-white mb-2">Card Not Found</h1>
          <p className="text-white/80 mb-6">
            This card doesn&#39;t exist or has been removed. Create your own beautiful card!
          </p>
          <button
            onClick={() => router.push('/')}
            className="bg-gradient-to-r from-yellow-400 to-orange-500 text-gray-900 px-6 py-3 rounded-full font-semibold hover:from-yellow-500 hover:to-orange-600 transition-all duration-200 transform hover:scale-105"
          >
            ✨ Create Your Card
          </button>
        </div>
      </div>
    )
  }

  const shareTitle = `Check out ${user.name}'s card!`
  const shareDescription = user.bio || `Personal introduction card of ${user.name}`

  return (
    <ErrorBoundary>
      <Head>
        <title>Card Created Successfully! - NZaoCard</title>
        <meta
          name="description"
          content={`Your personal card has been created successfully! Share ${user.name}'s card with the world.`}
        />
      </Head>

      <div className="min-h-screen dark-gradient-bg starry-bg shooting-stars relative overflow-hidden">
        {/* Confetti Animation */}
        {isClient && showConfetti && (
          <div className="fixed inset-0 pointer-events-none z-50">
            {[...Array(50)].map((_, i) => (
              <div
                key={i}
                className="absolute w-4 h-4 animate-confetti"
                style={{
                  left: `${Math.random() * 100}%`,
                  top: '-10px',
                  backgroundColor: ['#fbbf24', '#f59e0b', '#ef4444', '#ec4899', '#8b5cf6', '#3b82f6'][
                    Math.floor(Math.random() * 6)
                  ],
                  animationDelay: `${Math.random() * 3}s`,
                  animationDuration: `${3 + Math.random() * 2}s`
                }}
              />
            ))}
          </div>
        )}

        {/* Enhanced animated background elements */}
        <div className="absolute inset-0 -z-10">
          <div className="absolute w-32 h-32 bg-white/10 rounded-full top-[10%] left-[10%] animate-float"></div>
          <div className="absolute w-24 h-24 bg-white/10 rounded-full top-[60%] right-[20%] animate-float delay-300"></div>
          <div className="absolute w-16 h-16 bg-white/10 rounded-full bottom-[20%] left-[30%] animate-float delay-600"></div>
          <div className="absolute w-20 h-20 bg-white/10 rounded-full top-[30%] right-[60%] animate-float delay-900"></div>
        </div>

        {/* Floating bubbles */}
        {isClient && [...Array(20)].map((_, i) => (
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

        <div className="container mx-auto px-4 py-8 relative z-10">
          {/* Success Header */}
          <div className="text-center mb-12 animate-fade-in">
            <div className="text-8xl mb-6 animate-bounce">🎉</div>
            <h1 className="text-4xl md:text-5xl font-bold gold-gradient-text mb-4">
              Card Created Successfully!
            </h1>
            <p className="text-xl text-white/80 max-w-2xl mx-auto">
              Your beautiful personal card is ready to share with the world! 
              Copy the link below or use the share buttons to spread the word.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12 items-start max-w-6xl mx-auto">
            {/* Card Preview */}
            <div className="animate-slide-in-up">
              <h3 className="text-2xl font-bold text-center mb-6 text-gray-100">
                Your Card Preview
              </h3>
              <CardPreview
                name={user.name}
                bio={user.bio}
                links={user.links || []}
                avatar={user.avatar}
                isPreview={false}
                className="animate-scale-in"
              />
            </div>

            {/* Share Options */}
            <div className="animate-slide-in-up" style={{ animationDelay: '200ms' }}>
              <div className="glass-card rounded-3xl p-8 shadow-2xl">
                <h3 className="text-2xl font-bold text-center mb-8 text-gray-100">
                  Share Your Card
                </h3>

                {/* Card URL */}
                <div className="mb-8">
                  <label className="block text-sm font-medium text-gray-300 mb-3">
                    Your Card URL
                  </label>
                  <div className="flex">
                    <input
                      type="text"
                      value={cardUrl}
                      readOnly
                      className="flex-1 bg-gray-800/50 border border-gray-600 rounded-l-xl px-4 py-3 text-white text-sm focus:outline-none focus:border-yellow-400"
                    />
                    <button
                      onClick={() => {
                        navigator.clipboard.writeText(cardUrl)
                        showSuccess('URL copied to clipboard!')
                      }}
                      className="bg-gradient-to-r from-yellow-400 to-orange-500 text-gray-900 px-4 py-3 rounded-r-xl font-semibold hover:from-yellow-500 hover:to-orange-600 transition-all duration-200"
                    >
                      Copy
                    </button>
                  </div>
                </div>

                {/* Share Buttons */}
                <div className="mb-8">
                  <label className="block text-sm font-medium text-gray-300 mb-3">
                    Quick Share
                  </label>
                  <div className="grid grid-cols-2 gap-3">
                    <ShareButton
                      url={cardUrl}
                      title={shareTitle}
                      description={shareDescription}
                      platform="facebook"
                      className="w-full"
                    />
                    <ShareButton
                      url={cardUrl}
                      title={shareTitle}
                      description={shareDescription}
                      platform="twitter"
                      className="w-full"
                    />
                    <ShareButton
                      url={cardUrl}
                      title={shareTitle}
                      description={shareDescription}
                      platform="linkedin"
                      className="w-full"
                    />
                    <ShareButton
                      url={cardUrl}
                      title={shareTitle}
                      description={shareDescription}
                      platform="whatsapp"
                      className="w-full"
                    />
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="space-y-4">
                  <button
                    onClick={() => router.push(`/u/${slug}`)}
                    className="w-full bg-gradient-to-r from-blue-500 to-purple-600 text-white px-6 py-4 rounded-xl font-semibold hover:from-blue-600 hover:to-purple-700 transition-all duration-200 transform hover:scale-105"
                  >
                    👁️ View Public Page
                  </button>
                  
                  <button
                    onClick={() => router.push('/')}
                    className="w-full bg-white/20 backdrop-blur-lg text-white px-6 py-4 rounded-xl font-semibold hover:bg-white/30 transition-all duration-200 border border-white/30"
                  >
                    ✨ Create Another Card
                  </button>
                </div>

                {/* Stats */}
                <div className="mt-8 pt-6 border-t border-white/10">
                  <div className="text-center">
                    <p className="text-white/60 text-sm mb-2">Powered by</p>
                    <div className="flex items-center justify-center space-x-2">
                      <div className="w-6 h-6 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-lg flex items-center justify-center text-gray-900 font-bold text-sm">
                        N
                      </div>
                      <span className="text-white/80 text-sm font-medium">NZaoCard</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Tips Section */}
          <div className="mt-16 animate-fade-in" style={{ animationDelay: '400ms' }}>
            <div className="glass-card rounded-2xl p-8 border border-white/20">
              <h3 className="text-2xl font-bold text-center mb-6 gold-gradient-text">
                💡 Pro Tips
              </h3>
              <div className="grid md:grid-cols-3 gap-6">
                <div className="text-center">
                  <div className="text-3xl mb-3">📱</div>
                  <h4 className="font-semibold text-white mb-2">Add to Home Screen</h4>
                  <p className="text-white/70 text-sm">
                    Save your card to your phone's home screen for quick access
                  </p>
                </div>
                <div className="text-center">
                  <div className="text-3xl mb-3">🔗</div>
                  <h4 className="font-semibold text-white mb-2">Update Regularly</h4>
                  {/* eslint-disable-next-line react/no-unescaped-entities */}
                  <p className="text-white/70 text-sm">
                    Keep your bio and links up to date to stay relevant
                  </p>
                </div>
                <div className="text-center">
                  <div className="text-3xl mb-3">📊</div>
                  <h4 className="font-semibold text-white mb-2">Track Views</h4>
                  <p className="text-white/70 text-sm">
                    Monitor how many people visit your card to measure engagement
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Floating Share Button */}
        <ShareButton
          url={cardUrl}
          title={shareTitle}
          description={shareDescription}
          className="fixed bottom-6 right-6 z-50 animate-bounce"
        />
      </div>

      {/* Toast Notifications */}
      <ToastContainer />
    </ErrorBoundary>
  )
} 