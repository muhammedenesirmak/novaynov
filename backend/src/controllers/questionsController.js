import { supabase } from '../config/database.js'

// Spaced Repetition algoritması ile soru getir
export async function getTopicQuestions(req, res) {
  try {
    const { topicId } = req.params
    const userId = req.userId
    const { limit = 10 } = req.query

    // 1. Önce hiç görülmemiş soruları al
    const { data: unseenQuestions, error: unseenError } = await supabase
      .from('questions')
      .select(`
        *,
        user_progress!left(*)
      `)
      .eq('topic_id', topicId)
      .eq('is_active', true)
      .is('user_progress.id', null)
      .limit(parseInt(limit))

    if (unseenError) {
      console.error('Get unseen questions error:', unseenError)
    }

    // 2. Tekrar edilmesi gereken soruları al (next_review_at geçmiş)
    const now = new Date().toISOString()
    const { data: reviewQuestions, error: reviewError } = await supabase
      .from('user_progress')
      .select('*, questions(*)')
      .eq('user_id', userId)
      .lte('next_review_at', now)
      .eq('questions.topic_id', topicId)
      .eq('questions.is_active', true)
      .limit(parseInt(limit))

    if (reviewError) {
      console.error('Get review questions error:', reviewError)
    }

    // Soruları birleştir - önce tekrar, sonra yeni
    const reviewQs = (reviewQuestions || []).map(rq => rq.questions)
    const unseenQs = unseenQuestions || []
    
    const questions = [...reviewQs, ...unseenQs].slice(0, parseInt(limit))

    return res.status(200).json({
      success: true,
      questions,
      meta: {
        total: questions.length,
        review: reviewQs.length,
        new: unseenQs.length,
      },
    })
  } catch (error) {
    console.error('Get topic questions error:', error)
    return res.status(500).json({
      success: false,
      message: 'Sunucu hatası',
    })
  }
}

// Soru detayını getir
export async function getQuestion(req, res) {
  try {
    const { questionId } = req.params

    const { data: question, error } = await supabase
      .from('questions')
      .select('*, topic:topics(*, subject:subjects(*))')
      .eq('id', questionId)
      .eq('is_active', true)
      .single()

    if (error || !question) {
      return res.status(404).json({
        success: false,
        message: 'Soru bulunamadı',
      })
    }

    // Cevabı ve açıklamayı gizle (frontend'de gösterilecek)
    const questionData = {
      ...question,
      correct_answer: undefined,
      explanation: undefined,
      explanation_image_url: undefined,
    }

    return res.status(200).json({
      success: true,
      question: questionData,
    })
  } catch (error) {
    console.error('Get question error:', error)
    return res.status(500).json({
      success: false,
      message: 'Sunucu hatası',
    })
  }
}
