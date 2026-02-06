import { create } from 'zustand'
import { User } from '@/types'

interface AuthState {
  user: User | null
  isAuthenticated: boolean
  isLoading: boolean
  setUser: (user: User | null) => void
  setLoading: (loading: boolean) => void
  logout: () => void
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  isAuthenticated: false,
  isLoading: false, // ProtectedRoute kendi kontrolünü yapıyor
  
  setUser: (user) =>
    set({
      user,
      isAuthenticated: !!user,
      isLoading: false,
    }),
  
  setLoading: (loading) =>
    set({ isLoading: loading }),
  
  logout: () => {
    localStorage.removeItem('auth_token')
    set({
      user: null,
      isAuthenticated: false,
      isLoading: false,
    })
  },
}))
