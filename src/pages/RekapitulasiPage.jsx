import { useState } from 'react';
import { useData } from '../context/DataContext';
import { useAuth } from '../context/AuthContext';
import { hitungCapaianMadrasah, getKategoriCapaian, exportToPDF, exportToExcel } from '../utils/helpers';
import { Bar } from 'react-chartjs-2';
import { Download, FileText } from 'lucide-react';

export default function RekapitulasiPage() {
  const { madrasah, checklist, pengawas } = useData();
  const { user } = useAuth();
  const [filterKecamatan, setFilterKecamatan] = useState('');
  const [filterJenjang, setFilterJenjang] = useState('');
  const [filterPengawas, setFilterPengawas] = useState('');
  const [filterKategori, setFilterKategori] = useState('');

  let data = madrasah;
  if (user.role === 'pengawas') data = data.filter(m => m.pengawasId === user.pengawasId);

  const kecamatanList = [...new Set(madrasah.map(m => m.kecamatan))];

  // Calculate capaian for each madrasah
  const rekapData = data.map(m => {
    const cl = checklist.find(c => c.madrasahId === m.id);
    const capaian = hitungCapaianMadrasah(cl?.data);
    const kategori = getKategoriCapaian(capaian.total);
    return {
      ...m,
      area1: capaian.areas.area1 || 0,
      area2: capaian.areas.area2 || 0,
      area3: capaian.areas.area3 || 0,
      area4: capaian.areas.area4 || 0,
      area5: capaian.areas.area5 || 0,
      area6: capaian.areas.area6 || 0,
      nilaiAkhir: capaian.total,
      kategori: kategori.label,
      kategoriColor: kategori.color,
    };
  });

  let filtered = rekapData;
  if (filterKecamatan) filtered = filtered.filter(r => r.kecamatan === filterKecamatan);
  if (filterJenjang) filtered = filtered.filter(r => r.jenjang === filterJenjang);
  if (filterPengawas) filtered = filtered.filter(r => r.pengawasId === filterPengawas);
  if (filterKategori) filtered = filtered.filter(r => r.kategori === filterKategori);

  const chartData = {
    labels: filtered.map(r => r.nama.length > 12 ? r.nama.substring(0, 12) + '...' : r.nama),
    datasets: [{
      label: 'Nilai Akhir (%)',
      data: filtered.map(r => r.nilaiAkhir.toFixed(1)),
      backgroundColor: filtered.map(r => {
        if (r.nilaiAkhir >= 85) return '#16a34a';
        if (r.nilaiAkhir >= 70) return '#2563eb';
        if (r.nilaiAkhir >= 50) return '#d97706';
        return '#dc2626';
      }),
      borderRadius: 6,
    }]
  };

  const handleExportExcel = () => {
    const excelData = filtered.map(r => ({
      Nama: r.nama, Jenjang: r.jenjang, Kecamatan: r.kecamatan, Pengawas: r.pengawasNama,
      'Area 1': r.area1.toFixed(0), 'Area 2': r.area2.toFixed(0), 'Area 3': r.area3.toFixed(0),
      'Area 4': r.area4.toFixed(0), 'Area 5': r.area5.toFixed(0), 'Area 6': r.area6.toFixed(0),
      'Nilai Akhir': r.nilaiAkhir.toFixed(1), Kategori: r.kategori
    }));
    exportToExcel(excelData, 'Rekapitulasi', 'rekapitulasi-capaian.xlsx');
  };

  const handleExportPDF = () => {
    const headers = ['No', 'Madrasah', 'Jenjang', 'A1', 'A2', 'A3', 'A4', 'A5', 'A6', 'Total', 'Kategori'];
    const pdfData = filtered.map((r, i) => [
      i + 1, r.nama, r.jenjang,
      r.area1.toFixed(0), r.area2.toFixed(0), r.area3.toFixed(0),
      r.area4.toFixed(0), r.area5.toFixed(0), r.area6.toFixed(0),
      r.nilaiAkhir.toFixed(1), r.kategori
    ]);
    exportToPDF('REKAPITULASI CAPAIAN ZONA INTEGRITAS', headers, pdfData, 'rekapitulasi-capaian.pdf');
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <h1 className="text-2xl font-bold text-gray-800 dark:text-white">Rekapitulasi Capaian</h1>
        <div className="flex flex-wrap gap-2">
          <button onClick={handleExportExcel} className="btn-gold flex items-center gap-2">
            <Download size={16} /> Excel
          </button>
          <button onClick={handleExportPDF} className="btn-secondary flex items-center gap-2">
            <FileText size={16} /> PDF
          </button>
        </div>
      </div>

      {/* Filters */}
      <div className="card">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          <select value={filterKecamatan} onChange={(e) => setFilterKecamatan(e.target.value)} className="input-field">
            <option value="">Semua Kecamatan</option>
            {kecamatanList.map(k => <option key={k} value={k}>{k}</option>)}
          </select>
          <select value={filterJenjang} onChange={(e) => setFilterJenjang(e.target.value)} className="input-field">
            <option value="">Semua Jenjang</option>
            <option value="RA">RA</option>
            <option value="MI">MI</option>
            <option value="MTs">MTs</option>
            <option value="MA">MA</option>
          </select>
          <select value={filterPengawas} onChange={(e) => setFilterPengawas(e.target.value)} className="input-field">
            <option value="">Semua Pengawas</option>
            {pengawas.map(p => <option key={p.id} value={p.id}>{p.nama}</option>)}
          </select>
          <select value={filterKategori} onChange={(e) => setFilterKategori(e.target.value)} className="input-field">
            <option value="">Semua Kategori</option>
            <option value="Siap Evaluasi ZI">Siap Evaluasi ZI</option>
            <option value="Baik">Baik</option>
            <option value="Berkembang">Berkembang</option>
            <option value="Perlu Pembinaan Intensif">Perlu Pembinaan Intensif</option>
          </select>
        </div>
      </div>

      {/* Chart */}
      <div className="card">
        <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-4">Grafik Capaian</h3>
        <Bar data={chartData} options={{
          responsive: true,
          plugins: { legend: { display: false } },
          scales: { y: { beginAtZero: true, max: 100 } }
        }} />
      </div>

      {/* Table */}
      <div className="card overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr>
              <th className="table-header">No</th>
              <th className="table-header">Madrasah</th>
              <th className="table-header hidden md:table-cell">Jenjang</th>
              <th className="table-header hidden lg:table-cell">Kecamatan</th>
              <th className="table-header hidden lg:table-cell">Pengawas</th>
              <th className="table-header">A1</th>
              <th className="table-header">A2</th>
              <th className="table-header">A3</th>
              <th className="table-header">A4</th>
              <th className="table-header">A5</th>
              <th className="table-header">A6</th>
              <th className="table-header">Total</th>
              <th className="table-header">Kategori</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((r, idx) => (
              <tr key={r.id} className="hover:bg-gray-50 dark:hover:bg-gray-700">
                <td className="table-cell">{idx + 1}</td>
                <td className="table-cell font-medium">{r.nama}</td>
                <td className="table-cell hidden md:table-cell">{r.jenjang}</td>
                <td className="table-cell hidden lg:table-cell">{r.kecamatan}</td>
                <td className="table-cell hidden lg:table-cell">{r.pengawasNama}</td>
                <td className="table-cell">{r.area1.toFixed(0)}</td>
                <td className="table-cell">{r.area2.toFixed(0)}</td>
                <td className="table-cell">{r.area3.toFixed(0)}</td>
                <td className="table-cell">{r.area4.toFixed(0)}</td>
                <td className="table-cell">{r.area5.toFixed(0)}</td>
                <td className="table-cell">{r.area6.toFixed(0)}</td>
                <td className="table-cell font-bold">{r.nilaiAkhir.toFixed(1)}</td>
                <td className="table-cell">
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${r.kategoriColor}`}>{r.kategori}</span>
                </td>
              </tr>
            ))}
            {filtered.length === 0 && <tr><td colSpan="13" className="table-cell text-center text-gray-400">Tidak ada data</td></tr>}
          </tbody>
        </table>
      </div>
    </div>
  );
}
