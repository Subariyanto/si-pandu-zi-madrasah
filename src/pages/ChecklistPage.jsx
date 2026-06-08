import { useState } from 'react';
import { useData } from '../context/DataContext';
import { useAuth } from '../context/AuthContext';
import { ziAreas } from '../data/sampleData';
import { OPSI_PER_INDIKATOR } from '../data/opsiChecklist';
import { hitungCapaianMadrasah, getKategoriCapaian } from '../utils/helpers';
import { Save, ChevronDown, ChevronUp } from 'lucide-react';

const OPSI_CATATAN_DEFAULT = [
  'Dokumen sudah lengkap dan sesuai standar',
  'Dokumen ada tetapi belum diperbarui sesuai tahun berjalan',
  'Belum ada bukti fisik, perlu segera dilengkapi',
  'Implementasi sudah berjalan namun belum terdokumentasi',
  'Sudah baik, pertahankan dan tingkatkan kualitasnya',
];

const OPSI_KETERANGAN_DEFAULT = [
  'Dokumen tersedia di lemari arsip madrasah',
  'Sudah diunggah di website/media sosial madrasah',
  'Masih dalam proses penyusunan oleh tim',
  'Terdokumentasi dalam notulen rapat',
  'Belum tersedia, dijadwalkan minggu depan',
];

const OPSI_REKOMENDASI_DEFAULT = [
  'Segera lengkapi dokumen bukti dukung sesuai indikator',
  'Lakukan sosialisasi ulang kepada seluruh warga madrasah',
  'Buat tim khusus untuk menyiapkan eviden yang belum ada',
  'Dokumentasikan seluruh kegiatan yang sudah berjalan',
  'Lakukan evaluasi internal dan perbaikan dalam 2 minggu',
];

function getOpsi(areaKey, idx, field) {
  const areaOpsi = OPSI_PER_INDIKATOR[areaKey];
  if (areaOpsi && areaOpsi[idx] && areaOpsi[idx][field]) {
    return areaOpsi[idx][field];
  }
  // fallback
  if (field === 'keterangan') return OPSI_KETERANGAN_DEFAULT;
  if (field === 'catatan') return OPSI_CATATAN_DEFAULT;
  return OPSI_REKOMENDASI_DEFAULT;
}

