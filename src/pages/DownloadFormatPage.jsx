import { useState } from 'react'
import { Download, FileText, ChevronDown, ChevronRight } from 'lucide-react'

const TEMPLATE_DATA = [
  {
    area: 1,
    nama: 'Manajemen Perubahan',
    dokumen: [
      { id: 'a1d1', nama: 'SK Tim Kerja Pembangunan ZI', indikator: 'Tim kerja ZI telah dibentuk' },
      { id: 'a1d2', nama: 'Rencana Kerja Pembangunan ZI', indikator: 'Dokumen rencana kerja ZI tersedia' },
      { id: 'a1d3', nama: 'Notulen Sosialisasi ZI + Daftar Hadir', indikator: 'Sosialisasi ZI telah dilakukan' },
      { id: 'a1d4', nama: 'SK Agen Perubahan', indikator: 'Agen perubahan ditetapkan' },
      { id: 'a1d5', nama: 'Laporan Kegiatan Budaya Integritas', indikator: 'Budaya kerja integritas dilaksanakan' },
    ]
  },
  {
    area: 2,
    nama: 'Penataan Tata Laksana',
    dokumen: [
      { id: 'a2d1', nama: 'Format SOP Layanan Madrasah', indikator: 'SOP layanan tersedia' },
      { id: 'a2d2', nama: 'Template Alur Layanan', indikator: 'Alur layanan dipublikasikan' },
      { id: 'a2d3', nama: 'Laporan Layanan Digital', indikator: 'Layanan berbasis digital tersedia' },
      { id: 'a2d4', nama: 'Format Informasi Layanan', indikator: 'Informasi layanan mudah diakses' },
      { id: 'a2d5', nama: 'Format Evaluasi SOP', indikator: 'Evaluasi SOP dilakukan' },
    ]
  },
  {
    area: 3,
    nama: 'Penataan Manajemen SDM',
    dokumen: [
      { id: 'a3d1', nama: 'Format Data SDM Madrasah', indikator: 'Data SDM tersedia' },
      { id: 'a3d2', nama: 'SK Pembagian Tugas', indikator: 'Pembagian tugas jelas' },
      { id: 'a3d3', nama: 'Rekap Kehadiran Pegawai', indikator: 'Disiplin pegawai dipantau' },
      { id: 'a3d4', nama: 'Laporan Pengembangan Kompetensi', indikator: 'Pengembangan kompetensi dilakukan' },
      { id: 'a3d5', nama: 'Format Penilaian Kinerja', indikator: 'Penilaian kinerja dilaksanakan' },
    ]
  },
  {
    area: 4,
    nama: 'Penguatan Akuntabilitas',
    dokumen: [
      { id: 'a4d1', nama: 'Format Perencanaan Kinerja (RKM)', indikator: 'Perencanaan kinerja tersedia' },
      { id: 'a4d2', nama: 'Penetapan Target Kinerja', indikator: 'Target kinerja madrasah ditetapkan' },
      { id: 'a4d3', nama: 'Format Laporan Kinerja Madrasah', indikator: 'Laporan kinerja dibuat' },
      { id: 'a4d4', nama: 'Format Evaluasi Kinerja', indikator: 'Evaluasi kinerja dilakukan' },
      { id: 'a4d5', nama: 'Format Tindak Lanjut Evaluasi', indikator: 'Tindak lanjut evaluasi tersedia' },
    ]
  },
  {
    area: 5,
    nama: 'Penguatan Pengawasan',
    dokumen: [
      { id: 'a5d1', nama: 'Format Sosialisasi Anti Gratifikasi', indikator: 'Pengendalian gratifikasi disosialisasikan' },
      { id: 'a5d2', nama: 'Format Kanal Pengaduan', indikator: 'Kanal pengaduan tersedia' },
      { id: 'a5d3', nama: 'Pakta Integritas / Pencegahan Benturan Kepentingan', indikator: 'Benturan kepentingan dicegah' },
      { id: 'a5d4', nama: 'Format Laporan Pengawasan Internal', indikator: 'Pengawasan internal dilakukan' },
      { id: 'a5d5', nama: 'Format Tindak Lanjut Pengaduan', indikator: 'Tindak lanjut pengaduan terdokumentasi' },
    ]
  },
  {
    area: 6,
    nama: 'Peningkatan Kualitas Pelayanan Publik',
    dokumen: [
      { id: 'a6d1', nama: 'Standar Pelayanan Madrasah', indikator: 'Standar layanan tersedia' },
      { id: 'a6d2', nama: 'Maklumat Pelayanan', indikator: 'Maklumat layanan dipublikasikan' },
      { id: 'a6d3', nama: 'Format Survei Kepuasan Masyarakat', indikator: 'Survei kepuasan masyarakat dilakukan' },
      { id: 'a6d4', nama: 'Format Tindak Lanjut Pengaduan Masyarakat', indikator: 'Pengaduan masyarakat ditindaklanjuti' },
      { id: 'a6d5', nama: 'Format Laporan Inovasi Pelayanan', indikator: 'Inovasi pelayanan madrasah tersedia' },
    ]
  },
]

