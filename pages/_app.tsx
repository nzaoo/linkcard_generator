import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import Head from 'next/head'
import { useEffect, useState } from 'react'

// Type declarations for analytics
declare global {
  interface Window {
    dataLayer?: any[]
    gtag?: (...args: any[]) => void
  }
}

export default function App({ Component, pageProps }: AppProps) {
  const [isClient, setIsClient] = useState(false)

  useEffect(() => {
    setIsClient(true)
  }, [])

  // Prevent hydration mismatch
  if (!isClient) {
    return null
  }

  // Analytics setup
  useEffect(() => {
    if (typeof window !== 'undefined') {
      // Initialize dataLayer
      window.dataLayer = window.dataLayer || []
      
      // Define gtag function
      const gtag = function(...args: any[]) {
        window.dataLayer?.push(args)
      }
      window.gtag = gtag
      
      // Load Google Analytics
      const script = document.createElement('script')
      script.async = true
      script.src = `https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GA_ID}`
      document.head.appendChild(script)
      
      // Initialize GA
      gtag('js', new Date())
      gtag('config', process.env.NEXT_PUBLIC_GA_ID)
    }

    // Performance monitoring
    if (typeof window !== 'undefined') {
      // Track page load performance
      window.addEventListener('load', () => {
        const navigation = performance.getEntriesByType(
          'navigation'
        )[0] as PerformanceNavigationTiming
        if (navigation) {
          console.log('Page load time:', navigation.loadEventEnd - navigation.loadEventStart)
        }
      })
    }
  }, [])

  return (
    <>
      <Head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta name="theme-color" content="#000000" />
        <meta
          name="description"
          content="Create beautiful personal introduction cards with NZaoCard. Share your digital presence with stunning animations and professional design."
        />
        <meta
          name="keywords"
          content="digital business card, personal card, link in bio, social media links, portfolio, introduction card"
        />
        <meta name="author" content="Nzaoo" />

        {/* Open Graph */}
        <meta property="og:type" content="website" />
        <meta property="og:title" content="NZaoCard - Beautiful Personal Introduction Cards" />
        <meta
          property="og:description"
          content="Create beautiful personal introduction cards with NZaoCard. Share your digital presence with stunning animations and professional design."
        />
        <meta property="og:image" content="/og-image.png" />
        <meta property="og:url" content="https://linkcardgenerator.vercel.app" />

        {/* Twitter Card */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="NZaoCard - Beautiful Personal Introduction Cards" />
        <meta
          name="twitter:description"
          content="Create beautiful personal introduction cards with NZaoCard. Share your digital presence with stunning animations and professional design."
        />
        <meta name="twitter:image" content="/og-image.png" />

        {/* Favicon */}
        <link rel="icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />

        {/* Preconnect to external domains */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />

        {/* Structured Data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'WebApplication',
              name: 'NZaoCard',
              description: 'Create beautiful personal introduction cards with stunning animations',
              url: 'https://linkcardgenerator.vercel.app',
              applicationCategory: 'BusinessApplication',
              operatingSystem: 'Web Browser',
              author: {
                '@type': 'Person',
                name: 'Nzaoo'
              }
            })
          }}
        />
      </Head>

      <Component {...pageProps} />
    </>
  )
}
