import { supabase } from '../config/database.js'
import { nanoid } from 'nanoid'

// Referral kodu oluştur
function generateReferralCode() {
  return nanoid(8).toUpperCase()
}

// Kullanıcı kaydı
export async function register(req, res) {
  try {
    const { email, password, fullName, referralCode } = req.body

    // Validation
    if (!email || !password || !fullName) {
      return res.status(400).json({
        success: false,
        message: 'Email, şifre ve ad soyad gereklidir',
      })
    }

    // Supabase Auth ile kullanıcı oluştur
    const { data: authData, error: authError } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          full_name: fullName,
        },
      },
    })

    if (authError) {
      return res.status(400).json({
        success: false,
        message: authError.message,
      })
    }

    const userId = authData.user.id

    // Referrer kontrol et (eğer referral kodu varsa)
    let referrerId = null
    if (referralCode) {
      console.log('📝 Referral code received:', referralCode)
      console.log('🔍 Searching in users table for code:', referralCode.toUpperCase())
      
      // Önce tüm kullanıcıları listele (debug)
      const { data: allUsers, error: allError } = await supabase
        .from('users')
        .select('id, email, referral_code')
        .limit(5)
      
      if (allUsers) {
        console.log('📊 Sample users in DB:', allUsers.map(u => u.referral_code))
      }
      
      const { data: referrer, error: referrerError } = await supabase
        .from('users')
        .select('id, email, referral_code')
        .eq('referral_code', referralCode.toUpperCase())
        .maybeSingle()

      if (referrerError) {
        console.log('⚠️ Database error while searching referrer:', referrerError)
      }

      if (referrer) {
        referrerId = referrer.id
        console.log('✅ Referrer found:', referrer.email, 'Code:', referrer.referral_code)
      } else {
        console.log('❌ No referrer found with code:', referralCode.toUpperCase())
        console.log('💡 Comparing:', {
          searched: referralCode.toUpperCase(),
          available: allUsers?.map(u => u.referral_code),
        })
      }
    } else {
      console.log('ℹ️ No referral code provided')
    }

    // Users tablosuna kullanıcı bilgilerini ekle
    const newReferralCode = generateReferralCode()

    const { error: userError } = await supabase.from('users').insert({
      id: userId,
      email,
      full_name: fullName,
      referral_code: newReferralCode,
      referred_by: referrerId,
    })

    if (userError) {
      console.error('User insert error:', userError)
      // Auth kullanıcısını sil (rollback)
      await supabase.auth.admin.deleteUser(userId)

      return res.status(500).json({
        success: false,
        message: 'Kullanıcı kaydı sırasında hata oluştu',
      })
    }

    // Eğer referral kodu kullanıldıysa, referral kaydı oluştur
    if (referrerId) {
      console.log('🎁 Referral detected:', {
        referrerId,
        newUserId: userId,
        referralCode: referralCode.toUpperCase(),
      })

      const { error: referralError } = await supabase.from('referrals').insert({
        referrer_id: referrerId,
        referred_id: userId,
      })

      if (referralError) {
        console.error('❌ Referral insert error:', referralError)
      } else {
        console.log('✅ Referral inserted successfully')
      }

      // Referrer'ın referral count'unu artır
      const { error: countError } = await supabase.rpc('increment_referral_count', { 
        user_id: referrerId 
      })

      if (countError) {
        console.error('❌ Increment referral count error:', countError)
      } else {
        console.log('✅ Referral count incremented')
      }

      // Bonus XP ver
      const { error: xpError } = await supabase.rpc('add_xp', { 
        user_id: referrerId, 
        xp_amount: 100 
      })

      if (xpError) {
        console.error('❌ Add XP error:', xpError)
      } else {
        console.log('✅ Bonus XP added (100 XP)')
      }
    }

    // Session token'ı döndür
    const { data: sessionData } = await supabase.auth.getSession()

    return res.status(201).json({
      success: true,
      message: 'Kayıt başarılı',
      user: {
        id: userId,
        email,
        full_name: fullName,
        referral_code: newReferralCode,
      },
      session: sessionData.session,
    })
  } catch (error) {
    console.error('Register error:', error)
    return res.status(500).json({
      success: false,
      message: 'Sunucu hatası',
    })
  }
}

