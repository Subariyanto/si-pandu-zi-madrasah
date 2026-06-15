// Sample data for the application
import { v4 as uuidv4 } from 'uuid';

export const defaultUsers = [
  { id: '1', email: 'admin@zipokjawas.id', password: '@riyant1970', role: 'admin', name: 'Administrator' },
  { id: '2', email: 'ketua@zipokjawas.id', password: 'ketua123', role: 'ketua', name: 'H. Sulaiman, M.Pd.I' },
  { id: '3', email: 'pengawas@zipokjawas.id', password: 'pengawas123', role: 'pengawas', name: 'Ahmad Fauzi, S.Pd.I', pengawasId: 'p1' },
  { id: '4', email: 'madrasah@zipokjawas.id', password: 'madrasah123', role: 'madrasah', name: 'Hj. Fatimah, S.Ag', madrasahId: 'm1' },
];

export const defaultPengawas = [
  {
    id: 'p1',
    nama: 'Ahmad Fauzi, S.Pd.I',
    nip: '197501152003121004',
    nuptk: '1234567890123456',
    pangkat: 'Pembina / IV-a',
    jabatan: 'Pengawas Madrasah Muda',
    wilayah: 'Kecamatan Banjar',
    hp: '081234567890',
    email: 'ahmadfauzi@kemenag.go.id',
    foto: null,
    status: 'aktif'
  },
  {
    id: 'p2',
    nama: 'Siti Aminah, M.Pd',
    nip: '198003202005012003',
    nuptk: '2345678901234567',
    pangkat: 'Penata Tk.I / III-d',
    jabatan: 'Pengawas Madrasah Muda',
    wilayah: 'Kecamatan Martapura',
    hp: '082345678901',
    email: 'sitiaminah@kemenag.go.id',
    foto: null,
    status: 'aktif'
  },
  {
    id: 'p3',
    nama: 'Muhammad Hasan, M.Pd.I',
    nip: '197808102002121003',
    nuptk: '3456789012345678',
    pangkat: 'Pembina / IV-a',
    jabatan: 'Pengawas Madrasah Madya',
    wilayah: 'Kecamatan Gambut',
    hp: '083456789012',
    email: 'muhammadhasan@kemenag.go.id',
    foto: null,
    status: 'aktif'
  },
];

export const defaultMadrasah = [
  {
    id: 'm1',
    nama: 'MI Al-Ikhlas',
    nsm: '111263020001',
    npsn: '60723001',
    jenjang: 'MI',
    statusMadrasah: 'Swasta',
    kepalaMadrasah: 'Hj. Fatimah, S.Ag',
    hpKepala: '085678901234',
    email: 'mi.alikhlas@gmail.com',
    alamat: 'Jl. Masjid No. 10',
    kecamatan: 'Kecamatan Banjar',
    pengawasId: 'p1',
    pengawasNama: 'Ahmad Fauzi, S.Pd.I',
    jumlahGuru: 15,
    jumlahSiswa: 210,
    statusZI: 'Proses'
  },
  {
    id: 'm2',
    nama: 'MTs Nurul Huda',
    nsm: '121263020002',
    npsn: '60723002',
    jenjang: 'MTs',
    statusMadrasah: 'Swasta',
    kepalaMadrasah: 'H. Abdul Rahman, S.Pd.I',
    hpKepala: '086789012345',
    email: 'mts.nurulhuda@gmail.com',
    alamat: 'Jl. Pendidikan No. 5',
    kecamatan: 'Kecamatan Martapura',
    pengawasId: 'p2',
    pengawasNama: 'Siti Aminah, M.Pd',
    jumlahGuru: 25,
    jumlahSiswa: 350,
    statusZI: 'Siap Evaluasi'
  },
  {
    id: 'm3',
    nama: 'MA Darussalam',
    nsm: '131263020003',
    npsn: '60723003',
    jenjang: 'MA',
    statusMadrasah: 'Swasta',
    kepalaMadrasah: 'Drs. H. Mahmud, M.Pd',
    hpKepala: '087890123456',
    email: 'ma.darussalam@gmail.com',
    alamat: 'Jl. Pesantren No. 15',
    kecamatan: 'Kecamatan Gambut',
    pengawasId: 'p3',
    pengawasNama: 'Muhammad Hasan, M.Pd.I',
    jumlahGuru: 30,
    jumlahSiswa: 280,
    statusZI: 'Proses'
  },
  {
    id: 'm4',
    nama: 'RA Al-Hidayah',
    nsm: '101263020004',
    npsn: '60723004',
    jenjang: 'RA',
    statusMadrasah: 'Swasta',
    kepalaMadrasah: 'Hj. Nurhasanah, S.Pd.I',
    hpKepala: '088901234567',
    email: 'ra.alhidayah@gmail.com',
    alamat: 'Jl. Melati No. 3',
    kecamatan: 'Kecamatan Banjar',
    pengawasId: 'p1',
    pengawasNama: 'Ahmad Fauzi, S.Pd.I',
    jumlahGuru: 8,
    jumlahSiswa: 65,
    statusZI: 'Belum Mulai'
  },
  {
    id: 'm5',
    nama: 'MI Raudatul Jannah',
    nsm: '111263020005',
    npsn: '60723005',
    jenjang: 'MI',
    statusMadrasah: 'Swasta',
    kepalaMadrasah: 'Ahmad Ridwan, S.Pd.I',
    hpKepala: '089012345678',
    email: 'mi.raudatuljannah@gmail.com',
    alamat: 'Jl. Dahlia No. 7',
    kecamatan: 'Kecamatan Martapura',
    pengawasId: 'p2',
    pengawasNama: 'Siti Aminah, M.Pd',
    jumlahGuru: 12,
    jumlahSiswa: 180,
    statusZI: 'Proses'
  },
];

