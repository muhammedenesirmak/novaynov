import { supabase } from '../config/database.js'

// Konuyu detaylarıyla getir
export async function getTopic(req, res) {
  try {
    const { topicId } = req.params
    const userId = req.userId

    const { data: topic, error } = await supabase
      .from('topics')
      .select('*, subject:subjects(*)')
      .eq('id', topicId)
      .eq('is_active', true)
      .single()

    if (error || !topic) {
      return res.status(404).json({
        success: false,
        message: 'Konu bulunamadı',
      })
    }

    // Konu istatistikleri
    const { count: totalQuestions } = await supabase
      .from('questions')
      .select('*', { count: 'exact', head: true })
      .eq('topic_id', topicId)
      .eq('is_active', true)

    const { count: totalFlashcards } = await supabase
      .from('flashcards')
      .select('*', { count: 'exact', head: true })
      .eq('topic_id', topicId)
      .eq('is_active', true)

    const { count: solvedQuestions } = await supabase
      .from('user_progress')
      .select('questions!inner(*)', { count: 'exact', head: true })
      .eq('user_id', userId)
      .eq('questions.topic_id', topicId)

    return res.status(200).json({
      success: true,
      topic: {
        ...topic,
        stats: {
          totalQuestions,
          totalFlashcards,
          solvedQuestions,
        },
      },
    })
  } catch (error) {
    console.error('Get topic error:', error)
    return res.status(500).json({
      success: false,
      message: 'Sunucu hatası',
    })
  }
}

// Konunun flashcard'larını getir
export async function getTopicFlashcards(req, res) {
  try {
    const { topicId } = req.params

    const { data: flashcards, error } = await supabase
      .from('flashcards')
      .select('*')
      .eq('topic_id', topicId)
      .eq('is_active', true)
      .order('order_index', { ascending: true })

    if (error) {
      console.error('Get flashcards error:', error)
      return res.status(500).json({
        success: false,
        message: 'Flashcard\'lar alınamadı',
      })
    }

    return res.status(200).json({
      success: true,
      flashcards,
    })
  } catch (error) {
    console.error('Get flashcards error:', error)
    return res.status(500).json({
      success: false,
      message: 'Sunucu hatası',
    })
  }
}