function generateDocTemplate(doc, areaNama) {
  const today = new Date().toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' })
  
  const templates = {
    // Area 1
    a1d1: `
      <h2 style="text-align:center;font-weight:bold;">SURAT KEPUTUSAN<br/>KEPALA MADRASAH ......................................<br/>NOMOR: ......... TAHUN ..........</h2>
      <h3 style="text-align:center;">TENTANG<br/>PEMBENTUKAN TIM KERJA PEMBANGUNAN ZONA INTEGRITAS<br/>MENUJU WILAYAH BEBAS DARI KORUPSI (WBK)</h3>
      <p><b>Menimbang:</b></p>
      <ol type="a"><li>Bahwa dalam rangka percepatan pembangunan Zona Integritas menuju WBK/WBBM di lingkungan Kemenag Kab. Jember, perlu dibentuk Tim Kerja;</li><li>Bahwa untuk kelancaran pelaksanaan pembangunan ZI diperlukan penetapan melalui Surat Keputusan.</li></ol>
      <p><b>Mengingat:</b></p>
      <ol type="1"><li>Peraturan Menteri PAN-RB Nomor 90 Tahun 2021 tentang Pembangunan dan Evaluasi ZI;</li><li>KMA Nomor 582 Tahun 2022 tentang Pembangunan ZI di Kemenag.</li></ol>
      <p style="text-align:center;font-weight:bold;">MEMUTUSKAN</p>
      <p><b>Menetapkan:</b></p>
      <table border="1" cellpadding="6" cellspacing="0" width="100%">
        <tr><th>No</th><th>Nama</th><th>NIP</th><th>Jabatan dalam Tim</th><th>Keterangan</th></tr>
        <tr><td>1</td><td>...............................</td><td>...............................</td><td>Ketua</td><td>Kepala Madrasah</td></tr>
        <tr><td>2</td><td>...............................</td><td>...............................</td><td>Sekretaris</td><td></td></tr>
        <tr><td>3</td><td>...............................</td><td>...............................</td><td>Anggota</td><td></td></tr>
        <tr><td>4</td><td>...............................</td><td>...............................</td><td>Anggota</td><td></td></tr>
        <tr><td>5</td><td>...............................</td><td>...............................</td><td>Anggota</td><td></td></tr>
      </table>
      <br/><p>Ditetapkan di : ...............................<br/>Pada tanggal : ...............................<br/><br/></p>`,
    a1d2: `
      <h2 style="text-align:center;font-weight:bold;">RENCANA KERJA PEMBANGUNAN ZONA INTEGRITAS<br/>MADRASAH ......................................<br/>TAHUN ..........</h2>
      <table border="1" cellpadding="6" cellspacing="0" width="100%">
        <tr><th>No</th><th>Area Perubahan</th><th>Program/Kegiatan</th><th>Indikator Keberhasilan</th><th>Target</th><th>Waktu Pelaksanaan</th><th>Penanggung Jawab</th></tr>
        <tr><td>1</td><td>Manajemen Perubahan</td><td></td><td></td><td></td><td></td><td></td></tr>
        <tr><td>2</td><td>Penataan Tata Laksana</td><td></td><td></td><td></td><td></td><td></td></tr>
        <tr><td>3</td><td>Penataan Manajemen SDM</td><td></td><td></td><td></td><td></td><td></td></tr>
        <tr><td>4</td><td>Penguatan Akuntabilitas</td><td></td><td></td><td></td><td></td><td></td></tr>
        <tr><td>5</td><td>Penguatan Pengawasan</td><td></td><td></td><td></td><td></td><td></td></tr>
        <tr><td>6</td><td>Peningkatan Kualitas Pelayanan</td><td></td><td></td><td></td><td></td><td></td></tr>
      </table>`,
    a1d3: `
      <h2 style="text-align:center;font-weight:bold;">NOTULEN RAPAT SOSIALISASI<br/>PEMBANGUNAN ZONA INTEGRITAS<br/>MADRASAH ......................................</h2>
      <table border="0" cellpadding="4" width="100%">
        <tr><td width="150">Hari/Tanggal</td><td>: ...............................<br/></td></tr>
        <tr><td>Waktu</td><td>: ...............................<br/></td></tr>
        <tr><td>Tempat</td><td>: ...............................<br/></td></tr>
        <tr><td>Agenda</td><td>: Sosialisasi Pembangunan Zona Integritas</td></tr>
        <tr><td>Pimpinan Rapat</td><td>: ...............................<br/></td></tr>
        <tr><td>Jumlah Peserta</td><td>: ....... orang</td></tr>
      </table>
      <p><b>Pembahasan:</b></p>
      <ol><li>...............................</li><li>...............................</li><li>...............................</li></ol>
      <p><b>Kesimpulan/Keputusan:</b></p>
      <ol><li>...............................</li><li>...............................</li></ol>
      <br/><hr/><br/>
      <h3 style="text-align:center;">DAFTAR HADIR SOSIALISASI ZONA INTEGRITAS</h3>
      <table border="1" cellpadding="6" cellspacing="0" width="100%">
        <tr><th>No</th><th>Nama</th><th>NIP/NUPTK</th><th>Jabatan</th><th>Tanda Tangan</th></tr>
        <tr><td>1</td><td></td><td></td><td></td><td></td></tr>
        <tr><td>2</td><td></td><td></td><td></td><td></td></tr>
        <tr><td>3</td><td></td><td></td><td></td><td></td></tr>
        <tr><td>4</td><td></td><td></td><td></td><td></td></tr>
        <tr><td>5</td><td></td><td></td><td></td><td></td></tr>
        <tr><td>6</td><td></td><td></td><td></td><td></td></tr>
        <tr><td>7</td><td></td><td></td><td></td><td></td></tr>
        <tr><td>8</td><td></td><td></td><td></td><td></td></tr>
        <tr><td>9</td><td></td><td></td><td></td><td></td></tr>
        <tr><td>10</td><td></td><td></td><td></td><td></td></tr>
      </table>`,
    a1d4: `
      <h2 style="text-align:center;font-weight:bold;">SURAT KEPUTUSAN<br/>KEPALA MADRASAH ......................................<br/>NOMOR: ......... TAHUN ..........</h2>
      <h3 style="text-align:center;">TENTANG<br/>PENETAPAN AGEN PERUBAHAN<br/>PEMBANGUNAN ZONA INTEGRITAS</h3>
      <p><b>Menimbang:</b></p>
      <ol type="a"><li>Bahwa dalam rangka mendukung pembangunan ZI diperlukan agen perubahan yang bertugas sebagai role model;</li><li>Bahwa penetapan agen perubahan perlu ditetapkan melalui Surat Keputusan.</li></ol>
      <p style="text-align:center;font-weight:bold;">MEMUTUSKAN</p>
      <table border="1" cellpadding="6" cellspacing="0" width="100%">
        <tr><th>No</th><th>Nama</th><th>NIP</th><th>Jabatan</th><th>Peran sebagai Agen Perubahan</th></tr>
        <tr><td>1</td><td>...............................</td><td>...............................</td><td></td><td></td></tr>
        <tr><td>2</td><td>...............................</td><td>...............................</td><td></td><td></td></tr>
        <tr><td>3</td><td>...............................</td><td>...............................</td><td></td><td></td></tr>
      </table>
      <p><b>Tugas Agen Perubahan:</b></p>
      <ol><li>Menjadi role model integritas di lingkungan madrasah</li><li>Mendorong perubahan pola pikir dan budaya kerja</li><li>Mengembangkan inovasi pelayanan</li><li>Melaporkan pelaksanaan tugas kepada Kepala Madrasah</li></ol>`,
    a1d5: `
      <h2 style="text-align:center;font-weight:bold;">LAPORAN KEGIATAN BUDAYA KERJA INTEGRITAS<br/>MADRASAH ......................................<br/>TAHUN ..........</h2>
      <table border="1" cellpadding="6" cellspacing="0" width="100%">
        <tr><th>No</th><th>Kegiatan</th><th>Waktu Pelaksanaan</th><th>Peserta</th><th>Hasil/Output</th><th>Dokumentasi</th></tr>
        <tr><td>1</td><td>Apel Pagi/Ikrar Integritas</td><td></td><td></td><td></td><td>Ada/Tidak</td></tr>
        <tr><td>2</td><td>Pembinaan Karakter</td><td></td><td></td><td></td><td>Ada/Tidak</td></tr>
        <tr><td>3</td><td>Kegiatan Keagamaan Rutin</td><td></td><td></td><td></td><td>Ada/Tidak</td></tr>
        <tr><td>4</td><td>Penerapan Nilai Anti Korupsi</td><td></td><td></td><td></td><td>Ada/Tidak</td></tr>
        <tr><td>5</td><td>...............................</td><td></td><td></td><td></td><td></td></tr>
      </table>
      <p><b>Kesimpulan:</b><br/>...............................................................................................</p>`,
    // Area 2
    a2d1: `
      <h2 style="text-align:center;font-weight:bold;">STANDAR OPERASIONAL PROSEDUR (SOP)<br/>LAYANAN ......................................<br/>MADRASAH ......................................</h2>
      <table border="0" cellpadding="4" width="100%">
        <tr><td width="180">Nomor SOP</td><td>: ..................</td></tr>
        <tr><td>Tanggal Pembuatan</td><td>: ..................</td></tr>
        <tr><td>Tanggal Revisi</td><td>: ..................</td></tr>
        <tr><td>Tanggal Efektif</td><td>: ..................</td></tr>
        <tr><td>Disahkan oleh</td><td>: Kepala Madrasah</td></tr>
      </table>
      <p><b>1. Tujuan:</b><br/>...............................</p>
      <p><b>2. Ruang Lingkup:</b><br/>...............................</p>
      <p><b>3. Prosedur:</b></p>
      <table border="1" cellpadding="6" cellspacing="0" width="100%">
        <tr><th>No</th><th>Kegiatan</th><th>Pelaksana</th><th>Waktu</th><th>Output</th><th>Keterangan</th></tr>
        <tr><td>1</td><td></td><td></td><td></td><td></td><td></td></tr>
        <tr><td>2</td><td></td><td></td><td></td><td></td><td></td></tr>
        <tr><td>3</td><td></td><td></td><td></td><td></td><td></td></tr>
        <tr><td>4</td><td></td><td></td><td></td><td></td><td></td></tr>
        <tr><td>5</td><td></td><td></td><td></td><td></td><td></td></tr>
      </table>`,
    a2d2: `
      <h2 style="text-align:center;font-weight:bold;">ALUR LAYANAN<br/>MADRASAH ......................................</h2>
      <p><b>Jenis Layanan:</b> ...............................</p>
      <table border="1" cellpadding="6" cellspacing="0" width="100%">
        <tr><th>No</th><th>Tahap</th><th>Uraian Kegiatan</th><th>Petugas</th><th>Waktu</th><th>Persyaratan</th></tr>
        <tr><td>1</td><td>Pendaftaran</td><td></td><td></td><td></td><td></td></tr>
        <tr><td>2</td><td>Verifikasi</td><td></td><td></td><td></td><td></td></tr>
        <tr><td>3</td><td>Proses</td><td></td><td></td><td></td><td></td></tr>
        <tr><td>4</td><td>Output</td><td></td><td></td><td></td><td></td></tr>
        <tr><td>5</td><td>Penyerahan</td><td></td><td></td><td></td><td></td></tr>
      </table>
      <p><b>Catatan:</b> Alur layanan ini dipublikasikan melalui: [ ] Papan Informasi [ ] Website [ ] Media Sosial [ ] Lainnya: ............</p>`,
    a2d3: `
      <h2 style="text-align:center;font-weight:bold;">LAPORAN LAYANAN BERBASIS DIGITAL<br/>MADRASAH ......................................</h2>
      <table border="1" cellpadding="6" cellspacing="0" width="100%">
        <tr><th>No</th><th>Jenis Layanan Digital</th><th>Platform/Aplikasi</th><th>URL/Link</th><th>Status</th><th>Pengguna</th></tr>
        <tr><td>1</td><td>Pendaftaran Online</td><td></td><td></td><td>Aktif/Tidak</td><td></td></tr>
        <tr><td>2</td><td>Pengumuman Digital</td><td></td><td></td><td>Aktif/Tidak</td><td></td></tr>
        <tr><td>3</td><td>Rapor Online</td><td></td><td></td><td>Aktif/Tidak</td><td></td></tr>
        <tr><td>4</td><td>Pembayaran Digital</td><td></td><td></td><td>Aktif/Tidak</td><td></td></tr>
        <tr><td>5</td><td>...............................</td><td></td><td></td><td></td><td></td></tr>
      </table>`,
    a2d4: `
      <h2 style="text-align:center;font-weight:bold;">FORMAT INFORMASI LAYANAN<br/>MADRASAH ......................................</h2>
      <table border="1" cellpadding="6" cellspacing="0" width="100%">
        <tr><th>No</th><th>Jenis Layanan</th><th>Persyaratan</th><th>Waktu Penyelesaian</th><th>Biaya</th><th>Petugas</th><th>Media Publikasi</th></tr>
        <tr><td>1</td><td>Surat Keterangan</td><td></td><td></td><td>Gratis</td><td></td><td></td></tr>
        <tr><td>2</td><td>Legalisir Ijazah</td><td></td><td></td><td>Gratis</td><td></td><td></td></tr>
        <tr><td>3</td><td>Pendaftaran Siswa Baru</td><td></td><td></td><td></td><td></td><td></td></tr>
        <tr><td>4</td><td>Mutasi Siswa</td><td></td><td></td><td></td><td></td><td></td></tr>
        <tr><td>5</td><td>...............................</td><td></td><td></td><td></td><td></td><td></td></tr>
      </table>`,
    a2d5: `
      <h2 style="text-align:center;font-weight:bold;">FORMAT EVALUASI SOP LAYANAN<br/>MADRASAH ......................................</h2>
      <table border="0" cellpadding="4"><tr><td>Periode Evaluasi</td><td>: ..................</td></tr><tr><td>Evaluator</td><td>: ..................</td></tr></table>
      <table border="1" cellpadding="6" cellspacing="0" width="100%">
        <tr><th>No</th><th>Nama SOP</th><th>Tanggal Terbit</th><th>Masih Relevan</th><th>Perlu Revisi</th><th>Catatan Evaluasi</th></tr>
        <tr><td>1</td><td></td><td></td><td>Ya/Tidak</td><td>Ya/Tidak</td><td></td></tr>
        <tr><td>2</td><td></td><td></td><td>Ya/Tidak</td><td>Ya/Tidak</td><td></td></tr>
        <tr><td>3</td><td></td><td></td><td>Ya/Tidak</td><td>Ya/Tidak</td><td></td></tr>
      </table>
      <p><b>Rekomendasi Evaluasi:</b><br/>...............................</p>`,
    // Area 3
    a3d1: `
      <h2 style="text-align:center;font-weight:bold;">DATA SUMBER DAYA MANUSIA (SDM)<br/>MADRASAH ......................................</h2>
      <table border="1" cellpadding="6" cellspacing="0" width="100%">
        <tr><th>No</th><th>Nama</th><th>NIP/NUPTK</th><th>Pangkat/Gol</th><th>Jabatan</th><th>Kualifikasi</th><th>Sertifikasi</th><th>Status</th></tr>
        <tr><td>1</td><td></td><td></td><td></td><td></td><td></td><td>Ya/Tidak</td><td>PNS/Non-PNS</td></tr>
        <tr><td>2</td><td></td><td></td><td></td><td></td><td></td><td>Ya/Tidak</td><td></td></tr>
        <tr><td>3</td><td></td><td></td><td></td><td></td><td></td><td>Ya/Tidak</td><td></td></tr>
        <tr><td>4</td><td></td><td></td><td></td><td></td><td></td><td>Ya/Tidak</td><td></td></tr>
        <tr><td>5</td><td></td><td></td><td></td><td></td><td></td><td>Ya/Tidak</td><td></td></tr>
      </table>
      <p><b>Rekapitulasi:</b> Jumlah GTK: ....... | PNS: ....... | Non-PNS: ....... | Sertifikasi: .......</p>`,
    a3d2: `
      <h2 style="text-align:center;font-weight:bold;">SURAT KEPUTUSAN<br/>KEPALA MADRASAH ......................................<br/>NOMOR: ......... TAHUN ..........</h2>
      <h3 style="text-align:center;">TENTANG<br/>PEMBAGIAN TUGAS GURU DAN TENAGA KEPENDIDIKAN</h3>
      <table border="1" cellpadding="6" cellspacing="0" width="100%">
        <tr><th>No</th><th>Nama</th><th>NIP/NUPTK</th><th>Tugas Pokok</th><th>Tugas Tambahan</th><th>Jam/Minggu</th></tr>
        <tr><td>1</td><td></td><td></td><td></td><td></td><td></td></tr>
        <tr><td>2</td><td></td><td></td><td></td><td></td><td></td></tr>
        <tr><td>3</td><td></td><td></td><td></td><td></td><td></td></tr>
        <tr><td>4</td><td></td><td></td><td></td><td></td><td></td></tr>
        <tr><td>5</td><td></td><td></td><td></td><td></td><td></td></tr>
      </table>`,
    a3d3: `
      <h2 style="text-align:center;font-weight:bold;">REKAP KEHADIRAN PEGAWAI<br/>MADRASAH ......................................<br/>BULAN: .................. TAHUN: ..........</h2>
      <table border="1" cellpadding="6" cellspacing="0" width="100%">
        <tr><th>No</th><th>Nama</th><th>NIP</th><th>Hadir</th><th>Izin</th><th>Sakit</th><th>Tanpa Ket.</th><th>% Kehadiran</th></tr>
        <tr><td>1</td><td></td><td></td><td></td><td></td><td></td><td></td><td></td></tr>
        <tr><td>2</td><td></td><td></td><td></td><td></td><td></td><td></td><td></td></tr>
        <tr><td>3</td><td></td><td></td><td></td><td></td><td></td><td></td><td></td></tr>
        <tr><td>4</td><td></td><td></td><td></td><td></td><td></td><td></td><td></td></tr>
        <tr><td>5</td><td></td><td></td><td></td><td></td><td></td><td></td><td></td></tr>
      </table>
      <p><b>Sistem Pemantauan:</b> [ ] Fingerprint [ ] Manual [ ] Aplikasi</p>`,
    a3d4: `
      <h2 style="text-align:center;font-weight:bold;">LAPORAN PENGEMBANGAN KOMPETENSI SDM<br/>MADRASAH ......................................<br/>TAHUN ..........</h2>
      <table border="1" cellpadding="6" cellspacing="0" width="100%">
        <tr><th>No</th><th>Nama Peserta</th><th>Jenis Kegiatan</th><th>Penyelenggara</th><th>Waktu</th><th>Durasi (JP)</th><th>Sertifikat</th></tr>
        <tr><td>1</td><td></td><td>Pelatihan/Workshop/Bimtek</td><td></td><td></td><td></td><td>Ada/Tidak</td></tr>
        <tr><td>2</td><td></td><td></td><td></td><td></td><td></td><td></td></tr>
        <tr><td>3</td><td></td><td></td><td></td><td></td><td></td><td></td></tr>
        <tr><td>4</td><td></td><td></td><td></td><td></td><td></td><td></td></tr>
        <tr><td>5</td><td></td><td></td><td></td><td></td><td></td><td></td></tr>
      </table>`,
    a3d5: `
      <h2 style="text-align:center;font-weight:bold;">FORMAT PENILAIAN KINERJA PEGAWAI<br/>MADRASAH ......................................</h2>
      <table border="1" cellpadding="6" cellspacing="0" width="100%">
        <tr><th>No</th><th>Nama</th><th>NIP</th><th>SKP (60%)</th><th>Perilaku Kerja (40%)</th><th>Nilai Akhir</th><th>Predikat</th></tr>
        <tr><td>1</td><td></td><td></td><td></td><td></td><td></td><td></td></tr>
        <tr><td>2</td><td></td><td></td><td></td><td></td><td></td><td></td></tr>
        <tr><td>3</td><td></td><td></td><td></td><td></td><td></td><td></td></tr>
        <tr><td>4</td><td></td><td></td><td></td><td></td><td></td><td></td></tr>
        <tr><td>5</td><td></td><td></td><td></td><td></td><td></td><td></td></tr>
      </table>
      <p><b>Predikat:</b> Sangat Baik (>120) | Baik (110-120) | Cukup (80-109) | Kurang (&lt;80)</p>`,
    // Area 4
    a4d1: `
      <h2 style="text-align:center;font-weight:bold;">RENCANA KINERJA MADRASAH (RKM)<br/>MADRASAH ......................................<br/>TAHUN ..........</h2>
      <table border="1" cellpadding="6" cellspacing="0" width="100%">
        <tr><th>No</th><th>Sasaran Strategis</th><th>Indikator Kinerja</th><th>Target</th><th>Program/Kegiatan</th><th>Anggaran</th><th>Penanggung Jawab</th></tr>
        <tr><td>1</td><td></td><td></td><td></td><td></td><td></td><td></td></tr>
        <tr><td>2</td><td></td><td></td><td></td><td></td><td></td><td></td></tr>
        <tr><td>3</td><td></td><td></td><td></td><td></td><td></td><td></td></tr>
        <tr><td>4</td><td></td><td></td><td></td><td></td><td></td><td></td></tr>
        <tr><td>5</td><td></td><td></td><td></td><td></td><td></td><td></td></tr>
      </table>`,
    a4d2: `
      <h2 style="text-align:center;font-weight:bold;">PENETAPAN TARGET KINERJA MADRASAH<br/>MADRASAH ......................................<br/>TAHUN ..........</h2>
      <table border="1" cellpadding="6" cellspacing="0" width="100%">
        <tr><th>No</th><th>Aspek</th><th>Indikator</th><th>Kondisi Saat Ini</th><th>Target</th><th>Strategi Pencapaian</th></tr>
        <tr><td>1</td><td>Akademik</td><td></td><td></td><td></td><td></td></tr>
        <tr><td>2</td><td>Non-Akademik</td><td></td><td></td><td></td><td></td></tr>
        <tr><td>3</td><td>Mutu Layanan</td><td></td><td></td><td></td><td></td></tr>
        <tr><td>4</td><td>Tata Kelola</td><td></td><td></td><td></td><td></td></tr>
        <tr><td>5</td><td>SDM</td><td></td><td></td><td></td><td></td></tr>
      </table>`,
    a4d3: `
      <h2 style="text-align:center;font-weight:bold;">LAPORAN KINERJA MADRASAH<br/>MADRASAH ......................................<br/>PERIODE: ..........</h2>
      <table border="1" cellpadding="6" cellspacing="0" width="100%">
        <tr><th>No</th><th>Sasaran</th><th>Indikator</th><th>Target</th><th>Realisasi</th><th>Capaian (%)</th><th>Keterangan</th></tr>
        <tr><td>1</td><td></td><td></td><td></td><td></td><td></td><td></td></tr>
        <tr><td>2</td><td></td><td></td><td></td><td></td><td></td><td></td></tr>
        <tr><td>3</td><td></td><td></td><td></td><td></td><td></td><td></td></tr>
        <tr><td>4</td><td></td><td></td><td></td><td></td><td></td><td></td></tr>
      </table>
      <p><b>Analisis:</b><br/>...............................</p>
      <p><b>Kendala:</b><br/>...............................</p>`,
    a4d4: `
      <h2 style="text-align:center;font-weight:bold;">FORMAT EVALUASI KINERJA<br/>MADRASAH ......................................<br/>PERIODE: ..........</h2>
      <table border="1" cellpadding="6" cellspacing="0" width="100%">
        <tr><th>No</th><th>Program/Kegiatan</th><th>Target</th><th>Realisasi</th><th>% Capaian</th><th>Faktor Pendukung</th><th>Faktor Penghambat</th><th>Rekomendasi</th></tr>
        <tr><td>1</td><td></td><td></td><td></td><td></td><td></td><td></td><td></td></tr>
        <tr><td>2</td><td></td><td></td><td></td><td></td><td></td><td></td><td></td></tr>
        <tr><td>3</td><td></td><td></td><td></td><td></td><td></td><td></td><td></td></tr>
      </table>`,
    a4d5: `
      <h2 style="text-align:center;font-weight:bold;">FORMAT TINDAK LANJUT HASIL EVALUASI<br/>MADRASAH ......................................<br/>PERIODE: ..........</h2>
      <table border="1" cellpadding="6" cellspacing="0" width="100%">
        <tr><th>No</th><th>Temuan Evaluasi</th><th>Rekomendasi</th><th>Rencana Tindak Lanjut</th><th>Penanggung Jawab</th><th>Target Waktu</th><th>Status</th></tr>
        <tr><td>1</td><td></td><td></td><td></td><td></td><td></td><td>Selesai/Proses</td></tr>
        <tr><td>2</td><td></td><td></td><td></td><td></td><td></td><td></td></tr>
        <tr><td>3</td><td></td><td></td><td></td><td></td><td></td><td></td></tr>
      </table>`,
    // Area 5
    a5d1: `
      <h2 style="text-align:center;font-weight:bold;">LAPORAN SOSIALISASI PENGENDALIAN GRATIFIKASI<br/>MADRASAH ......................................</h2>
      <table border="0" cellpadding="4"><tr><td width="150">Tanggal</td><td>: ..................</td></tr><tr><td>Narasumber</td><td>: ..................</td></tr><tr><td>Peserta</td><td>: ....... orang</td></tr></table>
      <p><b>Materi Sosialisasi:</b></p>
      <ol><li>Pengertian dan bentuk-bentuk gratifikasi</li><li>Regulasi terkait gratifikasi</li><li>Mekanisme pelaporan gratifikasi</li><li>Sanksi pelanggaran</li></ol>
      <p><b>Media Sosialisasi:</b> [ ] Rapat [ ] Banner [ ] Leaflet [ ] WA Group [ ] Lainnya</p>
      <p><b>Dokumentasi:</b> [ ] Notulen [ ] Daftar Hadir [ ] Foto [ ] Video</p>`,
    a5d2: `
      <h2 style="text-align:center;font-weight:bold;">FORMAT KANAL PENGADUAN<br/>MADRASAH ......................................</h2>
      <p><b>Kanal Pengaduan yang Tersedia:</b></p>
      <table border="1" cellpadding="6" cellspacing="0" width="100%">
        <tr><th>No</th><th>Jenis Kanal</th><th>Detail/Alamat</th><th>PIC</th><th>Status</th></tr>
        <tr><td>1</td><td>Kotak Pengaduan Fisik</td><td>Lokasi: ............</td><td></td><td>Aktif/Tidak</td></tr>
        <tr><td>2</td><td>WhatsApp/Telepon</td><td>No: ............</td><td></td><td>Aktif/Tidak</td></tr>
        <tr><td>3</td><td>Email</td><td>............@............</td><td></td><td>Aktif/Tidak</td></tr>
        <tr><td>4</td><td>Website/Formulir Online</td><td>URL: ............</td><td></td><td>Aktif/Tidak</td></tr>
        <tr><td>5</td><td>Media Sosial</td><td>@............</td><td></td><td>Aktif/Tidak</td></tr>
      </table>
      <p><b>Mekanisme Penanganan:</b><br/>1. Pengaduan diterima → 2. Diverifikasi → 3. Ditindaklanjuti → 4. Dilaporkan</p>`,
    a5d3: `
      <h2 style="text-align:center;font-weight:bold;">PAKTA INTEGRITAS<br/>MADRASAH ......................................</h2>
      <p>Kami yang bertanda tangan di bawah ini, seluruh pegawai Madrasah ..............................., dengan ini menyatakan:</p>
      <ol><li>Tidak akan melakukan praktik Korupsi, Kolusi, dan Nepotisme (KKN)</li><li>Tidak akan menerima/memberi gratifikasi dalam bentuk apapun</li><li>Akan menghindari benturan kepentingan dalam pelaksanaan tugas</li><li>Akan melaporkan setiap potensi benturan kepentingan</li><li>Bersedia menerima sanksi apabila melanggar pakta ini</li></ol>
      <table border="1" cellpadding="6" cellspacing="0" width="100%">
        <tr><th>No</th><th>Nama</th><th>NIP</th><th>Jabatan</th><th>Tanda Tangan</th></tr>
        <tr><td>1</td><td></td><td></td><td></td><td></td></tr>
        <tr><td>2</td><td></td><td></td><td></td><td></td></tr>
        <tr><td>3</td><td></td><td></td><td></td><td></td></tr>
        <tr><td>4</td><td></td><td></td><td></td><td></td></tr>
        <tr><td>5</td><td></td><td></td><td></td><td></td></tr>
      </table>`,
    a5d4: `
      <h2 style="text-align:center;font-weight:bold;">LAPORAN PENGAWASAN INTERNAL<br/>MADRASAH ......................................<br/>PERIODE: ..........</h2>
      <table border="1" cellpadding="6" cellspacing="0" width="100%">
        <tr><th>No</th><th>Aspek Pengawasan</th><th>Temuan</th><th>Tingkat Risiko</th><th>Rekomendasi</th><th>Tindak Lanjut</th></tr>
        <tr><td>1</td><td>Pengelolaan Keuangan</td><td></td><td>Tinggi/Sedang/Rendah</td><td></td><td></td></tr>
        <tr><td>2</td><td>Kedisiplinan Pegawai</td><td></td><td></td><td></td><td></td></tr>
        <tr><td>3</td><td>Pelayanan Publik</td><td></td><td></td><td></td><td></td></tr>
        <tr><td>4</td><td>Pengadaan Barang/Jasa</td><td></td><td></td><td></td><td></td></tr>
        <tr><td>5</td><td>...............................</td><td></td><td></td><td></td><td></td></tr>
      </table>`,
    a5d5: `
      <h2 style="text-align:center;font-weight:bold;">FORMAT TINDAK LANJUT PENGADUAN<br/>MADRASAH ......................................</h2>
      <table border="1" cellpadding="6" cellspacing="0" width="100%">
        <tr><th>No</th><th>No. Tiket</th><th>Tanggal Masuk</th><th>Isi Pengaduan</th><th>Tindak Lanjut</th><th>Tanggal Selesai</th><th>Status</th></tr>
        <tr><td>1</td><td></td><td></td><td></td><td></td><td></td><td>Selesai/Proses</td></tr>
        <tr><td>2</td><td></td><td></td><td></td><td></td><td></td><td></td></tr>
        <tr><td>3</td><td></td><td></td><td></td><td></td><td></td><td></td></tr>
      </table>
      <p><b>Waktu Penyelesaian Rata-rata:</b> ....... hari kerja</p>`,
    // Area 6
    a6d1: `
      <h2 style="text-align:center;font-weight:bold;">STANDAR PELAYANAN<br/>MADRASAH ......................................</h2>
      <table border="1" cellpadding="6" cellspacing="0" width="100%">
        <tr><th>No</th><th>Jenis Layanan</th><th>Persyaratan</th><th>Prosedur</th><th>Waktu</th><th>Biaya</th><th>Produk Layanan</th></tr>
        <tr><td>1</td><td>Surat Keterangan Aktif</td><td></td><td></td><td></td><td>Gratis</td><td></td></tr>
        <tr><td>2</td><td>Legalisir Ijazah</td><td></td><td></td><td></td><td>Gratis</td><td></td></tr>
        <tr><td>3</td><td>Pendaftaran Siswa Baru</td><td></td><td></td><td></td><td></td><td></td></tr>
        <tr><td>4</td><td>Mutasi Siswa</td><td></td><td></td><td></td><td></td><td></td></tr>
        <tr><td>5</td><td>...............................</td><td></td><td></td><td></td><td></td><td></td></tr>
      </table>`,
    a6d2: `
      <h2 style="text-align:center;font-weight:bold;">MAKLUMAT PELAYANAN<br/>MADRASAH ......................................</h2>
      <div style="border:2px solid black;padding:20px;margin:20px;">
        <p style="text-align:center;font-weight:bold;font-size:14pt;">MAKLUMAT PELAYANAN</p>
        <p style="text-align:center;">"Dengan ini, kami menyatakan sanggup menyelenggarakan pelayanan sesuai standar pelayanan yang telah ditetapkan dan apabila tidak menepati janji ini, kami siap menerima sanksi sesuai peraturan perundang-undangan yang berlaku."</p>
        <br/>
        <p style="text-align:right;">..............................., .................. 20....<br/><br/>Kepala Madrasah,<br/><br/><br/><br/>............................................<br/>NIP. ................................</p>
      </div>
      <p><b>Dipublikasikan melalui:</b> [ ] Papan Informasi [ ] Website [ ] Banner [ ] Media Sosial</p>`,
    a6d3: `
      <h2 style="text-align:center;font-weight:bold;">SURVEI KEPUASAN MASYARAKAT (SKM)<br/>MADRASAH ......................................</h2>
      <p><b>Petunjuk:</b> Berikan penilaian 1-5 (1=Sangat Tidak Puas, 5=Sangat Puas)</p>
      <table border="1" cellpadding="6" cellspacing="0" width="100%">
        <tr><th>No</th><th>Unsur Pelayanan</th><th>1</th><th>2</th><th>3</th><th>4</th><th>5</th></tr>
        <tr><td>1</td><td>Persyaratan pelayanan mudah dipenuhi</td><td></td><td></td><td></td><td></td><td></td></tr>
        <tr><td>2</td><td>Prosedur pelayanan mudah dipahami</td><td></td><td></td><td></td><td></td><td></td></tr>
        <tr><td>3</td><td>Waktu penyelesaian layanan sesuai standar</td><td></td><td></td><td></td><td></td><td></td></tr>
        <tr><td>4</td><td>Biaya/tarif layanan wajar</td><td></td><td></td><td></td><td></td><td></td></tr>
        <tr><td>5</td><td>Produk layanan sesuai harapan</td><td></td><td></td><td></td><td></td><td></td></tr>
        <tr><td>6</td><td>Petugas kompeten dan profesional</td><td></td><td></td><td></td><td></td><td></td></tr>
        <tr><td>7</td><td>Petugas ramah dan sopan</td><td></td><td></td><td></td><td></td><td></td></tr>
        <tr><td>8</td><td>Sarana prasarana layanan memadai</td><td></td><td></td><td></td><td></td><td></td></tr>
      </table>
      <p><b>Kritik/Saran:</b><br/>...............................</p>
      <p><b>Nama Responden:</b> ............................... <b>Kategori:</b> [ ] Orang Tua [ ] Siswa [ ] Masyarakat</p>`,
    a6d4: `
      <h2 style="text-align:center;font-weight:bold;">FORMAT TINDAK LANJUT PENGADUAN MASYARAKAT<br/>MADRASAH ......................................</h2>
      <table border="1" cellpadding="6" cellspacing="0" width="100%">
        <tr><th>No</th><th>Tanggal</th><th>Sumber Pengaduan</th><th>Isi Pengaduan</th><th>Analisis</th><th>Tindak Lanjut</th><th>Hasil</th><th>Status</th></tr>
        <tr><td>1</td><td></td><td></td><td></td><td></td><td></td><td></td><td>Selesai/Proses</td></tr>
        <tr><td>2</td><td></td><td></td><td></td><td></td><td></td><td></td><td></td></tr>
        <tr><td>3</td><td></td><td></td><td></td><td></td><td></td><td></td><td></td></tr>
      </table>
      <p><b>Waktu Penyelesaian Rata-rata:</b> ....... hari kerja</p>
      <p><b>Tingkat Penyelesaian:</b> .......% dari total pengaduan</p>`,
    a6d5: `
      <h2 style="text-align:center;font-weight:bold;">LAPORAN INOVASI PELAYANAN<br/>MADRASAH ......................................</h2>
      <table border="0" cellpadding="4">
        <tr><td width="150">Nama Inovasi</td><td>: ...............................</td></tr>
        <tr><td>Bidang</td><td>: [ ] Akademik [ ] Administrasi [ ] Layanan Publik [ ] Lainnya</td></tr>
        <tr><td>Tahun Mulai</td><td>: ..........</td></tr>
      </table>
      <p><b>1. Latar Belakang/Permasalahan:</b><br/>...............................</p>
      <p><b>2. Ide/Solusi Inovasi:</b><br/>...............................</p>
      <p><b>3. Manfaat/Dampak:</b><br/>...............................</p>
      <p><b>4. Pihak yang Terlibat:</b><br/>...............................</p>
      <p><b>5. Keberlanjutan:</b><br/>...............................</p>
      <table border="1" cellpadding="6" cellspacing="0" width="100%">
        <tr><th>Indikator</th><th>Sebelum Inovasi</th><th>Sesudah Inovasi</th></tr>
        <tr><td></td><td></td><td></td></tr>
        <tr><td></td><td></td><td></td></tr>
      </table>`,
  }

  return templates[doc.id] || `<h2 style="text-align:center;font-weight:bold;">${doc.nama.toUpperCase()}<br/>MADRASAH ......................................</h2><p>Template dokumen ini belum tersedia secara detail. Silakan isi sesuai kebutuhan.</p>`
}

