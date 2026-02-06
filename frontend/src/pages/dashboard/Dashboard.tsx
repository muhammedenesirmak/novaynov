import { useAuthStore } from '@/stores/authStore'
import { Helmet } from 'react-helmet-async'
import AppLayout from '@/components/layout/AppLayout'

const Dashboard = () => {
  const user = useAuthStore((state) => state.user)

  if (!user) {
    return null
  }

  return (
    <AppLayout>
      <Helmet>
        <title>NovaYnov – Dashboard</title>
      </Helmet>
      
      <div>
        {/* Welcome Header */}
        <div className="mb-10 animate-element animate-delay-100">
          <h1 className="mb-3 text-4xl font-semibold leading-tight md:text-5xl">
            <span className="font-light tracking-tighter">Merhaba,</span>
            <br />
            <span className="text-gradient">{user.full_name}</span>
          </h1>
          <p className="text-lg text-neutral-400">
            Öğrenme yolculuğuna devam etmeye hazır mısın?
          </p>
        </div>

        {/* Coming Soon Section */}
        <div className="animate-element animate-delay-200">
          <div className="relative">
            {/* Glow Effect */}
            <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-purple-800 rounded-3xl opacity-20 blur-3xl"></div>
            
            {/* Main Card */}
            <div className="relative p-12 text-center feature-card">
              {/* Icon */}
              <div className="flex justify-center items-center mx-auto mb-6 w-20 h-20 bg-gradient-to-br from-purple-500 to-purple-600 rounded-full shadow-xl shadow-purple-500/40">
                <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              
              {/* Badge */}
              <div className="inline-block px-4 py-1.5 rounded-full bg-purple-500/10 border border-purple-500/20 text-purple-400 text-sm font-medium mb-6">
                Geliştirme Aşamasında
              </div>
              
              {/* Heading */}
              <h2 className="mb-4 text-4xl font-bold text-white">
                Yakında
                <br />
                <span className="text-gradient">Oyunlaştırılmış Öğrenme Sistemi!</span>
              </h2>
              
              {/* Description */}
              <p className="mx-auto mb-6 max-w-2xl text-lg text-neutral-400">
                Dersler, flash kartlar ve interaktif içerikler yepyeni bir oyunlaştırma sistemi ile yeniden kodlanıyor. 
                Çok yakında eğlenceli ve öğretici bir deneyimle karşınızda olacağız!
              </p>

              {/* Features Preview */}
              <div className="grid grid-cols-1 gap-4 mt-8 md:grid-cols-3">
                <div className="p-4 rounded-2xl border bg-white/5 border-white/10">
                  <div className="mb-2 text-3xl">🎮</div>
                  <div className="text-sm font-semibold text-white">Oyunlaştırma</div>
                </div>
                <div className="p-4 rounded-2xl border bg-white/5 border-white/10">
                  <div className="mb-2 text-3xl">📚</div>
                  <div className="text-sm font-semibold text-white">İnteraktif Dersler</div>
                </div>
                <div className="p-4 rounded-2xl border bg-white/5 border-white/10">
                  <div className="mb-2 text-3xl">⚡</div>
                  <div className="text-sm font-semibold text-white">Hızlı Öğrenme</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </AppLayout>
  )
}

export default Dashboard
