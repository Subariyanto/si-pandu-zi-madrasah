import { useState } from 'react';
import { useData } from '../context/DataContext';
import { useAuth } from '../context/AuthContext';
import { exportToPDF, exportToExcel } from '../utils/helpers';
import { v4 as uuidv4 } from 'uuid';
import { Plus, Edit, Trash2, Search, Download, FileText, X } from 'lucide-react';

export default function PengawasPage() {
  const { pengawas, setPengawas } = useData();
  const { hasRole } = useAuth();
  const [search, setSearch] = useState('');
  const [filterWilayah, setFilterWilayah] = useState('');
  const [showForm, setShowForm] = useState(false);
  const [editData, setEditData] = useState(null);
  const [formData, setFormData] = useState(getEmptyForm());

  function getEmptyForm() {
    return { nama: '', nip: '', nuptk: '', pangkat: '', jabatan: '', wilayah: '', hp: '', email: '', foto: null, status: 'aktif' };
  }

  const wilayahList = [...new Set(pengawas.map(p => p.wilayah))];

  const filtered = pengawas.filter(p => {
    const matchSearch = p.nama.toLowerCase().includes(search.toLowerCase()) ||
      p.nip.includes(search) || p.wilayah.toLowerCase().includes(search.toLowerCase());
    const matchWilayah = !filterWilayah || p.wilayah === filterWilayah;
    return matchSearch && matchWilayah;
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (editData) {
      setPengawas(prev => prev.map(p => p.id === editData.id ? { ...formData, id: editData.id } : p));
    } else {
      setPengawas(prev => [...prev, { ...formData, id: uuidv4() }]);
    }
    setShowForm(false);
    setEditData(null);
    setFormData(getEmptyForm());
  };

  const handleEdit = (item) => {
    setEditData(item);
    setFormData(item);
    setShowForm(true);
  };

  const handleDelete = (id) => {
    if (confirm('Yakin ingin menghapus data pengawas ini?')) {
      setPengawas(prev => prev.filter(p => p.id !== id));
    }
  };

  const handleExportExcel = () => {
    const data = filtered.map(p => ({
      Nama: p.nama, NIP: p.nip, NUPTK: p.nuptk, Pangkat: p.pangkat,
      Jabatan: p.jabatan, Wilayah: p.wilayah, HP: p.hp, Email: p.email, Status: p.status
    }));
    exportToExcel(data, 'Data Pengawas', 'data-pengawas.xlsx');
  };

  const handleExportPDF = () => {
    const headers = ['No', 'Nama', 'NIP', 'Pangkat', 'Wilayah', 'HP', 'Status'];
    const data = filtered.map((p, i) => [i + 1, p.nama, p.nip, p.pangkat, p.wilayah, p.hp, p.status]);
    exportToPDF('DATA PENGAWAS MADRASAH', headers, data, 'data-pengawas.pdf');
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <h1 className="text-2xl font-bold text-gray-800 dark:text-white">Data Pengawas</h1>
        <div className="flex flex-wrap gap-2">
          {hasRole('admin') && (
            <button onClick={() => { setShowForm(true); setEditData(null); setFormData(getEmptyForm()); }} className="btn-primary flex items-center gap-2">
              <Plus size={16} /> Tambah
            </button>
          )}
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
        <div className="flex flex-col sm:flex-row gap-3">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
            <input
              type="text"
              placeholder="Cari nama, NIP, wilayah..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="input-field pl-10"
            />
          </div>
          <select value={filterWilayah} onChange={(e) => setFilterWilayah(e.target.value)} className="input-field sm:w-48">
            <option value="">Semua Wilayah</option>
            {wilayahList.map(w => <option key={w} value={w}>{w}</option>)}
          </select>
        </div>
      </div>

      {/* Table */}
      <div className="card overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr>
              <th className="table-header">No</th>
              <th className="table-header">Nama</th>
              <th className="table-header hidden md:table-cell">NIP</th>
              <th className="table-header hidden lg:table-cell">Pangkat</th>
              <th className="table-header">Wilayah</th>
              <th className="table-header hidden md:table-cell">HP</th>
              <th className="table-header">Status</th>
              {hasRole('admin') && <th className="table-header">Aksi</th>}
            </tr>
          </thead>
          <tbody>
            {filtered.map((p, idx) => (
              <tr key={p.id} className="hover:bg-gray-50 dark:hover:bg-gray-700">
                <td className="table-cell">{idx + 1}</td>
                <td className="table-cell font-medium">{p.nama}</td>
                <td className="table-cell hidden md:table-cell">{p.nip}</td>
                <td className="table-cell hidden lg:table-cell">{p.pangkat}</td>
                <td className="table-cell">{p.wilayah}</td>
                <td className="table-cell hidden md:table-cell">{p.hp}</td>
                <td className="table-cell">
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${p.status === 'aktif' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                    {p.status}
                  </span>
                </td>
                {hasRole('admin') && (
                  <td className="table-cell">
                    <div className="flex gap-2">
                      <button onClick={() => handleEdit(p)} className="text-blue-600 hover:text-blue-800"><Edit size={16} /></button>
                      <button onClick={() => handleDelete(p.id)} className="text-red-600 hover:text-red-800"><Trash2 size={16} /></button>
                    </div>
                  </td>
                )}
              </tr>
            ))}
            {filtered.length === 0 && (
              <tr><td colSpan="8" className="table-cell text-center text-gray-400">Tidak ada data</td></tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Modal Form */}
      {showForm && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-800 dark:text-white">
                {editData ? 'Edit Pengawas' : 'Tambah Pengawas'}
              </h3>
              <button onClick={() => setShowForm(false)} className="text-gray-400 hover:text-gray-600"><X size={20} /></button>
            </div>
            <form onSubmit={handleSubmit} className="space-y-3">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Nama Lengkap</label>
                <input type="text" value={formData.nama} onChange={(e) => setFormData({...formData, nama: e.target.value})} className="input-field" required />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">NIP</label>
                  <input type="text" value={formData.nip} onChange={(e) => setFormData({...formData, nip: e.target.value})} className="input-field" required />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">NUPTK</label>
                  <input type="text" value={formData.nuptk} onChange={(e) => setFormData({...formData, nuptk: e.target.value})} className="input-field" />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Pangkat/Golongan</label>
                  <input type="text" value={formData.pangkat} onChange={(e) => setFormData({...formData, pangkat: e.target.value})} className="input-field" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Jabatan</label>
                  <input type="text" value={formData.jabatan} onChange={(e) => setFormData({...formData, jabatan: e.target.value})} className="input-field" />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Wilayah Binaan</label>
                <input type="text" value={formData.wilayah} onChange={(e) => setFormData({...formData, wilayah: e.target.value})} className="input-field" required />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">No. HP</label>
                  <input type="text" value={formData.hp} onChange={(e) => setFormData({...formData, hp: e.target.value})} className="input-field" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Email</label>
                  <input type="email" value={formData.email} onChange={(e) => setFormData({...formData, email: e.target.value})} className="input-field" />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Status</label>
                <select value={formData.status} onChange={(e) => setFormData({...formData, status: e.target.value})} className="input-field">
                  <option value="aktif">Aktif</option>
                  <option value="tidak aktif">Tidak Aktif</option>
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
