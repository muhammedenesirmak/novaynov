import { supabase } from '../config/database.js'

// Tüm dersleri listele
export async function getSubjects(req, res) {
  try {
    const { data: subjects, error } = await supabase
      .from('subjects')
      .select('*')
      .eq('is_active', true)
      .order('order_index', { ascending: true })

    if (error) {
      console.error('Get subjects error:', error)
      return res.status(500).json({
        success: false,
        message: 'Dersler alınamadı',
      })
    }

    return res.status(200).json({
      success: true,
      subjects,
    })
  } catch (error) {
    console.error('Get subjects error:', error)
    return res.status(500).json({
      success: false,
      message: 'Sunucu hatası',
    })
  }
}

// Belirli bir dersin konularını getir
export async function getSubjectTopics(req, res) {
  try {
    const { subjectId } = req.params

    const { data: topics, error } = await supabase
      .from('topics')
      .select('*')
      .eq('subject_id', subjectId)
      .eq('is_active', true)
      .order('order_index', { ascending: true })

    if (error) {
      console.error('Get topics error:', error)
      return res.status(500).json({
        success: false,
        message: 'Konular alınamadı',
      })
    }

    return res.status(200).json({
      success: true,
      topics,
    })
  } catch (error) {
    console.error('Get topics error:', error)
    return res.status(500).json({
      success: false,
      message: 'Sunucu hatası',
    })
  }
}

// Dersin istatistiklerini getir
export async function getSubjectStats(req, res) {
  try {
    const { subjectId } = req.params
    const userId = req.userId

    // Toplam konu sayısı
    const { count: totalTopics } = await supabase
      .from('topics')
      .select('*', { count: 'exact', head: true })
      .eq('subject_id', subjectId)
      .eq('is_active', true)

    // Toplam soru sayısı
    const { count: totalQuestions } = await supabase
      .from('questions')
      .select('topics!inner(*)', { count: 'exact', head: true })
      .eq('topics.subject_id', subjectId)
      .eq('is_active', true)

    // Kullanıcının çözdüğü soru sayısı
    const { count: solvedQuestions } = await supabase
      .from('user_progress')
      .select('questions!inner(topics!inner(*))', { count: 'exact', head: true })
      .eq('user_id', userId)
      .eq('questions.topics.subject_id', subjectId)

    // Doğru cevap sayısı
    const { count: correctAnswers } = await supabase
      .from('user_progress')
      .select('questions!inner(topics!inner(*))', { count: 'exact', head: true })
      .eq('user_id', userId)
      .eq('is_correct', true)
      .eq('questions.topics.subject_id', subjectId)

    const accuracy = solvedQuestions > 0 
      ? Math.round((correctAnswers / solvedQuestions) * 100) 
      : 0

    return res.status(200).json({
      success: true,
      stats: {
        totalTopics,
        totalQuestions,
        solvedQuestions,
        correctAnswers,
        accuracy,
      },
    })
  } catch (error) {
    console.error('Get subject stats error:', error)
    return res.status(500).json({
      success: false,
      message: 'Sunucu hatası',
    })
  }
}
