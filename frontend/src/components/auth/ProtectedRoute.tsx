import { ReactNode, useEffect } from 'react'
import { Navigate } from 'react-router-dom'
import { useAuthStore } from '@/stores/authStore'
import { authAPI } from '@/services/api'

interface ProtectedRouteProps {
  children: ReactNode
}

const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
  const { user, isLoading, setUser, setLoading } = useAuthStore()

  useEffect(() => {
    // Eğer user varsa veya loading bitmediyse, hiçbir şey yapma
    if (user || isLoading) return

    // Token kontrolü
    const token = localStorage.getItem('auth_token')
    if (!token) {
      setLoading(false)
      return
    }

    // Token varsa ama user yoksa, API'den al
    const fetchUser = async () => {
      try {
        const response = await authAPI.me()
        setUser(response.data.user)
      } catch (error) {
        localStorage.removeItem('auth_token')
        setUser(null)
      } finally {
        setLoading(false)
      }
    }

    fetchUser()
  }, [user, isLoading, setUser, setLoading])

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-primary-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-text-secondary">Yükleniyor...</p>
        </div>
      </div>
    )
  }

  if (!user) {
    return <Navigate to="/login" replace />
  }

  return <>{children}</>
}

export default ProtectedRoute
