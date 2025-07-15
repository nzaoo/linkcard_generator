import { NextApiRequest, NextApiResponse } from 'next'
import { db } from '@/lib/firebase'
import { collection, query, where, getDocs } from 'firebase/firestore'

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
    console.error('API Error:', error)
    res.status(500).json({ error: 'Internal Server Error' })
  }
}

// GET /api/cards/[slug] - Get card by slug
async function handleGet(slug: string, res: NextApiResponse) {
  try {
    const q = query(collection(db, 'cards'), where('slug', '==', slug))
    const querySnapshot = await getDocs(q)

    if (querySnapshot.empty) {
      return res.status(404).json({ error: 'Card not found' })
    }

    const doc = querySnapshot.docs[0]
    const data = doc.data()
    const card = {
      id: doc.id,
      name: data.name || '',
      bio: data.bio || '',
      links: data.links || [],
      avatar: data.avatar || '',
      slug: data.slug || '',
      createdAt: data.createdAt?.toDate?.() || data.createdAt || new Date(),
      updatedAt: data.updatedAt?.toDate?.() || data.updatedAt || new Date()
    }

    res.status(200).json({
      success: true,
      data: card
    })
  } catch (error) {
    console.error('Error fetching card by slug:', error)
    res.status(500).json({ error: 'Failed to fetch card' })
  }
} 