// Kullanıcı girişi
export async function login(req, res) {
  try {
    const { email, password } = req.body

    // Validation
    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: 'Email ve şifre gereklidir',
      })
    }

    // Supabase Auth ile giriş yap
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    })

    if (error) {
      return res.status(401).json({
        success: false,
        message: 'Email veya şifre hatalı',
      })
    }

    // Kullanıcı bilgilerini al
    const { data: userData, error: userError } = await supabase
      .from('users')
      .select('*')
      .eq('id', data.user.id)
      .single()

    if (userError) {
      return res.status(500).json({
        success: false,
        message: 'Kullanıcı bilgileri alınamadı',
      })
    }

    // Streak kontrolü ve güncelleme
    await updateStreak(data.user.id)

    return res.status(200).json({
      success: true,
      message: 'Giriş başarılı',
      user: userData,
      session: data.session,
    })
  } catch (error) {
    console.error('Login error:', error)
    return res.status(500).json({
      success: false,
      message: 'Sunucu hatası',
    })
  }
}

// Kullanıcı bilgilerini getir
export async function getMe(req, res) {
  try {
    const userId = req.userId

    const { data: userData, error } = await supabase
      .from('users')
      .select('*')
      .eq('id', userId)
      .single()

    if (error) {
      return res.status(404).json({
        success: false,
        message: 'Kullanıcı bulunamadı',
      })
    }

    return res.status(200).json({
      success: true,
      user: userData,
    })
  } catch (error) {
    console.error('Get me error:', error)
    return res.status(500).json({
      success: false,
      message: 'Sunucu hatası',
    })
  }
}

// Çıkış yap
export async function logout(req, res) {
  try {
    const { error } = await supabase.auth.signOut()

    if (error) {
      return res.status(500).json({
        success: false,
        message: 'Çıkış yapılamadı',
      })
    }

    return res.status(200).json({
      success: true,
      message: 'Çıkış başarılı',
    })
  } catch (error) {
    console.error('Logout error:', error)
    return res.status(500).json({
      success: false,
      message: 'Sunucu hatası',
    })
  }
}

// Streak güncelleme yardımcı fonksiyonu
async function updateStreak(userId) {
  try {
    const { data: user } = await supabase
      .from('users')
      .select('streak_days, last_activity_date')
      .eq('id', userId)
      .single()

    if (!user) return

    const today = new Date().toISOString().split('T')[0]
    const lastActivity = user.last_activity_date

    if (!lastActivity) {
      // İlk aktivite
      await supabase
        .from('users')
        .update({
          streak_days: 1,
          last_activity_date: today,
        })
        .eq('id', userId)
      return
    }

    const lastDate = new Date(lastActivity)
    const todayDate = new Date(today)
    const daysDiff = Math.floor(
      (todayDate - lastDate) / (1000 * 60 * 60 * 24)
    )

    if (daysDiff === 0) {
      // Bugün zaten aktivite var
      return
    } else if (daysDiff === 1) {
      // Streak devam ediyor
      const newStreak = user.streak_days + 1

      await supabase
        .from('users')
        .update({
          streak_days: newStreak,
          last_activity_date: today,
        })
        .eq('id', userId)

      // Streak bonusu XP ekle
      await supabase.rpc('add_xp', { user_id: userId, xp_amount: 15 })
    } else {
      // Streak kırıldı
      await supabase
        .from('users')
        .update({
          streak_days: 1,
          last_activity_date: today,
        })
        .eq('id', userId)
    }
  } catch (error) {
    console.error('Update streak error:', error)
  }
}
