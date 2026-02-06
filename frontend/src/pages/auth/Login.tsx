import { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Helmet } from 'react-helmet-async'
import { Eye, EyeOff } from 'lucide-react'
import { authAPI } from '@/services/api'
import { useAuthStore } from '@/stores/authStore'
import Logo from '@/components/common/Logo'

const Login = () => {
  const navigate = useNavigate()
  const user = useAuthStore((state) => state.user)
  const setUser = useAuthStore((state) => state.setUser)
  
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  })
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const [showPassword, setShowPassword] = useState(false)

  // Redirect if already logged in
  useEffect(() => {
    if (user) {
      navigate('/dashboard', { replace: true })
    }
  }, [user, navigate])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
    setError('')
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setLoading(true)

    try {
      const response = await authAPI.login({
        email: formData.email,
        password: formData.password,
      })
      
      if (response.data.success) {
        if (response.data.session?.access_token) {
          localStorage.setItem('auth_token', response.data.session.access_token)
        }
        
        setUser(response.data.user)
        navigate('/dashboard')
      }
    } catch (err: any) {
      setError(err.response?.data?.message || 'Giriş yapılırken bir hata oluştu')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="auth-split-container">
      <Helmet>
        <title>NovaYnov – Giriş Yap</title>
      </Helmet>
      
      {/* Left Side - Login Form */}
      <div className="order-1 auth-form-side lg:order-1">
        <div className="w-full max-w-md">
          <div className="flex flex-col gap-6">
            {/* Logo and Header */}
            <div className="text-center animate-element animate-delay-100">
              <div className="flex justify-center mb-4">
                <Logo className="w-20 h-20" />
              </div>
              <h1 className="mb-2 text-4xl font-semibold leading-tight md:text-5xl">
                <span className="font-light tracking-tighter">Hoş Geldin</span>
              </h1>
              <p className="text-neutral-500">
                Hesabına giriş yap ve çalışmaya devam et
              </p>
            </div>

            {/* NovaFoks Mascot */}
            <div className="flex justify-center animate-element animate-delay-200">
              <img 
                src="/src/assets/novafox.png" 
                alt="NovaFoks Maskotu" 
                className="object-contain w-32 h-32"
                style={{
                  animation: 'float 3s ease-in-out infinite',
                  filter: 'drop-shadow(0 10px 30px rgba(139, 92, 246, 0.3))'
                }}
              />
            </div>

            {/* Error Message */}
            {error && (
              <div className="px-4 py-3 rounded-2xl animate-element card bg-error/10 border-error/30">
                <p className="text-sm text-error">{error}</p>
              </div>
            )}

            {/* Sign In Form */}
            <form onSubmit={handleSubmit} className="space-y-5">
              {/* Email Field */}
              <div className="animate-element animate-delay-300">
                <label className="block mb-2 text-sm font-medium text-neutral-400">
                  E-posta Adresi
                </label>
                <div className="glass-input-wrapper">
                  <input
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="ornek@email.com"
                    className="p-4 w-full text-sm text-white bg-transparent rounded-2xl focus:outline-none placeholder-neutral-500"
                    required
                    disabled={loading}
                  />
                </div>
              </div>

              {/* Password Field */}
              <div className="animate-element animate-delay-400">
                <label className="block mb-2 text-sm font-medium text-neutral-400">
                  Şifre
                </label>
                <div className="glass-input-wrapper">
                  <div className="relative">
                    <input
                      name="password"
                      type={showPassword ? 'text' : 'password'}
                      value={formData.password}
                      onChange={handleChange}
                      placeholder="••••••••"
                      className="p-4 pr-12 w-full text-sm text-white bg-transparent rounded-2xl focus:outline-none placeholder-neutral-500"
                      required
                      disabled={loading}
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="flex absolute inset-y-0 right-3 items-center"
                      tabIndex={-1}
                    >
                      {showPassword ? (
                        <EyeOff className="w-5 h-5 transition-colors text-neutral-500 hover:text-white" />
                      ) : (
                        <Eye className="w-5 h-5 transition-colors text-neutral-500 hover:text-white" />
                      )}
                    </button>
                  </div>
                </div>
              </div>

              {/* Forgot Password Link */}
              <div className="flex justify-end animate-element animate-delay-500">
                <a
                  href="#"
                  onClick={(e) => e.preventDefault()}
                  className="text-sm text-purple-400 transition-colors hover:underline"
                >
                  Şifremi Unuttum
                </a>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={loading}
                className="py-4 w-full font-medium text-white bg-purple-600 rounded-2xl transition-colors animate-element animate-delay-600 hover:bg-purple-500 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? 'Giriş yapılıyor...' : 'Giriş Yap'}
              </button>
            </form>

            {/* Sign Up Link */}
            <p className="text-sm text-center animate-element animate-delay-700 text-neutral-500">
              Hesabın yok mu?{' '}
              <Link
                to="/register"
                className="text-purple-400 transition-colors hover:underline"
              >
                Kayıt Ol
              </Link>
            </p>

            {/* Footer - Mobile Only */}
            <div className="mt-4 text-center lg:hidden">
              <p className="text-xs text-neutral-600">
                © 2026 NovaYnov • TYT-AYT'de Başarının Anahtarı
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Right Side - Landing Content */}
      <div className="hidden order-2 auth-content-side lg:order-2 lg:flex">
        <div className="w-full max-w-xl">
          {/* Hero Section */}
          <div className="mb-12 animate-element animate-delay-100">
            <h2 className="mb-4 text-5xl font-bold leading-tight">
              <span className="text-gradient">TYT-AYT</span> Başarısında
              <br />
              Yeni Nesil Platform
            </h2>
            <p className="text-lg text-neutral-400">
              Yapay zeka destekli kişiselleştirilmiş öğrenme deneyimi
            </p>
          </div>

          {/* Feature Cards */}
          <div className="grid grid-cols-2 gap-4 mb-12">
            <div className="feature-card animate-element animate-delay-300">
              <div className="mb-3 text-3xl">🎯</div>
              <h3 className="mb-1 font-semibold text-white">Akıllı Soru Üretimi</h3>
              <p className="text-sm text-neutral-500">Seviyene özel sorular</p>
            </div>

            <div className="feature-card animate-element animate-delay-400">
              <div className="mb-3 text-3xl">📊</div>
              <h3 className="mb-1 font-semibold text-white">Performans Analizi</h3>
              <p className="text-sm text-neutral-500">Detaylı ilerleme takibi</p>
            </div>

            <div className="feature-card animate-element animate-delay-500">
              <div className="mb-3 text-3xl">⚡</div>
              <h3 className="mb-1 font-semibold text-white">XP & Seviye Sistemi</h3>
              <p className="text-sm text-neutral-500">Motive edici oyunlaştırma</p>
            </div>

            <div className="feature-card animate-element animate-delay-600">
              <div className="mb-3 text-3xl">🎓</div>
              <h3 className="mb-1 font-semibold text-white">Kişisel Öğrenme</h3>
              <p className="text-sm text-neutral-500">Sana özel yol haritası</p>
            </div>
          </div>

          {/* Stats Section */}
          <div className="grid grid-cols-3 gap-6 p-6 rounded-2xl border border-white/5 bg-white/[0.02] animate-element animate-delay-800">
            <div className="stat-card">
              <div className="mb-1 text-3xl font-bold text-purple-400">1000+</div>
              <p className="text-sm text-neutral-500">Aktif Öğrenci</p>
            </div>
            <div className="stat-card">
              <div className="mb-1 text-3xl font-bold text-purple-400">50+</div>
              <p className="text-sm text-neutral-500">Konu Başlığı</p>
            </div>
            <div className="stat-card">
              <div className="mb-1 text-3xl font-bold text-purple-400">10K+</div>
              <p className="text-sm text-neutral-500">Yapılan Soru</p>
            </div>
          </div>

          {/* Footer - Desktop */}
          <div className="mt-8 text-center">
            <p className="text-xs text-neutral-600">
              © 2026 NovaYnov • TYT-AYT'de Başarının Anahtarı
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Login
