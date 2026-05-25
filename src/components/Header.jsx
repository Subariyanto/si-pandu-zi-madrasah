import { useAuth } from '../context/AuthContext'
import { useTheme } from '../context/ThemeContext'
import { Menu, Sun, Moon, User, LogOut } from 'lucide-react'
import { useNavigate } from 'react-router-dom'

export default function Header({ onMenuClick }) {
  const { user, logout } = useAuth()
  const { darkMode, toggleTheme } = useTheme()
  const navigate = useNavigate()

  const handleLogout = () => {
    logout()
    navigate('/login')
  }

  const roleLabels = {
    admin: 'Administrator',
    ketua: 'Ketua Pokjawas',
    pengawas: 'Pengawas',
    madrasah: 'Madrasah',
  }

  return (
    <header className="bg-white dark:bg-gray-800 shadow-sm border-b border-gray-200 dark:border-gray-700 px-4 py-3 flex items-center justify-between">
      <div className="flex items-center gap-3">
        <button
          onClick={onMenuClick}
          className="md:hidden p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700"
          aria-label="Toggle menu"
        >
          <Menu className="w-5 h-5 text-gray-600 dark:text-gray-300" />
        </button>
        <div className="hidden md:block">
          <h1 className="text-lg font-bold text-primary-800 dark:text-primary-400">SI-PANDU ZI MADRASAH</h1>
          <p className="text-xs text-gray-500 dark:text-gray-400">Sistem Pendampingan Terpadu Zona Integritas</p>
          <p className="text-xs text-gray-400 dark:text-gray-500">Kelompok Kerja Pengawas Madrasah Kab. Jember</p>
        </div>
      </div>

      <div className="flex items-center gap-3">
        <button
          onClick={toggleTheme}
          className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700"
          aria-label="Toggle theme"
        >
          {darkMode ? <Sun className="w-5 h-5 text-yellow-400" /> : <Moon className="w-5 h-5 text-gray-600" />}
        </button>

        <div className="flex items-center gap-2 px-3 py-1.5 bg-primary-50 dark:bg-gray-700 rounded-lg">
          <User className="w-4 h-4 text-primary-700 dark:text-primary-400" />
          <div className="hidden sm:block">
            <p className="text-sm font-medium text-primary-800 dark:text-primary-300">{user?.nama}</p>
            <p className="text-xs text-gray-500 dark:text-gray-400">{roleLabels[user?.role]}</p>
          </div>
        </div>

        <button
          onClick={handleLogout}
          className="p-2 rounded-lg hover:bg-red-50 dark:hover:bg-red-900/20 text-red-600"
          aria-label="Logout"
        >
          <LogOut className="w-5 h-5" />
        </button>
      </div>
    </header>
  )
}
