import { useEffect } from 'react'
import { useAuthStore } from '@/stores/authStore'
import { authAPI } from '@/services/api'

export const useAuth = () => {
  const { user, isAuthenticated, isLoading, setUser, setLoading, logout: logoutStore } = useAuthStore()

  // Sayfa yüklendiğinde session kontrolü (SADECE BİR KEZ)
  useEffect(() => {
    const initAuth = async () => {
      // Eğer zaten user varsa, tekrar kontrol yapma
      if (user) {
        setLoading(false)
        return
      }

      // Token yoksa, direkt çık
      const token = localStorage.getItem('auth_token')
      if (!token) {
        setLoading(false)
        setUser(null)
        return
      }

      // Token varsa ama user yoksa, API'den al
      setLoading(true)
      try {
        const response = await authAPI.me()
        setUser(response.data.user)
      } catch (error) {
        console.error('Session check error:', error)
        // Token geçersizse temizle
        localStorage.removeItem('auth_token')
        setUser(null)
      } finally {
        setLoading(false)
      }
    }

    initAuth()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []) // Boş array - sadece mount'ta çalış

  // Çıkış yap
  const logout = async () => {
    try {
      await authAPI.logout()
      logoutStore()
    } catch (error) {
      console.error('Logout error:', error)
      // Hata olsa bile local state'i temizle
      logoutStore()
    }
  }

  return {
    user,
    isAuthenticated,
    isLoading,
    logout,
  }
}