export const ziAreas = [
  {
    id: 'area1',
    nama: 'Manajemen Perubahan',
    indikator: [
      'Tim kerja ZI telah dibentuk',
      'Dokumen rencana kerja ZI tersedia',
      'Sosialisasi ZI telah dilakukan',
      'Agen perubahan ditetapkan',
      'Budaya kerja integritas dilaksanakan',
    ]
  },
  {
    id: 'area2',
    nama: 'Penataan Tata Laksana',
    indikator: [
      'SOP layanan tersedia',
      'Alur layanan dipublikasikan',
      'Layanan berbasis digital tersedia',
      'Informasi layanan mudah diakses',
      'Evaluasi SOP dilakukan',
    ]
  },
  {
    id: 'area3',
    nama: 'Penataan Manajemen SDM',
    indikator: [
      'Data SDM tersedia',
      'Pembagian tugas jelas',
      'Disiplin pegawai dipantau',
      'Pengembangan kompetensi dilakukan',
      'Penilaian kinerja dilaksanakan',
    ]
  },
  {
    id: 'area4',
    nama: 'Penguatan Akuntabilitas',
    indikator: [
      'Perencanaan kinerja tersedia',
      'Target kinerja madrasah ditetapkan',
      'Laporan kinerja dibuat',
      'Evaluasi kinerja dilakukan',
      'Tindak lanjut evaluasi tersedia',
    ]
  },
  {
    id: 'area5',
    nama: 'Penguatan Pengawasan',
    indikator: [
      'Pengendalian gratifikasi disosialisasikan',
      'Kanal pengaduan tersedia',
      'Benturan kepentingan dicegah',
      'Pengawasan internal dilakukan',
      'Tindak lanjut pengaduan terdokumentasi',
    ]
  },
  {
    id: 'area6',
    nama: 'Peningkatan Kualitas Pelayanan Publik',
    indikator: [
      'Standar layanan tersedia',
      'Maklumat layanan dipublikasikan',
      'Survei kepuasan masyarakat dilakukan',
      'Pengaduan masyarakat ditindaklanjuti',
      'Inovasi pelayanan madrasah tersedia',
    ]
  },
];

