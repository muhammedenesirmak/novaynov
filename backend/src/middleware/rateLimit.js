import rateLimit from 'express-rate-limit'

// Genel API rate limit
export const generalLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 dakika
  max: 100, // 100 istek
  message: {
    success: false,
    message: 'Çok fazla istek gönderdiniz. Lütfen daha sonra tekrar deneyin.',
  },
  standardHeaders: true,
  legacyHeaders: false,
})

// Auth endpoint'leri için daha sıkı limit
export const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 dakika
  max: 5, // 5 login denemesi
  message: {
    success: false,
    message: 'Çok fazla giriş denemesi. 15 dakika sonra tekrar deneyin.',
  },
  standardHeaders: true,
  legacyHeaders: false,
})
