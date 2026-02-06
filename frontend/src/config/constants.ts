export const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000/api'
export const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL
export const SUPABASE_ANON_KEY = import.meta.env.VITE_SUPABASE_ANON_KEY
export const R2_PUBLIC_URL = import.meta.env.VITE_CLOUDFLARE_R2_PUBLIC_URL

// XP Rules
export const XP_RULES = {
  QUESTION_CORRECT: 10,
  QUESTION_FIRST_TRY: 5,
  QUESTION_FAST_ANSWER: 3,
  FLASHCARD_VIEW: 2,
  SESSION_COMPLETE: 20,
  DAILY_STREAK: 15,
  TOPIC_MASTERY: 50,
  REFERRAL_SUCCESS: 100,
} as const

// Daily Limits
export const DAILY_LIMITS = {
  FREE: {
    TESTS_PER_DAY: 3,
    QUESTIONS_PER_TEST: 10,
  },
  PREMIUM: {
    TESTS_PER_DAY: Infinity,
    QUESTIONS_PER_TEST: 20,
  },
} as const

// Level Calculation
export const calculateLevel = (totalXP: number): number => {
  return Math.floor(Math.sqrt(totalXP / 50)) + 1
}

export const getXPForNextLevel = (currentLevel: number): number => {
  return Math.pow(currentLevel, 2) * 50
}
