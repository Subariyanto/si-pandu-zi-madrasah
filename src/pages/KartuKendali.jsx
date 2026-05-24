import { useState } from 'react'
import { useData } from '../context/DataContext'
import { Plus, Edit, Trash2, Search, X } from 'lucide-react'

export default function KartuKendali() {
  const { kartuKendali, madrasah, pengawas, addKartuKendali, updateKartuKendali, deleteKartuKendali } = useData()
  const [search, setSearch] = useState('')
  const [showForm, setShowForm] = useState(false)
  const [editData, setEditData] = useState(null)
  const [form, setForm] = useState({
    bulan: 'Januari', tahun: 2024, madrasahId: '', pengawasId: '', capaian: 0,
    kendala: '', rekomendasi: '', tindakLanjut: '', target: '', status: 'Kuning'
  })

  const bulanList = ['Januari','Februari','Maret','April','Mei','Juni','Juli','Agustus','September','Oktober','November','Desember']

  const filtered = kartuKendali.filter(k => {
    const m = madrasah.find(x => x.id === k.madrasahId)
    return (m?.nama || '').toLowerCase().includes(search.toLowerCase()) || k.bulan.toLowerCase().includes(search.toLowerCase())
  })

  const openAdd = () => {
    setEditData(null)
    setForm({ bulan: 'Januari', tahun: 2024, madrasahId: '', pengawasId: '', capaian: 0, kendala: '', rekomendasi: '', tindakLanjut: '', target: '', status: 'Kuning' })
    setShowForm(true)
  }

  const openEdit = (k) => { setEditData(k); setForm({ ...k }); setShowForm(true) }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (editData) updateKartuKendali(editData.id, form)
    else addKartuKendali(form)
    setShowForm(false)
  }

  const handleDelete = (id) => { if (confirm('Yakin hapus?')) deleteKartuKendali(id) }
  const getMadrasahNama = (id) => madrasah.find(m => m.id === id)?.nama || '-'
  const getPengawasNama = (id) => pengawas.find(p => p.id === id)?.nama || '-'

  const statusColor = (s) => {
    if (s === 'Hijau') return 'bg-green-500'
    if (s === 'Kuning') return 'bg-yellow-500'
    return 'bg-red-500'
  }

  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <h1 className="text-2xl font-bold text-primary-800 dark:text-white">Kartu Kendali Integritas</h1>
        <button onClick={openAdd} className="btn-primary flex items-center gap-2"><Plus className="w-4 h-4" /> Tambah</button>
      </div>

      <div className="card">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input type="text" placeholder="Cari madrasah atau bulan..." value={search} onChange={e => setSearch(e.target.value)} className="input-field pl-9" />
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        {filtered.map(k => (
          <div key={k.id} className="card">
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-3">
                <div className={`w-4 h-4 rounded-full ${statusColor(k.status)}`} />
                <div>
                  <h3 className="font-semibold text-gray-800 dark:text-white">{getMadrasahNama(k.madrasahId)}</h3>
                  <p className="text-xs text-gray-500">{k.bulan} {k.tahun} • {getPengawasNama(k.pengawasId)}</p>
                </div>
              </div>
              <div className="flex gap-1">
                <button onClick={() => openEdit(k)} className="p-1.5 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded text-blue-600"><Edit className="w-4 h-4" /></button>
                <button onClick={() => handleDelete(k.id)} className="p-1.5 hover:bg-red-50 dark:hover:bg-red-900/20 rounded text-red-600"><Trash2 className="w-4 h-4" /></button>
              </div>
            </div>
            <div className="mt-3 space-y-1">
              <div className="flex justify-between text-sm">
                <span className="text-gray-500">Capaian:</span>
                <span className="font-bold text-primary-700 dark:text-primary-400">{k.capaian}%</span>
              </div>
              <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                <div className={`h-2 rounded-full ${k.capaian >= 85 ? 'bg-green-500' : k.capaian >= 50 ? 'bg-yellow-500' : 'bg-red-500'}`} style={{ width: `${k.capaian}%` }} />
              </div>
              {k.kendala && <p className="text-xs text-gray-500 mt-2"><span className="font-medium">Kendala:</span> {k.kendala}</p>}
              {k.rekomendasi && <p className="text-xs text-gray-500"><span className="font-medium">Rekomendasi:</span> {k.rekomendasi}</p>}
            </div>
          </div>
        ))}
      </div>
      {filtered.length === 0 && <div className="card text-center py-8 text-gray-500">Tidak ada data</div>}

      {showForm && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-xl w-full max-w-lg max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between p-4 border-b dark:border-gray-700">
              <h2 className="text-lg font-bold text-primary-800 dark:text-white">{editData ? 'Edit' : 'Tambah'} Kartu Kendali</h2>
              <button onClick={() => setShowForm(false)} className="p-1 hover:bg-gray-100 dark:hover:bg-gray-700 rounded"><X className="w-5 h-5" /></button>
            </div>
            <form onSubmit={handleSubmit} className="p-4 space-y-3">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Bulan</label>
                  <select value={form.bulan} onChange={e => setForm({...form, bulan: e.target.value})} className="input-field">
                    {bulanList.map(b => <option key={b} value={b}>{b}</option>)}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Tahun</label>
                  <input type="number" value={form.tahun} onChange={e => setForm({...form, tahun: parseInt(e.target.value)})} className="input-field" />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Madrasah</label>
                  <select value={form.madrasahId} onChange={e => setForm({...form, madrasahId: e.target.value})} className="input-field" required>
                    <option value="">Pilih</option>
                    {madrasah.map(m => <option key={m.id} value={m.id}>{m.nama}</option>)}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Pengawas</label>
                  <select value={form.pengawasId} onChange={e => setForm({...form, pengawasId: e.target.value})} className="input-field" required>
                    <option value="">Pilih</option>
                    {pengawas.filter(p => p.status === 'Aktif').map(p => <option key={p.id} value={p.id}>{p.nama}</option>)}
                  </select>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Capaian (%)</label>
                  <input type="number" min="0" max="100" value={form.capaian} onChange={e => setForm({...form, capaian: parseInt(e.target.value) || 0})} className="input-field" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Status</label>
                  <select value={form.status} onChange={e => setForm({...form, status: e.target.value})} className="input-field">
                    <option value="Hijau">Hijau (Baik)</option>
                    <option value="Kuning">Kuning (Perhatian)</option>
                    <option value="Merah">Merah (Kritis)</option>
                  </select>
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Kendala</label>
                <textarea value={form.kendala} onChange={e => setForm({...form, kendala: e.target.value})} className="input-field" rows="2" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Rekomendasi</label>
                <textarea value={form.rekomendasi} onChange={e => setForm({...form, rekomendasi: e.target.value})} className="input-field" rows="2" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Tindak Lanjut</label>
                <textarea value={form.tindakLanjut} onChange={e => setForm({...form, tindakLanjut: e.target.value})} className="input-field" rows="2" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Target Selesai</label>
                <input type="date" value={form.target} onChange={e => setForm({...form, target: e.target.value})} className="input-field" />
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
