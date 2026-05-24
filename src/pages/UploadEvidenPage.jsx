import { useState } from 'react';
import { useData } from '../context/DataContext';
import { useAuth } from '../context/AuthContext';
import { ziAreas } from '../data/sampleData';
import { v4 as uuidv4 } from 'uuid';
import { Plus, Trash2, Upload, CheckCircle, XCircle, Clock } from 'lucide-react';

export default function UploadEvidenPage() {
  const { eviden, setEviden, madrasah } = useData();
  const { user, hasRole } = useAuth();
  const [showForm, setShowForm] = useState(false);
  const [filterArea, setFilterArea] = useState('');
  const [filterStatus, setFilterStatus] = useState('');
  const [formData, setFormData] = useState({
    madrasahId: '', madrasahNama: '', areaId: '', areaName: '',
    indikator: '', jenisDoc: '', file: null, fileName: '',
    keterangan: '', statusVerifikasi: 'Menunggu', catatanVerifikator: ''
  });

  let availableMadrasah = madrasah;
  if (user.role === 'pengawas') availableMadrasah = madrasah.filter(m => m.pengawasId === user.pengawasId);
  if (user.role === 'madrasah') availableMadrasah = madrasah.filter(m => m.id === user.madrasahId);

  let filtered = eviden;
  if (user.role === 'pengawas') {
    const myMadrasahIds = availableMadrasah.map(m => m.id);
    filtered = eviden.filter(e => myMadrasahIds.includes(e.madrasahId));
  }
  if (user.role === 'madrasah') filtered = eviden.filter(e => e.madrasahId === user.madrasahId);
  if (filterArea) filtered = filtered.filter(e => e.areaId === filterArea);
  if (filterStatus) filtered = filtered.filter(e => e.statusVerifikasi === filterStatus);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setFormData({ ...formData, file: reader.result, fileName: file.name });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const selM = madrasah.find(m => m.id === formData.madrasahId);
    const selArea = ziAreas.find(a => a.id === formData.areaId);
    const data = {
      ...formData,
      madrasahNama: selM?.nama || '',
      areaName: selArea?.nama || '',
      tanggalUpload: new Date().toISOString().split('T')[0],
      id: uuidv4()
    };
    setEviden(prev => [...prev, data]);
    setShowForm(false);
    setFormData({
      madrasahId: '', madrasahNama: '', areaId: '', areaName: '',
      indikator: '', jenisDoc: '', file: null, fileName: '',
      keterangan: '', statusVerifikasi: 'Menunggu', catatanVerifikator: ''
    });
  };

  const handleVerifikasi = (id, status) => {
    setEviden(prev => prev.map(e => e.id === id ? { ...e, statusVerifikasi: status } : e));
  };

  const handleDelete = (id) => { if (confirm('Hapus eviden?')) setEviden(prev => prev.filter(e => e.id !== id)); };

  const statusIcon = (s) => {
    if (s === 'Diterima') return <CheckCircle size={16} className="text-green-600" />;
    if (s === 'Perlu Revisi') return <XCircle size={16} className="text-red-600" />;
    return <Clock size={16} className="text-yellow-600" />;
  };

  const selectedArea = ziAreas.find(a => a.id === formData.areaId);

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <h1 className="text-2xl font-bold text-gray-800 dark:text-white">Upload Eviden</h1>
        {hasRole('admin', 'pengawas', 'madrasah') && (
          <button onClick={() => setShowForm(true)} className="btn-primary flex items-center gap-2">
            <Plus size={16} /> Upload Baru
          </button>
        )}
      </div>

      {/* Filters */}
      <div className="card">
        <div className="flex flex-col sm:flex-row gap-3">
          <select value={filterArea} onChange={(e) => setFilterArea(e.target.value)} className="input-field">
            <option value="">Semua Area</option>
            {ziAreas.map(a => <option key={a.id} value={a.id}>{a.nama}</option>)}
          </select>
          <select value={filterStatus} onChange={(e) => setFilterStatus(e.target.value)} className="input-field">
            <option value="">Semua Status</option>
            <option value="Menunggu">Menunggu</option>
            <option value="Diterima">Diterima</option>
            <option value="Perlu Revisi">Perlu Revisi</option>
          </select>
        </div>
      </div>

      {/* Table */}
      <div className="card overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr>
              <th className="table-header">No</th>
              <th className="table-header">Madrasah</th>
              <th className="table-header hidden md:table-cell">Area</th>
              <th className="table-header hidden lg:table-cell">Indikator</th>
              <th className="table-header">File</th>
              <th className="table-header">Status</th>
              <th className="table-header">Aksi</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((e, idx) => (
              <tr key={e.id} className="hover:bg-gray-50 dark:hover:bg-gray-700">
                <td className="table-cell">{idx + 1}</td>
                <td className="table-cell font-medium">{e.madrasahNama}</td>
                <td className="table-cell hidden md:table-cell">{e.areaName}</td>
                <td className="table-cell hidden lg:table-cell text-xs">{e.indikator}</td>
                <td className="table-cell text-xs">{e.fileName || '-'}</td>
                <td className="table-cell">
                  <div className="flex items-center gap-1">
                    {statusIcon(e.statusVerifikasi)}
                    <span className="text-xs">{e.statusVerifikasi}</span>
                  </div>
                </td>
                <td className="table-cell">
                  <div className="flex gap-1">
                    {hasRole('admin', 'pengawas') && e.statusVerifikasi === 'Menunggu' && (
                      <>
                        <button onClick={() => handleVerifikasi(e.id, 'Diterima')} className="text-green-600 text-xs hover:underline">Terima</button>
                        <button onClick={() => handleVerifikasi(e.id, 'Perlu Revisi')} className="text-red-600 text-xs hover:underline">Revisi</button>
                      </>
                    )}
                    {hasRole('admin') && <button onClick={() => handleDelete(e.id)} className="text-red-600 text-xs hover:underline">Hapus</button>}
                  </div>
                </td>
              </tr>
            ))}
            {filtered.length === 0 && <tr><td colSpan="7" className="table-cell text-center text-gray-400">Belum ada eviden</td></tr>}
          </tbody>
        </table>
      </div>

      {/* Upload Form Modal */}
      {showForm && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-800 dark:text-white">Upload Eviden Baru</h3>
              <button onClick={() => setShowForm(false)} className="text-gray-400 hover:text-gray-600">✕</button>
            </div>
            <form onSubmit={handleSubmit} className="space-y-3">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Madrasah</label>
                <select value={formData.madrasahId} onChange={(e) => setFormData({...formData, madrasahId: e.target.value})} className="input-field" required>
                  <option value="">Pilih Madrasah</option>
                  {availableMadrasah.map(m => <option key={m.id} value={m.id}>{m.nama}</option>)}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Area ZI</label>
                <select value={formData.areaId} onChange={(e) => setFormData({...formData, areaId: e.target.value, indikator: ''})} className="input-field" required>
                  <option value="">Pilih Area</option>
                  {ziAreas.map(a => <option key={a.id} value={a.id}>{a.nama}</option>)}
                </select>
              </div>
              {selectedArea && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Indikator</label>
                  <select value={formData.indikator} onChange={(e) => setFormData({...formData, indikator: e.target.value})} className="input-field" required>
                    <option value="">Pilih Indikator</option>
                    {selectedArea.indikator.map((ind, i) => <option key={i} value={ind}>{ind}</option>)}
                  </select>
                </div>
              )}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Jenis Dokumen</label>
                <select value={formData.jenisDoc} onChange={(e) => setFormData({...formData, jenisDoc: e.target.value})} className="input-field">
                  <option value="">Pilih Jenis</option>
                  <option value="SK/Surat Keputusan">SK/Surat Keputusan</option>
                  <option value="Laporan">Laporan</option>
                  <option value="Foto Dokumentasi">Foto Dokumentasi</option>
                  <option value="Notulen">Notulen</option>
                  <option value="Daftar Hadir">Daftar Hadir</option>
                  <option value="Lainnya">Lainnya</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">File</label>
                <input type="file" onChange={handleFileChange} className="input-field" accept=".pdf,.jpg,.jpeg,.png,.docx,.xlsx" />
                <p className="text-xs text-gray-400 mt-1">Format: PDF, JPG, PNG, DOCX, XLSX</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Keterangan</label>
                <textarea value={formData.keterangan} onChange={(e) => setFormData({...formData, keterangan: e.target.value})} className="input-field" rows="2" />
              </div>
              <div className="flex gap-3 pt-4">
                <button type="submit" className="btn-primary flex-1 flex items-center justify-center gap-2">
                  <Upload size={16} /> Upload
                </button>
                <button type="button" onClick={() => setShowForm(false)} className="btn-secondary flex-1">Batal</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
