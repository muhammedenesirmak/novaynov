import express from 'express'
import { authMiddleware } from '../middleware/auth.js'
import {
  submitAnswer,
  getDailyStats,
} from '../controllers/progressController.js'

const router = express.Router()

// Tüm route'lar auth gerektirir
router.use(authMiddleware)

// POST /api/progress/submit - Soru cevabını kaydet
router.post('/submit', submitAnswer)

// GET /api/progress/daily-stats - Günlük istatistikleri getir
router.get('/daily-stats', getDailyStats)

export default router
