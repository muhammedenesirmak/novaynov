import express from 'express'
import cors from 'cors'
import helmet from 'helmet'
import morgan from 'morgan'
import dotenv from 'dotenv'
import { generalLimiter } from './middleware/rateLimit.js'

// Routes
import authRoutes from './routes/auth.js'
import subjectsRoutes from './routes/subjects.js'
import topicsRoutes from './routes/topics.js'
import questionsRoutes from './routes/questions.js'
import progressRoutes from './routes/progress.js'

dotenv.config()

const app = express()

// Middleware
app.use(helmet()) // Security headers
app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:5173',
  credentials: true,
}))
app.use(morgan('dev')) // Logging
app.use(express.json()) // JSON body parser
app.use(express.urlencoded({ extended: true }))
app.use(generalLimiter) // Rate limiting

// Health check
app.get('/health', (req, res) => {
  res.json({
    success: true,
    message: 'NovaYnov API is running',
    timestamp: new Date().toISOString(),
  })
})

// API Routes
app.get('/api', (req, res) => {
  res.json({
    success: true,
    message: 'NovaYnov API v1.0',
    endpoints: {
      health: '/health',
      auth: '/api/auth',
      subjects: '/api/subjects',
      topics: '/api/topics',
      questions: '/api/questions',
      progress: '/api/progress',
    },
  })
})

// Routes
app.use('/api/auth', authRoutes)
app.use('/api/subjects', subjectsRoutes)
app.use('/api/topics', topicsRoutes)
app.use('/api/questions', questionsRoutes)
app.use('/api/progress', progressRoutes)

// 404 handler
app.use('*', (req, res) => {
  res.status(404).json({
    success: false,
    message: 'Endpoint bulunamadı',
  })
})

// Error handler
app.use((err, req, res, next) => {
  console.error('Error:', err)
  res.status(err.status || 500).json({
    success: false,
    message: err.message || 'Sunucu hatası',
    ...(process.env.NODE_ENV === 'development' && { stack: err.stack }),
  })
})

export default app
