import { useState } from 'react';
import { useData } from '../context/DataContext';
import { useAuth } from '../context/AuthContext';
import { exportToPDF, exportToExcel, hitungCapaianMadrasah, formatDate } from '../utils/helpers';
import { FileText, Download, Printer } from 'lucide-react';

export default function LaporanTriwulanPage() {
  const { madrasah, checklist, pendampingan, pengawas } = useData();
  const { user } = useAuth();
  const [triwulan, setTriwulan] = useState('1');
  const [tahun, setTahun] = useState(new Date().getFullYear());
  const [selectedPengawas, setSelectedPengawas] = useState(user.role === 'pengawas' ? user.pengawasId : '');

  const triwulanRange = {
    '1': { start: '01', end: '03', label: 'Triwulan I (Januari - Maret)' },
    '2': { start: '04', end: '06', label: 'Triwulan II (April - Juni)' },
    '3': { start: '07', end: '09', label: 'Triwulan III (Juli - September)' },
    '4': { start: '10', end: '12', label: 'Triwulan IV (Oktober - Desember)' },
  };

  const range = triwulanRange[triwulan];
  const startDate = `${tahun}-${range.start}-01`;
  const endDate = `${tahun}-${range.end}-31`;

  // Filter pendampingan by triwulan
  const filteredPendampingan = pendampingan.filter(p => {
    const matchDate = p.tanggal >= startDate && p.tanggal <= endDate;
    const matchPengawas = !selectedPengawas || p.pengawasId === selectedPengawas;
    return matchDate && matchPengawas;
  });

  // Madrasah binaan
  const madrasahBinaan = selectedPengawas
    ? madrasah.filter(m => m.pengawasId === selectedPengawas)
    : madrasah;

  // Capaian per madrasah
  const capaianList = madrasahBinaan.map(m => {
    const cl = checklist.find(c => c.madrasahId === m.id);
    const { total } = hitungCapaianMadrasah(cl?.data);
    return { nama: m.nama, jenjang: m.jenjang, total: total.toFixed(1) };
  });

  const selectedPengawasData = pengawas.find(p => p.id === selectedPengawas);

  const handleExportPDF = () => {
    const headers = ['No', 'Madrasah', 'Jenjang', 'Capaian ZI (%)'];
    const data = capaianList.map((c, i) => [i + 1, c.nama, c.jenjang, c.total]);
    exportToPDF(`LAPORAN ${range.label.toUpperCase()} ${tahun}`, headers, data, `laporan-triwulan-${triwulan}-${tahun}.pdf`);
  };

  const handleExportExcel = () => {
    const data = capaianList.map(c => ({ Madrasah: c.nama, Jenjang: c.jenjang, 'Capaian ZI (%)': c.total }));
    exportToExcel(data, 'Laporan Triwulan', `laporan-triwulan-${triwulan}-${tahun}.xlsx`);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <h1 className="text-2xl font-bold text-gray-800 dark:text-white">Laporan Triwulan</h1>
        <div className="flex flex-wrap gap-2">
          <button onClick={handleExportPDF} className="btn-primary flex items-center gap-2">
            <FileText size={16} /> PDF
          </button>
          <button onClick={handleExportExcel} className="btn-gold flex items-center gap-2">
            <Download size={16} /> Excel
          </button>
        </div>
      </div>

      {/* Filters */}
      <div className="card">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Triwulan</label>
            <select value={triwulan} onChange={(e) => setTriwulan(e.target.value)} className="input-field">
              <option value="1">Triwulan I (Jan-Mar)</option>
              <option value="2">Triwulan II (Apr-Jun)</option>
              <option value="3">Triwulan III (Jul-Sep)</option>
              <option value="4">Triwulan IV (Okt-Des)</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Tahun</label>
            <input type="number" value={tahun} onChange={(e) => setTahun(parseInt(e.target.value))} className="input-field" />
          </div>
          {user.role !== 'pengawas' && (
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Pengawas</label>
              <select value={selectedPengawas} onChange={(e) => setSelectedPengawas(e.target.value)} className="input-field">
                <option value="">Semua Pengawas</option>
                {pengawas.map(p => <option key={p.id} value={p.id}>{p.nama}</option>)}
              </select>
            </div>
          )}
        </div>
      </div>

      {/* Report Content */}
      <div className="card">
        <div className="border-b border-gray-200 dark:border-gray-700 pb-4 mb-4">
          <h2 className="text-xl font-bold text-center text-gray-800 dark:text-white">LAPORAN {range.label.toUpperCase()}</h2>
          <p className="text-center text-gray-500">Tahun {tahun}</p>
          {selectedPengawasData && (
            <div className="mt-4 text-sm text-gray-600 dark:text-gray-400">
              <p><strong>Pengawas:</strong> {selectedPengawasData.nama}</p>
              <p><strong>NIP:</strong> {selectedPengawasData.nip}</p>
              <p><strong>Wilayah:</strong> {selectedPengawasData.wilayah}</p>
            </div>
          )}
        </div>

        {/* Madrasah Binaan */}
        <div className="mb-6">
          <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-3">A. Daftar Madrasah Binaan</h3>
          <table className="w-full text-sm">
            <thead>
              <tr>
                <th className="table-header">No</th>
                <th className="table-header">Madrasah</th>
                <th className="table-header">Jenjang</th>
                <th className="table-header">Capaian ZI</th>
              </tr>
            </thead>
            <tbody>
              {capaianList.map((c, idx) => (
                <tr key={idx}>
                  <td className="table-cell">{idx + 1}</td>
                  <td className="table-cell">{c.nama}</td>
                  <td className="table-cell">{c.jenjang}</td>
                  <td className="table-cell font-semibold">{c.total}%</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Kegiatan Pendampingan */}
        <div className="mb-6">
          <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-3">B. Kegiatan Pendampingan</h3>
          {filteredPendampingan.length > 0 ? (
            <table className="w-full text-sm">
              <thead>
                <tr>
                  <th className="table-header">No</th>
                  <th className="table-header">Tanggal</th>
                  <th className="table-header">Madrasah</th>
                  <th className="table-header">Materi</th>
                  <th className="table-header">Status</th>
                </tr>
              </thead>
              <tbody>
                {filteredPendampingan.map((p, idx) => (
                  <tr key={p.id}>
                    <td className="table-cell">{idx + 1}</td>
                    <td className="table-cell">{formatDate(p.tanggal)}</td>
                    <td className="table-cell">{p.madrasahNama}</td>
                    <td className="table-cell">{p.materi}</td>
                    <td className="table-cell">{p.status}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <p className="text-gray-400 text-sm">Tidak ada kegiatan pendampingan pada periode ini.</p>
          )}
        </div>

        <div className="text-sm text-gray-600 dark:text-gray-400">
          <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-3">C. Kesimpulan</h3>
          <p>Berdasarkan hasil monitoring dan pendampingan pada {range.label} {tahun}, terdapat {madrasahBinaan.length} madrasah binaan dengan {filteredPendampingan.length} kegiatan pendampingan yang telah dilaksanakan.</p>
        </div>
      </div>
    </div>
  );
}
