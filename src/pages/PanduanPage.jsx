import { BookOpen } from 'lucide-react';

export default function PanduanPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3">
        <BookOpen className="text-kemenag-green" size={28} />
        <h1 className="text-2xl font-bold text-gray-800 dark:text-white">Panduan Penggunaan</h1>
      </div>

      <div className="card prose prose-sm max-w-none dark:prose-invert">
        <h2 className="text-kemenag-green">Tentang Aplikasi</h2>
        <p>SI-PANDU ZI adalah aplikasi berbasis web yang digunakan oleh Kelompok Kerja Pengawas Madrasah (Pokjawas) Kementerian Agama Kabupaten Jember untuk:</p>
        <ul>
          <li>Mengelola data pengawas dan madrasah binaan</li>
          <li>Mencatat kegiatan pendampingan Zona Integritas (ZI)</li>
          <li>Memantau progress checklist eviden ZI</li>
          <li>Menyimpan dokumen bukti (eviden)</li>
          <li>Memonitor capaian ZI setiap madrasah</li>
          <li>Menyediakan kanal survei kepuasan dan pengaduan publik</li>
        </ul>

        <h2 className="text-kemenag-green">Login</h2>
        <ul>
          <li>Masukkan <strong>Username</strong> atau <strong>NIP</strong> pada kolom yang tersedia</li>
          <li>Masukkan <strong>Password</strong></li>
          <li>Klik tombol <strong>Masuk</strong></li>
          <li>Akun dibuat oleh Admin (pengguna tidak bisa mendaftar sendiri)</li>
          <li>Jika lupa password, hubungi Admin untuk direset</li>
          <li>Sistem akan otomatis logout setelah 30 menit tidak aktif</li>
        </ul>

        <h2 className="text-kemenag-green">Role (Peran) Pengguna</h2>

        <h3>1. Admin</h3>
        <ul>
          <li>Mengelola semua data (pengawas, madrasah, pendampingan, dll.)</li>
          <li>Membuat akun login untuk pengawas dan kepala madrasah</li>
          <li>Import dan export data</li>
          <li>Melihat semua laporan dan rekapitulasi</li>
        </ul>

        <h3>2. Ketua Pokjawas</h3>
        <ul>
          <li>Melihat semua data pengawas dan madrasah</li>
          <li>Monitoring progress pendampingan ZI</li>
          <li>Melihat dashboard, laporan, dan rekapitulasi</li>
        </ul>

        <h3>3. Pengawas</h3>
        <ul>
          <li>Mengelola data madrasah binaannya</li>
          <li>Mencatat kegiatan pendampingan ZI</li>
          <li>Mengisi checklist eviden ZI</li>
          <li>Melihat kartu kendali madrasah binaannya</li>
          <li>Melakukan konsultasi via Klinik ZI</li>
        </ul>

        <h3>4. Madrasah (Kepala Madrasah/Operator)</h3>
        <ul>
          <li>Melihat data madrasahnya sendiri</li>
          <li>Mengupload eviden/dokumen bukti</li>
          <li>Melihat progress checklist dan kartu kendali</li>
        </ul>

        <h2 className="text-kemenag-green">Alur Kerja</h2>
        <ol>
          <li><strong>Admin menginput data pengawas</strong> — bisa manual atau import Excel</li>
          <li><strong>Admin membuatkan akun login untuk pengawas</strong> — Username/NIP + Password</li>
          <li><strong>Pengawas login dan menambah data madrasah binaan</strong></li>
          <li><strong>Admin membuatkan akun login untuk kepala madrasah</strong></li>
          <li><strong>Pengawas melakukan pendampingan</strong> — catat di menu Pendampingan ZI</li>
          <li><strong>Pengawas mengisi checklist eviden</strong></li>
          <li><strong>Madrasah mengupload eviden/dokumen</strong></li>
          <li><strong>Monitoring</strong> — via Dashboard, Kartu Kendali, dan Rekapitulasi Capaian</li>
        </ol>

        <h2 className="text-kemenag-green">Panduan Per Menu</h2>

        <h3>Dashboard</h3>
        <p>Halaman utama setelah login. Menampilkan statistik ringkasan (jumlah pengawas, madrasah, pendampingan, progress capaian ZI) dan grafik visual.</p>

        <h3>Data Pengawas</h3>
        <ul>
          <li><strong>Tambah data</strong> — klik tombol Tambah, isi formulir, lalu Simpan</li>
          <li><strong>Edit/Hapus</strong> — klik ikon pada baris data</li>
          <li><strong>Import Excel</strong> — upload file Excel sesuai template</li>
          <li><strong>Download Template</strong> — unduh template untuk import</li>
          <li><strong>Export PDF/Excel</strong> — unduh data</li>
        </ul>

        <h3>Data Madrasah</h3>
        <ul>
          <li>Tambah, edit, dan hapus data madrasah</li>
          <li>Filter berdasarkan jenjang (MI/MTs/MA) dan kecamatan</li>
          <li>Pengawas hanya melihat madrasah binaannya sendiri</li>
        </ul>

        <h3>Pendampingan ZI</h3>
        <p>Mencatat kegiatan kunjungan pendampingan. Isi tanggal, kegiatan, hasil, dan tindak lanjut.</p>

        <h3>Checklist Eviden ZI</h3>
        <p>Mencentang kelengkapan eviden per area perubahan:</p>
        <ul>
          <li>Manajemen Perubahan</li>
          <li>Penataan Tatalaksana</li>
          <li>Penataan Sistem Manajemen SDM</li>
          <li>Penguatan Akuntabilitas</li>
          <li>Penguatan Pengawasan</li>
          <li>Peningkatan Kualitas Pelayanan Publik</li>
        </ul>

        <h3>Upload Eviden</h3>
        <p>Upload dokumen bukti ZI. Pilih area perubahan, pilih file, lalu klik Upload.</p>

        <h3>Kartu Kendali</h3>
        <p>Monitoring progress pendampingan dan capaian ZI per madrasah.</p>

        <h3>Klinik ZI</h3>
        <p>Fasilitas konsultasi dan bimbingan terkait Zona Integritas.</p>

        <h3>Survei Kepuasan (Publik)</h3>
        <p>Bisa diakses tanpa login melalui QR Code. Mengumpulkan umpan balik kepuasan dari masyarakat.</p>

        <h3>Kanal Pengaduan (Publik)</h3>
        <p>Bisa diakses tanpa login melalui QR Code. Menerima pengaduan dari masyarakat (bisa anonim).</p>

        <h3>Laporan Triwulan</h3>
        <p>Menyusun dan mencetak laporan pendampingan ZI per triwulan. Bisa export PDF/Excel.</p>

        <h3>Rekapitulasi Capaian</h3>
        <p>Grafik dan ringkasan capaian ZI per madrasah. Perbandingan antar madrasah.</p>

        <h3>Cetak/Export</h3>
        <p>Mencetak atau mengunduh data dalam format PDF dan Excel.</p>

        <h3>Pengaturan Akun</h3>
        <ul>
          <li><strong>Admin:</strong> Buat akun baru, reset password, hapus akun</li>
          <li><strong>Semua pengguna:</strong> Ganti password sendiri</li>
        </ul>

        <h2 className="text-kemenag-green">Tips Penting</h2>
        <ul>
          <li>Gunakan browser terbaru (Chrome, Firefox, Edge)</li>
          <li>Jangan bagikan password ke orang lain</li>
          <li>Logout setelah selesai, terutama di komputer bersama</li>
          <li>Backup data secara berkala dengan fitur Export Excel</li>
          <li>Upload eviden secara rutin agar progress selalu terupdate</li>
          <li>Isi pendampingan segera setelah kunjungan</li>
          <li>Manfaatkan fitur filter untuk mempermudah pencarian data</li>
        </ul>

        <h2 className="text-kemenag-green">Kontak Bantuan</h2>
        <p>Jika mengalami kendala, hubungi <strong>Admin SI-PANDU ZI</strong> — Pokjawas Kemenag Kabupaten Jember. Sampaikan kendala beserta screenshot jika memungkinkan.</p>
      </div>
    </div>
  );
}
