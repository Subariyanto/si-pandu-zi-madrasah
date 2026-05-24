import { useState } from 'react';
import { useData } from '../context/DataContext';
import { useAuth } from '../context/AuthContext';
import { surveiQuestions } from '../data/sampleData';
import { getKategoriSurvei, exportToExcel, exportToPDF } from '../utils/helpers';
import { QRCodeSVG } from 'qrcode.react';
import { Bar } from 'react-chartjs-2';
import { Download, FileText, QrCode } from 'lucide-react';

export default function SurveiPage() {
  const { survei, madrasah } = useData();
  const { user } = useAuth();
  const [selectedMadrasah, setSelectedMadrasah] = useState('');
  const [showQR, setShowQR] = useState(false);

  let availableMadrasah = madrasah;
  if (user.role === 'pengawas') availableMadrasah = madrasah.filter(m => m.pengawasId === user.pengawasId);
  if (user.role === 'madrasah') availableMadrasah = madrasah.filter(m => m.id === user.madrasahId);

  const filteredSurvei = selectedMadrasah ? survei.filter(s => s.madrasahId === selectedMadrasah) : survei;

  // Calculate averages per question
  const questionAverages = surveiQuestions.map((_, idx) => {
    if (filteredSurvei.length === 0) return 0;
    const total = filteredSurvei.reduce((sum, s) => sum + (s.jawaban[idx] || 0), 0);
    return (total / filteredSurvei.length).toFixed(2);
  });

  const overallAvg = filteredSurvei.length > 0
    ? (filteredSurvei.reduce((sum, s) => sum + s.jawaban.reduce((a, b) => a + b, 0) / s.jawaban.length, 0) / filteredSurvei.length).toFixed(2)
    : 0;

  const kategori = getKategoriSurvei(parseFloat(overallAvg));

  const chartData = {
    labels: surveiQuestions.map((q, i) => `P${i + 1}`),
    datasets: [{
      label: 'Rata-rata Skor',
      data: questionAverages,
      backgroundColor: '#16a34a',
      borderRadius: 6,
    }]
  };

  const surveyUrl = `${window.location.origin}/publik/survei${selectedMadrasah ? `?madrasah=${selectedMadrasah}` : ''}`;

  const handleExportExcel = () => {
    const data = filteredSurvei.map(s => ({
      Tanggal: s.tanggal, Madrasah: s.madrasahNama, Kategori: s.kategoriResponden,
      Responden: s.namaResponden || 'Anonim',
      ...Object.fromEntries(surveiQuestions.map((q, i) => [`P${i+1}`, s.jawaban[i]])),
      'Kritik/Saran': s.kritikSaran
    }));
    exportToExcel(data, 'Survei', 'survei-kepuasan.xlsx');
  };

  const handleExportPDF = () => {
    const headers = ['No', 'Tanggal', 'Madrasah', 'Responden', 'Rata-rata', 'Kategori'];
    const data = filteredSurvei.map((s, i) => {
      const avg = (s.jawaban.reduce((a, b) => a + b, 0) / s.jawaban.length).toFixed(2);
      return [i + 1, s.tanggal, s.madrasahNama, s.namaResponden || 'Anonim', avg, getKategoriSurvei(parseFloat(avg)).label];
    });
    exportToPDF('HASIL SURVEI KEPUASAN LAYANAN', headers, data, 'survei-kepuasan.pdf');
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <h1 className="text-2xl font-bold text-gray-800 dark:text-white">Survei Kepuasan Layanan</h1>
        <div className="flex flex-wrap gap-2">
          <button onClick={() => setShowQR(!showQR)} className="btn-primary flex items-center gap-2">
            <QrCode size={16} /> QR Code
          </button>
          <button onClick={handleExportExcel} className="btn-gold flex items-center gap-2">
            <Download size={16} /> Excel
          </button>
          <button onClick={handleExportPDF} className="btn-secondary flex items-center gap-2">
            <FileText size={16} /> PDF
          </button>
        </div>
      </div>

      {/* Filter */}
      <div className="card">
        <select value={selectedMadrasah} onChange={(e) => setSelectedMadrasah(e.target.value)} className="input-field max-w-md">
          <option value="">Semua Madrasah</option>
          {availableMadrasah.map(m => <option key={m.id} value={m.id}>{m.nama}</option>)}
        </select>
      </div>

      {/* QR Code */}
      {showQR && (
        <div className="card text-center">
          <h3 className="text-lg font-semibold mb-4 text-gray-800 dark:text-white">QR Code Survei Kepuasan</h3>
          <div className="inline-block p-4 bg-white rounded-lg">
            <QRCodeSVG value={surveyUrl} size={200} />
          </div>
          <p className="text-sm text-gray-500 mt-2 break-all">{surveyUrl}</p>
        </div>
      )}

      {/* Summary */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="card text-center">
          <p className="text-sm text-gray-500">Total Responden</p>
          <p className="text-3xl font-bold text-gray-800 dark:text-white">{filteredSurvei.length}</p>
        </div>
        <div className="card text-center">
          <p className="text-sm text-gray-500">Rata-rata Nilai</p>
          <p className="text-3xl font-bold text-kemenag-green">{overallAvg}</p>
        </div>
        <div className="card text-center">
          <p className="text-sm text-gray-500">Kategori</p>
          <p className={`text-lg font-bold px-3 py-1 rounded-full inline-block ${kategori.color}`}>{kategori.label}</p>
        </div>
      </div>

      {/* Chart */}
      <div className="card">
        <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-4">Grafik Rata-rata per Pertanyaan</h3>
        <Bar data={chartData} options={{
          responsive: true,
          plugins: { legend: { display: false } },
          scales: { y: { beginAtZero: true, max: 5 } }
        }} />
        <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-2 text-xs text-gray-600 dark:text-gray-400">
          {surveiQuestions.map((q, i) => (
            <p key={i}><span className="font-medium">P{i+1}:</span> {q}</p>
          ))}
        </div>
      </div>

      {/* Data Table */}
      <div className="card overflow-x-auto">
        <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-4">Data Responden</h3>
        <table className="w-full">
          <thead>
            <tr>
              <th className="table-header">No</th>
              <th className="table-header">Tanggal</th>
              <th className="table-header">Madrasah</th>
              <th className="table-header hidden md:table-cell">Kategori</th>
              <th className="table-header">Rata-rata</th>
              <th className="table-header hidden md:table-cell">Kategori Hasil</th>
            </tr>
          </thead>
          <tbody>
            {filteredSurvei.map((s, idx) => {
              const avg = (s.jawaban.reduce((a, b) => a + b, 0) / s.jawaban.length).toFixed(2);
              const kat = getKategoriSurvei(parseFloat(avg));
              return (
                <tr key={s.id} className="hover:bg-gray-50 dark:hover:bg-gray-700">
                  <td className="table-cell">{idx + 1}</td>
                  <td className="table-cell">{s.tanggal}</td>
                  <td className="table-cell">{s.madrasahNama}</td>
                  <td className="table-cell hidden md:table-cell">{s.kategoriResponden}</td>
                  <td className="table-cell font-semibold">{avg}</td>
                  <td className="table-cell hidden md:table-cell">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${kat.color}`}>{kat.label}</span>
                  </td>
                </tr>
              );
            })}
            {filteredSurvei.length === 0 && <tr><td colSpan="6" className="table-cell text-center text-gray-400">Belum ada data survei</td></tr>}
          </tbody>
        </table>
      </div>
    </div>
  );
}
