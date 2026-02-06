import { useAuthStore } from '@/stores/authStore'
import { useNavigate } from 'react-router-dom'
import Logo from '@/components/common/Logo'

const Navbar = () => {
  const user = useAuthStore((state) => state.user)
  const navigate = useNavigate()

  return (
    <nav className="navbar">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-14">
          {/* Logo */}
          <button
            onClick={() => navigate('/dashboard')}
            className="flex items-center gap-2 hover:opacity-80 transition-opacity"
          >
            <Logo className="w-10 h-10" />
          </button>

          {/* User Actions */}
          <div className="flex items-center gap-2">
            {/* User Name */}
            <button
              onClick={() => navigate('/profile')}
              className="card-hover px-3 py-1.5 rounded-subtle text-sm font-medium max-w-[150px] truncate"
            >
              {user?.full_name || 'User'}
            </button>

            {/* Premium Button (if not premium) */}
            {!user?.is_premium && (
              <button
                onClick={() => navigate('/premium')}
                className="px-3 py-1.5 bg-gradient-to-r from-purple-600 to-purple-700 rounded-subtle text-xs font-medium hover:from-purple-500 hover:to-purple-600 transition-all"
              >
                Premium
              </button>
            )}
          </div>
        </div>
      </div>
    </nav>
  )
}

export default Navbar
