import { useState } from 'react'
import { useData } from '../context/DataContext'
import { areaZI } from '../data/sampleData'
import { OPSI_PER_INDIKATOR } from '../data/opsiChecklist'
import { FileCheck, Save, X, Wand2 } from 'lucide-react'

export default function ChecklistEviden() {
  const { checklistEviden, madrasah, pengawas, addChecklistEviden, updateChecklistEviden } = useData()
  const [selectedMadrasah, setSelectedMadrasah] = useState('')
  const [showForm, setShowForm] = useState(false)
  const [currentChecklist, setCurrentChecklist] = useState(null)

  const getKategori = (skor) => {
    if (skor >= 85) return { label: 'Siap Evaluasi ZI', color: 'bg-green-100 text-green-700' }
    if (skor >= 70) return { label: 'Baik', color: 'bg-blue-100 text-blue-700' }
    if (skor >= 50) return { label: 'Berkembang', color: 'bg-yellow-100 text-yellow-700' }
    return { label: 'Perlu Pembinaan Intensif', color: 'bg-red-100 text-red-700' }
  }

  const calculateAreaAvg = (indikators) => {
    if (!indikators || indikators.length === 0) return 0
    return Math.round(indikators.reduce((sum, i) => sum + i.skor, 0) / indikators.length)
  }

  const calculateTotal = (areas) => {
    if (!areas || areas.length === 0) return 0
    const allScores = areas.flatMap(a => a.indikators.map(i => i.skor))
    return allScores.length > 0 ? Math.round(allScores.reduce((a, b) => a + b, 0) / allScores.length) : 0
  }

  const openNew = () => {
    const newChecklist = {
      madrasahId: selectedMadrasah || madrasah[0]?.id || '',
      pengawasId: pengawas[0]?.id || '',
      tanggal: new Date().toISOString().split('T')[0],
      areas: areaZI.map(area => ({
        area: area.id,
        nama: area.nama,
        indikators: area.indikators.map((ind, idx) => ({
          id: `a${area.id}i${idx + 1}`,
          nama: ind,
          status: 'Tidak Ada',
          skor: 0,
          keterangan: '',
          linkEviden: '',
          catatan: '',
          rekomendasi: ''
        }))
      }))
    }
    setCurrentChecklist(newChecklist)
    setShowForm(true)
  }

  const openEdit = (cl) => {
    setCurrentChecklist({ ...cl })
    setShowForm(true)
  }

  const updateIndikator = (areaIdx, indIdx, field, value) => {
    const updated = { ...currentChecklist }
    const ind = updated.areas[areaIdx].indikators[indIdx]
    ind[field] = value
    if (field === 'status') {
      ind.skor = value === 'Ada' ? 100 : value === 'Dalam Proses' ? 50 : 0
    }
    setCurrentChecklist({ ...updated })
  }

  const handleSave = () => {
    if (currentChecklist.id) {
      updateChecklistEviden(currentChecklist.id, currentChecklist)
    } else {
      addChecklistEviden(currentChecklist)
    }
    setShowForm(false)
  }

  const filteredChecklist = selectedMadrasah
    ? checklistEviden.filter(c => c.madrasahId === selectedMadrasah)
    : checklistEviden

  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <h1 className="text-2xl font-bold text-primary-800 dark:text-white">Checklist Eviden ZI</h1>
        <button onClick={openNew} className="btn-primary flex items-center gap-2">
          <FileCheck className="w-4 h-4" /> Buat Checklist Baru
        </button>
      </div>

      <div className="card">
        <select value={selectedMadrasah} onChange={e => setSelectedMadrasah(e.target.value)} className="input-field sm:w-64">
          <option value="">Semua Madrasah</option>
          {madrasah.map(m => <option key={m.id} value={m.id}>{m.nama}</option>)}
        </select>
      </div>

      {/* Existing checklists */}
      <div className="grid gap-4">
        {filteredChecklist.map(cl => {
          const total = calculateTotal(cl.areas)
          const kat = getKategori(total)
          const m = madrasah.find(x => x.id === cl.madrasahId)
          return (
            <div key={cl.id} className="card cursor-pointer hover:shadow-lg transition-shadow" onClick={() => openEdit(cl)}>
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-semibold text-gray-800 dark:text-white">{m?.nama || '-'}</h3>
                  <p className="text-sm text-gray-500">Tanggal: {cl.tanggal}</p>
                </div>
                <div className="text-right">
                  <p className="text-2xl font-bold text-primary-700 dark:text-primary-400">{total}%</p>
                  <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${kat.color}`}>{kat.label}</span>
                </div>
              </div>
              <div className="mt-3 grid grid-cols-3 md:grid-cols-6 gap-2">
                {cl.areas.map(area => {
                  const avg = calculateAreaAvg(area.indikators)
                  return (
                    <div key={area.area} className="text-center p-2 bg-gray-50 dark:bg-gray-700 rounded">
                      <p className="text-xs text-gray-500">Area {area.area}</p>
                      <p className="font-bold text-sm">{avg}%</p>
                    </div>
                  )
                })}
              </div>
            </div>
          )
        })}
        {filteredChecklist.length === 0 && (
          <div className="card text-center py-8 text-gray-500">Belum ada checklist. Klik "Buat Checklist Baru" untuk memulai.</div>
        )}
      </div>

      {/* Form Modal */}
      {showForm && currentChecklist && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-xl w-full max-w-4xl max-h-[90vh] overflow-y-auto">
            <div className="sticky top-0 bg-white dark:bg-gray-800 flex items-center justify-between p-4 border-b dark:border-gray-700 z-10">
              <h2 className="text-lg font-bold text-primary-800 dark:text-white">Checklist Eviden ZI</h2>
              <div className="flex gap-2">
                <button onClick={() => {
                  const updated = { ...currentChecklist }
                  updated.areas.forEach((area, areaIdx) => {
                    const areaKey = `area${area.area}`
                    const opsiArea = OPSI_PER_INDIKATOR[areaKey]
                    if (!opsiArea) return
                    area.indikators.forEach((ind, indIdx) => {
                      if (!opsiArea[indIdx]) return
                      const statusIndex = ind.status === 'Ada' ? 0 : ind.status === 'Dalam Proses' ? 1 : 3
                      const opsi = opsiArea[indIdx]
                      ind.keterangan = opsi.keterangan[statusIndex] || ''
                      ind.catatan = opsi.catatan[statusIndex] || ''
                      ind.rekomendasi = opsi.rekomendasi[statusIndex] || ''
                    })
                  })
                  setCurrentChecklist({ ...updated })
                }} className="btn-primary flex items-center gap-2 bg-purple-600 hover:bg-purple-700"><Wand2 className="w-4 h-4" /> Generate Otomatis</button>
                <button onClick={handleSave} className="btn-primary flex items-center gap-2"><Save className="w-4 h-4" /> Simpan</button>
                <button onClick={() => setShowForm(false)} className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded"><X className="w-5 h-5" /></button>
              </div>
            </div>

            <div className="p-4 space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Madrasah</label>
                  <select value={currentChecklist.madrasahId} onChange={e => setCurrentChecklist({...currentChecklist, madrasahId: e.target.value})} className="input-field">
                    {madrasah.map(m => <option key={m.id} value={m.id}>{m.nama}</option>)}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Pengawas</label>
                  <select value={currentChecklist.pengawasId} onChange={e => setCurrentChecklist({...currentChecklist, pengawasId: e.target.value})} className="input-field">
                    {pengawas.map(p => <option key={p.id} value={p.id}>{p.nama}</option>)}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Tanggal</label>
                  <input type="date" value={currentChecklist.tanggal} onChange={e => setCurrentChecklist({...currentChecklist, tanggal: e.target.value})} className="input-field" />
                </div>
              </div>

              {/* Total Score */}
              <div className="bg-primary-50 dark:bg-primary-900/20 p-4 rounded-lg text-center">
                <p className="text-sm text-gray-600 dark:text-gray-400">Total Capaian</p>
                <p className="text-3xl font-bold text-primary-800 dark:text-primary-400">{calculateTotal(currentChecklist.areas)}%</p>
                <span className={`px-3 py-1 rounded-full text-sm font-medium ${getKategori(calculateTotal(currentChecklist.areas)).color}`}>
                  {getKategori(calculateTotal(currentChecklist.areas)).label}
                </span>
              </div>

              {/* Areas */}
              {currentChecklist.areas.map((area, areaIdx) => (
                <div key={area.area} className="border dark:border-gray-700 rounded-lg overflow-hidden">
                  <div className="bg-primary-800 dark:bg-primary-900 text-white px-4 py-2 flex justify-between items-center">
                    <h3 className="font-medium">Area {area.area}: {area.nama}</h3>
                    <span className="bg-white/20 px-2 py-0.5 rounded text-sm">{calculateAreaAvg(area.indikators)}%</span>
                  </div>
                  <div className="p-3 space-y-3">
                    {area.indikators.map((ind, indIdx) => (
                      <div key={ind.id} className="p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                        <div className="flex flex-col md:flex-row md:items-center gap-2 mb-2">
                          <p className="text-sm font-medium text-gray-800 dark:text-white flex-1">{indIdx + 1}. {ind.nama}</p>
                          <select
                            value={ind.status}
                            onChange={e => updateIndikator(areaIdx, indIdx, 'status', e.target.value)}
                            className={`input-field w-40 text-sm ${
                              ind.status === 'Ada' ? 'border-green-500 bg-green-50' :
                              ind.status === 'Dalam Proses' ? 'border-yellow-500 bg-yellow-50' :
                              'border-red-500 bg-red-50'
                            }`}
                          >
                            <option value="Ada">Ada (100)</option>
                            <option value="Dalam Proses">Dalam Proses (50)</option>
                            <option value="Tidak Ada">Tidak Ada (0)</option>
                          </select>
                          <span className="text-sm font-bold w-12 text-center">{ind.skor}</span>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                          <input type="text" placeholder="Keterangan" value={ind.keterangan} onChange={e => updateIndikator(areaIdx, indIdx, 'keterangan', e.target.value)} className="input-field text-xs" />
                          <input type="text" placeholder="Link Eviden" value={ind.linkEviden} onChange={e => updateIndikator(areaIdx, indIdx, 'linkEviden', e.target.value)} className="input-field text-xs" />
                          <input type="text" placeholder="Catatan Pengawas" value={ind.catatan} onChange={e => updateIndikator(areaIdx, indIdx, 'catatan', e.target.value)} className="input-field text-xs" />
                          <input type="text" placeholder="Rekomendasi" value={ind.rekomendasi} onChange={e => updateIndikator(areaIdx, indIdx, 'rekomendasi', e.target.value)} className="input-field text-xs" />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
