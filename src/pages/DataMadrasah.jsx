import { useState } from 'react'
import { useData } from '../context/DataContext'
import { Plus, Edit, Trash2, Search, Download, FileText, X } from 'lucide-react'
import { exportToExcel, exportToPDF } from '../utils/exportUtils'

export default function DataMadrasah() {
  const { madrasah, pengawas, addMadrasah, updateMadrasah, deleteMadrasah } = useData()
  const [search, setSearch] = useState('')
  const [filterJenjang, setFilterJenjang] = useState('')
  const [filterKecamatan, setFilterKecamatan] = useState('')
  const [filterPengawas, setFilterPengawas] = useState('')
  const [showForm, setShowForm] = useState(false)
  const [editData, setEditData] = useState(null)
  const [form, setForm] = useState({ nama: '', nsm: '', npsn: '', jenjang: 'MI', status: 'Negeri', kepala: '', hp: '', email: '', alamat: '', kecamatan: '', pengawasId: '', guru: 0, siswa: 0, statusZI: 'Berkembang' })

  const jenjangList = ['MI', 'MTs', 'MA']
  const kecamatanList = [...new Set(madrasah.map(m => m.kecamatan))]

  const filtered = madrasah.filter(m => {
    const matchSearch = m.nama.toLowerCase().includes(search.toLowerCase()) || m.npsn.includes(search)
    const matchJenjang = !filterJenjang || m.jenjang === filterJenjang
    const matchKecamatan = !filterKecamatan || m.kecamatan === filterKecamatan
    const matchPengawas = !filterPengawas || m.pengawasId === filterPengawas
    return matchSearch && matchJenjang && matchKecamatan && matchPengawas
  })

  const openAdd = () => {
    setEditData(null)
    setForm({ nama: '', nsm: '', npsn: '', jenjang: 'MI', status: 'Negeri', kepala: '', hp: '', email: '', alamat: '', kecamatan: '', pengawasId: '', guru: 0, siswa: 0, statusZI: 'Berkembang' })
    setShowForm(true)
  }

  const openEdit = (m) => {
    setEditData(m)
    setForm({ ...m })
    setShowForm(true)
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (editData) {
      updateMadrasah(editData.id, form)
    } else {
      addMadrasah(form)
    }
    setShowForm(false)
  }

  const handleDelete = (id) => {
    if (confirm('Yakin hapus data madrasah ini?')) {
      deleteMadrasah(id)
    }
  }

  const getPengawasNama = (id) => pengawas.find(p => p.id === id)?.nama || '-'

  const handleExportExcel = () => {
    const data = filtered.map(m => ({
      Nama: m.nama, NSM: m.nsm, NPSN: m.npsn, Jenjang: m.jenjang, Status: m.status,
      'Kepala Madrasah': m.kepala, HP: m.hp, Kecamatan: m.kecamatan,
      Pengawas: getPengawasNama(m.pengawasId), Guru: m.guru, Siswa: m.siswa, 'Status ZI': m.statusZI
    }))
    exportToExcel(data, 'Data_Madrasah')
  }

  const handleExportPDF = () => {
    const headers = ['Nama', 'NPSN', 'Jenjang', 'Kepala', 'Kecamatan', 'Status ZI']
    const rows = filtered.map(m => [m.nama, m.npsn, m.jenjang, m.kepala, m.kecamatan, m.statusZI])
    exportToPDF('Data Madrasah', headers, rows, 'Data_Madrasah')
  }

  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <h1 className="text-2xl font-bold text-primary-800 dark:text-white">Data Madrasah</h1>
        <button onClick={openAdd} className="btn-primary flex items-center gap-2">
          <Plus className="w-4 h-4" /> Tambah Madrasah
        </button>
      </div>

      {/* Filters */}
      <div className="card">
        <div className="flex flex-col sm:flex-row gap-3 flex-wrap">
          <div className="relative flex-1 min-w-[200px]">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input type="text" placeholder="Cari nama atau NPSN..." value={search} onChange={(e) => setSearch(e.target.value)} className="input-field pl-9" />
          </div>
          <select value={filterJenjang} onChange={(e) => setFilterJenjang(e.target.value)} className="input-field sm:w-36">
            <option value="">Semua Jenjang</option>
            {jenjangList.map(j => <option key={j} value={j}>{j}</option>)}
          </select>
          <select value={filterKecamatan} onChange={(e) => setFilterKecamatan(e.target.value)} className="input-field sm:w-48">
            <option value="">Semua Kecamatan</option>
            {kecamatanList.map(k => <option key={k} value={k}>{k}</option>)}
          </select>
          <select value={filterPengawas} onChange={(e) => setFilterPengawas(e.target.value)} className="input-field sm:w-48">
            <option value="">Semua Pengawas</option>
            {pengawas.map(p => <option key={p.id} value={p.id}>{p.nama}</option>)}
          </select>
          <button onClick={handleExportExcel} className="btn-outline flex items-center gap-2">
            <Download className="w-4 h-4" /> Excel
          </button>
          <button onClick={handleExportPDF} className="btn-secondary flex items-center gap-2">
            <FileText className="w-4 h-4" /> PDF
          </button>
        </div>
      </div>

      {/* Table */}
      <div className="card overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-gray-200 dark:border-gray-700">
              <th className="text-left py-3 px-2 font-medium text-gray-600 dark:text-gray-300">No</th>
              <th className="text-left py-3 px-2 font-medium text-gray-600 dark:text-gray-300">Nama</th>
              <th className="text-left py-3 px-2 font-medium text-gray-600 dark:text-gray-300 hidden md:table-cell">NPSN</th>
              <th className="text-left py-3 px-2 font-medium text-gray-600 dark:text-gray-300">Jenjang</th>
              <th className="text-left py-3 px-2 font-medium text-gray-600 dark:text-gray-300 hidden lg:table-cell">Kecamatan</th>
              <th className="text-left py-3 px-2 font-medium text-gray-600 dark:text-gray-300 hidden lg:table-cell">Pengawas</th>
              <th className="text-left py-3 px-2 font-medium text-gray-600 dark:text-gray-300">Status ZI</th>
              <th className="text-left py-3 px-2 font-medium text-gray-600 dark:text-gray-300">Aksi</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((m, i) => (
              <tr key={m.id} className="border-b border-gray-100 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700/50">
                <td className="py-2 px-2">{i + 1}</td>
                <td className="py-2 px-2 font-medium text-gray-800 dark:text-white">{m.nama}</td>
                <td className="py-2 px-2 hidden md:table-cell text-gray-600 dark:text-gray-400">{m.npsn}</td>
                <td className="py-2 px-2">
                  <span className="px-2 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-700">{m.jenjang}</span>
                </td>
                <td className="py-2 px-2 hidden lg:table-cell text-gray-600 dark:text-gray-400">{m.kecamatan}</td>
                <td className="py-2 px-2 hidden lg:table-cell text-gray-600 dark:text-gray-400">{getPengawasNama(m.pengawasId)}</td>
                <td className="py-2 px-2">
                  <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${
                    m.statusZI === 'Siap Evaluasi ZI' ? 'bg-green-100 text-green-700' :
                    m.statusZI === 'Baik' ? 'bg-blue-100 text-blue-700' :
                    m.statusZI === 'Berkembang' ? 'bg-yellow-100 text-yellow-700' :
                    'bg-red-100 text-red-700'
                  }`}>{m.statusZI}</span>
                </td>
                <td className="py-2 px-2">
                  <div className="flex gap-1">
                    <button onClick={() => openEdit(m)} className="p-1.5 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded text-blue-600"><Edit className="w-4 h-4" /></button>
                    <button onClick={() => handleDelete(m.id)} className="p-1.5 hover:bg-red-50 dark:hover:bg-red-900/20 rounded text-red-600"><Trash2 className="w-4 h-4" /></button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {filtered.length === 0 && <p className="text-center py-8 text-gray-500">Tidak ada data</p>}
      </div>

      {/* Modal Form */}
      {showForm && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-xl w-full max-w-lg max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between p-4 border-b dark:border-gray-700">
              <h2 className="text-lg font-bold text-primary-800 dark:text-white">{editData ? 'Edit' : 'Tambah'} Madrasah</h2>
              <button onClick={() => setShowForm(false)} className="p-1 hover:bg-gray-100 dark:hover:bg-gray-700 rounded"><X className="w-5 h-5" /></button>
            </div>
            <form onSubmit={handleSubmit} className="p-4 space-y-3">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Nama Madrasah</label>
                <input type="text" value={form.nama} onChange={e => setForm({...form, nama: e.target.value})} className="input-field" required />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">NSM</label>
                  <input type="text" value={form.nsm} onChange={e => setForm({...form, nsm: e.target.value})} className="input-field" required />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">NPSN</label>
                  <input type="text" value={form.npsn} onChange={e => setForm({...form, npsn: e.target.value})} className="input-field" required />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Jenjang</label>
                  <select value={form.jenjang} onChange={e => setForm({...form, jenjang: e.target.value})} className="input-field">
                    <option value="MI">MI</option>
                    <option value="MTs">MTs</option>
                    <option value="MA">MA</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Status</label>
                  <select value={form.status} onChange={e => setForm({...form, status: e.target.value})} className="input-field">
                    <option value="Negeri">Negeri</option>
                    <option value="Swasta">Swasta</option>
                  </select>
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Kepala Madrasah</label>
                <input type="text" value={form.kepala} onChange={e => setForm({...form, kepala: e.target.value})} className="input-field" />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">No. HP</label>
                  <input type="text" value={form.hp} onChange={e => setForm({...form, hp: e.target.value})} className="input-field" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Email</label>
                  <input type="email" value={form.email} onChange={e => setForm({...form, email: e.target.value})} className="input-field" />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Alamat</label>
                <input type="text" value={form.alamat} onChange={e => setForm({...form, alamat: e.target.value})} className="input-field" />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Kecamatan</label>
                  <input type="text" value={form.kecamatan} onChange={e => setForm({...form, kecamatan: e.target.value})} className="input-field" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Pengawas</label>
                  <select value={form.pengawasId} onChange={e => setForm({...form, pengawasId: e.target.value})} className="input-field">
                    <option value="">Pilih Pengawas</option>
                    {pengawas.filter(p => p.status === 'Aktif').map(p => <option key={p.id} value={p.id}>{p.nama}</option>)}
                  </select>
                </div>
              </div>
              <div className="grid grid-cols-3 gap-3">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Guru</label>
                  <input type="number" value={form.guru} onChange={e => setForm({...form, guru: parseInt(e.target.value) || 0})} className="input-field" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Siswa</label>
                  <input type="number" value={form.siswa} onChange={e => setForm({...form, siswa: parseInt(e.target.value) || 0})} className="input-field" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Status ZI</label>
                  <select value={form.statusZI} onChange={e => setForm({...form, statusZI: e.target.value})} className="input-field">
                    <option value="Perlu Pembinaan Intensif">Perlu Pembinaan</option>
                    <option value="Berkembang">Berkembang</option>
                    <option value="Baik">Baik</option>
                    <option value="Siap Evaluasi ZI">Siap Evaluasi ZI</option>
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
