import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { Shield, Eye, EyeOff } from 'lucide-react'

export default function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [error, setError] = useState('')
  const { login } = useAuth()
  const navigate = useNavigate()

  const handleSubmit = (e) => {
    e.preventDefault()
    setError('')
    const result = login(email, password)
    if (result.success) {
      navigate('/')
    } else {
      setError(result.message)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-800 via-primary-700 to-primary-900 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl p-8">
          {/* Logo */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-primary-100 dark:bg-primary-900 rounded-full mb-4">
              <Shield className="w-8 h-8 text-primary-800 dark:text-primary-400" />
            </div>
            <h1 className="text-2xl font-bold text-primary-800 dark:text-white">SI-PANDU ZI</h1>
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">Sistem Pendampingan Terpadu Zona Integritas Madrasah</p>
            <p className="text-xs text-accent-600 font-medium mt-1">Kelompok Kerja Pengawas Madrasah</p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            {error && (
              <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 text-red-700 dark:text-red-400 px-4 py-3 rounded-lg text-sm">
                {error}
              </div>
            )}

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="input-field"
                placeholder="Masukkan email"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Password</label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="input-field pr-10"
                  placeholder="Masukkan password"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <button type="submit" className="btn-primary w-full py-3 text-base">
              Masuk
            </button>
          </form>

          {/* Demo accounts */}
          <div className="mt-6 pt-6 border-t border-gray-200 dark:border-gray-700">
            <p className="text-xs text-gray-500 dark:text-gray-400 text-center mb-3">Akun Demo:</p>
            <div className="grid grid-cols-2 gap-2 text-xs">
              <button onClick={() => { setEmail('admin@zipokjawas.id'); setPassword('admin123') }} className="px-2 py-1.5 bg-gray-100 dark:bg-gray-700 rounded text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600">
                Admin
              </button>
              <button onClick={() => { setEmail('ketua@zipokjawas.id'); setPassword('ketua123') }} className="px-2 py-1.5 bg-gray-100 dark:bg-gray-700 rounded text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600">
                Ketua
              </button>
              <button onClick={() => { setEmail('pengawas@zipokjawas.id'); setPassword('pengawas123') }} className="px-2 py-1.5 bg-gray-100 dark:bg-gray-700 rounded text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600">
                Pengawas
              </button>
              <button onClick={() => { setEmail('madrasah@zipokjawas.id'); setPassword('madrasah123') }} className="px-2 py-1.5 bg-gray-100 dark:bg-gray-700 rounded text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600">
                Madrasah
              </button>
            </div>
          </div>
        </div>

        <p className="text-center text-xs text-primary-200 mt-4">
          © 2024 Pokjawas Kemenag - SI-PANDU ZI Madrasah
        </p>
      </div>
    </div>
  )
}