function downloadDoc(doc, areaNama) {
  const content = generateDocTemplate(doc, areaNama)
  const html = `
    <html xmlns:o='urn:schemas-microsoft-com:office:office' xmlns:w='urn:schemas-microsoft-com:office:word'>
    <head><meta charset="utf-8"><title>${doc.nama}</title>
    <style>
      @page { size: A4; margin: 0.8in 0.8in 0.8in 0.8in; }
      body { font-family: 'Times New Roman', serif; font-size: 12pt; margin: 0.8in; }
      table { border-collapse: collapse; width: 100%; margin: 10px 0; }
      th, td { border: 1px solid #000; padding: 6px 8px; font-size: 12pt; font-family: 'Times New Roman', serif; }
      th { background-color: #f0f0f0; font-weight: bold; text-align: center; }
      h2, h3 { margin: 10px 0; font-family: 'Times New Roman', serif; }
      p { margin: 5px 0; font-family: 'Times New Roman', serif; font-size: 12pt; }
      ol, ul { margin: 5px 0 5px 20px; font-family: 'Times New Roman', serif; font-size: 12pt; }
    </style></head>
    <body>
      <div style="text-align:center;margin-bottom:20px;">
        <p style="font-size:11pt;margin:0;">KEMENTERIAN AGAMA REPUBLIK INDONESIA</p>
        <p style="font-size:11pt;margin:0;">KANTOR KEMENTERIAN AGAMA KABUPATEN JEMBER</p>
        <p style="font-size:10pt;margin:0;">KELOMPOK KERJA PENGAWAS (POKJAWAS)</p>
        <hr style="border:2px solid black;margin:5px 0;"/>
        <hr style="border:1px solid black;margin:0 0 10px 0;"/>
      </div>
      ${content}
      <br/><br/>
      <table border="0" width="100%">
        <tr>
          <td width="50%" style="border:none;text-align:center;">Mengetahui,<br/>Pengawas Madrasah<br/><br/><br/><br/>............................................<br/>NIP. ................................</td>
          <td width="50%" style="border:none;text-align:center;">..............................., .................. 20....<br/>Kepala Madrasah,<br/><br/><br/><br/>............................................<br/>NIP. ................................</td>
        </tr>
      </table>
    </body></html>`

  const blob = new Blob([html], { type: 'application/msword' })
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = `${doc.nama.replace(/[/\\?%*:|"<>]/g, '-')}.doc`
  document.body.appendChild(a)
  a.click()
  document.body.removeChild(a)
  URL.revokeObjectURL(url)
}

