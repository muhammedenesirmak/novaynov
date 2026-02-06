import express from 'express'
import { authMiddleware } from '../middleware/auth.js'
import {
  getTopicQuestions,
  getQuestion,
} from '../controllers/questionsController.js'

const router = express.Router()

// Tüm route'lar auth gerektirir
router.use(authMiddleware)

// GET /api/questions/topic/:topicId - Konunun sorularını getir (spaced repetition)
router.get('/topic/:topicId', getTopicQuestions)

// GET /api/questions/:questionId - Soru detayını getir
router.get('/:questionId', getQuestion)

export default router
