import { useState } from 'react';
import { useData } from '../context/DataContext';
import { useAuth } from '../context/AuthContext';
import { exportToPDF, exportToExcel } from '../utils/helpers';
import { v4 as uuidv4 } from 'uuid';
import { Plus, Edit, Trash2, Search, Download, FileText, X, Eye } from 'lucide-react';

export default function MadrasahPage() {
  const { madrasah, setMadrasah, pengawas } = useData();
  const { user, hasRole } = useAuth();
  const [search, setSearch] = useState('');
  const [filterJenjang, setFilterJenjang] = useState('');
  const [filterKecamatan, setFilterKecamatan] = useState('');
  const [filterPengawas, setFilterPengawas] = useState('');
  const [showForm, setShowForm] = useState(false);
  const [editData, setEditData] = useState(null);
  const [formData, setFormData] = useState(getEmptyForm());
  const [detailData, setDetailData] = useState(null);

  function getEmptyForm() {
    return { nama: '', nsm: '', npsn: '', jenjang: 'MI', statusMadrasah: 'Swasta', kepalaMadrasah: '', hpKepala: '', email: '', alamat: '', kecamatan: '', pengawasId: '', pengawasNama: '', jumlahGuru: 0, jumlahSiswa: 0, statusZI: 'Belum Mulai' };
  }

  // Filter based on role
  let filteredData = madrasah;
  if (user.role === 'pengawas') {
    filteredData = madrasah.filter(m => m.pengawasId === user.pengawasId);
  } else if (user.role === 'madrasah') {
    filteredData = madrasah.filter(m => m.id === user.madrasahId);
  }

  const kecamatanList = [...new Set(madrasah.map(m => m.kecamatan))];

  filteredData = filteredData.filter(m => {
    const matchSearch = m.nama.toLowerCase().includes(search.toLowerCase()) ||
      m.npsn.includes(search) || m.kepalaMadrasah.toLowerCase().includes(search.toLowerCase());
    const matchJenjang = !filterJenjang || m.jenjang === filterJenjang;
    const matchKecamatan = !filterKecamatan || m.kecamatan === filterKecamatan;
    const matchPengawas = !filterPengawas || m.pengawasId === filterPengawas;
    return matchSearch && matchJenjang && matchKecamatan && matchPengawas;
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    const selectedPengawas = pengawas.find(p => p.id === formData.pengawasId);
    const dataToSave = { ...formData, pengawasNama: selectedPengawas?.nama || '' };
    if (editData) {
      setMadrasah(prev => prev.map(m => m.id === editData.id ? { ...dataToSave, id: editData.id } : m));
    } else {
      setMadrasah(prev => [...prev, { ...dataToSave, id: uuidv4() }]);
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
    if (confirm('Yakin ingin menghapus data madrasah ini?')) {
      setMadrasah(prev => prev.filter(m => m.id !== id));
    }
  };

  const handleExportExcel = () => {
    const data = filteredData.map(m => ({
      Nama: m.nama, NSM: m.nsm, NPSN: m.npsn, Jenjang: m.jenjang, Status: m.statusMadrasah,
      'Kepala Madrasah': m.kepalaMadrasah, Kecamatan: m.kecamatan, Pengawas: m.pengawasNama,
      Guru: m.jumlahGuru, Siswa: m.jumlahSiswa, 'Status ZI': m.statusZI
    }));
    exportToExcel(data, 'Data Madrasah', 'data-madrasah.xlsx');
  };

  const handleExportPDF = () => {
    const headers = ['No', 'Nama', 'NPSN', 'Jenjang', 'Kecamatan', 'Pengawas', 'Status ZI'];
    const data = filteredData.map((m, i) => [i + 1, m.nama, m.npsn, m.jenjang, m.kecamatan, m.pengawasNama, m.statusZI]);
    exportToPDF('DATA MADRASAH BINAAN', headers, data, 'data-madrasah.pdf');
  };

  const statusZIColor = (status) => {
    switch (status) {
      case 'Selesai': return 'bg-green-100 text-green-700';
      case 'Siap Evaluasi': return 'bg-blue-100 text-blue-700';
      case 'Proses': return 'bg-yellow-100 text-yellow-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <h1 className="text-2xl font-bold text-gray-800 dark:text-white">Data Madrasah</h1>
        <div className="flex flex-wrap gap-2">
          {hasRole('admin', 'pengawas') && (
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
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
            <input type="text" placeholder="Cari..." value={search} onChange={(e) => setSearch(e.target.value)} className="input-field pl-10" />
          </div>
          <select value={filterJenjang} onChange={(e) => setFilterJenjang(e.target.value)} className="input-field">
            <option value="">Semua Jenjang</option>
            <option value="RA">RA</option>
            <option value="MI">MI</option>
            <option value="MTs">MTs</option>
            <option value="MA">MA</option>
          </select>
          <select value={filterKecamatan} onChange={(e) => setFilterKecamatan(e.target.value)} className="input-field">
            <option value="">Semua Kecamatan</option>
            {kecamatanList.map(k => <option key={k} value={k}>{k}</option>)}
          </select>
          <select value={filterPengawas} onChange={(e) => setFilterPengawas(e.target.value)} className="input-field">
            <option value="">Semua Pengawas</option>
            {pengawas.map(p => <option key={p.id} value={p.id}>{p.nama}</option>)}
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
              <th className="table-header hidden md:table-cell">NPSN</th>
              <th className="table-header">Jenjang</th>
              <th className="table-header hidden lg:table-cell">Kecamatan</th>
              <th className="table-header hidden md:table-cell">Pengawas</th>
              <th className="table-header">Status ZI</th>
              {hasRole('admin', 'pengawas') && <th className="table-header">Aksi</th>}
            </tr>
          </thead>
          <tbody>
            {filteredData.map((m, idx) => (
              <tr key={m.id} className="hover:bg-gray-50 dark:hover:bg-gray-700">
                <td className="table-cell">{idx + 1}</td>
                <td className="table-cell font-medium">{m.nama}</td>
                <td className="table-cell hidden md:table-cell">{m.npsn}</td>
                <td className="table-cell">{m.jenjang}</td>
                <td className="table-cell hidden lg:table-cell">{m.kecamatan}</td>
                <td className="table-cell hidden md:table-cell">{m.pengawasNama}</td>
                <td className="table-cell">
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${statusZIColor(m.statusZI)}`}>{m.statusZI}</span>
                </td>
                {hasRole('admin', 'pengawas') && (
                  <td className="table-cell">
                    <div className="flex gap-2">
                      <button onClick={() => setDetailData(m)} className="text-green-600 hover:text-green-800" title="Lihat Detail"><Eye size={16} /></button>
                      <button onClick={() => handleEdit(m)} className="text-blue-600 hover:text-blue-800" title="Edit"><Edit size={16} /></button>
                      <button onClick={() => handleDelete(m.id)} className="text-red-600 hover:text-red-800" title="Hapus"><Trash2 size={16} /></button>
                    </div>
                  </td>
                )}
              </tr>
            ))}
            {filteredData.length === 0 && (
              <tr><td colSpan="8" className="table-cell text-center text-gray-400">Tidak ada data</td></tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Modal Detail */}
      {detailData && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-800 dark:text-white">Detail Madrasah</h3>
              <button onClick={() => setDetailData(null)} className="text-gray-400 hover:text-gray-600"><X size={20} /></button>
            </div>
            <div className="space-y-3">
              <div className="grid grid-cols-1 gap-3">
                <div><span className="text-sm text-gray-500 dark:text-gray-400">Nama Madrasah</span><p className="font-medium text-gray-800 dark:text-white">{detailData.nama || '-'}</p></div>
                <div className="grid grid-cols-2 gap-3">
                  <div><span className="text-sm text-gray-500 dark:text-gray-400">NSM</span><p className="font-medium text-gray-800 dark:text-white">{detailData.nsm || '-'}</p></div>
                  <div><span className="text-sm text-gray-500 dark:text-gray-400">NPSN</span><p className="font-medium text-gray-800 dark:text-white">{detailData.npsn || '-'}</p></div>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div><span className="text-sm text-gray-500 dark:text-gray-400">Jenjang</span><p className="font-medium text-gray-800 dark:text-white">{detailData.jenjang || '-'}</p></div>
                  <div><span className="text-sm text-gray-500 dark:text-gray-400">Status Madrasah</span><p className="font-medium text-gray-800 dark:text-white">{detailData.statusMadrasah || '-'}</p></div>
                </div>
                <div><span className="text-sm text-gray-500 dark:text-gray-400">Kepala Madrasah</span><p className="font-medium text-gray-800 dark:text-white">{detailData.kepalaMadrasah || '-'}</p></div>
                <div className="grid grid-cols-2 gap-3">
                  <div><span className="text-sm text-gray-500 dark:text-gray-400">HP Kepala</span><p className="font-medium text-gray-800 dark:text-white">{detailData.hpKepala || '-'}</p></div>
                  <div><span className="text-sm text-gray-500 dark:text-gray-400">Email</span><p className="font-medium text-gray-800 dark:text-white">{detailData.email || '-'}</p></div>
                </div>
                <div><span className="text-sm text-gray-500 dark:text-gray-400">Alamat</span><p className="font-medium text-gray-800 dark:text-white">{detailData.alamat || '-'}</p></div>
                <div className="grid grid-cols-2 gap-3">
                  <div><span className="text-sm text-gray-500 dark:text-gray-400">Kecamatan</span><p className="font-medium text-gray-800 dark:text-white">{detailData.kecamatan || '-'}</p></div>
                  <div><span className="text-sm text-gray-500 dark:text-gray-400">Pengawas Pembina</span><p className="font-medium text-gray-800 dark:text-white">{detailData.pengawasNama || '-'}</p></div>
                </div>
                <div className="grid grid-cols-3 gap-3">
                  <div><span className="text-sm text-gray-500 dark:text-gray-400">Jumlah Guru</span><p className="font-medium text-gray-800 dark:text-white">{detailData.jumlahGuru || 0}</p></div>
                  <div><span className="text-sm text-gray-500 dark:text-gray-400">Jumlah Siswa</span><p className="font-medium text-gray-800 dark:text-white">{detailData.jumlahSiswa || 0}</p></div>
                  <div><span className="text-sm text-gray-500 dark:text-gray-400">Status ZI</span><p className="font-medium text-gray-800 dark:text-white">{detailData.statusZI || '-'}</p></div>
                </div>
              </div>
            </div>
            <div className="flex gap-3 pt-4">
              <button onClick={() => { setDetailData(null); handleEdit(detailData); }} className="btn-primary flex-1 flex items-center justify-center gap-2"><Edit size={16} /> Edit</button>
              <button onClick={() => setDetailData(null)} className="btn-secondary flex-1">Tutup</button>
            </div>
          </div>
        </div>
      )}

      {/* Modal Form */}
      {showForm && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-800 dark:text-white">{editData ? 'Edit Madrasah' : 'Tambah Madrasah'}</h3>
              <button onClick={() => setShowForm(false)} className="text-gray-400 hover:text-gray-600"><X size={20} /></button>
            </div>
            <form onSubmit={handleSubmit} className="space-y-3">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Nama Madrasah</label>
                <input type="text" value={formData.nama} onChange={(e) => setFormData({...formData, nama: e.target.value})} className="input-field" required />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">NSM</label>
                  <input type="text" value={formData.nsm} onChange={(e) => setFormData({...formData, nsm: e.target.value})} className="input-field" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">NPSN</label>
                  <input type="text" value={formData.npsn} onChange={(e) => setFormData({...formData, npsn: e.target.value})} className="input-field" />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Jenjang</label>
                  <select value={formData.jenjang} onChange={(e) => setFormData({...formData, jenjang: e.target.value})} className="input-field">
                    <option value="RA">RA</option>
                    <option value="MI">MI</option>
                    <option value="MTs">MTs</option>
                    <option value="MA">MA</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Status</label>
                  <select value={formData.statusMadrasah} onChange={(e) => setFormData({...formData, statusMadrasah: e.target.value})} className="input-field">
                    <option value="Negeri">Negeri</option>
                    <option value="Swasta">Swasta</option>
                  </select>
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Kepala Madrasah</label>
                <input type="text" value={formData.kepalaMadrasah} onChange={(e) => setFormData({...formData, kepalaMadrasah: e.target.value})} className="input-field" />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">HP Kepala</label>
                  <input type="text" value={formData.hpKepala} onChange={(e) => setFormData({...formData, hpKepala: e.target.value})} className="input-field" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Email</label>
                  <input type="email" value={formData.email} onChange={(e) => setFormData({...formData, email: e.target.value})} className="input-field" />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Alamat</label>
                <input type="text" value={formData.alamat} onChange={(e) => setFormData({...formData, alamat: e.target.value})} className="input-field" />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Kecamatan</label>
                  <input type="text" value={formData.kecamatan} onChange={(e) => setFormData({...formData, kecamatan: e.target.value})} className="input-field" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Pengawas Pembina</label>
                  <select value={formData.pengawasId} onChange={(e) => setFormData({...formData, pengawasId: e.target.value})} className="input-field">
                    <option value="">Pilih Pengawas</option>
                    {pengawas.map(p => <option key={p.id} value={p.id}>{p.nama}</option>)}
                  </select>
                </div>
              </div>
              <div className="grid grid-cols-3 gap-3">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Jumlah Guru</label>
                  <input type="number" value={formData.jumlahGuru} onChange={(e) => setFormData({...formData, jumlahGuru: parseInt(e.target.value) || 0})} className="input-field" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Jumlah Siswa</label>
                  <input type="number" value={formData.jumlahSiswa} onChange={(e) => setFormData({...formData, jumlahSiswa: parseInt(e.target.value) || 0})} className="input-field" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Status ZI</label>
                  <select value={formData.statusZI} onChange={(e) => setFormData({...formData, statusZI: e.target.value})} className="input-field">
                    <option value="Belum Mulai">Belum Mulai</option>
                    <option value="Proses">Proses</option>
                    <option value="Siap Evaluasi">Siap Evaluasi</option>
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
