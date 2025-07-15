// pages/u/[slug].tsx
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
// import { db } from '@/lib/firebase' // Xóa dòng này
// import { collection, query, where, getDocs } from 'firebase/firestore' // Xóa dòng này
import CardPreview from '@/components/Card/CardPreview'
import ShareButton from '@/components/ui/ShareButton'
import ErrorBoundary from '@/components/ui/ErrorBoundary'
import FullScreenLoading from '@/components/ui/LoadingSpinner'
import { useToast, ToastContainer } from '@/components/ui/Toast'
import { trackCardView, trackLinkClick } from '@/lib/analytics'
import Head from 'next/head'

// Type declaration for gtag
declare global {
  interface Window {
    gtag?: (...args: any[]) => void
  }
}

export default function UserCardPage() {
  const router = useRouter()
  const { slug } = router.query
  const { toasts, removeToast, showSuccess } = useToast()

  const [user, setUser] = useState<any>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [isClient, setIsClient] = useState(false)
  const [cardUrl, setCardUrl] = useState('')

  useEffect(() => {
    setIsClient(true)
  }, [])

  useEffect(() => {
    const fetchUser = async () => {
      if (!slug) return

      try {
        // Gọi API backend thay vì truy cập Firestore trực tiếp
        const res = await fetch(`/api/cards/${slug}`)
        if (!res.ok) {
          setUser(undefined)
          setIsLoading(false)
          return
        }
        const result = await res.json()
        if (result && result.success && result.data) {
          setUser(result.data)

          // Track card view with referrer information
          const referrer = document.referrer || 'direct'
          await trackCardView(slug as string, referrer)

          // Track page view in analytics
          if (typeof window !== 'undefined' && window.gtag) {
            window.gtag('event', 'page_view', {
              page_title: `${result.data.name}'s Card`,
              page_location: window.location.href,
              custom_parameter: {
                card_slug: slug,
                card_name: result.data.name,
                referrer: referrer
              }
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
  }, [slug])

  useEffect(() => {
    if (isClient && typeof window !== 'undefined') {
      setCardUrl(window.location.href)
    }
  }, [isClient])

  // Track link clicks
  const handleLinkClick = async (link: any) => {
    try {
      await trackLinkClick({
        slug: slug as string,
        linkType: 'social',
        platform: link.platform,
        url: link.url,
        timestamp: new Date(),
        userAgent: navigator.userAgent,
        referrer: document.referrer || 'direct'
      })

      // Track in Google Analytics
      if (typeof window !== 'undefined' && window.gtag) {
        window.gtag('event', 'click', {
          event_category: 'card_link',
          event_label: link.platform,
          custom_parameter: {
            card_slug: slug,
            platform: link.platform,
            link_url: link.url
          }
        })
      }
    } catch (error) {
      console.error('Error tracking link click:', error)
    }
  }

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
        <title>{user ? `${user.name}'s Card` : 'Card Not Found'} - NZaoCard</title>
        <meta
          name="description"
          content={user ? `${user.name}'s personal introduction card. Connect with ${user.name} through their social links and contact information.` : 'Card not found'}
        />
        {user && (
          <>
            <meta property="og:title" content={`${user.name}'s Card`} />
            <meta property="og:description" content={user.bio || `${user.name}'s personal introduction card`} />
            <meta property="og:image" content={user.avatar || '/default-avatar.png'} />
            <meta property="og:url" content={typeof window !== 'undefined' ? window.location.href : ''} />
            <meta name="twitter:card" content="summary_large_image" />
            <meta name="twitter:title" content={`${user.name}'s Card`} />
            <meta name="twitter:description" content={user.bio || `${user.name}'s personal introduction card`} />
            <meta name="twitter:image" content={user.avatar || '/default-avatar.png'} />
          </>
        )}
      </Head>

      <div className="min-h-screen dark-gradient-bg starry-bg shooting-stars relative overflow-hidden">
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

        <div className="flex items-center justify-center min-h-screen p-4 relative z-10">
          <div className="w-full max-w-md">
            {/* Main Card */}
            <CardPreview
              name={user.name}
              bio={user.bio}
              links={user.links || []}
              avatar={user.avatar}
              isPreview={false}
              onLinkClick={handleLinkClick}
              className="animate-scale-in"
            />

            {/* Call to Action */}
            <div className="text-center mt-8 animate-fade-in" style={{ animationDelay: '400ms' }}>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button
                  onClick={() => router.push('/')}
                  className="glass-card text-white px-8 py-4 rounded-full font-semibold hover:bg-white/30 transition-all duration-200 border border-white/30 transform hover:scale-105"
                >
                  ✨ Create Your Own Card
                </button>
                <button
                  onClick={() => router.push(`/success?slug=${slug}`)}
                  className="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-8 py-4 rounded-full font-semibold hover:from-blue-600 hover:to-purple-700 transition-all duration-200 transform hover:scale-105"
                >
                  🎉 View Success Page
                </button>
              </div>
            </div>

            {/* Share section */}
            <div className="text-center mt-6 animate-fade-in" style={{ animationDelay: '600ms' }}>
              <p className="text-white/70 text-sm mb-3">Share this card</p>
              <ShareButton
                url={cardUrl}
                title={shareTitle}
                description={shareDescription}
              />
            </div>

            {/* Stats */}
            <div className="text-center mt-6 animate-fade-in" style={{ animationDelay: '800ms' }}>
              <div className="glass-card rounded-xl p-4 border border-white/20">
                <p className="text-white/60 text-xs mb-2">Powered by</p>
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