export default function ChecklistPage() {
  const { checklist, setChecklist, madrasah } = useData();
  const { user } = useAuth();
  const [selectedMadrasah, setSelectedMadrasah] = useState('');
  const [expandedArea, setExpandedArea] = useState(null);

  // Filter madrasah based on role
  let availableMadrasah = madrasah;
  if (user.role === 'pengawas') availableMadrasah = madrasah.filter(m => m.pengawasId === user.pengawasId);
  if (user.role === 'madrasah') availableMadrasah = madrasah.filter(m => m.id === user.madrasahId);

  const currentChecklist = checklist.find(c => c.madrasahId === selectedMadrasah);
  const capaian = currentChecklist ? hitungCapaianMadrasah(currentChecklist.data) : null;

  const handleStatusChange = (areaKey, indikatorIdx, status) => {
    const skor = status === 'ada' ? 100 : status === 'proses' ? 50 : 0;
    setChecklist(prev => prev.map(c => {
      if (c.madrasahId !== selectedMadrasah) return c;
      const newData = { ...c.data };
      newData[areaKey] = [...newData[areaKey]];
      newData[areaKey][indikatorIdx] = { ...newData[areaKey][indikatorIdx], status, skor };
      return { ...c, data: newData };
    }));
  };

  const handleFieldChange = (areaKey, indikatorIdx, field, value) => {
    setChecklist(prev => prev.map(c => {
      if (c.madrasahId !== selectedMadrasah) return c;
      const newData = { ...c.data };
      newData[areaKey] = [...newData[areaKey]];
      newData[areaKey][indikatorIdx] = { ...newData[areaKey][indikatorIdx], [field]: value };
      return { ...c, data: newData };
    }));
  };

  const initChecklist = () => {
    const emptyData = {};
    ziAreas.forEach(area => {
      emptyData[area.id] = area.indikator.map(() => ({
        status: 'tidak', keterangan: '', skor: 0, catatan: '', rekomendasi: ''
      }));
    });
    setChecklist(prev => [...prev, { id: crypto.randomUUID(), madrasahId: selectedMadrasah, data: emptyData }]);
  };

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-gray-800 dark:text-white">Checklist Eviden Zona Integritas</h1>

      {/* Select Madrasah */}
      <div className="card">
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Pilih Madrasah</label>
        <select value={selectedMadrasah} onChange={(e) => setSelectedMadrasah(e.target.value)} className="input-field max-w-md">
          <option value="">-- Pilih Madrasah --</option>
          {availableMadrasah.map(m => <option key={m.id} value={m.id}>{m.nama} ({m.jenjang})</option>)}
        </select>
      </div>

      {selectedMadrasah && !currentChecklist && (
        <div className="card text-center">
          <p className="text-gray-500 mb-4">Belum ada checklist untuk madrasah ini.</p>
          <button onClick={initChecklist} className="btn-primary">Buat Checklist Baru</button>
        </div>
      )}

      {selectedMadrasah && currentChecklist && (
        <>
          {/* Summary */}
          <div className="card">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <div>
                <h3 className="text-lg font-semibold text-gray-800 dark:text-white">Ringkasan Capaian</h3>
                <p className="text-sm text-gray-500">Total Nilai: <span className="font-bold text-xl text-kemenag-green">{capaian.total.toFixed(1)}%</span></p>
              </div>
              <div>
                {capaian && (
                  <span className={`px-4 py-2 rounded-full text-sm font-medium ${getKategoriCapaian(capaian.total).color}`}>
                    {getKategoriCapaian(capaian.total).label}
                  </span>
                )}
              </div>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3 mt-4">
              {ziAreas.map((area, idx) => {
                const areaVal = capaian?.areas[area.id] || 0;
                const kat = getKategoriCapaian(areaVal);
                return (
                  <div key={area.id} className="text-center p-3 rounded-lg bg-gray-50 dark:bg-gray-700">
                    <p className="text-xs text-gray-500 dark:text-gray-400">Area {idx + 1}</p>
                    <p className="text-lg font-bold text-gray-800 dark:text-white">{areaVal.toFixed(0)}%</p>
                    <p className={`text-xs px-1 py-0.5 rounded ${kat.color}`}>{kat.label}</p>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Areas */}
          {ziAreas.map((area, areaIdx) => {
            const areaKey = area.id;
            const isExpanded = expandedArea === areaKey;
            const areaData = currentChecklist.data[areaKey] || [];
            const areaAvg = areaData.length > 0 ? areaData.reduce((s, i) => s + i.skor, 0) / areaData.length : 0;

            return (
              <div key={areaKey} className="card">
                <button
                  onClick={() => setExpandedArea(isExpanded ? null : areaKey)}
                  className="w-full flex items-center justify-between"
                >
                  <div className="text-left">
                    <h3 className="text-base font-semibold text-gray-800 dark:text-white">
                      Area {areaIdx + 1}: {area.nama}
                    </h3>
                    <p className="text-sm text-gray-500">Rata-rata: {areaAvg.toFixed(0)}%</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getKategoriCapaian(areaAvg).color}`}>
                      {areaAvg.toFixed(0)}%
                    </span>
                    {isExpanded ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                  </div>
                </button>

                {isExpanded && (
                  <div className="mt-4 space-y-4">
                    {area.indikator.map((indikator, idx) => {
                      const item = areaData[idx] || { status: 'tidak', keterangan: '', skor: 0, catatan: '', rekomendasi: '' };
                      return (
                        <div key={idx} className="p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                          <p className="font-medium text-gray-800 dark:text-white mb-3">{idx + 1}. {indikator}</p>
                          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                            <div>
                              <label className="block text-xs text-gray-500 mb-1">Status</label>
                              <select
                                value={item.status}
                                onChange={(e) => handleStatusChange(areaKey, idx, e.target.value)}
                                className="input-field text-sm"
                              >
                                <option value="ada">Ada (100)</option>
                                <option value="proses">Dalam Proses (50)</option>
                                <option value="tidak">Tidak Ada (0)</option>
                              </select>
                            </div>
                            <div>
                              <label className="block text-xs text-gray-500 mb-1">Keterangan</label>
                              <select
                                onChange={(e) => { if (e.target.value) handleFieldChange(areaKey, idx, 'keterangan', e.target.value); }}
                                className="input-field text-sm mb-1"
                                value=""
                              >
                                <option value="">-- Pilih contoh keterangan --</option>
                                {getOpsi(areaKey, idx, 'keterangan').map((o, i) => <option key={i} value={o}>{o}</option>)}
                              </select>
                              <input
                                type="text"
                                value={item.keterangan}
                                onChange={(e) => handleFieldChange(areaKey, idx, 'keterangan', e.target.value)}
                                className="input-field text-sm"
                                placeholder="Pilih di atas atau ketik manual..."
                              />
                            </div>
                            <div>
                              <label className="block text-xs text-gray-500 mb-1">Skor</label>
                              <input type="text" value={item.skor} readOnly className="input-field text-sm bg-gray-100" />
                            </div>
                          </div>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mt-3">
                            <div>
                              <label className="block text-xs text-gray-500 mb-1">Catatan Pengawas</label>
                              <select
                                onChange={(e) => { if (e.target.value) handleFieldChange(areaKey, idx, 'catatan', e.target.value); }}
                                className="input-field text-sm mb-1"
                                value=""
                              >
                                <option value="">-- Pilih contoh catatan --</option>
                                {getOpsi(areaKey, idx, 'catatan').map((o, i) => <option key={i} value={o}>{o}</option>)}
                              </select>
                              <input
                                type="text"
                                value={item.catatan}
                                onChange={(e) => handleFieldChange(areaKey, idx, 'catatan', e.target.value)}
                                className="input-field text-sm"
                                placeholder="Pilih di atas atau ketik manual..."
                              />
                            </div>
                            <div>
                              <label className="block text-xs text-gray-500 mb-1">Rekomendasi Tindak Lanjut</label>
                              <select
                                onChange={(e) => { if (e.target.value) handleFieldChange(areaKey, idx, 'rekomendasi', e.target.value); }}
                                className="input-field text-sm mb-1"
                                value=""
                              >
                                <option value="">-- Pilih contoh rekomendasi --</option>
                                {getOpsi(areaKey, idx, 'rekomendasi').map((o, i) => <option key={i} value={o}>{o}</option>)}
                              </select>
                              <input
                                type="text"
                                value={item.rekomendasi}
                                onChange={(e) => handleFieldChange(areaKey, idx, 'rekomendasi', e.target.value)}
                                className="input-field text-sm"
                                placeholder="Pilih di atas atau ketik manual..."
                              />
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>
            );
          })}
        </>
      )}
    </div>
  );
}
