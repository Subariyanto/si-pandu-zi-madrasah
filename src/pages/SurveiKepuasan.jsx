import { useState } from 'react'
import { useData } from '../context/DataContext'
import { surveiPertanyaan } from '../data/sampleData'
import { Bar } from 'react-chartjs-2'
import { Star, Download, FileText } from 'lucide-react'
import { QRCodeSVG } from 'qrcode.react'
import { exportToExcel, exportToPDF } from '../utils/exportUtils'

export default function SurveiKepuasan() {
  const { survei, madrasah } = useData()
  const [selectedMadrasah, setSelectedMadrasah] = useState('')
  const [showQR, setShowQR] = useState(false)

  const filtered = selectedMadrasah ? survei.filter(s => s.madrasahId === selectedMadrasah) : survei

  // Calculate averages per question
  const avgPerQuestion = surveiPertanyaan.map((_, idx) => {
    if (filtered.length === 0) return 0
    return (filtered.reduce((sum, s) => sum + (s.jawaban[idx] || 0), 0) / filtered.length).toFixed(2)
  })

  const totalAvg = filtered.length > 0
    ? (filtered.reduce((sum, s) => sum + s.jawaban.reduce((a, b) => a + b, 0) / s.jawaban.length, 0) / filtered.length).toFixed(2)
    : 0

  const getKategori = (avg) => {
    if (avg >= 4.01) return { label: 'Sangat Baik', color: 'bg-green-100 text-green-700' }
    if (avg >= 3.01) return { label: 'Baik', color: 'bg-blue-100 text-blue-700' }
    if (avg >= 2.01) return { label: 'Cukup', color: 'bg-yellow-100 text-yellow-700' }
    return { label: 'Kurang', color: 'bg-red-100 text-red-700' }
  }

  const chartData = {
    labels: surveiPertanyaan.map((_, i) => `P${i + 1}`),
    datasets: [{
      label: 'Rata-rata Skor',
      data: avgPerQuestion,
      backgroundColor: '#16a34a',
      borderRadius: 6,
    }]
  }

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: { legend: { display: false }, title: { display: true, text: 'Rata-rata Skor per Pertanyaan' } },
    scales: { y: { beginAtZero: true, max: 5 } }
  }

  const handleExportExcel = () => {
    const data = filtered.map(s => {
      const m = madrasah.find(x => x.id === s.madrasahId)
      const obj = { Madrasah: m?.nama || '-', Tanggal: s.tanggal, Responden: s.responden }
      surveiPertanyaan.forEach((p, i) => { obj[`P${i + 1}`] = s.jawaban[i] })
      obj['Rata-rata'] = (s.jawaban.reduce((a, b) => a + b, 0) / s.jawaban.length).toFixed(2)
      return obj
    })
    exportToExcel(data, 'Survei_Kepuasan')
  }

  const handleExportPDF = () => {
    const headers = ['Madrasah', 'Tanggal', 'Responden', ...surveiPertanyaan.map((_, i) => `P${i+1}`), 'Avg']
    const rows = filtered.map(s => {
      const m = madrasah.find(x => x.id === s.madrasahId)
      return [m?.nama || '-', s.tanggal, s.responden, ...s.jawaban.map(String), (s.jawaban.reduce((a,b)=>a+b,0)/s.jawaban.length).toFixed(1)]
    })
    exportToPDF('Hasil Survei Kepuasan Layanan', headers, rows, 'Survei_Kepuasan')
  }

  const surveyUrl = `${window.location.origin}/publik/survei${selectedMadrasah ? '/' + selectedMadrasah : ''}`

  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <h1 className="text-2xl font-bold text-primary-800 dark:text-white flex items-center gap-2">
          <Star className="w-6 h-6" /> Survei Kepuasan Layanan
        </h1>
        <div className="flex gap-2">
          <button onClick={() => setShowQR(!showQR)} className="btn-outline">QR Code</button>
          <button onClick={handleExportExcel} className="btn-outline flex items-center gap-2"><Download className="w-4 h-4" /> Excel</button>
          <button onClick={handleExportPDF} className="btn-secondary flex items-center gap-2"><FileText className="w-4 h-4" /> PDF</button>
        </div>
      </div>

      <div className="card">
        <div className="flex flex-col sm:flex-row gap-3 items-center">
          <select value={selectedMadrasah} onChange={e => setSelectedMadrasah(e.target.value)} className="input-field sm:w-64">
            <option value="">Semua Madrasah</option>
            {madrasah.map(m => <option key={m.id} value={m.id}>{m.nama}</option>)}
          </select>
          <p className="text-sm text-gray-500">Total responden: <span className="font-bold">{filtered.length}</span></p>
        </div>
      </div>

      {showQR && (
        <div className="card flex flex-col items-center gap-3">
          <h3 className="font-semibold text-primary-800 dark:text-white">QR Code Survei</h3>
          <QRCodeSVG value={surveyUrl} size={200} />
          <p className="text-xs text-gray-500 break-all">{surveyUrl}</p>
          <p className="text-sm text-gray-600">Scan QR Code untuk mengisi survei</p>
        </div>
      )}

      {/* Summary */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="card text-center">
          <p className="text-sm text-gray-500">Rata-rata Keseluruhan</p>
          <p className="text-4xl font-bold text-primary-700 dark:text-primary-400">{totalAvg}</p>
          <span className={`px-3 py-1 rounded-full text-sm font-medium ${getKategori(totalAvg).color}`}>
            {getKategori(totalAvg).label}
          </span>
        </div>
        <div className="card col-span-2">
          <div className="h-48">
            <Bar data={chartData} options={chartOptions} />
          </div>
        </div>
      </div>

      {/* Detail per question */}
      <div className="card">
        <h3 className="font-semibold text-primary-800 dark:text-white mb-3">Detail per Pertanyaan</h3>
        <div className="space-y-2">
          {surveiPertanyaan.map((p, i) => (
            <div key={i} className="flex items-center gap-3 p-2 bg-gray-50 dark:bg-gray-700 rounded">
              <span className="text-xs font-bold text-primary-700 w-8">P{i+1}</span>
              <p className="text-sm flex-1 text-gray-700 dark:text-gray-300">{p}</p>
              <div className="flex items-center gap-2">
                <div className="w-24 bg-gray-200 dark:bg-gray-600 rounded-full h-2">
                  <div className="h-2 rounded-full bg-primary-600" style={{ width: `${(avgPerQuestion[i] / 5) * 100}%` }} />
                </div>
                <span className="text-sm font-bold w-10 text-right">{avgPerQuestion[i]}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
