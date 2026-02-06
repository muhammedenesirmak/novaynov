import { supabase } from '../config/database.js'

export const authMiddleware = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({
        success: false,
        message: 'Yetkilendirme token\'ı bulunamadı',
      })
    }

    const token = authHeader.split(' ')[1]

    // Supabase ile token doğrulama
    const { data: { user }, error } = await supabase.auth.getUser(token)

    if (error || !user) {
      return res.status(401).json({
        success: false,
        message: 'Geçersiz veya süresi dolmuş token',
      })
    }

    // Kullanıcı bilgilerini request'e ekle
    req.user = user
    req.userId = user.id

    next()
  } catch (error) {
    console.error('Auth middleware error:', error)
    return res.status(500).json({
      success: false,
      message: 'Yetkilendirme hatası',
    })
  }
}
