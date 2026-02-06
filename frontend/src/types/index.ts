export interface User {
  id: string
  email: string
  full_name: string
  avatar_url?: string
  total_xp: number
  level: number
  streak_days: number
  last_activity_date?: string
  is_premium: boolean
  premium_until?: string
  premium_source?: 'payment' | 'referral'
  referral_code: string
  referred_by?: string
  referral_count: number
  created_at: string
  updated_at: string
}

export interface Subject {
  id: string
  name: string
  slug: string
  icon_url?: string
  color: string
  order_index: number
  is_active: boolean
  created_at: string
}

export interface Topic {
  id: string
  subject_id: string
  name: string
  slug: string
  description?: string
  order_index: number
  difficulty_level: 'kolay' | 'orta' | 'zor'
  is_active: boolean
  created_at: string
}

export interface Flashcard {
  id: string
  topic_id: string
  front_text: string
  back_text: string
  front_image_url?: string
  back_image_url?: string
  order_index: number
  is_active: boolean
  created_at: string
}

export interface Question {
  id: string
  topic_id: string
  question_text: string
  question_image_url?: string
  options: QuestionOption[]
  correct_answer: string
  explanation?: string
  explanation_image_url?: string
  difficulty_level: 'kolay' | 'orta' | 'zor'
  tags: string[]
  is_active: boolean
  created_at: string
}

export interface QuestionOption {
  key: string
  text: string
}

export interface UserProgress {
  id: string
  user_id: string
  question_id: string
  user_answer?: string
  is_correct: boolean
  time_spent_seconds: number
  times_seen: number
  times_correct: number
  times_wrong: number
  last_seen_at: string
  next_review_at?: string
  answered_at: string
  session_id: string
  created_at: string
}

export interface Session {
  id: string
  user_id: string
  topic_id: string
  started_at: string
  completed_at?: string
  total_questions: number
  correct_answers: number
  xp_earned: number
  is_completed: boolean
  created_at: string
}

export interface DailyStat {
  id: string
  user_id: string
  date: string
  questions_answered: number
  questions_correct: number
  xp_earned: number
  time_spent_seconds: number
  tests_completed: number
  created_at: string
}
