import { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { supabase } from '../lib/supabase';
import { guardMutation } from '../lib/license';

const DataContext = createContext(null);

export function DataProvider({ children }) {
  const [pengawas, setPengawasState] = useState([]);
  const [madrasah, setMadrasahState] = useState([]);
  const [checklist, setChecklistState] = useState([]);
  const [pendampingan, setPendampinganState] = useState([]);
  const [survei, setSurveiState] = useState([]);
  const [pengaduan, setPengaduanState] = useState([]);
  const [kartuKendali, setKartuKendaliState] = useState([]);
  const [klinik, setKlinikState] = useState([]);
  const [eviden, setEvidenState] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch all data on mount
  useEffect(() => {
    fetchAllData();
  }, []);

  const fetchAllData = async () => {
    setLoading(true);
    try {
      const [pRes, mRes, cRes, pdRes, sRes, pgRes, kkRes, klRes, eRes] = await Promise.all([
        supabase.from('pengawas').select('*').order('nama'),
        supabase.from('madrasah').select('*').order('nama'),
        supabase.from('checklist').select('*'),
        supabase.from('pendampingan').select('*').order('tanggal', { ascending: false }),
        supabase.from('survei').select('*').order('tanggal', { ascending: false }),
        supabase.from('pengaduan').select('*').order('tanggal', { ascending: false }),
        supabase.from('kartu_kendali').select('*').order('tahun', { ascending: false }),
        supabase.from('klinik').select('*').order('tanggal', { ascending: false }),
        supabase.from('eviden').select('*').order('tanggal_upload', { ascending: false }),
      ]);

      if (pRes.data) setPengawasState(pRes.data.map(mapPengawas));
      if (mRes.data) setMadrasahState(mRes.data.map(mapMadrasah));
      if (cRes.data) setChecklistState(cRes.data.map(mapChecklist));
      if (pdRes.data) setPendampinganState(pdRes.data.map(mapPendampingan));
      if (sRes.data) setSurveiState(sRes.data.map(mapSurvei));
      if (pgRes.data) setPengaduanState(pgRes.data.map(mapPengaduan));
      if (kkRes.data) setKartuKendaliState(kkRes.data.map(mapKartuKendali));
      if (klRes.data) setKlinikState(klRes.data.map(mapKlinik));
      if (eRes.data) setEvidenState(eRes.data.map(mapEviden));
    } catch (err) {
      console.error('Error fetching data:', err);
    }
    setLoading(false);
  };

  // Mappers: snake_case (DB) -> camelCase (frontend)
  function mapPengawas(p) {
    return { id: p.id, nama: p.nama, nip: p.nip, nuptk: p.nuptk, pangkat: p.pangkat, jabatan: p.jabatan, wilayah: p.wilayah, hp: p.hp, email: p.email, foto: p.foto, status: p.status };
  }
  function mapMadrasah(m) {
    return { id: m.id, nama: m.nama, nsm: m.nsm, npsn: m.npsn, jenjang: m.jenjang, statusMadrasah: m.status_madrasah, kepalaMadrasah: m.kepala_madrasah, hpKepala: m.hp_kepala, email: m.email, alamat: m.alamat, kecamatan: m.kecamatan, pengawasId: m.pengawas_id, pengawasNama: m.pengawas_nama, jumlahGuru: m.jumlah_guru, jumlahSiswa: m.jumlah_siswa, statusZI: m.status_zi };
  }
  function mapChecklist(c) { return { id: c.id, madrasahId: c.madrasah_id, data: c.data }; }
  function mapPendampingan(p) {
    return { id: p.id, tanggal: p.tanggal, pengawasId: p.pengawas_id, pengawasNama: p.pengawas_nama, madrasahId: p.madrasah_id, madrasahNama: p.madrasah_nama, jenis: p.jenis, materi: p.materi, permasalahan: p.permasalahan, rekomendasi: p.rekomendasi, tindakLanjut: p.tindak_lanjut, target: p.target, status: p.status };
  }
  function mapSurvei(s) {
    return { id: s.id, madrasahId: s.madrasah_id, madrasahNama: s.madrasah_nama, tanggal: s.tanggal, kategoriResponden: s.kategori_responden, namaResponden: s.nama_responden, jawaban: s.jawaban, kritikSaran: s.kritik_saran };
  }
  function mapPengaduan(p) {
    return { id: p.id, tiket: p.tiket, tanggal: p.tanggal, namaPelapor: p.nama_pelapor, kategoriPelapor: p.kategori_pelapor, madrasahId: p.madrasah_id, madrasahNama: p.madrasah_nama, jenisPengaduan: p.jenis_pengaduan, isiPengaduan: p.isi_pengaduan, bukti: p.bukti, status: p.status, tindakLanjut: p.tindak_lanjut, tanggalPenyelesaian: p.tanggal_penyelesaian, petugasTindakLanjut: p.petugas_tindak_lanjut };
  }
  function mapKartuKendali(k) {
    return { id: k.id, bulan: k.bulan, tahun: k.tahun, madrasahId: k.madrasah_id, madrasahNama: k.madrasah_nama, pengawasId: k.pengawas_id, pengawasNama: k.pengawas_nama, capaian: k.capaian, kendala: k.kendala, rekomendasi: k.rekomendasi, tindakLanjut: k.tindak_lanjut, targetBerikutnya: k.target_berikutnya, status: k.status };
  }
  function mapKlinik(k) {
    return { id: k.id, tanggal: k.tanggal, madrasahId: k.madrasah_id, madrasahNama: k.madrasah_nama, namaPeserta: k.nama_peserta, jabatanPeserta: k.jabatan_peserta, topik: k.topik, permasalahan: k.permasalahan, solusi: k.solusi, tindakLanjut: k.tindak_lanjut, jadwalMonitoring: k.jadwal_monitoring, dokumentasi: k.dokumentasi };
  }
  function mapEviden(e) {
    return { id: e.id, madrasahId: e.madrasah_id, madrasahNama: e.madrasah_nama, areaId: e.area_id, areaName: e.area_name, indikator: e.indikator, jenisDoc: e.jenis_doc, file: e.file_url, fileName: e.file_name, keterangan: e.keterangan, statusVerifikasi: e.status_verifikasi, catatanVerifikator: e.catatan_verifikator, tanggalUpload: e.tanggal_upload };
  }

  // CRUD wrappers
  const setPengawas = useCallback(async (updater) => {
    if (typeof updater === 'function') {
      const newData = updater(pengawas);
      // Determine what changed
      const added = newData.filter(n => !pengawas.find(o => o.id === n.id));
      const removed = pengawas.filter(o => !newData.find(n => n.id === o.id));
      const updated = newData.filter(n => {
        const old = pengawas.find(o => o.id === n.id);
        return old && JSON.stringify(old) !== JSON.stringify(n);
      });

      for (const item of added) {
        await supabase.from('pengawas').insert({ nama: item.nama, nip: item.nip, nuptk: item.nuptk, pangkat: item.pangkat, jabatan: item.jabatan, wilayah: item.wilayah, hp: item.hp, email: item.email, foto: item.foto, status: item.status });
      }
      for (const item of removed) {
        await supabase.from('pengawas').delete().eq('id', item.id);
      }
      for (const item of updated) {
        await supabase.from('pengawas').update({ nama: item.nama, nip: item.nip, nuptk: item.nuptk, pangkat: item.pangkat, jabatan: item.jabatan, wilayah: item.wilayah, hp: item.hp, email: item.email, foto: item.foto, status: item.status, updated_at: new Date().toISOString() }).eq('id', item.id);
      }
      // Refetch
      const { data } = await supabase.from('pengawas').select('*').order('nama');
      if (data) setPengawasState(data.map(mapPengawas));
    }
  }, [pengawas]);

  const setMadrasah = useCallback(async (updater) => {
    if (typeof updater === 'function') {
      const newData = updater(madrasah);
      const added = newData.filter(n => !madrasah.find(o => o.id === n.id));
      const removed = madrasah.filter(o => !newData.find(n => n.id === o.id));
      const updated = newData.filter(n => {
        const old = madrasah.find(o => o.id === n.id);
        return old && JSON.stringify(old) !== JSON.stringify(n);
      });

      for (const item of added) {
        await supabase.from('madrasah').insert({ nama: item.nama, nsm: item.nsm, npsn: item.npsn, jenjang: item.jenjang, status_madrasah: item.statusMadrasah, kepala_madrasah: item.kepalaMadrasah, hp_kepala: item.hpKepala, email: item.email, alamat: item.alamat, kecamatan: item.kecamatan, pengawas_id: item.pengawasId || null, pengawas_nama: item.pengawasNama, jumlah_guru: item.jumlahGuru, jumlah_siswa: item.jumlahSiswa, status_zi: item.statusZI });
      }
      for (const item of removed) {
        await supabase.from('madrasah').delete().eq('id', item.id);
      }
      for (const item of updated) {
        await supabase.from('madrasah').update({ nama: item.nama, nsm: item.nsm, npsn: item.npsn, jenjang: item.jenjang, status_madrasah: item.statusMadrasah, kepala_madrasah: item.kepalaMadrasah, hp_kepala: item.hpKepala, email: item.email, alamat: item.alamat, kecamatan: item.kecamatan, pengawas_id: item.pengawasId || null, pengawas_nama: item.pengawasNama, jumlah_guru: item.jumlahGuru, jumlah_siswa: item.jumlahSiswa, status_zi: item.statusZI, updated_at: new Date().toISOString() }).eq('id', item.id);
      }
      const { data } = await supabase.from('madrasah').select('*').order('nama');
      if (data) setMadrasahState(data.map(mapMadrasah));
    }
  }, [madrasah]);

  const setChecklist = useCallback(async (updater) => {
    if (typeof updater === 'function') {
      const newData = updater(checklist);
      const added = newData.filter(n => !checklist.find(o => o.id === n.id));
      const updated = newData.filter(n => {
        const old = checklist.find(o => o.id === n.id);
        return old && JSON.stringify(old) !== JSON.stringify(n);
      });

      for (const item of added) {
        await supabase.from('checklist').insert({ madrasah_id: item.madrasahId, data: item.data });
      }
      for (const item of updated) {
        await supabase.from('checklist').update({ data: item.data, updated_at: new Date().toISOString() }).eq('id', item.id);
      }
      const { data } = await supabase.from('checklist').select('*');
      if (data) setChecklistState(data.map(mapChecklist));
    }
  }, [checklist]);

  const setPendampingan = useCallback(async (updater) => {
    if (typeof updater === 'function') {
      const newData = updater(pendampingan);
      const added = newData.filter(n => !pendampingan.find(o => o.id === n.id));
      const removed = pendampingan.filter(o => !newData.find(n => n.id === o.id));
      const updated = newData.filter(n => {
        const old = pendampingan.find(o => o.id === n.id);
        return old && JSON.stringify(old) !== JSON.stringify(n);
      });

      for (const item of added) {
        await supabase.from('pendampingan').insert({ tanggal: item.tanggal, pengawas_id: item.pengawasId || null, pengawas_nama: item.pengawasNama, madrasah_id: item.madrasahId || null, madrasah_nama: item.madrasahNama, jenis: item.jenis, materi: item.materi, permasalahan: item.permasalahan, rekomendasi: item.rekomendasi, tindak_lanjut: item.tindakLanjut, target: item.target || null, status: item.status });
      }
      for (const item of removed) {
        await supabase.from('pendampingan').delete().eq('id', item.id);
      }
      for (const item of updated) {
        await supabase.from('pendampingan').update({ tanggal: item.tanggal, pengawas_id: item.pengawasId || null, pengawas_nama: item.pengawasNama, madrasah_id: item.madrasahId || null, madrasah_nama: item.madrasahNama, jenis: item.jenis, materi: item.materi, permasalahan: item.permasalahan, rekomendasi: item.rekomendasi, tindak_lanjut: item.tindakLanjut, target: item.target || null, status: item.status }).eq('id', item.id);
      }
      const { data } = await supabase.from('pendampingan').select('*').order('tanggal', { ascending: false });
      if (data) setPendampinganState(data.map(mapPendampingan));
    }
  }, [pendampingan]);

  const setSurvei = useCallback(async (updater) => {
    if (typeof updater === 'function') {
      const newData = updater(survei);
      const added = newData.filter(n => !survei.find(o => o.id === n.id));

      for (const item of added) {
        await supabase.from('survei').insert({ madrasah_id: item.madrasahId || null, madrasah_nama: item.madrasahNama, tanggal: item.tanggal, kategori_responden: item.kategoriResponden, nama_responden: item.namaResponden, jawaban: item.jawaban, kritik_saran: item.kritikSaran });
      }
      const { data } = await supabase.from('survei').select('*').order('tanggal', { ascending: false });
      if (data) setSurveiState(data.map(mapSurvei));
    }
  }, [survei]);

  const setPengaduan = useCallback(async (updater) => {
    if (typeof updater === 'function') {
      const newData = updater(pengaduan);
      const added = newData.filter(n => !pengaduan.find(o => o.id === n.id));
      const removed = pengaduan.filter(o => !newData.find(n => n.id === o.id));
      const updated = newData.filter(n => {
        const old = pengaduan.find(o => o.id === n.id);
        return old && JSON.stringify(old) !== JSON.stringify(n);
      });

      for (const item of added) {
        await supabase.from('pengaduan').insert({ tiket: item.tiket, tanggal: item.tanggal, nama_pelapor: item.namaPelapor, kategori_pelapor: item.kategoriPelapor, madrasah_id: item.madrasahId || null, madrasah_nama: item.madrasahNama, jenis_pengaduan: item.jenisPengaduan, isi_pengaduan: item.isiPengaduan, bukti: item.bukti, status: item.status, tindak_lanjut: item.tindakLanjut, tanggal_penyelesaian: item.tanggalPenyelesaian || null, petugas_tindak_lanjut: item.petugasTindakLanjut });
      }
      for (const item of removed) {
        await supabase.from('pengaduan').delete().eq('id', item.id);
      }
      for (const item of updated) {
        await supabase.from('pengaduan').update({ status: item.status, tindak_lanjut: item.tindakLanjut, tanggal_penyelesaian: item.tanggalPenyelesaian || null, petugas_tindak_lanjut: item.petugasTindakLanjut }).eq('id', item.id);
      }
      const { data } = await supabase.from('pengaduan').select('*').order('tanggal', { ascending: false });
      if (data) setPengaduanState(data.map(mapPengaduan));
    }
  }, [pengaduan]);

  const setKartuKendali = useCallback(async (updater) => {
    if (typeof updater === 'function') {
      const newData = updater(kartuKendali);
      const added = newData.filter(n => !kartuKendali.find(o => o.id === n.id));
      const removed = kartuKendali.filter(o => !newData.find(n => n.id === o.id));
      const updated = newData.filter(n => {
        const old = kartuKendali.find(o => o.id === n.id);
        return old && JSON.stringify(old) !== JSON.stringify(n);
      });

      for (const item of added) {
        await supabase.from('kartu_kendali').insert({ bulan: item.bulan, tahun: item.tahun, madrasah_id: item.madrasahId || null, madrasah_nama: item.madrasahNama, pengawas_id: item.pengawasId || null, pengawas_nama: item.pengawasNama, capaian: item.capaian, kendala: item.kendala, rekomendasi: item.rekomendasi, tindak_lanjut: item.tindakLanjut, target_berikutnya: item.targetBerikutnya, status: item.status });
      }
      for (const item of removed) {
        await supabase.from('kartu_kendali').delete().eq('id', item.id);
      }
      for (const item of updated) {
        await supabase.from('kartu_kendali').update({ bulan: item.bulan, tahun: item.tahun, madrasah_id: item.madrasahId || null, madrasah_nama: item.madrasahNama, pengawas_id: item.pengawasId || null, pengawas_nama: item.pengawasNama, capaian: item.capaian, kendala: item.kendala, rekomendasi: item.rekomendasi, tindak_lanjut: item.tindakLanjut, target_berikutnya: item.targetBerikutnya, status: item.status }).eq('id', item.id);
      }
      const { data } = await supabase.from('kartu_kendali').select('*').order('tahun', { ascending: false });
      if (data) setKartuKendaliState(data.map(mapKartuKendali));
    }
  }, [kartuKendali]);

  const setKlinik = useCallback(async (updater) => {
    if (typeof updater === 'function') {
      const newData = updater(klinik);
      const added = newData.filter(n => !klinik.find(o => o.id === n.id));
      const removed = klinik.filter(o => !newData.find(n => n.id === o.id));
      const updated = newData.filter(n => {
        const old = klinik.find(o => o.id === n.id);
        return old && JSON.stringify(old) !== JSON.stringify(n);
      });

      for (const item of added) {
        await supabase.from('klinik').insert({ tanggal: item.tanggal, madrasah_id: item.madrasahId || null, madrasah_nama: item.madrasahNama, nama_peserta: item.namaPeserta, jabatan_peserta: item.jabatanPeserta, topik: item.topik, permasalahan: item.permasalahan, solusi: item.solusi, tindak_lanjut: item.tindakLanjut, jadwal_monitoring: item.jadwalMonitoring || null, dokumentasi: item.dokumentasi });
      }
      for (const item of removed) {
        await supabase.from('klinik').delete().eq('id', item.id);
      }
      for (const item of updated) {
        await supabase.from('klinik').update({ tanggal: item.tanggal, madrasah_id: item.madrasahId || null, madrasah_nama: item.madrasahNama, nama_peserta: item.namaPeserta, jabatan_peserta: item.jabatanPeserta, topik: item.topik, permasalahan: item.permasalahan, solusi: item.solusi, tindak_lanjut: item.tindakLanjut, jadwal_monitoring: item.jadwalMonitoring || null, dokumentasi: item.dokumentasi }).eq('id', item.id);
      }
      const { data } = await supabase.from('klinik').select('*').order('tanggal', { ascending: false });
      if (data) setKlinikState(data.map(mapKlinik));
    }
  }, [klinik]);

  const setEviden = useCallback(async (updater) => {
    if (typeof updater === 'function') {
      const newData = updater(eviden);
      const added = newData.filter(n => !eviden.find(o => o.id === n.id));
      const removed = eviden.filter(o => !newData.find(n => n.id === o.id));
      const updated = newData.filter(n => {
        const old = eviden.find(o => o.id === n.id);
        return old && JSON.stringify(old) !== JSON.stringify(n);
      });

      for (const item of added) {
        await supabase.from('eviden').insert({ madrasah_id: item.madrasahId || null, madrasah_nama: item.madrasahNama, area_id: item.areaId, area_name: item.areaName, indikator: item.indikator, jenis_doc: item.jenisDoc, file_url: item.file, file_name: item.fileName, keterangan: item.keterangan, status_verifikasi: item.statusVerifikasi, catatan_verifikator: item.catatanVerifikator });
      }
      for (const item of removed) {
        await supabase.from('eviden').delete().eq('id', item.id);
      }
      for (const item of updated) {
        await supabase.from('eviden').update({ status_verifikasi: item.statusVerifikasi, catatan_verifikator: item.catatanVerifikator }).eq('id', item.id);
      }
      const { data } = await supabase.from('eviden').select('*').order('tanggal_upload', { ascending: false });
      if (data) setEvidenState(data.map(mapEviden));
    }
  }, [eviden]);

  // License-guarded setters: refuse writes when trial expired
  const guard = (kind, setter) => (updater) => {
    if (!guardMutation(kind)) return;
    return setter(updater);
  };

  const value = {
    pengawas, setPengawas: guard('pengawas', setPengawas),
    madrasah, setMadrasah: guard('madrasah', setMadrasah),
    checklist, setChecklist: guard('checklist', setChecklist),
    pendampingan, setPendampingan: guard('pendampingan', setPendampingan),
    survei, setSurvei,  // public form, never gated
    pengaduan, setPengaduan,  // public form, never gated
    kartuKendali, setKartuKendali: guard('kartuKendali', setKartuKendali),
    klinik, setKlinik: guard('klinik', setKlinik),
    eviden, setEviden: guard('eviden', setEviden),
    loading,
    refetch: fetchAllData,
  };

  return (
    <DataContext.Provider value={value}>
      {children}
    </DataContext.Provider>
  );
}

export function useData() {
  const context = useContext(DataContext);
  if (!context) throw new Error('useData must be used within DataProvider');
  return context;
}
