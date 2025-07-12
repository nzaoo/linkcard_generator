import { db } from './firebase'
import { doc, updateDoc, increment, getDoc, setDoc, collection, addDoc } from 'firebase/firestore'

export interface AnalyticsData {
  views: number
  clicks: number
  shares: number
  lastViewed: Date
  createdAt: Date
  platformViews: {
    [platform: string]: number
  }
  referrers: {
    [referrer: string]: number
  }
}

export interface ClickEvent {
  slug: string
  linkType: 'social' | 'card' | 'share'
  platform?: string
  url?: string
  timestamp: Date
  userAgent: string
  referrer: string
}

// Track card view
export const trackCardView = async (slug: string, referrer: string = 'direct') => {
  try {
    const analyticsRef = doc(db, 'analytics', slug)
    const analyticsDoc = await getDoc(analyticsRef)

    if (analyticsDoc.exists()) {
      // Update existing analytics
      await updateDoc(analyticsRef, {
        views: increment(1),
        lastViewed: new Date(),
        [`referrers.${referrer}`]: increment(1)
      })
    } else {
      // Create new analytics document
      const analyticsData: AnalyticsData = {
        views: 1,
        clicks: 0,
        shares: 0,
        lastViewed: new Date(),
        createdAt: new Date(),
        platformViews: {},
        referrers: {
          [referrer]: 1
        }
      }
      await setDoc(analyticsRef, analyticsData)
    }

    // Track in Google Analytics if available
    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('event', 'page_view', {
        page_title: `Card: ${slug}`,
        page_location: window.location.href,
        custom_parameter: {
          card_slug: slug,
          referrer: referrer
        }
      })
    }
  } catch (error) {
    console.error('Error tracking card view:', error)
  }
}

// Track link click
export const trackLinkClick = async (clickEvent: ClickEvent) => {
  try {
    const analyticsRef = doc(db, 'analytics', clickEvent.slug)
    
    // Update analytics
    await updateDoc(analyticsRef, {
      clicks: increment(1),
      [`platformViews.${clickEvent.platform || 'unknown'}`]: increment(1)
    })

    // Store detailed click event
    await addDoc(collection(db, 'clickEvents'), {
      ...clickEvent,
      timestamp: new Date()
    })

    // Track in Google Analytics
    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('event', 'click', {
        event_category: 'card_interaction',
        event_label: clickEvent.linkType,
        custom_parameter: {
          card_slug: clickEvent.slug,
          platform: clickEvent.platform,
          link_type: clickEvent.linkType
        }
      })
    }
  } catch (error) {
    console.error('Error tracking link click:', error)
  }
}

// Track share event
export const trackShare = async (slug: string, platform: string) => {
  try {
    const analyticsRef = doc(db, 'analytics', slug)
    
    await updateDoc(analyticsRef, {
      shares: increment(1)
    })

    // Track in Google Analytics
    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('event', 'share', {
        method: platform,
        content_type: 'card',
        custom_parameter: {
          card_slug: slug,
          platform: platform
        }
      })
    }
  } catch (error) {
    console.error('Error tracking share:', error)
  }
}

// Get analytics data
export const getAnalytics = async (slug: string): Promise<AnalyticsData | null> => {
  try {
    const analyticsRef = doc(db, 'analytics', slug)
    const analyticsDoc = await getDoc(analyticsRef)
    
    if (analyticsDoc.exists()) {
      return analyticsDoc.data() as AnalyticsData
    }
    return null
  } catch (error) {
    console.error('Error getting analytics:', error)
    return null
  }
}

// Get popular cards
export const getPopularCards = async (limit: number = 10) => {
  try {
    // This would require a more complex query with Firebase
    // For now, we'll return a placeholder
    return []
  } catch (error) {
    console.error('Error getting popular cards:', error)
    return []
  }
} 