import express from 'express'
import { authMiddleware } from '../middleware/auth.js'
import {
  getSubjects,
  getSubjectTopics,
  getSubjectStats,
} from '../controllers/subjectsController.js'

const router = express.Router()

// Tüm route'lar auth gerektirir
router.use(authMiddleware)

// GET /api/subjects - Tüm dersleri listele
router.get('/', getSubjects)

// GET /api/subjects/:subjectId/topics - Dersin konularını getir
router.get('/:subjectId/topics', getSubjectTopics)

// GET /api/subjects/:subjectId/stats - Ders istatistikleri
router.get('/:subjectId/stats', getSubjectStats)

export default router