export const defaultChecklist = [
  {
    id: uuidv4(),
    madrasahId: 'm1',
    data: {
      area1: [
        { status: 'ada', keterangan: 'SK Tim ZI', skor: 100, catatan: '', rekomendasi: '' },
        { status: 'ada', keterangan: 'Rencana kerja lengkap', skor: 100, catatan: '', rekomendasi: '' },
        { status: 'proses', keterangan: 'Sedang disosialisasikan', skor: 50, catatan: '', rekomendasi: 'Percepat sosialisasi' },
        { status: 'ada', keterangan: 'SK Agen Perubahan', skor: 100, catatan: '', rekomendasi: '' },
        { status: 'proses', keterangan: 'Mulai diterapkan', skor: 50, catatan: '', rekomendasi: '' },
      ],
      area2: [
        { status: 'ada', keterangan: 'SOP lengkap', skor: 100, catatan: '', rekomendasi: '' },
        { status: 'ada', keterangan: 'Dipasang di papan informasi', skor: 100, catatan: '', rekomendasi: '' },
        { status: 'tidak', keterangan: '', skor: 0, catatan: 'Belum ada layanan digital', rekomendasi: 'Buat layanan digital' },
        { status: 'ada', keterangan: 'Website madrasah', skor: 100, catatan: '', rekomendasi: '' },
        { status: 'proses', keterangan: 'Sedang dievaluasi', skor: 50, catatan: '', rekomendasi: '' },
      ],
      area3: [
        { status: 'ada', keterangan: 'Data lengkap di SIMPATIKA', skor: 100, catatan: '', rekomendasi: '' },
        { status: 'ada', keterangan: 'SK Pembagian Tugas', skor: 100, catatan: '', rekomendasi: '' },
        { status: 'ada', keterangan: 'Finger print', skor: 100, catatan: '', rekomendasi: '' },
        { status: 'proses', keterangan: 'Pelatihan berjalan', skor: 50, catatan: '', rekomendasi: '' },
        { status: 'ada', keterangan: 'SKP tersedia', skor: 100, catatan: '', rekomendasi: '' },
      ],
      area4: [
        { status: 'ada', keterangan: 'RKM tersedia', skor: 100, catatan: '', rekomendasi: '' },
        { status: 'ada', keterangan: 'Target ditetapkan', skor: 100, catatan: '', rekomendasi: '' },
        { status: 'proses', keterangan: 'Sedang disusun', skor: 50, catatan: '', rekomendasi: '' },
        { status: 'ada', keterangan: 'Evaluasi rutin', skor: 100, catatan: '', rekomendasi: '' },
        { status: 'ada', keterangan: 'Tindak lanjut ada', skor: 100, catatan: '', rekomendasi: '' },
      ],
      area5: [
        { status: 'ada', keterangan: 'Sosialisasi gratifikasi', skor: 100, catatan: '', rekomendasi: '' },
        { status: 'ada', keterangan: 'Kotak pengaduan', skor: 100, catatan: '', rekomendasi: '' },
        { status: 'proses', keterangan: 'Sedang diatur', skor: 50, catatan: '', rekomendasi: '' },
        { status: 'ada', keterangan: 'PTSP berjalan', skor: 100, catatan: '', rekomendasi: '' },
        { status: 'ada', keterangan: 'Dokumentasi lengkap', skor: 100, catatan: '', rekomendasi: '' },
      ],
      area6: [
        { status: 'ada', keterangan: 'Standar layanan dipasang', skor: 100, catatan: '', rekomendasi: '' },
        { status: 'ada', keterangan: 'Maklumat dipublikasikan', skor: 100, catatan: '', rekomendasi: '' },
        { status: 'ada', keterangan: 'Survei dilakukan', skor: 100, catatan: '', rekomendasi: '' },
        { status: 'proses', keterangan: 'Sedang ditindaklanjuti', skor: 50, catatan: '', rekomendasi: '' },
        { status: 'proses', keterangan: 'Inovasi dalam proses', skor: 50, catatan: '', rekomendasi: '' },
      ],
    }
  },
  {
    id: uuidv4(),
    madrasahId: 'm2',
    data: {
      area1: [
        { status: 'ada', keterangan: 'SK Tim lengkap', skor: 100, catatan: '', rekomendasi: '' },
        { status: 'ada', keterangan: 'Rencana kerja ada', skor: 100, catatan: '', rekomendasi: '' },
        { status: 'ada', keterangan: 'Sosialisasi selesai', skor: 100, catatan: '', rekomendasi: '' },
        { status: 'ada', keterangan: 'Agen perubahan aktif', skor: 100, catatan: '', rekomendasi: '' },
        { status: 'ada', keterangan: 'Budaya integritas baik', skor: 100, catatan: '', rekomendasi: '' },
      ],
      area2: [
        { status: 'ada', keterangan: 'SOP lengkap', skor: 100, catatan: '', rekomendasi: '' },
        { status: 'ada', keterangan: 'Alur jelas', skor: 100, catatan: '', rekomendasi: '' },
        { status: 'ada', keterangan: 'E-layanan tersedia', skor: 100, catatan: '', rekomendasi: '' },
        { status: 'ada', keterangan: 'Informasi mudah diakses', skor: 100, catatan: '', rekomendasi: '' },
        { status: 'ada', keterangan: 'Evaluasi rutin', skor: 100, catatan: '', rekomendasi: '' },
      ],
      area3: [
        { status: 'ada', keterangan: 'Data lengkap', skor: 100, catatan: '', rekomendasi: '' },
        { status: 'ada', keterangan: 'Tugas jelas', skor: 100, catatan: '', rekomendasi: '' },
        { status: 'ada', keterangan: 'Disiplin baik', skor: 100, catatan: '', rekomendasi: '' },
        { status: 'ada', keterangan: 'Pelatihan rutin', skor: 100, catatan: '', rekomendasi: '' },
        { status: 'ada', keterangan: 'SKP lengkap', skor: 100, catatan: '', rekomendasi: '' },
      ],
      area4: [
        { status: 'ada', keterangan: 'Perencanaan ada', skor: 100, catatan: '', rekomendasi: '' },
        { status: 'ada', keterangan: 'Target jelas', skor: 100, catatan: '', rekomendasi: '' },
        { status: 'ada', keterangan: 'Laporan lengkap', skor: 100, catatan: '', rekomendasi: '' },
        { status: 'ada', keterangan: 'Evaluasi dilakukan', skor: 100, catatan: '', rekomendasi: '' },
        { status: 'proses', keterangan: 'Sedang ditindaklanjuti', skor: 50, catatan: '', rekomendasi: '' },
      ],
      area5: [
        { status: 'ada', keterangan: 'Sosialisasi lengkap', skor: 100, catatan: '', rekomendasi: '' },
        { status: 'ada', keterangan: 'Kanal tersedia', skor: 100, catatan: '', rekomendasi: '' },
        { status: 'ada', keterangan: 'Pencegahan baik', skor: 100, catatan: '', rekomendasi: '' },
        { status: 'ada', keterangan: 'Pengawasan rutin', skor: 100, catatan: '', rekomendasi: '' },
        { status: 'ada', keterangan: 'Tindak lanjut ada', skor: 100, catatan: '', rekomendasi: '' },
      ],
      area6: [
        { status: 'ada', keterangan: 'Standar ada', skor: 100, catatan: '', rekomendasi: '' },
        { status: 'ada', keterangan: 'Maklumat ada', skor: 100, catatan: '', rekomendasi: '' },
        { status: 'ada', keterangan: 'Survei rutin', skor: 100, catatan: '', rekomendasi: '' },
        { status: 'ada', keterangan: 'Pengaduan ditindaklanjuti', skor: 100, catatan: '', rekomendasi: '' },
        { status: 'proses', keterangan: 'Inovasi berjalan', skor: 50, catatan: '', rekomendasi: '' },
      ],
    }
  },
];

