import { useState } from 'react'
import { useData } from '../context/DataContext'
import { Plus, Edit, Trash2, Search, X } from 'lucide-react'

export default function Pendampingan() {
  const { pendampingan, pengawas, madrasah, addPendampingan, updatePendampingan, deletePendampingan } = useData()
  const [search, setSearch] = useState('')
  const [showForm, setShowForm] = useState(false)
  const [editData, setEditData] = useState(null)
  const [form, setForm] = useState({
    tanggal: '', pengawasId: '', madrasahId: '', jenis: 'Kunjungan Rutin',
    materi: '', masalah: '', rekomendasi: '', tindakLanjut: '', target: '', status: 'Belum Mulai',
    foto: '', hadir: '', notulen: ''
  })

  const filtered = pendampingan.filter(p => {
    const m = madrasah.find(x => x.id === p.madrasahId)
    const pg = pengawas.find(x => x.id === p.pengawasId)
    return (m?.nama || '').toLowerCase().includes(search.toLowerCase()) ||
           (pg?.nama || '').toLowerCase().includes(search.toLowerCase()) ||
           p.materi.toLowerCase().includes(search.toLowerCase())
  })

  const openAdd = () => {
    setEditData(null)
    setForm({ tanggal: '', pengawasId: '', madrasahId: '', jenis: 'Kunjungan Rutin', materi: '', masalah: '', rekomendasi: '', tindakLanjut: '', target: '', status: 'Belum Mulai', foto: '', hadir: '', notulen: '' })
    setShowForm(true)
  }

  const openEdit = (p) => { setEditData(p); setForm({ ...p }); setShowForm(true) }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (editData) updatePendampingan(editData.id, form)
    else addPendampingan(form)
    setShowForm(false)
  }

  const handleDelete = (id) => { if (confirm('Yakin hapus?')) deletePendampingan(id) }

  const getMadrasahNama = (id) => madrasah.find(m => m.id === id)?.nama || '-'
  const getPengawasNama = (id) => pengawas.find(p => p.id === id)?.nama || '-'

  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <h1 className="text-2xl font-bold text-primary-800 dark:text-white">Pendampingan ZI</h1>
        <button onClick={openAdd} className="btn-primary flex items-center gap-2"><Plus className="w-4 h-4" /> Tambah</button>
      </div>

      <div className="card">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input type="text" placeholder="Cari madrasah, pengawas, atau materi..." value={search} onChange={(e) => setSearch(e.target.value)} className="input-field pl-9" />
        </div>
      </div>

      <div className="card overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-gray-200 dark:border-gray-700">
              <th className="text-left py-3 px-2 font-medium text-gray-600 dark:text-gray-300">Tanggal</th>
              <th className="text-left py-3 px-2 font-medium text-gray-600 dark:text-gray-300">Madrasah</th>
              <th className="text-left py-3 px-2 font-medium text-gray-600 dark:text-gray-300 hidden md:table-cell">Pengawas</th>
              <th className="text-left py-3 px-2 font-medium text-gray-600 dark:text-gray-300 hidden lg:table-cell">Jenis</th>
              <th className="text-left py-3 px-2 font-medium text-gray-600 dark:text-gray-300 hidden lg:table-cell">Materi</th>
              <th className="text-left py-3 px-2 font-medium text-gray-600 dark:text-gray-300">Status</th>
              <th className="text-left py-3 px-2 font-medium text-gray-600 dark:text-gray-300">Aksi</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map(p => (
              <tr key={p.id} className="border-b border-gray-100 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700/50">
                <td className="py-2 px-2 text-gray-600 dark:text-gray-400">{p.tanggal}</td>
                <td className="py-2 px-2 font-medium text-gray-800 dark:text-white">{getMadrasahNama(p.madrasahId)}</td>
                <td className="py-2 px-2 hidden md:table-cell text-gray-600 dark:text-gray-400">{getPengawasNama(p.pengawasId)}</td>
                <td className="py-2 px-2 hidden lg:table-cell text-gray-600 dark:text-gray-400">{p.jenis}</td>
                <td className="py-2 px-2 hidden lg:table-cell text-gray-600 dark:text-gray-400 max-w-[200px] truncate">{p.materi}</td>
                <td className="py-2 px-2">
                  <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${
                    p.status === 'Selesai' ? 'bg-green-100 text-green-700' :
                    p.status === 'Dalam Proses' ? 'bg-yellow-100 text-yellow-700' :
                    'bg-gray-100 text-gray-600'
                  }`}>{p.status}</span>
                </td>
                <td className="py-2 px-2">
                  <div className="flex gap-1">
                    <button onClick={() => openEdit(p)} className="p-1.5 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded text-blue-600"><Edit className="w-4 h-4" /></button>
                    <button onClick={() => handleDelete(p.id)} className="p-1.5 hover:bg-red-50 dark:hover:bg-red-900/20 rounded text-red-600"><Trash2 className="w-4 h-4" /></button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {filtered.length === 0 && <p className="text-center py-8 text-gray-500">Tidak ada data</p>}
      </div>

      {showForm && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-xl w-full max-w-lg max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between p-4 border-b dark:border-gray-700">
              <h2 className="text-lg font-bold text-primary-800 dark:text-white">{editData ? 'Edit' : 'Tambah'} Pendampingan</h2>
              <button onClick={() => setShowForm(false)} className="p-1 hover:bg-gray-100 dark:hover:bg-gray-700 rounded"><X className="w-5 h-5" /></button>
            </div>
            <form onSubmit={handleSubmit} className="p-4 space-y-3">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Tanggal</label>
                  <input type="date" value={form.tanggal} onChange={e => setForm({...form, tanggal: e.target.value})} className="input-field" required />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Jenis</label>
                  <select value={form.jenis} onChange={e => setForm({...form, jenis: e.target.value})} className="input-field">
                    <option>Kunjungan Rutin</option>
                    <option>Pendampingan Khusus</option>
                    <option>Monitoring</option>
                    <option>Evaluasi</option>
                  </select>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Pengawas</label>
                  <select value={form.pengawasId} onChange={e => setForm({...form, pengawasId: e.target.value})} className="input-field" required>
                    <option value="">Pilih Pengawas</option>
                    {pengawas.filter(p => p.status === 'Aktif').map(p => <option key={p.id} value={p.id}>{p.nama}</option>)}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Madrasah</label>
                  <select value={form.madrasahId} onChange={e => setForm({...form, madrasahId: e.target.value})} className="input-field" required>
                    <option value="">Pilih Madrasah</option>
                    {madrasah.map(m => <option key={m.id} value={m.id}>{m.nama}</option>)}
                  </select>
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Materi</label>
                <textarea value={form.materi} onChange={e => setForm({...form, materi: e.target.value})} className="input-field" rows="2" required />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Masalah/Temuan</label>
                <textarea value={form.masalah} onChange={e => setForm({...form, masalah: e.target.value})} className="input-field" rows="2" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Rekomendasi</label>
                <textarea value={form.rekomendasi} onChange={e => setForm({...form, rekomendasi: e.target.value})} className="input-field" rows="2" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Tindak Lanjut</label>
                <textarea value={form.tindakLanjut} onChange={e => setForm({...form, tindakLanjut: e.target.value})} className="input-field" rows="2" />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Target Selesai</label>
                  <input type="date" value={form.target} onChange={e => setForm({...form, target: e.target.value})} className="input-field" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Status</label>
                  <select value={form.status} onChange={e => setForm({...form, status: e.target.value})} className="input-field">
                    <option>Belum Mulai</option>
                    <option>Dalam Proses</option>
                    <option>Selesai</option>
                  </select>
                </div>
              </div>
              <div className="flex gap-3 pt-3">
                <button type="submit" className="btn-primary flex-1">Simpan</button>
                <button type="button" onClick={() => setShowForm(false)} className="btn-outline flex-1">Batal</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}
