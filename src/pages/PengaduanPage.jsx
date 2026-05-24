import { useState } from 'react';
import { useData } from '../context/DataContext';
import { useAuth } from '../context/AuthContext';
import { generateTicketNumber, formatDate, exportToPDF } from '../utils/helpers';
import { v4 as uuidv4 } from 'uuid';
import { QRCodeSVG } from 'qrcode.react';
import { Plus, Search, QrCode, FileText, X } from 'lucide-react';

export default function PengaduanPage() {
  const { pengaduan, setPengaduan, madrasah } = useData();
  const { hasRole } = useAuth();
  const [search, setSearch] = useState('');
  const [filterStatus, setFilterStatus] = useState('');
  const [showForm, setShowForm] = useState(false);
  const [showQR, setShowQR] = useState(false);
  const [editData, setEditData] = useState(null);
  const [formData, setFormData] = useState(getEmptyForm());

  function getEmptyForm() {
    return {
      tanggal: new Date().toISOString().split('T')[0], namaPelapor: '', kategoriPelapor: 'Masyarakat',
      madrasahId: '', madrasahNama: '', jenisPengaduan: 'Pelayanan', isiPengaduan: '',
      bukti: null, status: 'Masuk', tindakLanjut: '', tanggalPenyelesaian: null, petugasTindakLanjut: ''
    };
  }

  const filtered = pengaduan.filter(p => {
    const matchSearch = p.madrasahNama.toLowerCase().includes(search.toLowerCase()) ||
      p.tiket.toLowerCase().includes(search.toLowerCase()) ||
      p.isiPengaduan.toLowerCase().includes(search.toLowerCase());
    const matchStatus = !filterStatus || p.status === filterStatus;
    return matchSearch && matchStatus;
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    const selM = madrasah.find(m => m.id === formData.madrasahId);
    const data = { ...formData, madrasahNama: selM?.nama || '' };
    if (editData) {
      setPengaduan(prev => prev.map(p => p.id === editData.id ? { ...data, id: editData.id, tiket: editData.tiket } : p));
    } else {
      setPengaduan(prev => [...prev, { ...data, id: uuidv4(), tiket: generateTicketNumber() }]);
    }
    setShowForm(false); setEditData(null); setFormData(getEmptyForm());
  };

  const handleDelete = (id) => { if (confirm('Hapus pengaduan?')) setPengaduan(prev => prev.filter(p => p.id !== id)); };

  const statusColor = (s) => {
    switch (s) {
      case 'Selesai': return 'bg-green-100 text-green-700';
      case 'Diproses': return 'bg-blue-100 text-blue-700';
      case 'Diverifikasi': return 'bg-yellow-100 text-yellow-700';
      case 'Ditolak': return 'bg-red-100 text-red-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  const pengaduanUrl = `${window.location.origin}/publik/pengaduan`;

  const handleExportPDF = () => {
    const headers = ['No', 'Tiket', 'Tanggal', 'Madrasah', 'Jenis', 'Status'];
    const data = filtered.map((p, i) => [i + 1, p.tiket, p.tanggal, p.madrasahNama, p.jenisPengaduan, p.status]);
    exportToPDF('REKAP PENGADUAN MASYARAKAT', headers, data, 'pengaduan.pdf');
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <h1 className="text-2xl font-bold text-gray-800 dark:text-white">Kanal Pengaduan</h1>
        <div className="flex flex-wrap gap-2">
          <button onClick={() => setShowQR(!showQR)} className="btn-primary flex items-center gap-2">
            <QrCode size={16} /> QR Code
          </button>
          <button onClick={handleExportPDF} className="btn-secondary flex items-center gap-2">
            <FileText size={16} /> PDF
          </button>
          {hasRole('admin') && (
            <button onClick={() => { setShowForm(true); setEditData(null); setFormData(getEmptyForm()); }} className="btn-gold flex items-center gap-2">
              <Plus size={16} /> Tambah
            </button>
          )}
        </div>
      </div>

      {showQR && (
        <div className="card text-center">
          <h3 className="text-lg font-semibold mb-4 text-gray-800 dark:text-white">QR Code Kanal Pengaduan</h3>
          <div className="inline-block p-4 bg-white rounded-lg">
            <QRCodeSVG value={pengaduanUrl} size={200} />
          </div>
          <p className="text-sm text-gray-500 mt-2">{pengaduanUrl}</p>
        </div>
      )}

      {/* Filters */}
      <div className="card">
        <div className="flex flex-col sm:flex-row gap-3">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
            <input type="text" placeholder="Cari tiket, madrasah..." value={search} onChange={(e) => setSearch(e.target.value)} className="input-field pl-10" />
          </div>
          <select value={filterStatus} onChange={(e) => setFilterStatus(e.target.value)} className="input-field sm:w-48">
            <option value="">Semua Status</option>
            <option value="Masuk">Masuk</option>
            <option value="Diverifikasi">Diverifikasi</option>
            <option value="Diproses">Diproses</option>
            <option value="Selesai">Selesai</option>
            <option value="Ditolak">Ditolak</option>
          </select>
        </div>
      </div>

      {/* Table */}
      <div className="card overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr>
              <th className="table-header">Tiket</th>
              <th className="table-header">Tanggal</th>
              <th className="table-header hidden md:table-cell">Pelapor</th>
              <th className="table-header">Madrasah</th>
              <th className="table-header hidden lg:table-cell">Jenis</th>
              <th className="table-header">Status</th>
              {hasRole('admin', 'pengawas') && <th className="table-header">Aksi</th>}
            </tr>
          </thead>
          <tbody>
            {filtered.map(p => (
              <tr key={p.id} className="hover:bg-gray-50 dark:hover:bg-gray-700">
                <td className="table-cell font-mono text-xs">{p.tiket}</td>
                <td className="table-cell">{p.tanggal}</td>
                <td className="table-cell hidden md:table-cell">{p.namaPelapor || 'Anonim'}</td>
                <td className="table-cell">{p.madrasahNama}</td>
                <td className="table-cell hidden lg:table-cell">{p.jenisPengaduan}</td>
                <td className="table-cell"><span className={`px-2 py-1 rounded-full text-xs font-medium ${statusColor(p.status)}`}>{p.status}</span></td>
                {hasRole('admin', 'pengawas') && (
                  <td className="table-cell">
                    <div className="flex gap-2">
                      <button onClick={() => { setEditData(p); setFormData(p); setShowForm(true); }} className="text-blue-600 hover:text-blue-800 text-xs">Edit</button>
                      {hasRole('admin') && <button onClick={() => handleDelete(p.id)} className="text-red-600 hover:text-red-800 text-xs">Hapus</button>}
                    </div>
                  </td>
                )}
              </tr>
            ))}
            {filtered.length === 0 && <tr><td colSpan="7" className="table-cell text-center text-gray-400">Tidak ada pengaduan</td></tr>}
          </tbody>
        </table>
      </div>

      {/* Form Modal */}
      {showForm && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-800 dark:text-white">{editData ? 'Edit' : 'Tambah'} Pengaduan</h3>
              <button onClick={() => setShowForm(false)} className="text-gray-400 hover:text-gray-600"><X size={20} /></button>
            </div>
            <form onSubmit={handleSubmit} className="space-y-3">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Tanggal</label>
                  <input type="date" value={formData.tanggal} onChange={(e) => setFormData({...formData, tanggal: e.target.value})} className="input-field" required />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Kategori Pelapor</label>
                  <select value={formData.kategoriPelapor} onChange={(e) => setFormData({...formData, kategoriPelapor: e.target.value})} className="input-field">
                    <option value="Siswa">Siswa</option>
                    <option value="Orang Tua">Orang Tua</option>
                    <option value="Guru">Guru</option>
                    <option value="Masyarakat">Masyarakat</option>
                  </select>
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Nama Pelapor (opsional)</label>
                <input type="text" value={formData.namaPelapor} onChange={(e) => setFormData({...formData, namaPelapor: e.target.value})} className="input-field" placeholder="Kosongkan jika anonim" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Madrasah</label>
                <select value={formData.madrasahId} onChange={(e) => setFormData({...formData, madrasahId: e.target.value})} className="input-field" required>
                  <option value="">Pilih Madrasah</option>
                  {madrasah.map(m => <option key={m.id} value={m.id}>{m.nama}</option>)}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Jenis Pengaduan</label>
                <select value={formData.jenisPengaduan} onChange={(e) => setFormData({...formData, jenisPengaduan: e.target.value})} className="input-field">
                  <option value="Pelayanan">Pelayanan</option>
                  <option value="Fasilitas">Fasilitas</option>
                  <option value="SDM">SDM</option>
                  <option value="Keuangan">Keuangan</option>
                  <option value="Lainnya">Lainnya</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Isi Pengaduan</label>
                <textarea value={formData.isiPengaduan} onChange={(e) => setFormData({...formData, isiPengaduan: e.target.value})} className="input-field" rows="3" required />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Status</label>
                <select value={formData.status} onChange={(e) => setFormData({...formData, status: e.target.value})} className="input-field">
                  <option value="Masuk">Masuk</option>
                  <option value="Diverifikasi">Diverifikasi</option>
                  <option value="Diproses">Diproses</option>
                  <option value="Selesai">Selesai</option>
                  <option value="Ditolak">Ditolak</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Tindak Lanjut</label>
                <textarea value={formData.tindakLanjut} onChange={(e) => setFormData({...formData, tindakLanjut: e.target.value})} className="input-field" rows="2" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Petugas Tindak Lanjut</label>
                <input type="text" value={formData.petugasTindakLanjut} onChange={(e) => setFormData({...formData, petugasTindakLanjut: e.target.value})} className="input-field" />
              </div>
              <div className="flex gap-3 pt-4">
                <button type="submit" className="btn-primary flex-1">Simpan</button>
                <button type="button" onClick={() => setShowForm(false)} className="btn-secondary flex-1">Batal</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
