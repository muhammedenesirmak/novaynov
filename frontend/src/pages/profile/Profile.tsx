import { useAuthStore } from '@/stores/authStore'
import { calculateLevel, getXPForNextLevel } from '@/config/constants'
import { Helmet } from 'react-helmet-async'
import { useCallback } from 'react'
import AppLayout from '@/components/layout/AppLayout'
import ProgressBar from '@/components/common/ProgressBar'
import Button from '@/components/common/Button'

const Profile = () => {
  const user = useAuthStore((state) => state.user)
  const logoutStore = useAuthStore((state) => state.logout)

  const handleLogout = useCallback(async () => {
    try {
      localStorage.removeItem('auth_token')
      logoutStore()
      window.location.href = '/login'
    } catch (error) {
      console.error('Logout error:', error)
    }
  }, [logoutStore])

  if (!user) {
    return null
  }

  const currentLevel = calculateLevel(user.total_xp)
  const nextLevelXP = getXPForNextLevel(currentLevel)

  return (
    <AppLayout>
      <Helmet>
        <title>NovaYnov – Profil</title>
      </Helmet>
      
      <div className="max-w-4xl mx-auto">
        {/* Header with Animation */}
        <div className="mb-10 animate-element animate-delay-100">
          <h1 className="text-4xl md:text-5xl font-semibold leading-tight mb-3">
            <span className="font-light tracking-tighter">Profilin</span>
          </h1>
          <p className="text-lg text-neutral-400">
            Hesap bilgilerin ve istatistiklerin
          </p>
        </div>

        {/* User Info Card */}
        <div className="feature-card p-6 mb-6 animate-element animate-delay-200">
          <h2 className="text-xl font-semibold mb-5 text-white">Kullanıcı Bilgileri</h2>
          <div className="space-y-4">
            <div>
              <label className="text-sm text-neutral-500 block mb-1">Ad Soyad</label>
              <p className="text-base font-medium text-white">{user.full_name}</p>
            </div>
            <div>
              <label className="text-sm text-neutral-500 block mb-1">E-posta</label>
              <p className="text-base font-medium text-white">{user.email}</p>
            </div>
            {user.is_premium && (
              <div className="pt-2">
                <div className="badge badge-purple">
                  Premium Üye
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-6">
          {/* XP Card */}
          <div className="feature-card p-6 animate-element animate-delay-300">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-neutral-400 text-sm font-medium">Toplam XP</h3>
            </div>
            <p className="text-4xl font-semibold text-purple-400 mb-5">{user.total_xp}</p>
            <div>
              <div className="flex justify-between text-xs text-neutral-600 mb-2">
                <span>Seviye {currentLevel}</span>
                <span>Seviye {currentLevel + 1}</span>
              </div>
              <ProgressBar value={user.total_xp % nextLevelXP} max={nextLevelXP} />
              <p className="text-xs text-neutral-500 mt-2">
                {nextLevelXP - (user.total_xp % nextLevelXP)} XP kaldı
              </p>
            </div>
          </div>

          {/* Level Card */}
          <div className="feature-card p-6 animate-element animate-delay-400">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-neutral-400 text-sm font-medium">Seviye</h3>
            </div>
            <p className="text-4xl font-semibold text-purple-400">Seviye {user.level}</p>
          </div>

          {/* Streak Card */}
          <div className="feature-card p-6 animate-element animate-delay-500">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-neutral-400 text-sm font-medium">Streak</h3>
            </div>
            <p className="text-4xl font-semibold text-success mb-3">
              {user.streak_days} gün
            </p>
            <p className="text-sm text-neutral-500">
              Günlük çalışma serisini kırma
            </p>
          </div>
        </div>

        {/* Referral Section */}
        <div className="feature-card p-6 mb-6 animate-element animate-delay-600">
          <div className="mb-4">
            <h3 className="text-xl font-semibold text-white mb-2">Arkadaşlarını Davet Et</h3>
            <p className="text-neutral-500 text-sm">
              3 arkadaşını davet et, 1 ay premium kazan
            </p>
          </div>
          <p className="text-neutral-400 mb-5 text-sm">
            Şu an <span className="text-purple-400 font-semibold">{user.referral_count}</span> kişi davet ettin.
          </p>
          <div className="rounded-2xl border border-white/10 bg-white/5 p-5">
            <label className="block text-xs font-medium text-neutral-500 mb-3">
              Davet Kodun
            </label>
            <div className="flex items-center gap-3">
              <code className="flex-1 text-purple-400 font-mono text-xl font-bold bg-purple-500/10 px-4 py-3 rounded-xl border border-purple-500/20">
                {user.referral_code}
              </code>
              <Button
                onClick={() => {
                  navigator.clipboard.writeText(user.referral_code)
                  alert('Davet kodu kopyalandı!')
                }}
                variant="secondary"
                className="text-sm px-5 py-3"
              >
                Kopyala
              </Button>
            </div>
          </div>
        </div>

        {/* Logout Button */}
        <div className="feature-card p-6 animate-element animate-delay-700">
          <Button
            onClick={handleLogout}
            variant="ghost"
            className="w-full text-error hover:bg-error/10 py-3"
          >
            Çıkış Yap
          </Button>
        </div>
      </div>
    </AppLayout>
  )
}

export default Profile
