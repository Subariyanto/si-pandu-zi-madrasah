import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import { ThemeProvider } from './context/ThemeContext';
import { DataProvider } from './context/DataContext';
import Layout from './components/Layout';
import LoginPage from './pages/LoginPage';
import DashboardPage from './pages/DashboardPage';
import PengawasPage from './pages/PengawasPage';
import MadrasahPage from './pages/MadrasahPage';
import PendampinganPage from './pages/PendampinganPage';
import ChecklistPage from './pages/ChecklistPage';
import UploadEvidenPage from './pages/UploadEvidenPage';
import KartuKendaliPage from './pages/KartuKendaliPage';
import KlinikZIPage from './pages/KlinikZIPage';
import SurveiPage from './pages/SurveiPage';
import PengaduanPage from './pages/PengaduanPage';
import LaporanTriwulanPage from './pages/LaporanTriwulanPage';
import RekapitulasiPage from './pages/RekapitulasiPage';
import CetakExportPage from './pages/CetakExportPage';
import PengaturanPage from './pages/PengaturanPage';
import PublikSurveiPage from './pages/PublikSurveiPage';
import PublikPengaduanPage from './pages/PublikPengaduanPage';

function ProtectedRoute({ children }) {
  const { user } = useAuth();
  if (!user) return <Navigate to="/login" replace />;
  return <Layout>{children}</Layout>;
}

function AppRoutes() {
  const { user } = useAuth();

  return (
    <Routes>
      {/* Public routes */}
      <Route path="/login" element={user ? <Navigate to="/dashboard" replace /> : <LoginPage />} />
      <Route path="/publik/survei" element={<PublikSurveiPage />} />
      <Route path="/publik/pengaduan" element={<PublikPengaduanPage />} />

      {/* Protected routes */}
      <Route path="/dashboard" element={<ProtectedRoute><DashboardPage /></ProtectedRoute>} />
      <Route path="/pengawas" element={<ProtectedRoute><PengawasPage /></ProtectedRoute>} />
      <Route path="/madrasah" element={<ProtectedRoute><MadrasahPage /></ProtectedRoute>} />
      <Route path="/pendampingan" element={<ProtectedRoute><PendampinganPage /></ProtectedRoute>} />
      <Route path="/checklist" element={<ProtectedRoute><ChecklistPage /></ProtectedRoute>} />
      <Route path="/upload-eviden" element={<ProtectedRoute><UploadEvidenPage /></ProtectedRoute>} />
      <Route path="/kartu-kendali" element={<ProtectedRoute><KartuKendaliPage /></ProtectedRoute>} />
      <Route path="/klinik-zi" element={<ProtectedRoute><KlinikZIPage /></ProtectedRoute>} />
      <Route path="/survei" element={<ProtectedRoute><SurveiPage /></ProtectedRoute>} />
      <Route path="/pengaduan" element={<ProtectedRoute><PengaduanPage /></ProtectedRoute>} />
      <Route path="/laporan-triwulan" element={<ProtectedRoute><LaporanTriwulanPage /></ProtectedRoute>} />
      <Route path="/rekapitulasi" element={<ProtectedRoute><RekapitulasiPage /></ProtectedRoute>} />
      <Route path="/cetak-export" element={<ProtectedRoute><CetakExportPage /></ProtectedRoute>} />
      <Route path="/pengaturan" element={<ProtectedRoute><PengaturanPage /></ProtectedRoute>} />

      {/* Default redirect */}
      <Route path="/" element={<Navigate to="/dashboard" replace />} />
      <Route path="*" element={<Navigate to="/dashboard" replace />} />
    </Routes>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <ThemeProvider>
        <AuthProvider>
          <DataProvider>
            <AppRoutes />
          </DataProvider>
        </AuthProvider>
      </ThemeProvider>
    </BrowserRouter>
  );
}
