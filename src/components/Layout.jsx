import { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useTheme } from '../context/ThemeContext';
import {
  LayoutDashboard, Users, School, ClipboardCheck, Upload, FileCheck,
  Stethoscope, MessageSquare, AlertTriangle, FileText, BarChart3,
  Printer, Settings, LogOut, Menu, X, Sun, Moon, Shield
} from 'lucide-react';

const menuItems = [
  { path: '/dashboard', label: 'Dashboard', icon: LayoutDashboard, roles: ['admin', 'ketua', 'pengawas', 'madrasah'] },
  { path: '/pengawas', label: 'Data Pengawas', icon: Users, roles: ['admin', 'ketua'] },
  { path: '/madrasah', label: 'Data Madrasah', icon: School, roles: ['admin', 'ketua', 'pengawas', 'madrasah'] },
  { path: '/pendampingan', label: 'Pendampingan ZI', icon: Shield, roles: ['admin', 'ketua', 'pengawas'] },
  { path: '/checklist', label: 'Checklist Eviden ZI', icon: ClipboardCheck, roles: ['admin', 'ketua', 'pengawas', 'madrasah'] },
  { path: '/upload-eviden', label: 'Upload Eviden', icon: Upload, roles: ['admin', 'pengawas', 'madrasah'] },
  { path: '/kartu-kendali', label: 'Kartu Kendali', icon: FileCheck, roles: ['admin', 'ketua', 'pengawas'] },
  { path: '/klinik-zi', label: 'Klinik ZI', icon: Stethoscope, roles: ['admin', 'ketua', 'pengawas'] },
  { path: '/survei', label: 'Survei Kepuasan', icon: MessageSquare, roles: ['admin', 'ketua', 'pengawas', 'madrasah'] },
  { path: '/pengaduan', label: 'Kanal Pengaduan', icon: AlertTriangle, roles: ['admin', 'ketua', 'pengawas'] },
  { path: '/laporan-triwulan', label: 'Laporan Triwulan', icon: FileText, roles: ['admin', 'ketua', 'pengawas'] },
  { path: '/rekapitulasi', label: 'Rekapitulasi Capaian', icon: BarChart3, roles: ['admin', 'ketua', 'pengawas'] },
  { path: '/cetak-export', label: 'Cetak / Export', icon: Printer, roles: ['admin', 'ketua', 'pengawas'] },
  { path: '/pengaturan', label: 'Pengaturan Akun', icon: Settings, roles: ['admin', 'ketua', 'pengawas', 'madrasah'] },
];

export default function Layout({ children }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { user, logout } = useAuth();
  const { dark, toggleTheme } = useTheme();
  const location = useLocation();
  const navigate = useNavigate();

  const filteredMenu = menuItems.filter(item => item.roles.includes(user?.role));

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <div className="flex h-screen overflow-hidden bg-green-50 dark:bg-gray-900">
      {/* Overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside className={`fixed lg:static inset-y-0 left-0 z-50 w-64 bg-kemenag-green text-white transform transition-transform duration-300 ease-in-out ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} lg:translate-x-0 flex flex-col`}>
        {/* Logo */}
        <div className="p-4 border-b border-green-700">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-lg font-bold text-kemenag-gold">SI-PANDU ZI</h1>
              <p className="text-xs text-green-200">Sistem Pendampingan Pengawas Madrasah</p>
              <p className="text-xs text-green-300">untuk Zona Integritas Madrasah</p>
            </div>
            <button onClick={() => setSidebarOpen(false)} className="lg:hidden text-white">
              <X size={20} />
            </button>
          </div>
        </div>

        {/* User Info */}
        <div className="p-4 border-b border-green-700">
          <p className="text-sm font-medium truncate">{user?.name}</p>
          <p className="text-xs text-green-300 capitalize">{user?.role === 'ketua' ? 'Ketua Pokjawas' : user?.role}</p>
        </div>

        {/* Menu */}
        <nav className="flex-1 overflow-y-auto py-2">
          {filteredMenu.map(item => {
            const Icon = item.icon;
            const isActive = location.pathname === item.path;
            return (
              <Link
                key={item.path}
                to={item.path}
                onClick={() => setSidebarOpen(false)}
                className={`flex items-center gap-3 px-4 py-2.5 text-sm transition-colors ${
                  isActive
                    ? 'bg-green-700 text-kemenag-gold border-r-4 border-kemenag-gold'
                    : 'text-green-100 hover:bg-green-700 hover:text-white'
                }`}
              >
                <Icon size={18} />
                <span>{item.label}</span>
              </Link>
            );
          })}
        </nav>

        {/* Logout */}
        <div className="p-4 border-t border-green-700">
          <button
            onClick={handleLogout}
            className="flex items-center gap-3 w-full px-4 py-2 text-sm text-green-100 hover:bg-green-700 hover:text-white rounded-lg transition-colors"
          >
            <LogOut size={18} />
            <span>Logout</span>
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <header className="bg-white dark:bg-gray-800 shadow-sm border-b border-gray-200 dark:border-gray-700 px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setSidebarOpen(true)}
              className="lg:hidden text-gray-600 dark:text-gray-300"
            >
              <Menu size={24} />
            </button>
            <h2 className="text-lg font-semibold text-gray-800 dark:text-white hidden sm:block">
              SI-PANDU ZI
            </h2>
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={toggleTheme}
              className="p-2 rounded-lg bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
            >
              {dark ? <Sun size={18} /> : <Moon size={18} />}
            </button>
            <div className="hidden sm:block text-right">
              <p className="text-sm font-medium text-gray-700 dark:text-gray-200">{user?.name}</p>
              <p className="text-xs text-gray-500 dark:text-gray-400 capitalize">{user?.role}</p>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 overflow-y-auto p-4 md:p-6">
          {children}
        </main>
      </div>
    </div>
  );
}