export const defaultPendampingan = [
  {
    id: uuidv4(),
    tanggal: '2024-03-15',
    pengawasId: 'p1',
    pengawasNama: 'Ahmad Fauzi, S.Pd.I',
    madrasahId: 'm1',
    madrasahNama: 'MI Al-Ikhlas',
    jenis: 'Offline',
    materi: 'Penyusunan dokumen Area 1 - Manajemen Perubahan',
    permasalahan: 'Tim ZI belum memahami tugas masing-masing',
    rekomendasi: 'Adakan rapat koordinasi tim ZI secara rutin',
    tindakLanjut: 'Rapat koordinasi dijadwalkan setiap Senin',
    target: '2024-04-15',
    status: 'Selesai',
  },
  {
    id: uuidv4(),
    tanggal: '2024-04-10',
    pengawasId: 'p2',
    pengawasNama: 'Siti Aminah, M.Pd',
    madrasahId: 'm2',
    madrasahNama: 'MTs Nurul Huda',
    jenis: 'Online',
    materi: 'Review kelengkapan eviden Area 5 - Penguatan Pengawasan',
    permasalahan: 'Dokumentasi pengaduan belum tertata',
    rekomendasi: 'Buat buku register pengaduan dan tindak lanjut',
    tindakLanjut: 'Sedang menyusun buku register',
    target: '2024-05-10',
    status: 'Proses',
  },
];

export const defaultSurvei = [
  {
    id: uuidv4(),
    madrasahId: 'm1',
    madrasahNama: 'MI Al-Ikhlas',
    tanggal: '2024-03-20',
    kategoriResponden: 'Orang Tua',
    namaResponden: 'Budi Santoso',
    jawaban: [4, 4, 5, 4, 4, 3, 4, 4],
    kritikSaran: 'Pelayanan sudah baik, tingkatkan kebersihan',
  },
  {
    id: uuidv4(),
    madrasahId: 'm1',
    madrasahNama: 'MI Al-Ikhlas',
    tanggal: '2024-03-21',
    kategoriResponden: 'Siswa',
    namaResponden: '',
    jawaban: [5, 4, 5, 4, 5, 5, 4, 5],
    kritikSaran: '',
  },
  {
    id: uuidv4(),
    madrasahId: 'm2',
    madrasahNama: 'MTs Nurul Huda',
    tanggal: '2024-04-05',
    kategoriResponden: 'Masyarakat',
    namaResponden: 'Hj. Salmah',
    jawaban: [4, 5, 5, 4, 4, 4, 5, 5],
    kritikSaran: 'Sangat puas dengan layanan madrasah',
  },
];

