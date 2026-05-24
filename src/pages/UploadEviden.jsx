import { useState } from 'react'
import { useData } from '../context/DataContext'
import { areaZI } from '../data/sampleData'
import { Upload as UploadIcon, Plus, Trash2, Search, X, CheckCircle, Clock, AlertCircle } from 'lucide-react'

export default function UploadEviden() {
  const { uploadEviden, madrasah, addUploadEviden, updateUploadEviden, deleteUploadEviden } = useData()
  const [search, setSearch] = useState('')
  const [filterArea, setFilterArea] = useState('')
  const [filterStatus, setFilterStatus] = useState('')
  const [showForm, setShowForm] = useState(false)
  const [form, setForm] = useState({
    madrasahId: '', area: 1, indikator: '', jenisDoc: '', file: '', namaFile: '', keterangan: '', statusVerifikasi: 'Menunggu Verifikasi', catatanVerifikator: ''
  })

  const filtered = uploadEviden.filter(e => {
    const m = madrasah.find(x => x.id === e.madrasahId)
    const matchSearch = (m?.nama || '').toLowerCase().includes(search.toLowerCase()) || e.indikator.toLowerCase().includes(search.toLowerCase())
    const matchArea = !filterArea || e.area === parseInt(filterArea)
    const matchStatus = !filterStatus || e.statusVerifikasi === filterStatus
    return matchSearch && matchArea && matchStatus
  })

  const handleFileChange = (e) => {
    const file = e.target.files[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = (ev) => {
        setForm({ ...form, file: ev.target.result, namaFile: file.name })
      }
      reader.readAsDataURL(file)
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    addUploadEviden(form)
    setShowForm(false)
    setForm({ madrasahId: '', area: 1, indikator: '', jenisDoc: '', file: '', namaFile: '', keterangan: '', statusVerifikasi: 'Menunggu Verifikasi', catatanVerifikator: '' })
  }

  const handleVerifikasi = (id, status, catatan) => {
    updateUploadEviden(id, { statusVerifikasi: status, catatanVerifikator: catatan })
  }

  const getMadrasahNama = (id) => madrasah.find(m => m.id === id)?.nama || '-'

  const statusIcon = (status) => {
    if (status === 'Terverifikasi') return <CheckCircle className="w-4 h-4 text-green-600" />
    if (status === 'Menunggu Verifikasi') return <Clock className="w-4 h-4 text-yellow-600" />
    return <AlertCircle className="w-4 h-4 text-red-600" />
  }

  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <h1 className="text-2xl font-bold text-primary-800 dark:text-white">Upload Eviden</h1>
        <button onClick={() => setShowForm(true)} className="btn-primary flex items-center gap-2">
          <Plus className="w-4 h-4" /> Upload Baru
        </button>
      </div>

      <div className="card">
        <div className="flex flex-col sm:flex-row gap-3">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input type="text" placeholder="Cari..." value={search} onChange={e => setSearch(e.target.value)} className="input-field pl-9" />
          </div>
          <select value={filterArea} onChange={e => setFilterArea(e.target.value)} className="input-field sm:w-48">
            <option value="">Semua Area</option>
            {areaZI.map(a => <option key={a.id} value={a.id}>Area {a.id}: {a.nama}</option>)}
          </select>
          <select value={filterStatus} onChange={e => setFilterStatus(e.target.value)} className="input-field sm:w-48">
            <option value="">Semua Status</option>
            <option value="Terverifikasi">Terverifikasi</option>
            <option value="Menunggu Verifikasi">Menunggu Verifikasi</option>
            <option value="Ditolak">Ditolak</option>
          </select>
        </div>
      </div>

      <div className="card overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-gray-200 dark:border-gray-700">
              <th className="text-left py-3 px-2 font-medium text-gray-600 dark:text-gray-300">Madrasah</th>
              <th className="text-left py-3 px-2 font-medium text-gray-600 dark:text-gray-300">Area</th>
              <th className="text-left py-3 px-2 font-medium text-gray-600 dark:text-gray-300 hidden md:table-cell">Indikator</th>
              <th className="text-left py-3 px-2 font-medium text-gray-600 dark:text-gray-300 hidden lg:table-cell">File</th>
              <th className="text-left py-3 px-2 font-medium text-gray-600 dark:text-gray-300">Status</th>
              <th className="text-left py-3 px-2 font-medium text-gray-600 dark:text-gray-300">Aksi</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map(e => (
              <tr key={e.id} className="border-b border-gray-100 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700/50">
                <td className="py-2 px-2 font-medium text-gray-800 dark:text-white">{getMadrasahNama(e.madrasahId)}</td>
                <td className="py-2 px-2">Area {e.area}</td>
                <td className="py-2 px-2 hidden md:table-cell text-gray-600 dark:text-gray-400 max-w-[200px] truncate">{e.indikator}</td>
                <td className="py-2 px-2 hidden lg:table-cell text-gray-600 dark:text-gray-400">{e.namaFile || '-'}</td>
                <td className="py-2 px-2">
                  <div className="flex items-center gap-1">
                    {statusIcon(e.statusVerifikasi)}
                    <span className={`text-xs font-medium ${
                      e.statusVerifikasi === 'Terverifikasi' ? 'text-green-700' :
                      e.statusVerifikasi === 'Menunggu Verifikasi' ? 'text-yellow-700' : 'text-red-700'
                    }`}>{e.statusVerifikasi}</span>
                  </div>
                </td>
                <td className="py-2 px-2">
                  <div className="flex gap-1">
                    {e.statusVerifikasi === 'Menunggu Verifikasi' && (
                      <>
                        <button onClick={() => handleVerifikasi(e.id, 'Terverifikasi', 'Dokumen valid')} className="p-1.5 hover:bg-green-50 rounded text-green-600 text-xs" title="Verifikasi">✓</button>
                        <button onClick={() => handleVerifikasi(e.id, 'Ditolak', 'Dokumen tidak sesuai')} className="p-1.5 hover:bg-red-50 rounded text-red-600 text-xs" title="Tolak">✗</button>
                      </>
                    )}
                    <button onClick={() => { if(confirm('Hapus?')) deleteUploadEviden(e.id) }} className="p-1.5 hover:bg-red-50 dark:hover:bg-red-900/20 rounded text-red-600">
                      <Trash2 className="w-4 h-4" />
                    </button>
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
              <h2 className="text-lg font-bold text-primary-800 dark:text-white">Upload Eviden Baru</h2>
              <button onClick={() => setShowForm(false)} className="p-1 hover:bg-gray-100 dark:hover:bg-gray-700 rounded"><X className="w-5 h-5" /></button>
            </div>
            <form onSubmit={handleSubmit} className="p-4 space-y-3">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Madrasah</label>
                <select value={form.madrasahId} onChange={e => setForm({...form, madrasahId: e.target.value})} className="input-field" required>
                  <option value="">Pilih Madrasah</option>
                  {madrasah.map(m => <option key={m.id} value={m.id}>{m.nama}</option>)}
                </select>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Area</label>
                  <select value={form.area} onChange={e => setForm({...form, area: parseInt(e.target.value), indikator: ''})} className="input-field">
                    {areaZI.map(a => <option key={a.id} value={a.id}>Area {a.id}</option>)}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Indikator</label>
                  <select value={form.indikator} onChange={e => setForm({...form, indikator: e.target.value})} className="input-field" required>
                    <option value="">Pilih Indikator</option>
                    {areaZI.find(a => a.id === form.area)?.indikators.map(ind => <option key={ind} value={ind}>{ind}</option>)}
                  </select>
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Jenis Dokumen</label>
                <input type="text" value={form.jenisDoc} onChange={e => setForm({...form, jenisDoc: e.target.value})} className="input-field" placeholder="Contoh: SK, SOP, Laporan..." required />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">File</label>
                <div className="border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg p-4 text-center">
                  <UploadIcon className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                  <input type="file" onChange={handleFileChange} className="text-sm" accept=".pdf,.doc,.docx,.jpg,.jpeg,.png" />
                  {form.namaFile && <p className="text-xs text-green-600 mt-2">File: {form.namaFile}</p>}
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Keterangan</label>
                <textarea value={form.keterangan} onChange={e => setForm({...form, keterangan: e.target.value})} className="input-field" rows="2" />
              </div>
              <div className="flex gap-3 pt-3">
                <button type="submit" className="btn-primary flex-1">Upload</button>
                <button type="button" onClick={() => setShowForm(false)} className="btn-outline flex-1">Batal</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}
