import { supabase } from '../config/database.js'
import {
  XP_PER_CORRECT_ANSWER,
  XP_PER_WRONG_ANSWER,
  DAILY_FREE_QUESTION_LIMIT,
} from '../config/constants.js'

// Soru cevabını kaydet ve XP ver
export async function submitAnswer(req, res) {
  try {
    const userId = req.userId
    const { questionId, userAnswer, timeSpent } = req.body

    // Validation
    if (!questionId || !userAnswer) {
      return res.status(400).json({
        success: false,
        message: 'Soru ID ve cevap gereklidir',
      })
    }

    // Soruyu al
    const { data: question, error: questionError } = await supabase
      .from('questions')
      .select('*')
      .eq('id', questionId)
      .single()

    if (questionError || !question) {
      return res.status(404).json({
        success: false,
        message: 'Soru bulunamadı',
      })
    }

    // Cevap kontrolü
    const isCorrect = userAnswer.toUpperCase() === question.correct_answer.toUpperCase()

    // XP hesapla
    const xpEarned = isCorrect ? XP_PER_CORRECT_ANSWER : XP_PER_WRONG_ANSWER

    // Kullanıcı bilgilerini al
    const { data: user, error: userError } = await supabase
      .from('users')
      .select('is_premium')
      .eq('id', userId)
      .single()

    if (userError) {
      return res.status(500).json({
        success: false,
        message: 'Kullanıcı bilgileri alınamadı',
      })
    }

    // Free kullanıcı için günlük limit kontrolü
    if (!user.is_premium) {
      const today = new Date().toISOString().split('T')[0]
      
      const { data: dailyStat } = await supabase
        .from('daily_stats')
        .select('questions_answered')
        .eq('user_id', userId)
        .eq('date', today)
        .single()

      if (dailyStat && dailyStat.questions_answered >= DAILY_FREE_QUESTION_LIMIT) {
        return res.status(403).json({
          success: false,
          message: 'Günlük soru limitiniz doldu. Premium olun!',
          limitReached: true,
        })
      }
    }

    // User progress kaydet
    const { data: existingProgress } = await supabase
      .from('user_progress')
      .select('*')
      .eq('user_id', userId)
      .eq('question_id', questionId)
      .single()

    // Spaced Repetition - Sonraki tekrar zamanı
    let nextReviewAt
    if (isCorrect) {
      // Doğru cevap: Daha uzun süre sonra tekrar göster
      const daysToAdd = existingProgress 
        ? Math.min(30, (existingProgress.times_correct + 1) * 3) 
        : 3
      nextReviewAt = new Date(Date.now() + daysToAdd * 24 * 60 * 60 * 1000).toISOString()
    } else {
      // Yanlış cevap: Kısa süre sonra tekrar göster
      nextReviewAt = new Date(Date.now() + 1 * 60 * 60 * 1000).toISOString() // 1 saat sonra
    }

    if (existingProgress) {
      // Güncelle
      await supabase
        .from('user_progress')
        .update({
          user_answer: userAnswer,
          is_correct: isCorrect,
          time_spent_seconds: timeSpent || 0,
          times_seen: existingProgress.times_seen + 1,
          times_correct: isCorrect ? existingProgress.times_correct + 1 : existingProgress.times_correct,
          times_wrong: isCorrect ? existingProgress.times_wrong : existingProgress.times_wrong + 1,
          last_seen_at: new Date().toISOString(),
          next_review_at: nextReviewAt,
        })
        .eq('id', existingProgress.id)
    } else {
      // Yeni kayıt
      await supabase
        .from('user_progress')
        .insert({
          user_id: userId,
          question_id: questionId,
          user_answer: userAnswer,
          is_correct: isCorrect,
          time_spent_seconds: timeSpent || 0,
          times_seen: 1,
          times_correct: isCorrect ? 1 : 0,
          times_wrong: isCorrect ? 0 : 1,
          next_review_at: nextReviewAt,
        })
    }

    // Daily stats güncelle
    const today = new Date().toISOString().split('T')[0]
    const { data: dailyStat } = await supabase
      .from('daily_stats')
      .select('*')
      .eq('user_id', userId)
      .eq('date', today)
      .single()

    if (dailyStat) {
      await supabase
        .from('daily_stats')
        .update({
          questions_answered: dailyStat.questions_answered + 1,
          questions_correct: isCorrect ? dailyStat.questions_correct + 1 : dailyStat.questions_correct,
          xp_earned: dailyStat.xp_earned + xpEarned,
        })
        .eq('id', dailyStat.id)
    } else {
      await supabase
        .from('daily_stats')
        .insert({
          user_id: userId,
          date: today,
          questions_answered: 1,
          questions_correct: isCorrect ? 1 : 0,
          xp_earned: xpEarned,
        })
    }

    // XP ekle
    await supabase.rpc('add_xp', { user_id: userId, xp_amount: xpEarned })

    // Güncel kullanıcı bilgilerini al
    const { data: updatedUser } = await supabase
      .from('users')
      .select('total_xp, level')
      .eq('id', userId)
      .single()

    return res.status(200).json({
      success: true,
      result: {
        isCorrect,
        correctAnswer: question.correct_answer,
        explanation: question.explanation,
        explanationImageUrl: question.explanation_image_url,
        xpEarned,
        totalXp: updatedUser.total_xp,
        level: updatedUser.level,
      },
    })
  } catch (error) {
    console.error('Submit answer error:', error)
    return res.status(500).json({
      success: false,
      message: 'Sunucu hatası',
    })
  }
}

// Kullanıcının günlük istatistiklerini getir
export async function getDailyStats(req, res) {
  try {
    const userId = req.userId
    const today = new Date().toISOString().split('T')[0]

    const { data: stats, error } = await supabase
      .from('daily_stats')
      .select('*')
      .eq('user_id', userId)
      .eq('date', today)
      .single()

    if (error && error.code !== 'PGRST116') { // PGRST116 = no rows
      console.error('Get daily stats error:', error)
      return res.status(500).json({
        success: false,
        message: 'İstatistikler alınamadı',
      })
    }

    const defaultStats = {
      questions_answered: 0,
      questions_correct: 0,
      xp_earned: 0,
      time_spent_seconds: 0,
      tests_completed: 0,
    }

    return res.status(200).json({
      success: true,
      stats: stats || defaultStats,
    })
  } catch (error) {
    console.error('Get daily stats error:', error)
    return res.status(500).json({
      success: false,
      message: 'Sunucu hatası',
    })
  }
}
