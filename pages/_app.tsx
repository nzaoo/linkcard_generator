import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import Head from 'next/head'
import { useEffect } from 'react'
import { ToastProvider } from '@/components/ui/Toast'

// Type declarations for analytics and PWA
declare global {
  interface Window {
    dataLayer?: any[]
    gtag?: (...args: any[]) => void
    deferredPrompt?: any
  }
}

// Google Analytics
const GA_TRACKING_ID = process.env.NEXT_PUBLIC_GA_ID

export default function App({ Component, pageProps }: AppProps) {
  useEffect(() => {
    // Register service worker for PWA
    if ('serviceWorker' in navigator) {
      window.addEventListener('load', () => {
        navigator.serviceWorker
          .register('/sw.js')
          .then((registration) => {
            console.log('SW registered: ', registration)
          })
          .catch((registrationError) => {
            console.log('SW registration failed: ', registrationError)
          })
      })
    }

    // Initialize Google Analytics
    if (GA_TRACKING_ID && typeof window !== 'undefined') {
      // Load gtag script
      const script = document.createElement('script')
      script.async = true
      script.src = `https://www.googletagmanager.com/gtag/js?id=${GA_TRACKING_ID}`
      document.head.appendChild(script)

      // Initialize gtag
      window.dataLayer = window.dataLayer || []
      window.gtag = function gtag() {
        window.dataLayer!.push(arguments)
      }
      window.gtag('js', new Date())
      window.gtag('config', GA_TRACKING_ID, {
        page_title: document.title,
        page_location: window.location.href,
      })

      // Track page views
      const handleRouteChange = (url: string) => {
        window.gtag!('config', GA_TRACKING_ID, {
          page_title: document.title,
          page_location: url,
        })
      }

      // Listen for route changes
      const originalPushState = history.pushState
      const originalReplaceState = history.replaceState

      history.pushState = function(...args) {
        originalPushState.apply(history, args)
        handleRouteChange(window.location.href)
      }

      history.replaceState = function(...args) {
        originalReplaceState.apply(history, args)
        handleRouteChange(window.location.href)
      }

      window.addEventListener('popstate', () => {
        handleRouteChange(window.location.href)
      })
    }
  }, [])

  return (
    <ToastProvider>
      <Head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=5" />
        <meta name="theme-color" content="#fbbf24" />
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <meta name="apple-mobile-web-app-title" content="NZaoCard" />
        <meta
          name="description"
          content="Create beautiful personal introduction cards with NZaoCard. Share your digital presence with stunning animations and professional design."
        />
        <meta
          name="keywords"
          content="digital business card, personal card, link in bio, social media links, portfolio, introduction card"
        />
        <meta name="author" content="Nzaoo" />

        {/* PWA Manifest */}
        <link rel="manifest" href="/manifest.json" />

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

        {/* Google Analytics */}
        {GA_TRACKING_ID && (
          <>
            <script
              async
              src={`https://www.googletagmanager.com/gtag/js?id=${GA_TRACKING_ID}`}
            />
            <script
              dangerouslySetInnerHTML={{
                __html: `
                  window.dataLayer = window.dataLayer || [];
                  function gtag(){dataLayer.push(arguments);}
                  gtag('js', new Date());
                  gtag('config', '${GA_TRACKING_ID}', {
                    page_title: document.title,
                    page_location: window.location.href,
                  });
                `,
              }}
            />
          </>
        )}
      </Head>

      <Component {...pageProps} />
    </ToastProvider>
  )
}
