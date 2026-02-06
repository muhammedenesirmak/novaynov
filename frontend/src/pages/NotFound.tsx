import { useNavigate } from 'react-router-dom'
import { Helmet } from 'react-helmet-async'
import AppLayout from '@/components/layout/AppLayout'
import Card from '@/components/common/Card'

const NotFound = () => {
  const navigate = useNavigate()

  return (
    <AppLayout>
      <Helmet>
        <title>Sayfa Bulunamadı – NovaYnov</title>
      </Helmet>

      <div className="fade-in flex items-center justify-center min-h-[60vh]">
        <Card className="p-12 text-center max-w-md">
          <div className="mb-6">
            <h1 className="text-6xl font-bold text-gradient mb-4">404</h1>
            <h2 className="text-2xl font-semibold mb-2">Sayfa Bulunamadı</h2>
            <p className="text-neutral-400 text-sm">
              Aradığınız sayfa mevcut değil veya taşınmış olabilir.
            </p>
          </div>

          <button
            onClick={() => navigate('/dashboard')}
            className="w-full px-6 py-3 bg-gradient-to-r from-purple-500 to-purple-600 hover:from-purple-600 hover:to-purple-700 text-white rounded-lg font-semibold transition-all"
          >
            Ana Sayfaya Dön
          </button>
        </Card>
      </div>
    </AppLayout>
  )
}

export default NotFound
