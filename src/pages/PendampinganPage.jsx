import { useState } from 'react';
import { useData } from '../context/DataContext';
import { useAuth } from '../context/AuthContext';
import { v4 as uuidv4 } from 'uuid';
import { formatDate } from '../utils/helpers';
import { Plus, Edit, Trash2, Search, X, Eye, ChevronDown } from 'lucide-react';

const OPSI_MATERI = [
  'Penyusunan dokumen Zona Integritas',
  'Pembangunan area layanan Bebas Korupsi (WBK)',
  'Pembangunan area layanan WBBM',
  'Penguatan Manajemen Perubahan',
  'Penataan Tatalaksana (SOP dan e-government)',
  'Penataan Sistem Manajemen SDM',
  'Penguatan Pengawasan Internal',
  'Penguatan Akuntabilitas Kinerja',
  'Peningkatan Kualitas Pelayanan Publik',
];

const OPSI_PERMASALAHAN = [
  'Dokumen ZI belum lengkap dan belum ter-update',
  'SDM belum memahami indikator penilaian ZI',
  'SOP layanan belum tersusun atau belum disosialisasikan',
  'Pengawasan internal belum berjalan optimal',
  'Sarana prasarana pelayanan publik belum memadai',
  'Belum ada tim kerja/pokja ZI yang aktif',
  'Inovasi pelayanan belum terdokumentasi',
];

const OPSI_REKOMENDASI = [
  'Segera melengkapi dokumen bukti dukung ZI sesuai komponen',
  'Mengadakan sosialisasi dan workshop ZI untuk seluruh pegawai',
  'Menyusun dan mengesahkan SOP pelayanan',
  'Membentuk tim pokja ZI dan menyusun rencana aksi',
  'Meningkatkan sarana pelayanan dan menyediakan ruang pengaduan',
  'Melakukan survei kepuasan masyarakat secara berkala',
  'Mendokumentasikan inovasi pelayanan publik',
];

const OPSI_TINDAK_LANJUT = [
  'Menyusun dan mengunggah dokumen bukti dukung dalam 2 minggu',
  'Melaksanakan rapat koordinasi tim ZI minggu depan',
  'Melakukan revisi SOP dan sosialisasi ke seluruh pegawai',
  'Menyiapkan bahan presentasi untuk evaluasi ZI',
  'Melaksanakan survei kepuasan layanan bulan depan',
  'Membuat laporan progress ZI per komponen',
  'Melaporkan hasil tindak lanjut pada pendampingan berikutnya',
];

