import { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useTheme } from '../context/ThemeContext';
import { getTrialStatus, TRIAL_DAYS } from '../lib/license';
import {
  LayoutDashboard, Users, School, ClipboardCheck, Upload, FileCheck, Download,
  Stethoscope, MessageSquare, AlertTriangle, FileText, BarChart3,
  Printer, Settings, LogOut, Menu, X, Sun, Moon, Shield, BookOpen, Key
} from 'lucide-react';

const menuItems = [
  { path: '/dashboard', label: 'Dashboard', icon: LayoutDashboard, roles: ['admin', 'ketua', 'pengawas', 'madrasah'] },
  { path: '/pengawas', label: 'Data Pengawas', icon: Users, roles: ['admin', 'ketua'] },
  { path: '/madrasah', label: 'Data Madrasah', icon: School, roles: ['admin', 'ketua', 'pengawas', 'madrasah'] },
  { path: '/pendampingan', label: 'Pendampingan ZI', icon: Shield, roles: ['admin', 'ketua', 'pengawas'] },
  { path: '/checklist', label: 'Checklist Eviden ZI', icon: ClipboardCheck, roles: ['admin', 'ketua', 'pengawas', 'madrasah'] },
  { path: '/upload-eviden', label: 'Upload Eviden', icon: Upload, roles: ['admin', 'pengawas', 'madrasah'] },
  { path: '/download-format', label: 'Download Format Dokumen', icon: Download, roles: ['admin', 'ketua', 'pengawas', 'madrasah'] },
  { path: '/kartu-kendali', label: 'Kartu Kendali', icon: FileCheck, roles: ['admin', 'ketua', 'pengawas'] },
  { path: '/klinik-zi', label: 'Klinik ZI', icon: Stethoscope, roles: ['admin', 'ketua', 'pengawas'] },
  { path: '/survei', label: 'Survei Kepuasan', icon: MessageSquare, roles: ['admin', 'ketua', 'pengawas', 'madrasah'] },
  { path: '/pengaduan', label: 'Kanal Pengaduan', icon: AlertTriangle, roles: ['admin', 'ketua', 'pengawas'] },
  { path: '/laporan-triwulan', label: 'Laporan Triwulan', icon: FileText, roles: ['admin', 'ketua', 'pengawas'] },
  { path: '/rekapitulasi', label: 'Rekapitulasi Capaian', icon: BarChart3, roles: ['admin', 'ketua', 'pengawas'] },
  { path: '/cetak-export', label: 'Cetak / Export', icon: Printer, roles: ['admin', 'ketua', 'pengawas'] },
  { path: '/pengaturan', label: 'Pengaturan Akun', icon: Settings, roles: ['admin', 'ketua', 'pengawas', 'madrasah'] },
  { path: '/lisensi', label: 'Lisensi / Aktivasi', icon: Key, roles: ['admin', 'ketua', 'pengawas', 'madrasah'] },
  { path: '/panduan', label: 'Panduan Penggunaan', icon: BookOpen, roles: ['admin', 'ketua', 'pengawas', 'madrasah'] },
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
        {/* Logo - Fixed */}
        <div className="p-4 border-b border-green-700 flex-shrink-0">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-lg font-bold text-kemenag-gold">SI-PANDU ZI</h1>
              <p className="text-[10px] text-green-200">Sistem Pendampingan Terpadu Zona Integritas</p>
              <p className="text-[10px] text-green-300">Kelompok Kerja Pengawas Kab. Jember</p>
            </div>
            <button onClick={() => setSidebarOpen(false)} className="lg:hidden text-white">
              <X size={20} />
            </button>
          </div>
        </div>

        {/* User Info - Fixed */}
        <div className="p-4 border-b border-green-700 flex-shrink-0">
          <p className="text-sm font-medium truncate">{user?.name}</p>
          <p className="text-xs text-green-300 capitalize">{user?.role === 'ketua' ? 'Ketua Pokjawas' : user?.role}</p>
        </div>

        {/* Menu + Footer - Scrollable tanpa scrollbar */}
        <div className="flex-1 overflow-y-auto scrollbar-hide">
        <nav className="py-2">
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
          <div className="mt-3 px-2 text-[11px] text-green-300 leading-relaxed text-center">
            <p>Dibuat oleh : <span className="font-medium text-green-100">Subariyanto, S.Pd, M.Pd.I.</span></p>
            <p>Ketua Pokjawas Madrasah Kab. Jember</p>
          </div>
        </div>
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
          <TrialBanner />
          {children}
        </main>
      </div>
    </div>
  );
}

function TrialBanner() {
  const s = getTrialStatus();
  if (s.tier === 'full') return null;
  if (s.isExpired) {
    return (
      <div className="mb-4 p-3 rounded-lg bg-red-100 dark:bg-red-900/30 border-l-4 border-red-500 text-red-800 dark:text-red-200 text-sm flex items-center justify-between flex-wrap gap-2">
        <span><b>⛔ Trial habis.</b> Aplikasi sekarang read-only. Aktivasi kode FULL untuk lanjut.</span>
        <Link to="/lisensi" className="px-3 py-1 bg-red-600 text-white rounded text-xs font-semibold hover:bg-red-700">Aktivasi FULL</Link>
      </div>
    );
  }
  return (
    <div className="mb-4 p-3 rounded-lg bg-yellow-100 dark:bg-yellow-900/30 border-l-4 border-yellow-500 text-yellow-800 dark:text-yellow-200 text-sm flex items-center justify-between flex-wrap gap-2">
      <span>🆓 Mode <b>TRIAL</b> · sisa <b>{s.daysLeft} hari</b> dari {TRIAL_DAYS}. Mutasi data tetap aktif.</span>
      <Link to="/lisensi" className="px-3 py-1 bg-yellow-600 text-white rounded text-xs font-semibold hover:bg-yellow-700">Aktivasi FULL</Link>
    </div>
  );
}
