import { useState } from 'react';
import { useData } from '../context/DataContext';
import { useAuth } from '../context/AuthContext';
import { v4 as uuidv4 } from 'uuid';
import { Plus, Edit, Trash2, X } from 'lucide-react';

export default function KartuKendaliPage() {
  const { kartuKendali, setKartuKendali, madrasah, pengawas } = useData();
  const { user, hasRole } = useAuth();
  const [showForm, setShowForm] = useState(false);
  const [editData, setEditData] = useState(null);
  const [formData, setFormData] = useState(getEmptyForm());

  function getEmptyForm() {
    return {
      bulan: '', tahun: new Date().getFullYear(), madrasahId: '', madrasahNama: '',
      pengawasId: '', pengawasNama: '', capaian: '', kendala: '',
      rekomendasi: '', tindakLanjut: '', targetBerikutnya: '', status: 'Kuning'
    };
  }

  let filtered = kartuKendali;
  if (user.role === 'pengawas') filtered = filtered.filter(k => k.pengawasId === user.pengawasId);

  const handleSubmit = (e) => {
    e.preventDefault();
    const selM = madrasah.find(m => m.id === formData.madrasahId);
    const selP = pengawas.find(p => p.id === formData.pengawasId);
    const data = { ...formData, madrasahNama: selM?.nama || '', pengawasNama: selP?.nama || '' };
    if (editData) {
      setKartuKendali(prev => prev.map(k => k.id === editData.id ? { ...data, id: editData.id } : k));
    } else {
      setKartuKendali(prev => [...prev, { ...data, id: uuidv4() }]);
    }
    setShowForm(false); setEditData(null); setFormData(getEmptyForm());
  };

  const handleDelete = (id) => { if (confirm('Hapus kartu kendali?')) setKartuKendali(prev => prev.filter(k => k.id !== id)); };

  const statusColor = (s) => {
    if (s === 'Hijau') return 'bg-green-500';
    if (s === 'Kuning') return 'bg-yellow-400';
    return 'bg-red-500';
  };

  const bulanList = ['Januari','Februari','Maret','April','Mei','Juni','Juli','Agustus','September','Oktober','November','Desember'];

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <h1 className="text-2xl font-bold text-gray-800 dark:text-white">Kartu Kendali Integritas</h1>
        {hasRole('admin', 'pengawas') && (
          <button onClick={() => { setShowForm(true); setEditData(null); setFormData(getEmptyForm()); }} className="btn-primary flex items-center gap-2">
            <Plus size={16} /> Tambah
          </button>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filtered.map(k => (
          <div key={k.id} className="card">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <div className={`w-4 h-4 rounded-full ${statusColor(k.status)}`}></div>
                <span className="text-sm font-medium text-gray-600 dark:text-gray-400">{k.bulan} {k.tahun}</span>
              </div>
              {hasRole('admin', 'pengawas') && (
                <div className="flex gap-2">
                  <button onClick={() => { setEditData(k); setFormData(k); setShowForm(true); }} className="text-blue-600"><Edit size={14} /></button>
                  <button onClick={() => handleDelete(k.id)} className="text-red-600"><Trash2 size={14} /></button>
                </div>
              )}
            </div>
            <h3 className="font-semibold text-gray-800 dark:text-white">{k.madrasahNama}</h3>
            <p className="text-xs text-gray-500 mb-2">Pengawas: {k.pengawasNama}</p>
            <div className="space-y-1 text-sm">
              <p><span className="text-gray-500">Capaian:</span> <span className="text-gray-700 dark:text-gray-300">{k.capaian}</span></p>
              <p><span className="text-gray-500">Kendala:</span> <span className="text-gray-700 dark:text-gray-300">{k.kendala}</span></p>
              <p><span className="text-gray-500">Target:</span> <span className="text-gray-700 dark:text-gray-300">{k.targetBerikutnya}</span></p>
            </div>
          </div>
        ))}
        {filtered.length === 0 && <p className="text-gray-400 col-span-full text-center py-8">Belum ada data kartu kendali</p>}
      </div>

      {showForm && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-800 dark:text-white">{editData ? 'Edit' : 'Tambah'} Kartu Kendali</h3>
              <button onClick={() => setShowForm(false)} className="text-gray-400 hover:text-gray-600"><X size={20} /></button>
            </div>
            <form onSubmit={handleSubmit} className="space-y-3">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Bulan</label>
                  <select value={formData.bulan} onChange={(e) => setFormData({...formData, bulan: e.target.value})} className="input-field" required>
                    <option value="">Pilih Bulan</option>
                    {bulanList.map(b => <option key={b} value={b}>{b}</option>)}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Tahun</label>
                  <input type="number" value={formData.tahun} onChange={(e) => setFormData({...formData, tahun: parseInt(e.target.value)})} className="input-field" />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Madrasah</label>
                <select value={formData.madrasahId} onChange={(e) => setFormData({...formData, madrasahId: e.target.value})} className="input-field" required>
                  <option value="">Pilih Madrasah</option>
                  {madrasah.map(m => <option key={m.id} value={m.id}>{m.nama}</option>)}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Pengawas</label>
                <select value={formData.pengawasId} onChange={(e) => setFormData({...formData, pengawasId: e.target.value})} className="input-field" required>
                  <option value="">Pilih Pengawas</option>
                  {pengawas.map(p => <option key={p.id} value={p.id}>{p.nama}</option>)}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Capaian Bulan Ini</label>
                <textarea value={formData.capaian} onChange={(e) => setFormData({...formData, capaian: e.target.value})} className="input-field" rows="2" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Kendala</label>
                <textarea value={formData.kendala} onChange={(e) => setFormData({...formData, kendala: e.target.value})} className="input-field" rows="2" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Rekomendasi</label>
                <textarea value={formData.rekomendasi} onChange={(e) => setFormData({...formData, rekomendasi: e.target.value})} className="input-field" rows="2" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Tindak Lanjut</label>
                <textarea value={formData.tindakLanjut} onChange={(e) => setFormData({...formData, tindakLanjut: e.target.value})} className="input-field" rows="2" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Target Bulan Berikutnya</label>
                <input type="text" value={formData.targetBerikutnya} onChange={(e) => setFormData({...formData, targetBerikutnya: e.target.value})} className="input-field" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Status Progres</label>
                <select value={formData.status} onChange={(e) => setFormData({...formData, status: e.target.value})} className="input-field">
                  <option value="Merah">🔴 Merah - Banyak eviden belum tersedia</option>
                  <option value="Kuning">🟡 Kuning - Sebagian eviden tersedia</option>
                  <option value="Hijau">🟢 Hijau - Eviden lengkap</option>
                </select>
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
