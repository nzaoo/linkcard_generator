import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import Head from 'next/head'
import { db } from '@/lib/firebase'
import { collection, query, where, getDocs, orderBy, limit } from 'firebase/firestore'
import { getAnalytics } from '@/lib/analytics'
import CardPreview from '@/components/Card/CardPreview'
import LoadingSkeleton from '@/components/ui/LoadingSkeleton'
import ErrorBoundary from '@/components/ui/ErrorBoundary'
import { useToast, ToastContainer } from '@/components/ui/Toast'

interface CardData {
  id: string
  name: string
  bio: string
  links: any[]
  slug: string
  avatar?: string
  createdAt: Date
  analytics?: {
    views: number
    clicks: number
    shares: number
  }
}

export default function DashboardPage() {
  const router = useRouter()
  const { toasts, removeToast, showSuccess, showError } = useToast()
  const [cards, setCards] = useState<CardData[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [selectedCard, setSelectedCard] = useState<CardData | null>(null)
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid')
  const [searchTerm, setSearchTerm] = useState('')
  const [sortBy, setSortBy] = useState<'name' | 'created' | 'views'>('created')

  useEffect(() => {
    fetchCards()
  }, [])

  const fetchCards = async () => {
    try {
      setIsLoading(true)
      
      // For demo purposes, we'll fetch all cards
      // In a real app, you'd filter by user ID
      const cardsRef = collection(db, 'cards')
      const q = query(cardsRef, orderBy('createdAt', 'desc'), limit(20))
      const querySnapshot = await getDocs(q)
      
      const cardsData: CardData[] = []
      
      for (const doc of querySnapshot.docs) {
        const cardData = doc.data() as CardData
        cardData.id = doc.id
        
        // Fetch analytics for each card
        try {
          const analytics = await getAnalytics(cardData.slug)
          if (analytics) {
            cardData.analytics = {
              views: analytics.views,
              clicks: analytics.clicks,
              shares: analytics.shares
            }
          }
        } catch (error) {
          console.error('Error fetching analytics for card:', cardData.slug, error)
        }
        
        cardsData.push(cardData)
      }
      
      setCards(cardsData)
    } catch (error) {
      console.error('Error fetching cards:', error)
      showError('Failed to load cards')
    } finally {
      setIsLoading(false)
    }
  }

  const filteredCards = cards.filter(card =>
    card.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    card.bio.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const sortedCards = [...filteredCards].sort((a, b) => {
    switch (sortBy) {
      case 'name':
        return a.name.localeCompare(b.name)
      case 'views':
        return (b.analytics?.views || 0) - (a.analytics?.views || 0)
      case 'created':
      default:
        return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    }
  })

  const handleCreateNew = () => {
    router.push('/')
  }

  const handleEditCard = (card: CardData) => {
    // In a real app, you'd navigate to an edit page
    router.push(`/edit/${card.slug}`)
  }

  const handleViewCard = (card: CardData) => {
    router.push(`/u/${card.slug}`)
  }

  const handleShareCard = (card: CardData) => {
    const url = `${window.location.origin}/u/${card.slug}`
    navigator.clipboard.writeText(url)
    showSuccess('Card URL copied to clipboard!')
  }

  const totalViews = cards.reduce((sum, card) => sum + (card.analytics?.views || 0), 0)
  const totalClicks = cards.reduce((sum, card) => sum + (card.analytics?.clicks || 0), 0)
  const totalShares = cards.reduce((sum, card) => sum + (card.analytics?.shares || 0), 0)

  return (
    <ErrorBoundary>
      <Head>
        <title>Dashboard - NZaoCard</title>
        <meta name="description" content="Manage your personal cards and view analytics" />
      </Head>

      <div className="min-h-screen dark-gradient-bg starry-bg shooting-stars relative overflow-hidden">
        {/* Animated background elements */}
        <div className="absolute inset-0 -z-10">
          <div className="absolute w-32 h-32 bg-white/10 rounded-full top-[10%] left-[10%] animate-float"></div>
          <div className="absolute w-24 h-24 bg-white/10 rounded-full top-[60%] right-[20%] animate-float delay-300"></div>
          <div className="absolute w-16 h-16 bg-white/10 rounded-full bottom-[20%] left-[30%] animate-float delay-600"></div>
        </div>

        <div className="container mx-auto px-4 py-8 relative z-10">
          {/* Header */}
          <div className="text-center mb-12 animate-fade-in">
            <h1 className="text-4xl md:text-5xl font-bold gold-gradient-text mb-4">
              Your Dashboard
            </h1>
            <p className="text-xl text-white/80 max-w-2xl mx-auto">
              Manage your personal cards, track analytics, and create new ones
            </p>
          </div>

          {/* Stats Overview */}
          <div className="grid md:grid-cols-4 gap-6 mb-8 animate-slide-in-up">
            <div className="glass-card rounded-2xl p-6 text-center">
              <div className="text-3xl font-bold text-yellow-400 mb-2">{cards.length}</div>
              <div className="text-white/70">Total Cards</div>
            </div>
            <div className="glass-card rounded-2xl p-6 text-center">
              <div className="text-3xl font-bold text-blue-400 mb-2">{totalViews}</div>
              <div className="text-white/70">Total Views</div>
            </div>
            <div className="glass-card rounded-2xl p-6 text-center">
              <div className="text-3xl font-bold text-green-400 mb-2">{totalClicks}</div>
              <div className="text-white/70">Total Clicks</div>
            </div>
            <div className="glass-card rounded-2xl p-6 text-center">
              <div className="text-3xl font-bold text-purple-400 mb-2">{totalShares}</div>
              <div className="text-white/70">Total Shares</div>
            </div>
          </div>

          {/* Controls */}
          <div className="glass-card rounded-2xl p-6 mb-8 animate-slide-in-up" style={{ animationDelay: '100ms' }}>
            <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
              <div className="flex gap-4">
                <button
                  onClick={handleCreateNew}
                  className="bg-gradient-to-r from-yellow-400 to-orange-500 text-gray-900 px-6 py-3 rounded-xl font-semibold hover:from-yellow-500 hover:to-orange-600 transition-all duration-200 transform hover:scale-105"
                >
                  ✨ Create New Card
                </button>
                <button
                  onClick={() => setViewMode(viewMode === 'grid' ? 'list' : 'grid')}
                  className="bg-white/20 backdrop-blur-lg text-white px-4 py-3 rounded-xl font-semibold hover:bg-white/30 transition-all duration-200 border border-white/30"
                >
                  {viewMode === 'grid' ? '📋 List View' : '🔲 Grid View'}
                </button>
              </div>

              <div className="flex gap-4 items-center">
                <input
                  type="text"
                  placeholder="Search cards..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="px-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/50 focus:outline-none focus:border-yellow-400"
                />
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value as any)}
                  className="px-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white focus:outline-none focus:border-yellow-400"
                >
                  <option value="created">Sort by Date</option>
                  <option value="name">Sort by Name</option>
                  <option value="views">Sort by Views</option>
                </select>
              </div>
            </div>
          </div>

          {/* Cards Display */}
          {isLoading ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[...Array(6)].map((_, i) => (
                <LoadingSkeleton key={i} className="h-96" />
              ))}
            </div>
          ) : sortedCards.length === 0 ? (
            <div className="text-center py-12 animate-fade-in">
              <div className="text-6xl mb-6">📝</div>
              <h3 className="text-2xl font-bold text-white mb-4">No Cards Found</h3>
              <p className="text-white/70 mb-8">
                {searchTerm ? 'No cards match your search.' : 'Create your first card to get started!'}
              </p>
              {!searchTerm && (
                <button
                  onClick={handleCreateNew}
                  className="bg-gradient-to-r from-yellow-400 to-orange-500 text-gray-900 px-8 py-4 rounded-xl font-semibold hover:from-yellow-500 hover:to-orange-600 transition-all duration-200"
                >
                  Create Your First Card
                </button>
              )}
            </div>
          ) : (
            <div className={`grid gap-6 ${viewMode === 'grid' ? 'md:grid-cols-2 lg:grid-cols-3' : 'grid-cols-1'}`}>
              {sortedCards.map((card, index) => (
                <div
                  key={card.id}
                  className="animate-slide-in-up"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  {viewMode === 'grid' ? (
                    <div className="glass-card rounded-2xl p-6 hover:scale-105 transition-all duration-200">
                      <CardPreview
                        name={card.name}
                        bio={card.bio}
                        links={card.links}
                        avatar={card.avatar}
                        isPreview={true}
                        className="mb-4"
                      />
                      
                      {/* Analytics */}
                      {card.analytics && (
                        <div className="grid grid-cols-3 gap-2 text-center text-sm mb-4">
                          <div>
                            <div className="font-bold text-yellow-400">{card.analytics.views}</div>
                            <div className="text-white/60">Views</div>
                          </div>
                          <div>
                            <div className="font-bold text-blue-400">{card.analytics.clicks}</div>
                            <div className="text-white/60">Clicks</div>
                          </div>
                          <div>
                            <div className="font-bold text-green-400">{card.analytics.shares}</div>
                            <div className="text-white/60">Shares</div>
                          </div>
                        </div>
                      )}

                      {/* Actions */}
                      <div className="flex gap-2">
                        <button
                          onClick={() => handleViewCard(card)}
                          className="flex-1 bg-blue-600 text-white py-2 px-3 rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors"
                        >
                          👁️ View
                        </button>
                        <button
                          onClick={() => handleShareCard(card)}
                          className="flex-1 bg-green-600 text-white py-2 px-3 rounded-lg text-sm font-medium hover:bg-green-700 transition-colors"
                        >
                          📤 Share
                        </button>
                        <button
                          onClick={() => handleEditCard(card)}
                          className="flex-1 bg-purple-600 text-white py-2 px-3 rounded-lg text-sm font-medium hover:bg-purple-700 transition-colors"
                        >
                          ✏️ Edit
                        </button>
                      </div>
                    </div>
                  ) : (
                    <div className="glass-card rounded-2xl p-6">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-4">
                          <div className="w-16 h-16 rounded-full bg-gradient-to-r from-yellow-400 to-orange-500 flex items-center justify-center text-2xl font-bold text-gray-900">
                            {card.name.charAt(0).toUpperCase()}
                          </div>
                          <div>
                            <h3 className="text-xl font-bold text-white">{card.name}</h3>
                            <p className="text-white/70">{card.bio}</p>
                            <div className="flex items-center space-x-4 text-sm text-white/60 mt-1">
                              <span>Created: {new Date(card.createdAt).toLocaleDateString()}</span>
                              {card.analytics && (
                                <>
                                  <span>• {card.analytics.views} views</span>
                                  <span>• {card.analytics.clicks} clicks</span>
                                </>
                              )}
                            </div>
                          </div>
                        </div>
                        <div className="flex gap-2">
                          <button
                            onClick={() => handleViewCard(card)}
                            className="bg-blue-600 text-white py-2 px-4 rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors"
                          >
                            View
                          </button>
                          <button
                            onClick={() => handleShareCard(card)}
                            className="bg-green-600 text-white py-2 px-4 rounded-lg text-sm font-medium hover:bg-green-700 transition-colors"
                          >
                            Share
                          </button>
                          <button
                            onClick={() => handleEditCard(card)}
                            className="bg-purple-600 text-white py-2 px-4 rounded-lg text-sm font-medium hover:bg-purple-700 transition-colors"
                          >
                            Edit
                          </button>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Toast Notifications */}
        <ToastContainer />
      </div>
    </ErrorBoundary>
  )
} 