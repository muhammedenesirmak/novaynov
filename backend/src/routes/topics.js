import express from 'express'
import { authMiddleware } from '../middleware/auth.js'
import {
  getTopic,
  getTopicFlashcards,
} from '../controllers/topicsController.js'

const router = express.Router()

// Tüm route'lar auth gerektirir
router.use(authMiddleware)

// GET /api/topics/:topicId - Konu detaylarını getir
router.get('/:topicId', getTopic)

// GET /api/topics/:topicId/flashcards - Konunun flashcard'larını getir
router.get('/:topicId/flashcards', getTopicFlashcards)

export default router
