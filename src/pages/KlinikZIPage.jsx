import { useState } from 'react';
import { useData } from '../context/DataContext';
import { useAuth } from '../context/AuthContext';
import { v4 as uuidv4 } from 'uuid';
import { Plus, Edit, Trash2, X } from 'lucide-react';

export default function KlinikZIPage() {
  const { klinik, setKlinik, madrasah } = useData();
  const { user, hasRole } = useAuth();
  const [showForm, setShowForm] = useState(false);
  const [editData, setEditData] = useState(null);
  const [formData, setFormData] = useState(getEmptyForm());

  function getEmptyForm() {
    return {
      tanggal: '', madrasahId: '', madrasahNama: '', namaPeserta: '',
      jabatanPeserta: '', topik: '', permasalahan: '', solusi: '',
      tindakLanjut: '', jadwalMonitoring: '', dokumentasi: null
    };
  }

  let filtered = klinik;
  if (user.role === 'pengawas') {
    const myMadrasah = madrasah.filter(m => m.pengawasId === user.pengawasId).map(m => m.id);
    filtered = klinik.filter(k => myMadrasah.includes(k.madrasahId));
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    const selM = madrasah.find(m => m.id === formData.madrasahId);
    const data = { ...formData, madrasahNama: selM?.nama || '' };
    if (editData) {
      setKlinik(prev => prev.map(k => k.id === editData.id ? { ...data, id: editData.id } : k));
    } else {
      setKlinik(prev => [...prev, { ...data, id: uuidv4() }]);
    }
    setShowForm(false); setEditData(null); setFormData(getEmptyForm());
  };

  const handleDelete = (id) => { if (confirm('Hapus data klinik ZI?')) setKlinik(prev => prev.filter(k => k.id !== id)); };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <h1 className="text-2xl font-bold text-gray-800 dark:text-white">Klinik ZI</h1>
        {hasRole('admin', 'pengawas') && (
          <button onClick={() => { setShowForm(true); setEditData(null); setFormData(getEmptyForm()); }} className="btn-primary flex items-center gap-2">
            <Plus size={16} /> Tambah
          </button>
        )}
      </div>

      <div className="card overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr>
              <th className="table-header">Tanggal</th>
              <th className="table-header">Madrasah</th>
              <th className="table-header hidden md:table-cell">Peserta</th>
              <th className="table-header hidden lg:table-cell">Topik</th>
              <th className="table-header hidden md:table-cell">Jadwal Monitoring</th>
              {hasRole('admin', 'pengawas') && <th className="table-header">Aksi</th>}
            </tr>
          </thead>
          <tbody>
            {filtered.map(k => (
              <tr key={k.id} className="hover:bg-gray-50 dark:hover:bg-gray-700">
                <td className="table-cell">{k.tanggal}</td>
                <td className="table-cell font-medium">{k.madrasahNama}</td>
                <td className="table-cell hidden md:table-cell">{k.namaPeserta}</td>
                <td className="table-cell hidden lg:table-cell">{k.topik}</td>
                <td className="table-cell hidden md:table-cell">{k.jadwalMonitoring || '-'}</td>
                {hasRole('admin', 'pengawas') && (
                  <td className="table-cell">
                    <div className="flex gap-2">
                      <button onClick={() => { setEditData(k); setFormData(k); setShowForm(true); }} className="text-blue-600"><Edit size={16} /></button>
                      <button onClick={() => handleDelete(k.id)} className="text-red-600"><Trash2 size={16} /></button>
                    </div>
                  </td>
                )}
              </tr>
            ))}
            {filtered.length === 0 && <tr><td colSpan="6" className="table-cell text-center text-gray-400">Tidak ada data</td></tr>}
          </tbody>
        </table>
      </div>

      {showForm && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-800 dark:text-white">{editData ? 'Edit' : 'Tambah'} Klinik ZI</h3>
              <button onClick={() => setShowForm(false)} className="text-gray-400 hover:text-gray-600"><X size={20} /></button>
            </div>
            <form onSubmit={handleSubmit} className="space-y-3">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Tanggal</label>
                  <input type="date" value={formData.tanggal} onChange={(e) => setFormData({...formData, tanggal: e.target.value})} className="input-field" required />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Madrasah</label>
                  <select value={formData.madrasahId} onChange={(e) => setFormData({...formData, madrasahId: e.target.value})} className="input-field" required>
                    <option value="">Pilih</option>
                    {madrasah.map(m => <option key={m.id} value={m.id}>{m.nama}</option>)}
                  </select>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Nama Peserta</label>
                  <input type="text" value={formData.namaPeserta} onChange={(e) => setFormData({...formData, namaPeserta: e.target.value})} className="input-field" required />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Jabatan</label>
                  <input type="text" value={formData.jabatanPeserta} onChange={(e) => setFormData({...formData, jabatanPeserta: e.target.value})} className="input-field" />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Topik Konsultasi</label>
                <input type="text" value={formData.topik} onChange={(e) => setFormData({...formData, topik: e.target.value})} className="input-field" required />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Permasalahan</label>
                <textarea value={formData.permasalahan} onChange={(e) => setFormData({...formData, permasalahan: e.target.value})} className="input-field" rows="2" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Solusi/Rekomendasi</label>
                <textarea value={formData.solusi} onChange={(e) => setFormData({...formData, solusi: e.target.value})} className="input-field" rows="2" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Tindak Lanjut</label>
                <textarea value={formData.tindakLanjut} onChange={(e) => setFormData({...formData, tindakLanjut: e.target.value})} className="input-field" rows="2" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Jadwal Monitoring Berikutnya</label>
                <input type="date" value={formData.jadwalMonitoring} onChange={(e) => setFormData({...formData, jadwalMonitoring: e.target.value})} className="input-field" />
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
