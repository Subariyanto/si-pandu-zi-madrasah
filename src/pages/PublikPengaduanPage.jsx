import { useState } from 'react';
import { useData } from '../context/DataContext';
import { generateTicketNumber } from '../utils/helpers';
import { v4 as uuidv4 } from 'uuid';
import { CheckCircle } from 'lucide-react';

export default function PublikPengaduanPage() {
  const { madrasah, setPengaduan } = useData();
  const [submitted, setSubmitted] = useState(false);
  const [tiket, setTiket] = useState('');
  const [formData, setFormData] = useState({
    tanggal: new Date().toISOString().split('T')[0],
    namaPelapor: '', kategoriPelapor: 'Masyarakat',
    madrasahId: '', jenisPengaduan: 'Pelayanan', isiPengaduan: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    const selM = madrasah.find(m => m.id === formData.madrasahId);
    const newTiket = generateTicketNumber();
    setPengaduan(prev => [...prev, {
      id: uuidv4(),
      tiket: newTiket,
      tanggal: formData.tanggal,
      namaPelapor: formData.namaPelapor || 'Anonim',
      kategoriPelapor: formData.kategoriPelapor,
      madrasahId: formData.madrasahId,
      madrasahNama: selM?.nama || '',
      jenisPengaduan: formData.jenisPengaduan,
      isiPengaduan: formData.isiPengaduan,
      bukti: null,
      status: 'Masuk',
      tindakLanjut: '',
      tanggalPenyelesaian: null,
      petugasTindakLanjut: '',
    }]);
    setTiket(newTiket);
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div className="min-h-screen bg-green-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-2xl shadow-xl p-8 max-w-md text-center">
          <CheckCircle className="w-16 h-16 text-green-600 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-gray-800 mb-2">Pengaduan Terkirim!</h2>
          <p className="text-gray-600 mb-4">Pengaduan Anda telah diterima dan akan segera ditindaklanjuti.</p>
          <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-4">
            <p className="text-sm text-gray-600">Nomor Tiket Anda:</p>
            <p className="text-2xl font-bold text-kemenag-green font-mono">{tiket}</p>
            <p className="text-xs text-gray-500 mt-1">Simpan nomor ini untuk tracking status</p>
          </div>
          <button onClick={() => { setSubmitted(false); setFormData({ tanggal: new Date().toISOString().split('T')[0], namaPelapor: '', kategoriPelapor: 'Masyarakat', madrasahId: '', jenisPengaduan: 'Pelayanan', isiPengaduan: '' }); }} className="btn-primary">
            Buat Pengaduan Lagi
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-green-50 py-8 px-4">
      <div className="max-w-2xl mx-auto">
        <div className="bg-kemenag-green text-white rounded-t-2xl p-6 text-center">
          <h1 className="text-xl font-bold">KANAL PENGADUAN MASYARAKAT</h1>
          <p className="text-green-200 text-sm mt-1">SI-PANDU ZI MADRASAH</p>
          <p className="text-green-100 text-xs mt-2">Sampaikan pengaduan Anda secara aman dan rahasia</p>
        </div>

        <form onSubmit={handleSubmit} className="bg-white rounded-b-2xl shadow-xl p-6 space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Nama Pelapor (boleh dikosongkan)</label>
            <input type="text" value={formData.namaPelapor} onChange={(e) => setFormData({...formData, namaPelapor: e.target.value})} className="input-field" placeholder="Anonim jika dikosongkan" />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Kategori Pelapor *</label>
              <select value={formData.kategoriPelapor} onChange={(e) => setFormData({...formData, kategoriPelapor: e.target.value})} className="input-field" required>
                <option value="Siswa">Siswa</option>
                <option value="Orang Tua">Orang Tua</option>
                <option value="Guru">Guru</option>
                <option value="Masyarakat">Masyarakat</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Jenis Pengaduan *</label>
              <select value={formData.jenisPengaduan} onChange={(e) => setFormData({...formData, jenisPengaduan: e.target.value})} className="input-field" required>
                <option value="Pelayanan">Pelayanan</option>
                <option value="Fasilitas">Fasilitas</option>
                <option value="SDM">SDM</option>
                <option value="Keuangan">Keuangan</option>
                <option value="Lainnya">Lainnya</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Nama Madrasah *</label>
            <select value={formData.madrasahId} onChange={(e) => setFormData({...formData, madrasahId: e.target.value})} className="input-field" required>
              <option value="">Pilih Madrasah</option>
              {madrasah.map(m => <option key={m.id} value={m.id}>{m.nama}</option>)}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Isi Pengaduan *</label>
            <textarea value={formData.isiPengaduan} onChange={(e) => setFormData({...formData, isiPengaduan: e.target.value})} className="input-field" rows="4" placeholder="Jelaskan pengaduan Anda secara detail..." required />
          </div>

          <button type="submit" className="btn-primary w-full py-3 text-base">
            Kirim Pengaduan
          </button>

          <p className="text-xs text-gray-400 text-center">Pengaduan Anda akan dijaga kerahasiaannya dan ditindaklanjuti sesuai prosedur.</p>
        </form>
      </div>
    </div>
  );
}
