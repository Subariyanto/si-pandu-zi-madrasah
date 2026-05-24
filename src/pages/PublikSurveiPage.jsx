import { useState } from 'react';
import { useData } from '../context/DataContext';
import { surveiQuestions } from '../data/sampleData';
import { v4 as uuidv4 } from 'uuid';
import { QRCodeSVG } from 'qrcode.react';
import { CheckCircle } from 'lucide-react';

export default function PublikSurveiPage() {
  const { madrasah, survei, setSurvei } = useData();
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    madrasahId: '', namaResponden: '', kategoriResponden: 'Masyarakat',
    jawaban: Array(8).fill(0), kritikSaran: ''
  });

  const handleJawaban = (idx, val) => {
    const newJawaban = [...formData.jawaban];
    newJawaban[idx] = parseInt(val);
    setFormData({ ...formData, jawaban: newJawaban });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const selM = madrasah.find(m => m.id === formData.madrasahId);
    setSurvei(prev => [...prev, {
      id: uuidv4(),
      madrasahId: formData.madrasahId,
      madrasahNama: selM?.nama || '',
      tanggal: new Date().toISOString().split('T')[0],
      kategoriResponden: formData.kategoriResponden,
      namaResponden: formData.namaResponden,
      jawaban: formData.jawaban,
      kritikSaran: formData.kritikSaran,
    }]);
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div className="min-h-screen bg-green-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-2xl shadow-xl p-8 max-w-md text-center">
          <CheckCircle className="w-16 h-16 text-green-600 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-gray-800 mb-2">Terima Kasih!</h2>
          <p className="text-gray-600">Survei Anda telah berhasil dikirim. Masukan Anda sangat berharga untuk peningkatan layanan madrasah.</p>
          <button onClick={() => { setSubmitted(false); setFormData({ madrasahId: '', namaResponden: '', kategoriResponden: 'Masyarakat', jawaban: Array(8).fill(0), kritikSaran: '' }); }} className="btn-primary mt-6">
            Isi Survei Lagi
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-green-50 py-8 px-4">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="bg-kemenag-green text-white rounded-t-2xl p-6 text-center">
          <h1 className="text-xl font-bold">SURVEI KEPUASAN LAYANAN</h1>
          <p className="text-green-200 text-sm mt-1">SI-PANDU ZI MADRASAH</p>
          <p className="text-green-100 text-xs mt-2">Kelompok Kerja Pengawas Madrasah</p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="bg-white rounded-b-2xl shadow-xl p-6 space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Nama Madrasah *</label>
            <select value={formData.madrasahId} onChange={(e) => setFormData({...formData, madrasahId: e.target.value})} className="input-field" required>
              <option value="">Pilih Madrasah</option>
              {madrasah.map(m => <option key={m.id} value={m.id}>{m.nama}</option>)}
            </select>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Nama (opsional)</label>
              <input type="text" value={formData.namaResponden} onChange={(e) => setFormData({...formData, namaResponden: e.target.value})} className="input-field" placeholder="Boleh dikosongkan" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Kategori *</label>
              <select value={formData.kategoriResponden} onChange={(e) => setFormData({...formData, kategoriResponden: e.target.value})} className="input-field">
                <option value="Siswa">Siswa</option>
                <option value="Orang Tua">Orang Tua</option>
                <option value="Guru">Guru</option>
                <option value="Masyarakat">Masyarakat</option>
              </select>
            </div>
          </div>

          <div className="border-t pt-4">
            <p className="text-sm text-gray-600 mb-4">Berikan penilaian Anda (1 = Sangat Tidak Puas, 5 = Sangat Puas)</p>
            {surveiQuestions.map((q, idx) => (
              <div key={idx} className="mb-4 p-3 bg-gray-50 rounded-lg">
                <p className="text-sm font-medium text-gray-700 mb-2">{idx + 1}. {q}</p>
                <div className="flex gap-4">
                  {[1, 2, 3, 4, 5].map(val => (
                    <label key={val} className="flex items-center gap-1 cursor-pointer">
                      <input
                        type="radio"
                        name={`q${idx}`}
                        value={val}
                        checked={formData.jawaban[idx] === val}
                        onChange={() => handleJawaban(idx, val)}
                        className="text-kemenag-green focus:ring-kemenag-green"
                        required
                      />
                      <span className="text-sm">{val}</span>
                    </label>
                  ))}
                </div>
              </div>
            ))}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Kritik dan Saran</label>
            <textarea value={formData.kritikSaran} onChange={(e) => setFormData({...formData, kritikSaran: e.target.value})} className="input-field" rows="3" placeholder="Tuliskan kritik dan saran Anda..." />
          </div>

          <button type="submit" className="btn-primary w-full py-3 text-base">
            Kirim Survei
          </button>
        </form>
      </div>
    </div>
  );
}
