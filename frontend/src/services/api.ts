import axios from 'axios'

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000/api'

const api = axios.create({
  baseURL: API_BASE_URL,
  withCredentials: true,
})

// Request interceptor - Auth token ekleme
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('auth_token')
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

// Response interceptor - Error handling
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('auth_token')
      window.location.href = '/login'
    }
    return Promise.reject(error)
  }
)

// =============================================================================
// AUTH API
// =============================================================================

export const authAPI = {
  register: (data: any) => api.post('/auth/register', data),
  login: (data: any) => api.post('/auth/login', data),
  logout: () => api.post('/auth/logout'),
  me: () => api.get('/auth/me'),
}

// =============================================================================
// SUBJECTS API
// =============================================================================

export const subjectsAPI = {
  getAll: () => api.get('/subjects'),
  getTopics: (subjectId: string) => api.get(`/subjects/${subjectId}/topics`),
  getStats: (subjectId: string) => api.get(`/subjects/${subjectId}/stats`),
}

// =============================================================================
// TOPICS API
// =============================================================================

export const topicsAPI = {
  get: (topicId: string) => api.get(`/topics/${topicId}`),
  getFlashcards: (topicId: string) => api.get(`/topics/${topicId}/flashcards`),
}

// =============================================================================
// QUESTIONS API
// =============================================================================

export const questionsAPI = {
  getTopicQuestions: (topicId: string, limit: number = 10) => 
    api.get(`/questions/topic/${topicId}`, { params: { limit } }),
  get: (questionId: string) => api.get(`/questions/${questionId}`),
}

// =============================================================================
// PROGRESS API
// =============================================================================

export const progressAPI = {
  submitAnswer: (data: any) => api.post('/progress/submit', data),
  getDailyStats: () => api.get('/progress/daily-stats'),
}

export default api