export default function PendampinganPage() {
  const { pendampingan, setPendampingan, madrasah, pengawas } = useData();
  const { user, hasRole } = useAuth();
  const [search, setSearch] = useState('');
  const [filterStatus, setFilterStatus] = useState('');
  const [showForm, setShowForm] = useState(false);
  const [editData, setEditData] = useState(null);
  const [viewData, setViewData] = useState(null);
  const [formData, setFormData] = useState(getEmptyForm());

  function getEmptyForm() {
    return {
      tanggal: '', pengawasId: '', pengawasNama: '', madrasahId: '', madrasahNama: '',
      jenis: 'Offline', materi: '', permasalahan: '', rekomendasi: '',
      tindakLanjut: '', target: '', status: 'Belum Ditindaklanjuti'
    };
  }

  let filtered = pendampingan;
  if (user.role === 'pengawas') filtered = filtered.filter(p => p.pengawasId === user.pengawasId);

  filtered = filtered.filter(p => {
    const matchSearch = p.madrasahNama.toLowerCase().includes(search.toLowerCase()) ||
      p.materi.toLowerCase().includes(search.toLowerCase());
    const matchStatus = !filterStatus || p.status === filterStatus;
    return matchSearch && matchStatus;
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    const selMadrasah = madrasah.find(m => m.id === formData.madrasahId);
    const selPengawas = pengawas.find(p => p.id === formData.pengawasId);
    const dataToSave = {
      ...formData,
      madrasahNama: selMadrasah?.nama || '',
      pengawasNama: selPengawas?.nama || ''
    };
    if (editData) {
      setPendampingan(prev => prev.map(p => p.id === editData.id ? { ...dataToSave, id: editData.id } : p));
    } else {
      setPendampingan(prev => [...prev, { ...dataToSave, id: uuidv4() }]);
    }
    setShowForm(false);
    setEditData(null);
    setFormData(getEmptyForm());
  };

  const handleEdit = (item) => { setEditData(item); setFormData(item); setShowForm(true); };
  const handleDelete = (id) => { if (confirm('Hapus data pendampingan?')) setPendampingan(prev => prev.filter(p => p.id !== id)); };

  const statusColor = (s) => {
    if (s === 'Selesai') return 'bg-green-100 text-green-700';
    if (s === 'Proses') return 'bg-yellow-100 text-yellow-700';
    return 'bg-red-100 text-red-700';
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <h1 className="text-2xl font-bold text-gray-800 dark:text-white">Pendampingan ZI</h1>
        {hasRole('admin', 'pengawas') && (
          <button onClick={() => { setShowForm(true); setEditData(null); setFormData(getEmptyForm()); }} className="btn-primary flex items-center gap-2">
            <Plus size={16} /> Tambah
          </button>
        )}
      </div>

      <div className="card">
        <div className="flex flex-col sm:flex-row gap-3">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
            <input type="text" placeholder="Cari madrasah, materi..." value={search} onChange={(e) => setSearch(e.target.value)} className="input-field pl-10" />
          </div>
          <select value={filterStatus} onChange={(e) => setFilterStatus(e.target.value)} className="input-field sm:w-48">
            <option value="">Semua Status</option>
            <option value="Belum Ditindaklanjuti">Belum Ditindaklanjuti</option>
            <option value="Proses">Proses</option>
            <option value="Selesai">Selesai</option>
          </select>
        </div>
      </div>

      <div className="card overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr>
              <th className="table-header">Tanggal</th>
              <th className="table-header">Madrasah</th>
              <th className="table-header hidden md:table-cell">Pengawas</th>
              <th className="table-header hidden lg:table-cell">Jenis</th>
              <th className="table-header">Status</th>
              <th className="table-header">Aksi</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map(p => (
              <tr key={p.id} className="hover:bg-gray-50 dark:hover:bg-gray-700">
                <td className="table-cell">{formatDate(p.tanggal)}</td>
                <td className="table-cell font-medium">{p.madrasahNama}</td>
                <td className="table-cell hidden md:table-cell">{p.pengawasNama}</td>
                <td className="table-cell hidden lg:table-cell">{p.jenis}</td>
                <td className="table-cell"><span className={`px-2 py-1 rounded-full text-xs font-medium ${statusColor(p.status)}`}>{p.status}</span></td>
                <td className="table-cell">
                  <div className="flex gap-2">
                    <button onClick={() => setViewData(p)} className="text-green-600 hover:text-green-800"><Eye size={16} /></button>
                    {hasRole('admin', 'pengawas') && <>
                      <button onClick={() => handleEdit(p)} className="text-blue-600 hover:text-blue-800"><Edit size={16} /></button>
                      <button onClick={() => handleDelete(p.id)} className="text-red-600 hover:text-red-800"><Trash2 size={16} /></button>
                    </>}
                  </div>
                </td>
              </tr>
            ))}
            {filtered.length === 0 && <tr><td colSpan="6" className="table-cell text-center text-gray-400">Tidak ada data</td></tr>}
          </tbody>
        </table>
      </div>

      {/* View Detail Modal */}
      {viewData && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-800 dark:text-white">Detail Pendampingan</h3>
              <button onClick={() => setViewData(null)} className="text-gray-400 hover:text-gray-600"><X size={20} /></button>
            </div>
            <div className="space-y-3 text-sm">
              <div><span className="font-medium text-gray-500">Tanggal:</span> <span className="text-gray-800 dark:text-white">{formatDate(viewData.tanggal)}</span></div>
              <div><span className="font-medium text-gray-500">Pengawas:</span> <span className="text-gray-800 dark:text-white">{viewData.pengawasNama}</span></div>
              <div><span className="font-medium text-gray-500">Madrasah:</span> <span className="text-gray-800 dark:text-white">{viewData.madrasahNama}</span></div>
              <div><span className="font-medium text-gray-500">Jenis:</span> <span className="text-gray-800 dark:text-white">{viewData.jenis}</span></div>
              <div><span className="font-medium text-gray-500">Materi:</span> <span className="text-gray-800 dark:text-white">{viewData.materi}</span></div>
              <div><span className="font-medium text-gray-500">Permasalahan:</span> <span className="text-gray-800 dark:text-white">{viewData.permasalahan}</span></div>
              <div><span className="font-medium text-gray-500">Rekomendasi:</span> <span className="text-gray-800 dark:text-white">{viewData.rekomendasi}</span></div>
              <div><span className="font-medium text-gray-500">Tindak Lanjut:</span> <span className="text-gray-800 dark:text-white">{viewData.tindakLanjut}</span></div>
              <div><span className="font-medium text-gray-500">Target:</span> <span className="text-gray-800 dark:text-white">{formatDate(viewData.target)}</span></div>
              <div><span className="font-medium text-gray-500">Status:</span> <span className={`px-2 py-1 rounded-full text-xs font-medium ${statusColor(viewData.status)}`}>{viewData.status}</span></div>
            </div>
          </div>
        </div>
      )}

      {/* Form Modal */}
      {showForm && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-800 dark:text-white">{editData ? 'Edit' : 'Tambah'} Pendampingan</h3>
              <button onClick={() => setShowForm(false)} className="text-gray-400 hover:text-gray-600"><X size={20} /></button>
            </div>
            <form onSubmit={handleSubmit} className="space-y-3">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Tanggal</label>
                  <input type="date" value={formData.tanggal} onChange={(e) => setFormData({...formData, tanggal: e.target.value})} className="input-field" required />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Jenis</label>
                  <select value={formData.jenis} onChange={(e) => setFormData({...formData, jenis: e.target.value})} className="input-field">
                    <option value="Online">Online</option>
                    <option value="Offline">Offline</option>
                  </select>
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Pengawas</label>
                <select value={formData.pengawasId} onChange={(e) => setFormData({...formData, pengawasId: e.target.value})} className="input-field" required>
                  <option value="">Pilih Pengawas</option>
                  {pengawas.map(p => <option key={p.id} value={p.id}>{p.nama}</option>)}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Madrasah</label>
                <select value={formData.madrasahId} onChange={(e) => setFormData({...formData, madrasahId: e.target.value})} className="input-field" required>
                  <option value="">Pilih Madrasah</option>
                  {madrasah.map(m => <option key={m.id} value={m.id}>{m.nama}</option>)}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Materi Pendampingan</label>
                <select onChange={(e) => { if (e.target.value) setFormData({...formData, materi: e.target.value}); }} className="input-field mb-1" value="">
                  <option value="">-- Pilih contoh materi --</option>
                  {OPSI_MATERI.map((o, i) => <option key={i} value={o}>{o}</option>)}
                </select>
                <textarea value={formData.materi} onChange={(e) => setFormData({...formData, materi: e.target.value})} className="input-field" rows="2" required placeholder="Pilih di atas atau ketik manual..." />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Permasalahan</label>
                <select onChange={(e) => { if (e.target.value) setFormData({...formData, permasalahan: e.target.value}); }} className="input-field mb-1" value="">
                  <option value="">-- Pilih contoh permasalahan --</option>
                  {OPSI_PERMASALAHAN.map((o, i) => <option key={i} value={o}>{o}</option>)}
                </select>
                <textarea value={formData.permasalahan} onChange={(e) => setFormData({...formData, permasalahan: e.target.value})} className="input-field" rows="2" placeholder="Pilih di atas atau ketik manual..." />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Rekomendasi</label>
                <select onChange={(e) => { if (e.target.value) setFormData({...formData, rekomendasi: e.target.value}); }} className="input-field mb-1" value="">
                  <option value="">-- Pilih contoh rekomendasi --</option>
                  {OPSI_REKOMENDASI.map((o, i) => <option key={i} value={o}>{o}</option>)}
                </select>
                <textarea value={formData.rekomendasi} onChange={(e) => setFormData({...formData, rekomendasi: e.target.value})} className="input-field" rows="2" placeholder="Pilih di atas atau ketik manual..." />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Tindak Lanjut</label>
                <select onChange={(e) => { if (e.target.value) setFormData({...formData, tindakLanjut: e.target.value}); }} className="input-field mb-1" value="">
                  <option value="">-- Pilih contoh tindak lanjut --</option>
                  {OPSI_TINDAK_LANJUT.map((o, i) => <option key={i} value={o}>{o}</option>)}
                </select>
                <textarea value={formData.tindakLanjut} onChange={(e) => setFormData({...formData, tindakLanjut: e.target.value})} className="input-field" rows="2" placeholder="Pilih di atas atau ketik manual..." />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Target Penyelesaian</label>
                  <input type="date" value={formData.target} onChange={(e) => setFormData({...formData, target: e.target.value})} className="input-field" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Status</label>
                  <select value={formData.status} onChange={(e) => setFormData({...formData, status: e.target.value})} className="input-field">
                    <option value="Belum Ditindaklanjuti">Belum Ditindaklanjuti</option>
                    <option value="Proses">Proses</option>
                    <option value="Selesai">Selesai</option>
                  </select>
                </div>
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
