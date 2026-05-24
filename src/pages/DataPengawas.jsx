import { useState } from 'react'
import { useData } from '../context/DataContext'
import { Plus, Edit, Trash2, Search, Download, FileText, X } from 'lucide-react'
import { exportToExcel, exportToPDF } from '../utils/exportUtils'

export default function DataPengawas() {
  const { pengawas, addPengawas, updatePengawas, deletePengawas } = useData()
  const [search, setSearch] = useState('')
  const [filterWilayah, setFilterWilayah] = useState('')
  const [showForm, setShowForm] = useState(false)
  const [editData, setEditData] = useState(null)
  const [form, setForm] = useState({ nama: '', nip: '', nuptk: '', pangkat: '', jabatan: '', wilayah: '', hp: '', email: '', foto: '', status: 'Aktif' })

  const wilayahList = [...new Set(pengawas.map(p => p.wilayah))]

  const filtered = pengawas.filter(p => {
    const matchSearch = p.nama.toLowerCase().includes(search.toLowerCase()) || p.nip.includes(search)
    const matchWilayah = !filterWilayah || p.wilayah === filterWilayah
    return matchSearch && matchWilayah
  })

  const openAdd = () => {
    setEditData(null)
    setForm({ nama: '', nip: '', nuptk: '', pangkat: '', jabatan: '', wilayah: '', hp: '', email: '', foto: '', status: 'Aktif' })
    setShowForm(true)
  }

  const openEdit = (p) => {
    setEditData(p)
    setForm({ ...p })
    setShowForm(true)
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (editData) {
      updatePengawas(editData.id, form)
    } else {
      addPengawas(form)
    }
    setShowForm(false)
  }

  const handleDelete = (id) => {
    if (confirm('Yakin hapus data pengawas ini?')) {
      deletePengawas(id)
    }
  }

  const handleExportExcel = () => {
    const data = filtered.map(p => ({
      Nama: p.nama, NIP: p.nip, NUPTK: p.nuptk, Pangkat: p.pangkat,
      Jabatan: p.jabatan, Wilayah: p.wilayah, HP: p.hp, Email: p.email, Status: p.status
    }))
    exportToExcel(data, 'Data_Pengawas')
  }

  const handleExportPDF = () => {
    const headers = ['Nama', 'NIP', 'Pangkat', 'Jabatan', 'Wilayah', 'Status']
    const rows = filtered.map(p => [p.nama, p.nip, p.pangkat, p.jabatan, p.wilayah, p.status])
    exportToPDF('Data Pengawas Madrasah', headers, rows, 'Data_Pengawas')
  }

  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <h1 className="text-2xl font-bold text-primary-800 dark:text-white">Data Pengawas</h1>
        <button onClick={openAdd} className="btn-primary flex items-center gap-2">
          <Plus className="w-4 h-4" /> Tambah Pengawas
        </button>
      </div>

      {/* Filters */}
      <div className="card">
        <div className="flex flex-col sm:flex-row gap-3">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              placeholder="Cari nama atau NIP..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="input-field pl-9"
            />
          </div>
          <select value={filterWilayah} onChange={(e) => setFilterWilayah(e.target.value)} className="input-field sm:w-48">
            <option value="">Semua Wilayah</option>
            {wilayahList.map(w => <option key={w} value={w}>{w}</option>)}
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
              <th className="text-left py-3 px-2 font-medium text-gray-600 dark:text-gray-300 hidden md:table-cell">NIP</th>
              <th className="text-left py-3 px-2 font-medium text-gray-600 dark:text-gray-300 hidden lg:table-cell">Pangkat</th>
              <th className="text-left py-3 px-2 font-medium text-gray-600 dark:text-gray-300">Wilayah</th>
              <th className="text-left py-3 px-2 font-medium text-gray-600 dark:text-gray-300">Status</th>
              <th className="text-left py-3 px-2 font-medium text-gray-600 dark:text-gray-300">Aksi</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((p, i) => (
              <tr key={p.id} className="border-b border-gray-100 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700/50">
                <td className="py-2 px-2">{i + 1}</td>
                <td className="py-2 px-2 font-medium text-gray-800 dark:text-white">{p.nama}</td>
                <td className="py-2 px-2 hidden md:table-cell text-gray-600 dark:text-gray-400">{p.nip}</td>
                <td className="py-2 px-2 hidden lg:table-cell text-gray-600 dark:text-gray-400">{p.pangkat}</td>
                <td className="py-2 px-2 text-gray-600 dark:text-gray-400">{p.wilayah}</td>
                <td className="py-2 px-2">
                  <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${p.status === 'Aktif' ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-600'}`}>
                    {p.status}
                  </span>
                </td>
                <td className="py-2 px-2">
                  <div className="flex gap-1">
                    <button onClick={() => openEdit(p)} className="p-1.5 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded text-blue-600" title="Edit">
                      <Edit className="w-4 h-4" />
                    </button>
                    <button onClick={() => handleDelete(p.id)} className="p-1.5 hover:bg-red-50 dark:hover:bg-red-900/20 rounded text-red-600" title="Hapus">
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

      {/* Modal Form */}
      {showForm && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-xl w-full max-w-lg max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between p-4 border-b dark:border-gray-700">
              <h2 className="text-lg font-bold text-primary-800 dark:text-white">{editData ? 'Edit' : 'Tambah'} Pengawas</h2>
              <button onClick={() => setShowForm(false)} className="p-1 hover:bg-gray-100 dark:hover:bg-gray-700 rounded">
                <X className="w-5 h-5" />
              </button>
            </div>
            <form onSubmit={handleSubmit} className="p-4 space-y-3">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Nama Lengkap</label>
                <input type="text" value={form.nama} onChange={e => setForm({...form, nama: e.target.value})} className="input-field" required />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">NIP</label>
                  <input type="text" value={form.nip} onChange={e => setForm({...form, nip: e.target.value})} className="input-field" required />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">NUPTK</label>
                  <input type="text" value={form.nuptk} onChange={e => setForm({...form, nuptk: e.target.value})} className="input-field" />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Pangkat</label>
                  <input type="text" value={form.pangkat} onChange={e => setForm({...form, pangkat: e.target.value})} className="input-field" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Jabatan</label>
                  <input type="text" value={form.jabatan} onChange={e => setForm({...form, jabatan: e.target.value})} className="input-field" />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Wilayah Binaan</label>
                <input type="text" value={form.wilayah} onChange={e => setForm({...form, wilayah: e.target.value})} className="input-field" required />
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
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Status</label>
                <select value={form.status} onChange={e => setForm({...form, status: e.target.value})} className="input-field">
                  <option value="Aktif">Aktif</option>
                  <option value="Pensiun">Pensiun</option>
                  <option value="Mutasi">Mutasi</option>
                </select>
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
