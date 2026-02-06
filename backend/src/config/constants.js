// Constants for backend

// XP Kazanma
export const XP_PER_CORRECT_ANSWER = 10
export const XP_PER_WRONG_ANSWER = 2
export const XP_PER_FLASHCARD = 3
export const XP_STREAK_BONUS = 15

// Limitler
export const DAILY_FREE_QUESTION_LIMIT = 50
export const DAILY_PREMIUM_QUESTION_LIMIT = 999999 // Unlimited

// Spaced Repetition İntervals (günler)
export const SPACED_REPETITION_INTERVALS = [1, 3, 7, 14, 30]

// Level hesaplama
export function calculateLevel(totalXp) {
  return Math.floor(Math.sqrt(totalXp / 50)) + 1
}

export function getXPForNextLevel(level) {
  return (level * level) * 50
}
