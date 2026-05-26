import { NavLink, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import {
  LayoutDashboard, Users, School, ClipboardCheck, FileCheck, Upload,
  CreditCard, Stethoscope, Star, MessageSquareWarning, FileText,
  BarChart3, Printer, Settings, LogOut, X, Shield
} from 'lucide-react'

const menuItems = [
  { path: '/', label: 'Dashboard', icon: LayoutDashboard },
  { path: '/data-pengawas', label: 'Data Pengawas', icon: Users },
  { path: '/data-madrasah', label: 'Data Madrasah', icon: School },
  { path: '/pendampingan', label: 'Pendampingan ZI', icon: ClipboardCheck },
  { path: '/checklist-eviden', label: 'Checklist Eviden ZI', icon: FileCheck },
  { path: '/upload-eviden', label: 'Upload Eviden', icon: Upload },
  { path: '/kartu-kendali', label: 'Kartu Kendali Integritas', icon: CreditCard },
  { path: '/klinik-zi', label: 'Klinik ZI', icon: Stethoscope },
  { path: '/survei-kepuasan', label: 'Survei Kepuasan', icon: Star },
  { path: '/kanal-pengaduan', label: 'Kanal Pengaduan', icon: MessageSquareWarning },
  { path: '/laporan-triwulan', label: 'Laporan Triwulan', icon: FileText },
  { path: '/rekap-capaian', label: 'Rekapitulasi Capaian', icon: BarChart3 },
  { path: '/cetak-export', label: 'Cetak/Export', icon: Printer },
  { path: '/pengaturan', label: 'Pengaturan Akun', icon: Settings },
]

export default function Sidebar({ open, onClose }) {
  const { logout } = useAuth()
  const navigate = useNavigate()

  const handleLogout = () => {
    logout()
    navigate('/login')
  }

  return (
    <>
      {/* Overlay */}
      {open && (
        <div
          className="fixed inset-0 bg-black/50 z-40 md:hidden"
          onClick={onClose}
        />
      )}

      {/* Sidebar */}
      <aside className={`
        fixed md:static inset-y-0 left-0 z-50
        w-64 bg-primary-800 dark:bg-gray-800 text-white
        transform transition-transform duration-300 ease-in-out
        ${open ? 'translate-x-0' : '-translate-x-full'} md:translate-x-0
        flex flex-col
      `}>
        {/* Header */}
        <div className="p-4 border-b border-primary-700 dark:border-gray-700 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Shield className="w-8 h-8 text-accent-400" />
            <div>
              <h2 className="font-bold text-sm">SI-PANDU ZI</h2>
              <p className="text-xs text-primary-200 dark:text-gray-400">Sistem Pendampingan Terpadu Zona Integritas</p>
              <p className="text-xs text-primary-300 dark:text-gray-500">Kelompok Kerja Pengawas Madrasah Kab. Jember</p>
            </div>
          </div>
          <button onClick={onClose} className="md:hidden p-1 hover:bg-primary-700 rounded" aria-label="Close menu">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 overflow-y-auto py-2">
          {menuItems.map(item => (
            <NavLink
              key={item.path}
              to={item.path}
              end={item.path === '/'}
              onClick={onClose}
              className={({ isActive }) => `
                flex items-center gap-3 px-4 py-2.5 mx-2 rounded-lg text-sm transition-colors
                ${isActive
                  ? 'bg-primary-600 dark:bg-primary-700 text-white font-medium'
                  : 'text-primary-100 dark:text-gray-300 hover:bg-primary-700 dark:hover:bg-gray-700'
                }
              `}
            >
              <item.icon className="w-4 h-4 flex-shrink-0" />
              <span className="truncate">{item.label}</span>
            </NavLink>
          ))}
        </nav>

        {/* Logout */}
        <div className="p-3 border-t border-primary-700 dark:border-gray-700">
          <button
            onClick={handleLogout}
            className="flex items-center gap-3 px-4 py-2.5 w-full rounded-lg text-sm text-primary-100 hover:bg-red-700 transition-colors"
          >
            <LogOut className="w-4 h-4" />
            <span>Logout</span>
          </button>
        </div>
      </aside>
    </>
  )
}
