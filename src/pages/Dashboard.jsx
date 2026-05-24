import { useData } from '../context/DataContext'
import { useAuth } from '../context/AuthContext'
import { Bar, Doughnut } from 'react-chartjs-2'
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, ArcElement } from 'chart.js'
import { School, Users, FileCheck, AlertTriangle, TrendingUp, MessageSquareWarning, Star, BarChart3 } from 'lucide-react'

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, ArcElement)

export default function Dashboard() {
  const { madrasah, pengawas, uploadEviden, checklistEviden, survei, pengaduan } = useData()
  const { user } = useAuth()

  // Filter data based on role
  const filteredMadrasah = user.role === 'pengawas'
    ? madrasah.filter(m => m.pengawasId === 'p1')
    : user.role === 'madrasah'
    ? madrasah.filter(m => m.id === 'm1')
    : madrasah

  // Stats
  const totalMadrasah = filteredMadrasah.length
  const totalPengawas = pengawas.filter(p => p.status === 'Aktif').length
  const totalEviden = uploadEviden.length
  const evidenBelumLengkap = uploadEviden.filter(e => e.statusVerifikasi === 'Menunggu Verifikasi').length

  // Calculate average capaian from checklist
  const getCapaian = (madrasahId) => {
    const cl = checklistEviden.find(c => c.madrasahId === madrasahId)
    if (!cl) return 0
    const allScores = cl.areas.flatMap(a => a.indikators.map(i => i.skor))
    return allScores.length > 0 ? Math.round(allScores.reduce((a, b) => a + b, 0) / allScores.length) : 0
  }

  const avgCapaian = filteredMadrasah.length > 0
    ? Math.round(filteredMadrasah.reduce((sum, m) => sum + getCapaian(m.id), 0) / filteredMadrasah.length)
    : 0

  const pengaduanMasuk = pengaduan.filter(p => p.status !== 'Selesai').length
  const pengaduanSelesai = pengaduan.filter(p => p.status === 'Selesai').length

  const avgSurvei = survei.length > 0
    ? (survei.reduce((sum, s) => sum + s.jawaban.reduce((a, b) => a + b, 0) / s.jawaban.length, 0) / survei.length).toFixed(2)
    : 0

  // Chart data - Capaian per madrasah
  const barData = {
    labels: filteredMadrasah.map(m => m.nama.length > 15 ? m.nama.substring(0, 15) + '...' : m.nama),
    datasets: [{
      label: 'Capaian ZI (%)',
      data: filteredMadrasah.map(m => getCapaian(m.id)),
      backgroundColor: '#16a34a',
      borderRadius: 6,
    }]
  }

  const barOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: { legend: { display: false }, title: { display: true, text: 'Capaian ZI per Madrasah (%)' } },
    scales: { y: { beginAtZero: true, max: 100 } }
  }

  // Doughnut - per area (from first checklist)
  const firstChecklist = checklistEviden[0]
  const doughnutData = firstChecklist ? {
    labels: firstChecklist.areas.map(a => `Area ${a.area}`),
    datasets: [{
      data: firstChecklist.areas.map(a => {
        const scores = a.indikators.map(i => i.skor)
        return Math.round(scores.reduce((x, y) => x + y, 0) / scores.length)
      }),
      backgroundColor: ['#166534', '#16a34a', '#4ade80', '#d97706', '#f59e0b', '#fbbf24'],
      borderWidth: 2,
      borderColor: '#fff',
    }]
  } : null

  const doughnutOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: { legend: { position: 'bottom', labels: { boxWidth: 12 } }, title: { display: true, text: 'Rata-rata Skor per Area ZI' } }
  }

  // Kategori capaian
  const getKategori = (skor) => {
    if (skor >= 85) return { label: 'Siap Evaluasi ZI', color: 'text-green-700 bg-green-100' }
    if (skor >= 70) return { label: 'Baik', color: 'text-blue-700 bg-blue-100' }
    if (skor >= 50) return { label: 'Berkembang', color: 'text-yellow-700 bg-yellow-100' }
    return { label: 'Perlu Pembinaan Intensif', color: 'text-red-700 bg-red-100' }
  }

  const madrasahCapaian = filteredMadrasah.map(m => ({ ...m, capaian: getCapaian(m.id) })).sort((a, b) => b.capaian - a.capaian)

  const stats = [
    { label: 'Jumlah Madrasah', value: totalMadrasah, icon: School, color: 'border-primary-600' },
    { label: 'Pengawas Aktif', value: totalPengawas, icon: Users, color: 'border-blue-600' },
    { label: 'Eviden Uploaded', value: totalEviden, icon: FileCheck, color: 'border-green-600' },
    { label: 'Eviden Belum Lengkap', value: evidenBelumLengkap, icon: AlertTriangle, color: 'border-red-600' },
    { label: 'Rata-rata Capaian ZI', value: `${avgCapaian}%`, icon: TrendingUp, color: 'border-accent-600' },
    { label: 'Pengaduan Masuk', value: pengaduanMasuk, icon: MessageSquareWarning, color: 'border-orange-600' },
    { label: 'Pengaduan Selesai', value: pengaduanSelesai, icon: MessageSquareWarning, color: 'border-emerald-600' },
    { label: 'Rata-rata Survei', value: avgSurvei, icon: Star, color: 'border-yellow-500' },
  ]

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-primary-800 dark:text-white">Dashboard</h1>
        <p className="text-gray-500 dark:text-gray-400 text-sm">Selamat datang, {user.nama}</p>
      </div>

      {/* Stat Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {stats.map((stat, i) => (
          <div key={i} className={`stat-card ${stat.color}`}>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs text-gray-500 dark:text-gray-400">{stat.label}</p>
                <p className="text-2xl font-bold text-gray-800 dark:text-white mt-1">{stat.value}</p>
              </div>
              <stat.icon className="w-8 h-8 text-gray-300 dark:text-gray-600" />
            </div>
          </div>
        ))}
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="card">
          <div className="h-64">
            <Bar data={barData} options={barOptions} />
          </div>
        </div>
        {doughnutData && (
          <div className="card">
            <div className="h-64">
              <Doughnut data={doughnutData} options={doughnutOptions} />
            </div>
          </div>
        )}
      </div>

      {/* Tables */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Top performers */}
        <div className="card">
          <h3 className="font-semibold text-primary-800 dark:text-white mb-3 flex items-center gap-2">
            <BarChart3 className="w-4 h-4" /> Capaian Tertinggi
          </h3>
          <div className="space-y-2">
            {madrasahCapaian.slice(0, 3).map(m => {
              const kat = getKategori(m.capaian)
              return (
                <div key={m.id} className="flex items-center justify-between p-2 bg-gray-50 dark:bg-gray-700 rounded-lg">
                  <div>
                    <p className="text-sm font-medium text-gray-800 dark:text-white">{m.nama}</p>
                    <p className="text-xs text-gray-500">{m.jenjang} - {m.kecamatan}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-bold text-primary-700 dark:text-primary-400">{m.capaian}%</p>
                    <span className={`text-xs px-2 py-0.5 rounded-full ${kat.color}`}>{kat.label}</span>
                  </div>
                </div>
              )
            })}
          </div>
        </div>

        {/* Needs attention */}
        <div className="card">
          <h3 className="font-semibold text-primary-800 dark:text-white mb-3 flex items-center gap-2">
            <AlertTriangle className="w-4 h-4 text-red-500" /> Perlu Pendampingan
          </h3>
          <div className="space-y-2">
            {madrasahCapaian.filter(m => m.capaian < 70).map(m => {
              const kat = getKategori(m.capaian)
              return (
                <div key={m.id} className="flex items-center justify-between p-2 bg-gray-50 dark:bg-gray-700 rounded-lg">
                  <div>
                    <p className="text-sm font-medium text-gray-800 dark:text-white">{m.nama}</p>
                    <p className="text-xs text-gray-500">{m.jenjang} - {m.kecamatan}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-bold text-red-600">{m.capaian}%</p>
                    <span className={`text-xs px-2 py-0.5 rounded-full ${kat.color}`}>{kat.label}</span>
                  </div>
                </div>
              )
            })}
            {madrasahCapaian.filter(m => m.capaian < 70).length === 0 && (
              <p className="text-sm text-gray-500 text-center py-4">Semua madrasah sudah baik 🎉</p>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