export const defaultPengaduan = [
  {
    id: uuidv4(),
    tiket: 'ADU-2024-001',
    tanggal: '2024-03-10',
    namaPelapor: 'Anonim',
    kategoriPelapor: 'Masyarakat',
    madrasahId: 'm1',
    madrasahNama: 'MI Al-Ikhlas',
    jenisPengaduan: 'Pelayanan',
    isiPengaduan: 'Proses pendaftaran siswa baru terlalu lama',
    bukti: null,
    status: 'Selesai',
    tindakLanjut: 'Telah diperbaiki alur pendaftaran dengan sistem online',
    tanggalPenyelesaian: '2024-03-20',
    petugasTindakLanjut: 'Ahmad Fauzi, S.Pd.I',
  },
  {
    id: uuidv4(),
    tiket: 'ADU-2024-002',
    tanggal: '2024-04-15',
    namaPelapor: 'Ibu Rahmah',
    kategoriPelapor: 'Orang Tua',
    madrasahId: 'm2',
    madrasahNama: 'MTs Nurul Huda',
    jenisPengaduan: 'Fasilitas',
    isiPengaduan: 'Toilet siswa perlu perbaikan',
    bukti: null,
    status: 'Diproses',
    tindakLanjut: 'Sedang dalam proses perbaikan',
    tanggalPenyelesaian: null,
    petugasTindakLanjut: 'Siti Aminah, M.Pd',
  },
];

export const defaultKartuKendali = [
  {
    id: uuidv4(),
    bulan: 'Maret',
    tahun: 2024,
    madrasahId: 'm1',
    madrasahNama: 'MI Al-Ikhlas',
    pengawasId: 'p1',
    pengawasNama: 'Ahmad Fauzi, S.Pd.I',
    capaian: 'Area 1 dan 2 sudah 80% lengkap',
    kendala: 'Keterbatasan SDM untuk menyusun dokumen',
    rekomendasi: 'Libatkan guru senior dalam penyusunan dokumen',
    tindakLanjut: 'Guru senior ditugaskan membantu',
    targetBerikutnya: 'Melengkapi Area 3 dan 4',
    status: 'Kuning',
  },
  {
    id: uuidv4(),
    bulan: 'April',
    tahun: 2024,
    madrasahId: 'm2',
    madrasahNama: 'MTs Nurul Huda',
    pengawasId: 'p2',
    pengawasNama: 'Siti Aminah, M.Pd',
    capaian: 'Semua area sudah 90% lengkap',
    kendala: 'Inovasi pelayanan masih dalam pengembangan',
    rekomendasi: 'Fokus pada penyelesaian inovasi',
    tindakLanjut: 'Tim inovasi dibentuk',
    targetBerikutnya: 'Finalisasi semua eviden',
    status: 'Hijau',
  },
];

export const defaultKlinik = [
  {
    id: uuidv4(),
    tanggal: '2024-03-25',
    madrasahId: 'm1',
    madrasahNama: 'MI Al-Ikhlas',
    namaPeserta: 'Hj. Fatimah, S.Ag',
    jabatanPeserta: 'Kepala Madrasah',
    topik: 'Penyusunan dokumen Area 2 - Tata Laksana',
    permasalahan: 'Kesulitan membuat SOP layanan yang sesuai standar',
    solusi: 'Diberikan contoh template SOP dan pendampingan langsung',
    tindakLanjut: 'Menyusun SOP berdasarkan template',
    jadwalMonitoring: '2024-04-25',
    dokumentasi: null,
  },
];

export const surveiQuestions = [
  'Kemudahan mendapatkan informasi layanan madrasah',
  'Kecepatan pelayanan',
  'Keramahan petugas layanan',
  'Keterbukaan informasi',
  'Kesesuaian layanan dengan kebutuhan',
  'Kebersihan dan kenyamanan lingkungan layanan',
  'Kemudahan menyampaikan pengaduan',
  'Kepuasan umum terhadap layanan madrasah',
];
