import { NextApiRequest, NextApiResponse } from 'next'
import { getAnalytics } from '@/lib/analytics'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { method } = req
  const { slug } = req.query

  if (!slug || typeof slug !== 'string') {
    return res.status(400).json({ error: 'Card slug is required' })
  }

  try {
    switch (method) {
      case 'GET':
        await handleGet(slug, res)
        break
      default:
        res.setHeader('Allow', ['GET'])
        res.status(405).json({ error: `Method ${method} Not Allowed` })
    }
  } catch (error) {
    console.error('Analytics API Error:', error)
    res.status(500).json({ error: 'Internal Server Error' })
  }
}

// GET /api/analytics/[slug] - Get analytics for a specific card
async function handleGet(slug: string, res: NextApiResponse) {
  try {
    const analytics = await getAnalytics(slug)

    if (!analytics) {
      return res.status(404).json({ 
        error: 'Analytics not found',
        message: 'No analytics data available for this card'
      })
    }

    // Calculate additional metrics
    const totalEngagement = analytics.views + analytics.clicks + analytics.shares
    const clickThroughRate = analytics.views > 0 ? (analytics.clicks / analytics.views * 100).toFixed(2) : 0
    const shareRate = analytics.views > 0 ? (analytics.shares / analytics.views * 100).toFixed(2) : 0

    // Get top referrers
    const topReferrers = Object.entries(analytics.referrers || {})
      .sort(([,a], [,b]) => b - a)
      .slice(0, 5)
      .map(([referrer, count]) => ({ referrer, count }))

    // Get top platforms
    const topPlatforms = Object.entries(analytics.platformViews || {})
      .sort(([,a], [,b]) => b - a)
      .slice(0, 5)
      .map(([platform, count]) => ({ platform, count }))

    const enhancedAnalytics = {
      ...analytics,
      metrics: {
        totalEngagement,
        clickThroughRate: `${clickThroughRate}%`,
        shareRate: `${shareRate}%`,
        averageEngagement: totalEngagement > 0 ? (totalEngagement / analytics.views).toFixed(2) : 0
      },
      topReferrers,
      topPlatforms,
      lastUpdated: new Date().toISOString()
    }

    res.status(200).json({
      success: true,
      data: enhancedAnalytics
    })
  } catch (error) {
    console.error('Error fetching analytics:', error)
    res.status(500).json({ error: 'Failed to fetch analytics' })
  }
} 