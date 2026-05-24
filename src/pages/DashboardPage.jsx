import { useData } from '../context/DataContext';
import { useAuth } from '../context/AuthContext';
import { hitungCapaianMadrasah, getKategoriCapaian } from '../utils/helpers';
import { Bar, Doughnut } from 'react-chartjs-2';
import {
  Chart as ChartJS, CategoryScale, LinearScale, BarElement,
  Title, Tooltip, Legend, ArcElement
} from 'chart.js';
import { School, Users, Upload, AlertTriangle, BarChart3, MessageSquare, CheckCircle, XCircle } from 'lucide-react';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, ArcElement);

export default function DashboardPage() {
  const { user } = useAuth();
  const { madrasah, pengawas, checklist, eviden, pengaduan, survei } = useData();

  // Filter data based on role
  const filteredMadrasah = user.role === 'pengawas'
    ? madrasah.filter(m => m.pengawasId === user.pengawasId)
    : user.role === 'madrasah'
    ? madrasah.filter(m => m.id === user.madrasahId)
    : madrasah;

  // Stats
  const totalMadrasah = filteredMadrasah.length;
  const totalPengawas = pengawas.length;
  const totalEviden = eviden.length;
  const evidenBelumLengkap = filteredMadrasah.filter(m => {
    const cl = checklist.find(c => c.madrasahId === m.id);
    if (!cl) return true;
    const { total } = hitungCapaianMadrasah(cl.data);
    return total < 85;
  }).length;

  const pengaduanMasuk = pengaduan.filter(p => p.status !== 'Selesai' && p.status !== 'Ditolak').length;
  const pengaduanSelesai = pengaduan.filter(p => p.status === 'Selesai').length;

  const avgSurvei = survei.length > 0
    ? (survei.reduce((sum, s) => sum + s.jawaban.reduce((a, b) => a + b, 0) / s.jawaban.length, 0) / survei.length).toFixed(2)
    : 0;

  // Capaian per madrasah for chart
  const capaianData = filteredMadrasah.map(m => {
    const cl = checklist.find(c => c.madrasahId === m.id);
    const { total } = hitungCapaianMadrasah(cl?.data);
    return { nama: m.nama, total: Math.round(total) };
  });

  const rataCapaian = capaianData.length > 0
    ? (capaianData.reduce((sum, c) => sum + c.total, 0) / capaianData.length).toFixed(1)
    : 0;

  // Bar chart data
  const barData = {
    labels: capaianData.map(c => c.nama.length > 15 ? c.nama.substring(0, 15) + '...' : c.nama),
    datasets: [{
      label: 'Capaian ZI (%)',
      data: capaianData.map(c => c.total),
      backgroundColor: capaianData.map(c => {
        if (c.total >= 85) return '#16a34a';
        if (c.total >= 70) return '#2563eb';
        if (c.total >= 50) return '#d97706';
        return '#dc2626';
      }),
      borderRadius: 6,
    }]
  };

  // Doughnut chart - area averages
  const areaLabels = ['Area 1', 'Area 2', 'Area 3', 'Area 4', 'Area 5', 'Area 6'];
  const areaAverages = areaLabels.map((_, idx) => {
    const areaKey = `area${idx + 1}`;
    let total = 0, count = 0;
    checklist.forEach(cl => {
      if (cl.data[areaKey]) {
        const avg = cl.data[areaKey].reduce((s, i) => s + i.skor, 0) / cl.data[areaKey].length;
        total += avg;
        count++;
      }
    });
    return count > 0 ? Math.round(total / count) : 0;
  });

  const doughnutData = {
    labels: ['Manajemen Perubahan', 'Tata Laksana', 'Manajemen SDM', 'Akuntabilitas', 'Pengawasan', 'Pelayanan Publik'],
    datasets: [{
      data: areaAverages,
      backgroundColor: ['#166534', '#16a34a', '#22c55e', '#d97706', '#f59e0b', '#fbbf24'],
      borderWidth: 2,
      borderColor: '#fff',
    }]
  };

  const stats = [
    { label: 'Madrasah Binaan', value: totalMadrasah, icon: School, color: 'bg-green-100 text-green-700' },
    { label: 'Pengawas', value: totalPengawas, icon: Users, color: 'bg-blue-100 text-blue-700' },
    { label: 'Eviden Uploaded', value: totalEviden, icon: Upload, color: 'bg-purple-100 text-purple-700' },
    { label: 'Eviden Belum Lengkap', value: evidenBelumLengkap, icon: XCircle, color: 'bg-red-100 text-red-700' },
    { label: 'Rata-rata Capaian ZI', value: `${rataCapaian}%`, icon: BarChart3, color: 'bg-amber-100 text-amber-700' },
    { label: 'Pengaduan Masuk', value: pengaduanMasuk, icon: AlertTriangle, color: 'bg-orange-100 text-orange-700' },
    { label: 'Pengaduan Selesai', value: pengaduanSelesai, icon: CheckCircle, color: 'bg-teal-100 text-teal-700' },
    { label: 'Rata-rata Survei', value: avgSurvei, icon: MessageSquare, color: 'bg-indigo-100 text-indigo-700' },
  ];

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-gray-800 dark:text-white">Dashboard</h1>

      {/* Stats Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {stats.map((stat, idx) => {
          const Icon = stat.icon;
          return (
            <div key={idx} className="card flex items-center gap-3">
              <div className={`p-3 rounded-lg ${stat.color}`}>
                <Icon size={20} />
              </div>
              <div>
                <p className="text-2xl font-bold text-gray-800 dark:text-white">{stat.value}</p>
                <p className="text-xs text-gray-500 dark:text-gray-400">{stat.label}</p>
              </div>
            </div>
          );
        })}
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="card">
          <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-4">Capaian ZI per Madrasah</h3>
          <Bar data={barData} options={{
            responsive: true,
            plugins: { legend: { display: false } },
            scales: { y: { beginAtZero: true, max: 100 } }
          }} />
        </div>
        <div className="card">
          <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-4">Rata-rata per Area ZI</h3>
          <div className="max-w-xs mx-auto">
            <Doughnut data={doughnutData} options={{
              responsive: true,
              plugins: { legend: { position: 'bottom', labels: { boxWidth: 12, font: { size: 10 } } } }
            }} />
          </div>
        </div>
      </div>

      {/* Tables */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="card">
          <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-4">Capaian Tertinggi</h3>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr>
                  <th className="table-header rounded-tl-lg">Madrasah</th>
                  <th className="table-header">Capaian</th>
                  <th className="table-header rounded-tr-lg">Kategori</th>
                </tr>
              </thead>
              <tbody>
                {capaianData.sort((a, b) => b.total - a.total).slice(0, 5).map((item, idx) => {
                  const kat = getKategoriCapaian(item.total);
                  return (
                    <tr key={idx}>
                      <td className="table-cell">{item.nama}</td>
                      <td className="table-cell font-semibold">{item.total}%</td>
                      <td className="table-cell">
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${kat.color}`}>{kat.label}</span>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
        <div className="card">
          <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-4">Perlu Pendampingan Khusus</h3>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr>
                  <th className="table-header rounded-tl-lg">Madrasah</th>
                  <th className="table-header">Capaian</th>
                  <th className="table-header rounded-tr-lg">Status</th>
                </tr>
              </thead>
              <tbody>
                {capaianData.filter(c => c.total < 70).sort((a, b) => a.total - b.total).slice(0, 5).map((item, idx) => {
                  const kat = getKategoriCapaian(item.total);
                  return (
                    <tr key={idx}>
                      <td className="table-cell">{item.nama}</td>
                      <td className="table-cell font-semibold">{item.total}%</td>
                      <td className="table-cell">
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${kat.color}`}>{kat.label}</span>
                      </td>
                    </tr>
                  );
                })}
                {capaianData.filter(c => c.total < 70).length === 0 && (
                  <tr><td colSpan="3" className="table-cell text-center text-gray-400">Semua madrasah berkinerja baik</td></tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
