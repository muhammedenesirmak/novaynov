import { supabase } from '../config/database.js'

export const premiumMiddleware = async (req, res, next) => {
  try {
    const userId = req.userId

    if (!userId) {
      return res.status(401).json({
        success: false,
        message: 'Kullanıcı bulunamadı',
      })
    }

    // Kullanıcının premium durumunu kontrol et
    const { data: user, error } = await supabase
      .from('users')
      .select('is_premium, premium_until')
      .eq('id', userId)
      .single()

    if (error || !user) {
      return res.status(404).json({
        success: false,
        message: 'Kullanıcı bulunamadı',
      })
    }

    // Premium kontrolü
    const isPremiumActive =
      user.is_premium &&
      user.premium_until &&
      new Date(user.premium_until) > new Date()

    if (!isPremiumActive) {
      return res.status(403).json({
        success: false,
        message: 'Bu özellik sadece premium kullanıcılar için geçerlidir',
        requiresPremium: true,
      })
    }

    next()
  } catch (error) {
    console.error('Premium middleware error:', error)
    return res.status(500).json({
      success: false,
      message: 'Premium kontrol hatası',
    })
  }
}
