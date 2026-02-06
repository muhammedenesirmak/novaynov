import { Helmet } from 'react-helmet-async'
import { useNavigate } from 'react-router-dom'
import { useAuthStore } from '@/stores/authStore'
import AppLayout from '@/components/layout/AppLayout'

const Premium = () => {
  const navigate = useNavigate()
  const user = useAuthStore((state) => state.user)

  if (user?.is_premium) {
    return (
      <AppLayout>
        <Helmet>
          <title>NovaYnov – Premium</title>
        </Helmet>
        <div className="py-20 mx-auto max-w-4xl text-center">
          <div className="p-12 feature-card animate-element">
            <div className="flex justify-center items-center mx-auto mb-6 w-20 h-20 bg-gradient-to-br from-purple-500 to-purple-600 rounded-full shadow-lg shadow-purple-500/30">
              <svg className="w-10 h-10 text-white" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
            </div>
            <h1 className="mb-4 text-4xl font-bold text-white">Premium Üyeliğin Aktif!</h1>
            <p className="mb-8 text-lg text-neutral-400">Tüm özelliklerin keyfini çıkar ve hedefine ulaş</p>
            <button
              onClick={() => navigate('/dashboard')}
              className="px-6 py-3 font-medium text-white bg-purple-600 rounded-2xl transition-all hover:bg-purple-500"
            >
              Dashboard'a Dön
            </button>
          </div>
        </div>
      </AppLayout>
    )
  }

  return (
    <AppLayout>
      <Helmet>
        <title>NovaYnov – Premium</title>
      </Helmet>

      <div className="mx-auto max-w-4xl">
        {/* Coming Soon Section */}
        <div className="text-center animate-element">
          <div className="relative p-16">
            {/* Glow Effect */}
            <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-purple-800 rounded-3xl opacity-20 blur-3xl"></div>
            
            {/* Main Card */}
            <div className="relative feature-card p-12">
              {/* Icon */}
              <div className="flex justify-center items-center mx-auto mb-8 w-24 h-24 bg-gradient-to-br from-purple-500 to-purple-600 rounded-full shadow-xl shadow-purple-500/40">
                <svg className="w-12 h-12 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
              </div>
              
              {/* Badge */}
              <div className="inline-block px-4 py-1.5 rounded-full bg-purple-500/10 border border-purple-500/20 text-purple-400 text-sm font-medium mb-6">
                Çok Yakında
              </div>
              
              {/* Heading */}
              <h1 className="mb-6 text-5xl font-bold text-white">
                Premium
                <br />
                <span className="text-gradient">Yakında Geliyor</span>
              </h1>
              
              {/* Description */}
              <p className="mx-auto mb-10 max-w-2xl text-xl text-neutral-400">
                Oyunlaştırılmış öğrenme deneyimi ve premium özellikler üzerinde çalışıyoruz. Çok yakında burada olacak!
              </p>
              
              {/* Action Button */}
              <button
                onClick={() => navigate('/dashboard')}
                className="px-8 py-4 text-lg font-semibold text-white bg-gradient-to-r from-purple-600 to-purple-700 rounded-2xl shadow-lg transition-all hover:from-purple-500 hover:to-purple-600 shadow-purple-500/30"
              >
                Dashboard'a Dön
              </button>
            </div>
          </div>
        </div>
      </div>
    </AppLayout>
  )
}

export default Premium
