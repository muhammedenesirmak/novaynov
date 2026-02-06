import { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Helmet } from 'react-helmet-async'
import { Eye, EyeOff } from 'lucide-react'
import { authAPI } from '@/services/api'
import { useAuthStore } from '@/stores/authStore'
import Logo from '@/components/common/Logo'

const Register = () => {
  const navigate = useNavigate()
  const user = useAuthStore((state) => state.user)
  const setUser = useAuthStore((state) => state.setUser)
  
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: '',
    referralCode: '',
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

    if (formData.password.length < 6) {
      setError('Şifre en az 6 karakter olmalıdır')
      setLoading(false)
      return
    }

    try {
      const response = await authAPI.register({
        email: formData.email,
        password: formData.password,
        fullName: formData.fullName,
        referralCode: formData.referralCode || undefined,
      })
      
      if (response.data.success) {
        if (response.data.session?.access_token) {
          localStorage.setItem('auth_token', response.data.session.access_token)
        }
        
        setUser(response.data.user)
        navigate('/dashboard')
      }
    } catch (err: any) {
      setError(err.response?.data?.message || 'Kayıt olurken bir hata oluştu')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="auth-split-container">
      <Helmet>
        <title>NovaYnov – Kayıt Ol</title>
      </Helmet>
      
      {/* Left Side - Registration Form */}
      <div className="auth-form-side order-1 lg:order-1">
        <div className="w-full max-w-md">
          <div className="flex flex-col gap-6">
            {/* Logo and Header */}
            <div className="text-center animate-element animate-delay-100">
              <div className="flex justify-center mb-4">
                <Logo className="w-20 h-20" />
              </div>
              <h1 className="text-4xl md:text-5xl font-semibold leading-tight mb-2">
                <span className="font-light tracking-tighter">Aramıza Katıl</span>
              </h1>
              <p className="text-neutral-500">
                Hesap oluştur ve öğrenme yolculuğuna başla
              </p>
            </div>

            {/* NovaFoks Mascot */}
            <div className="flex justify-center animate-element animate-delay-200">
              <img 
                src="/src/assets/novafox.png" 
                alt="NovaFoks Maskotu" 
                className="w-32 h-32 object-contain"
                style={{
                  animation: 'float 3s ease-in-out infinite',
                  filter: 'drop-shadow(0 10px 30px rgba(139, 92, 246, 0.3))'
                }}
              />
            </div>

            {/* Error Message */}
            {error && (
              <div className="animate-element card bg-error/10 border-error/30 px-4 py-3 rounded-2xl">
                <p className="text-error text-sm">{error}</p>
              </div>
            )}

            {/* Sign Up Form */}
            <form onSubmit={handleSubmit} className="space-y-5">
              {/* Full Name Field */}
              <div className="animate-element animate-delay-300">
                <label className="block text-sm font-medium text-neutral-400 mb-2">
                  Ad Soyad
                </label>
                <div className="glass-input-wrapper">
                  <input
                    name="fullName"
                    type="text"
                    value={formData.fullName}
                    onChange={handleChange}
                    placeholder="Adınız Soyadınız"
                    className="w-full bg-transparent text-sm p-4 rounded-2xl focus:outline-none text-white placeholder-neutral-500"
                    required
                    disabled={loading}
                  />
                </div>
              </div>

              {/* Email Field */}
              <div className="animate-element animate-delay-400">
                <label className="block text-sm font-medium text-neutral-400 mb-2">
                  E-posta Adresi
                </label>
                <div className="glass-input-wrapper">
                  <input
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="ornek@email.com"
                    className="w-full bg-transparent text-sm p-4 rounded-2xl focus:outline-none text-white placeholder-neutral-500"
                    required
                    disabled={loading}
                  />
                </div>
              </div>

              {/* Password Field */}
              <div className="animate-element animate-delay-500">
                <label className="block text-sm font-medium text-neutral-400 mb-2">
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
                      className="w-full bg-transparent text-sm p-4 pr-12 rounded-2xl focus:outline-none text-white placeholder-neutral-500"
                      required
                      disabled={loading}
                      minLength={6}
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute inset-y-0 right-3 flex items-center"
                      tabIndex={-1}
                    >
                      {showPassword ? (
                        <EyeOff className="w-5 h-5 text-neutral-500 hover:text-white transition-colors" />
                      ) : (
                        <Eye className="w-5 h-5 text-neutral-500 hover:text-white transition-colors" />
                      )}
                    </button>
                  </div>
                </div>
                <p className="text-xs text-neutral-600 mt-2">En az 6 karakter</p>
              </div>

              {/* Referral Code Field */}
              <div className="animate-element animate-delay-600">
                <label className="block text-sm font-medium text-neutral-400 mb-2">
                  Referans Kodu (Opsiyonel)
                </label>
                <div className="glass-input-wrapper">
                  <input
                    name="referralCode"
                    type="text"
                    value={formData.referralCode}
                    onChange={handleChange}
                    placeholder="ABC123"
                    className="w-full bg-transparent text-sm p-4 rounded-2xl focus:outline-none text-white placeholder-neutral-500"
                    disabled={loading}
                  />
                </div>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={loading}
                className="animate-element animate-delay-700 w-full rounded-2xl bg-purple-600 py-4 font-medium text-white hover:bg-purple-500 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? 'Kayıt olunuyor...' : 'Kayıt Ol'}
              </button>
            </form>

            {/* Sign In Link */}
            <p className="animate-element animate-delay-800 text-center text-sm text-neutral-500">
              Zaten hesabın var mı?{' '}
              <Link
                to="/login"
                className="text-purple-400 hover:underline transition-colors"
              >
                Giriş Yap
              </Link>
            </p>

            {/* Footer - Mobile Only */}
            <div className="mt-4 text-center lg:hidden">
              <p className="text-neutral-600 text-xs">
                © 2026 NovaYnov • TYT-AYT'de Başarının Anahtarı
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Right Side - Onboarding Content */}
      <div className="auth-content-side order-2 lg:order-2 hidden lg:flex">
        <div className="max-w-xl w-full">
          {/* Welcome Message */}
          <div className="mb-12 animate-element animate-delay-100">
            <h2 className="text-5xl font-bold mb-4 leading-tight">
              Başarı Yolculuğun
              <br />
              <span className="text-gradient">Burada Başlıyor</span>
            </h2>
            <p className="text-lg text-neutral-400">
              Binlerce öğrencinin tercihi olan platform ile hedeflerine ulaş
            </p>
          </div>

          {/* Benefits Timeline */}
          <div className="space-y-6 mb-12">
            <div className="flex gap-4 items-start animate-element animate-delay-300">
              <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-purple-500/10 border border-purple-500/20 flex items-center justify-center text-xl font-bold text-purple-400">
                1
              </div>
              <div>
                <h3 className="font-semibold text-white mb-1">Hesap Oluştur</h3>
                <p className="text-sm text-neutral-500">Birkaç saniyede ücretsiz hesap aç</p>
              </div>
            </div>

            <div className="flex gap-4 items-start animate-element animate-delay-400">
              <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-purple-500/10 border border-purple-500/20 flex items-center justify-center text-xl font-bold text-purple-400">
                2
              </div>
              <div>
                <h3 className="font-semibold text-white mb-1">Konuları Keşfet</h3>
                <p className="text-sm text-neutral-500">50+ konu başlığından istediğini seç</p>
              </div>
            </div>

            <div className="flex gap-4 items-start animate-element animate-delay-500">
              <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-purple-500/10 border border-purple-500/20 flex items-center justify-center text-xl font-bold text-purple-400">
                3
              </div>
              <div>
                <h3 className="font-semibold text-white mb-1">Başarıya Ulaş</h3>
                <p className="text-sm text-neutral-500">XP kazan, seviye atla, hedefine koş</p>
              </div>
            </div>
          </div>

          {/* Trust Indicators */}
          <div className="grid grid-cols-2 gap-4 mb-8">
            <div className="feature-card animate-element animate-delay-600">
              <div className="text-3xl mb-3">✨</div>
              <h3 className="font-semibold mb-1 text-white">Ücretsiz Başla</h3>
              <p className="text-sm text-neutral-500">Kredi kartı gerekmez</p>
            </div>

            <div className="feature-card animate-element animate-delay-700">
              <div className="text-3xl mb-3">🚀</div>
              <h3 className="font-semibold mb-1 text-white">Hemen Kullan</h3>
              <p className="text-sm text-neutral-500">Anında erişim başlat</p>
            </div>
          </div>

          {/* Footer - Desktop */}
          <div className="text-center animate-element animate-delay-800">
            <p className="text-xs text-neutral-600">
              © 2026 NovaYnov • TYT-AYT'de Başarının Anahtarı
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Register
