import express from 'express'
import {
  register,
  login,
  getMe,
  logout,
} from '../controllers/authController.js'
import { authMiddleware } from '../middleware/auth.js'
import { authLimiter } from '../middleware/rateLimit.js'

const router = express.Router()

// Public routes (rate limited)
router.post('/register', authLimiter, register)
router.post('/login', authLimiter, login)

// Protected routes
router.get('/me', authMiddleware, getMe)
router.post('/logout', authMiddleware, logout)

export default router