export default function DownloadFormatPage() {
  const [expandedArea, setExpandedArea] = useState(null)

  const toggleArea = (areaIdx) => {
    setExpandedArea(expandedArea === areaIdx ? null : areaIdx)
  }

  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h1 className="text-2xl font-bold text-primary-800 dark:text-white">Download Format Dokumen</h1>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">Template dokumen eviden per area ZI — download, isi, lalu upload kembali</p>
        </div>
      </div>

      <div className="card bg-blue-50 dark:bg-blue-900/20 border-blue-200 dark:border-blue-800">
        <div className="flex items-start gap-3">
          <FileText className="w-5 h-5 text-blue-600 mt-0.5" />
          <div className="text-sm text-blue-800 dark:text-blue-200">
            <p className="font-medium">Petunjuk Penggunaan:</p>
            <ol className="list-decimal ml-4 mt-1 space-y-0.5">
              <li>Pilih area dan klik tombol download pada dokumen yang dibutuhkan</li>
              <li>Buka file .doc yang terdownload menggunakan Microsoft Word</li>
              <li>Isi kolom yang tersedia sesuai kondisi madrasah</li>
              <li>Simpan sebagai PDF lalu upload di menu "Upload Eviden"</li>
            </ol>
          </div>
        </div>
      </div>

      <div className="space-y-3">
        {TEMPLATE_DATA.map((area, areaIdx) => (
          <div key={area.area} className="card p-0 overflow-hidden">
            <button
              onClick={() => toggleArea(areaIdx)}
              className="w-full flex items-center justify-between p-4 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
            >
              <div className="flex items-center gap-3">
                <span className="bg-primary-800 text-white w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold">{area.area}</span>
                <span className="font-semibold text-gray-800 dark:text-white text-left">{area.nama}</span>
                <span className="text-xs text-gray-400">{area.dokumen.length} dokumen</span>
              </div>
              {expandedArea === areaIdx
                ? <ChevronDown className="w-5 h-5 text-gray-400" />
                : <ChevronRight className="w-5 h-5 text-gray-400" />
              }
            </button>
            
            {expandedArea === areaIdx && (
              <div className="border-t dark:border-gray-700 p-4 space-y-2 bg-gray-50 dark:bg-gray-800/50">
                {area.dokumen.map((doc) => (
                  <div key={doc.id} className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 p-3 bg-white dark:bg-gray-700 rounded-lg shadow-sm">
                    <div>
                      <p className="text-sm font-medium text-gray-800 dark:text-white">{doc.nama}</p>
                      <p className="text-xs text-gray-500 dark:text-gray-400">Indikator: {doc.indikator}</p>
                    </div>
                    <button
                      onClick={() => downloadDoc(doc, area.nama)}
                      className="btn-primary flex items-center gap-2 text-sm px-3 py-1.5 whitespace-nowrap"
                    >
                      <Download className="w-3.5 h-3.5" /> Download .doc
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}
