import { useState } from 'react'
import { useData } from '../context/DataContext'
import { Plus, Edit, Trash2, Search, X, Stethoscope } from 'lucide-react'

export default function KlinikZI() {
  const { klinikZI, madrasah, addKlinikZI, updateKlinikZI, deleteKlinikZI } = useData()
  const [search, setSearch] = useState('')
  const [showForm, setShowForm] = useState(false)
  const [editData, setEditData] = useState(null)
  const [form, setForm] = useState({
    tanggal: '', madrasahId: '', peserta: '', jabatan: '', topik: '',
    masalah: '', solusi: '', tindakLanjut: '', jadwalMonitoring: '', dokumentasi: ''
  })

  const filtered = klinikZI.filter(k => {
    const m = madrasah.find(x => x.id === k.madrasahId)
    return (m?.nama || '').toLowerCase().includes(search.toLowerCase()) ||
           k.topik.toLowerCase().includes(search.toLowerCase()) ||
           k.peserta.toLowerCase().includes(search.toLowerCase())
  })

  const openAdd = () => {
    setEditData(null)
    setForm({ tanggal: '', madrasahId: '', peserta: '', jabatan: '', topik: '', masalah: '', solusi: '', tindakLanjut: '', jadwalMonitoring: '', dokumentasi: '' })
    setShowForm(true)
  }

  const openEdit = (k) => { setEditData(k); setForm({ ...k }); setShowForm(true) }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (editData) updateKlinikZI(editData.id, form)
    else addKlinikZI(form)
    setShowForm(false)
  }

  const handleDelete = (id) => { if (confirm('Yakin hapus?')) deleteKlinikZI(id) }
  const getMadrasahNama = (id) => madrasah.find(m => m.id === id)?.nama || '-'

  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <h1 className="text-2xl font-bold text-primary-800 dark:text-white flex items-center gap-2">
          <Stethoscope className="w-6 h-6" /> Klinik ZI
        </h1>
        <button onClick={openAdd} className="btn-primary flex items-center gap-2"><Plus className="w-4 h-4" /> Tambah Sesi</button>
      </div>

      <div className="card">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input type="text" placeholder="Cari madrasah, topik, atau peserta..." value={search} onChange={e => setSearch(e.target.value)} className="input-field pl-9" />
        </div>
      </div>

      <div className="grid gap-4">
        {filtered.map(k => (
          <div key={k.id} className="card">
            <div className="flex items-start justify-between">
              <div>
                <h3 className="font-semibold text-gray-800 dark:text-white">{k.topik}</h3>
                <p className="text-sm text-gray-500">{getMadrasahNama(k.madrasahId)} • {k.tanggal}</p>
                <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">Peserta: {k.peserta} ({k.jabatan})</p>
              </div>
              <div className="flex gap-1">
                <button onClick={() => openEdit(k)} className="p-1.5 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded text-blue-600"><Edit className="w-4 h-4" /></button>
                <button onClick={() => handleDelete(k.id)} className="p-1.5 hover:bg-red-50 dark:hover:bg-red-900/20 rounded text-red-600"><Trash2 className="w-4 h-4" /></button>
              </div>
            </div>
            <div className="mt-3 grid grid-cols-1 md:grid-cols-2 gap-2 text-sm">
              <div className="p-2 bg-red-50 dark:bg-red-900/20 rounded">
                <p className="font-medium text-red-700 dark:text-red-400 text-xs">Masalah:</p>
                <p className="text-gray-700 dark:text-gray-300">{k.masalah}</p>
              </div>
              <div className="p-2 bg-green-50 dark:bg-green-900/20 rounded">
                <p className="font-medium text-green-700 dark:text-green-400 text-xs">Solusi:</p>
                <p className="text-gray-700 dark:text-gray-300">{k.solusi}</p>
              </div>
            </div>
            {k.tindakLanjut && (
              <p className="text-xs text-gray-500 mt-2"><span className="font-medium">Tindak Lanjut:</span> {k.tindakLanjut}</p>
            )}
            {k.jadwalMonitoring && (
              <p className="text-xs text-gray-500"><span className="font-medium">Monitoring:</span> {k.jadwalMonitoring}</p>
            )}
          </div>
        ))}
      </div>
      {filtered.length === 0 && <div className="card text-center py-8 text-gray-500">Tidak ada data</div>}

      {showForm && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-xl w-full max-w-lg max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between p-4 border-b dark:border-gray-700">
              <h2 className="text-lg font-bold text-primary-800 dark:text-white">{editData ? 'Edit' : 'Tambah'} Sesi Klinik ZI</h2>
              <button onClick={() => setShowForm(false)} className="p-1 hover:bg-gray-100 dark:hover:bg-gray-700 rounded"><X className="w-5 h-5" /></button>
            </div>
            <form onSubmit={handleSubmit} className="p-4 space-y-3">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Tanggal</label>
                  <input type="date" value={form.tanggal} onChange={e => setForm({...form, tanggal: e.target.value})} className="input-field" required />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Madrasah</label>
                  <select value={form.madrasahId} onChange={e => setForm({...form, madrasahId: e.target.value})} className="input-field" required>
                    <option value="">Pilih</option>
                    {madrasah.map(m => <option key={m.id} value={m.id}>{m.nama}</option>)}
                  </select>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Peserta</label>
                  <input type="text" value={form.peserta} onChange={e => setForm({...form, peserta: e.target.value})} className="input-field" required />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Jabatan</label>
                  <input type="text" value={form.jabatan} onChange={e => setForm({...form, jabatan: e.target.value})} className="input-field" />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Topik Konsultasi</label>
                <input type="text" value={form.topik} onChange={e => setForm({...form, topik: e.target.value})} className="input-field" required />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Masalah</label>
                <textarea value={form.masalah} onChange={e => setForm({...form, masalah: e.target.value})} className="input-field" rows="2" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Solusi</label>
                <textarea value={form.solusi} onChange={e => setForm({...form, solusi: e.target.value})} className="input-field" rows="2" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Tindak Lanjut</label>
                <textarea value={form.tindakLanjut} onChange={e => setForm({...form, tindakLanjut: e.target.value})} className="input-field" rows="2" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Jadwal Monitoring</label>
                <input type="date" value={form.jadwalMonitoring} onChange={e => setForm({...form, jadwalMonitoring: e.target.value})} className="input-field" />
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
