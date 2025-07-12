import { NextApiRequest, NextApiResponse } from 'next'
import { db } from '@/lib/firebase'
import { collection, doc, getDocs, addDoc, updateDoc, deleteDoc, query, where, orderBy, limit } from 'firebase/firestore'
import generateSlug from '@/utils/generateSlug'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { method } = req

  try {
    switch (method) {
      case 'GET':
        await handleGet(req, res)
        break
      case 'POST':
        await handlePost(req, res)
        break
      case 'PUT':
        await handlePut(req, res)
        break
      case 'DELETE':
        await handleDelete(req, res)
        break
      default:
        res.setHeader('Allow', ['GET', 'POST', 'PUT', 'DELETE'])
        res.status(405).json({ error: `Method ${method} Not Allowed` })
    }
  } catch (error) {
    console.error('API Error:', error)
    res.status(500).json({ error: 'Internal Server Error' })
  }
}

// GET /api/cards - Get all cards or search cards
async function handleGet(req: NextApiRequest, res: NextApiResponse) {
  const { search, limit: limitParam, sortBy = 'createdAt', order = 'desc' } = req.query

  try {
    let q = query(collection(db, 'cards'))

    // Add search filter if provided
    if (search && typeof search === 'string') {
      // Note: Firestore doesn't support full-text search, so we'll filter client-side
      // In a production app, you'd use Algolia or similar for search
    }

    // Add sorting
    if (sortBy === 'name') {
      q = query(q, orderBy('name', order as 'asc' | 'desc'))
    } else if (sortBy === 'createdAt') {
      q = query(q, orderBy('createdAt', order as 'asc' | 'desc'))
    }

    // Add limit
    if (limitParam && typeof limitParam === 'string') {
      const limitNum = parseInt(limitParam)
      if (!isNaN(limitNum)) {
        q = query(q, limit(limitNum))
      }
    }

    const querySnapshot = await getDocs(q)
    const cards = querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data(),
      createdAt: doc.data().createdAt?.toDate?.() || doc.data().createdAt
    }))

    // Apply search filter client-side if needed
    let filteredCards = cards
    if (search && typeof search === 'string') {
      const searchLower = search.toLowerCase()
      filteredCards = cards.filter(card => 
        card.name?.toLowerCase().includes(searchLower) ||
        card.bio?.toLowerCase().includes(searchLower)
      )
    }

    res.status(200).json({
      success: true,
      data: filteredCards,
      total: filteredCards.length
    })
  } catch (error) {
    console.error('Error fetching cards:', error)
    res.status(500).json({ error: 'Failed to fetch cards' })
  }
}

// POST /api/cards - Create a new card
async function handlePost(req: NextApiRequest, res: NextApiResponse) {
  const { name, bio, links, avatar } = req.body

  // Validate required fields
  if (!name || !bio) {
    return res.status(400).json({ error: 'Name and bio are required' })
  }

  try {
    // Generate unique slug
    const baseSlug = generateSlug(name)
    let slug = baseSlug
    let counter = 1

    // Check if slug exists and generate unique one
    while (true) {
      const existingCard = await getDocs(query(collection(db, 'cards'), where('slug', '==', slug)))
      if (existingCard.empty) break
      slug = `${baseSlug}-${counter}`
      counter++
    }

    const cardData = {
      name,
      bio,
      links: links || [],
      avatar,
      slug,
      createdAt: new Date(),
      updatedAt: new Date()
    }

    const docRef = await addDoc(collection(db, 'cards'), cardData)

    res.status(201).json({
      success: true,
      data: {
        id: docRef.id,
        ...cardData
      }
    })
  } catch (error) {
    console.error('Error creating card:', error)
    res.status(500).json({ error: 'Failed to create card' })
  }
}

// PUT /api/cards - Update a card
async function handlePut(req: NextApiRequest, res: NextApiResponse) {
  const { id } = req.query
  const { name, bio, links, avatar } = req.body

  if (!id || typeof id !== 'string') {
    return res.status(400).json({ error: 'Card ID is required' })
  }

  try {
    const cardRef = doc(db, 'cards', id)
    const updateData: any = {
      updatedAt: new Date()
    }

    if (name !== undefined) updateData.name = name
    if (bio !== undefined) updateData.bio = bio
    if (links !== undefined) updateData.links = links
    if (avatar !== undefined) updateData.avatar = avatar

    await updateDoc(cardRef, updateData)

    res.status(200).json({
      success: true,
      message: 'Card updated successfully'
    })
  } catch (error) {
    console.error('Error updating card:', error)
    res.status(500).json({ error: 'Failed to update card' })
  }
}

// DELETE /api/cards - Delete a card
async function handleDelete(req: NextApiRequest, res: NextApiResponse) {
  const { id } = req.query

  if (!id || typeof id !== 'string') {
    return res.status(400).json({ error: 'Card ID is required' })
  }

  try {
    const cardRef = doc(db, 'cards', id)
    await deleteDoc(cardRef)

    res.status(200).json({
      success: true,
      message: 'Card deleted successfully'
    })
  } catch (error) {
    console.error('Error deleting card:', error)
    res.status(500).json({ error: 'Failed to delete card' })
  }
} 