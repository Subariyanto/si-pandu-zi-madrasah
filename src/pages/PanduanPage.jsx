import { useState } from 'react';
import { BookOpen, LogIn, Users, School, ClipboardCheck, Upload, FileCheck, Stethoscope, MessageSquare, AlertTriangle, FileText, BarChart3, Printer, Settings, Shield, LayoutDashboard, ChevronDown, ChevronRight, CheckCircle2, Info, Lightbulb, Phone } from 'lucide-react';

const sections = [
  { id: 'tentang', label: 'Tentang Aplikasi', icon: Info },
  { id: 'login', label: 'Cara Login', icon: LogIn },
  { id: 'role', label: 'Role Pengguna', icon: Users },
  { id: 'alur', label: 'Alur Kerja', icon: CheckCircle2 },
  { id: 'menu', label: 'Panduan Per Menu', icon: LayoutDashboard },
  { id: 'tips', label: 'Tips Penting', icon: Lightbulb },
  { id: 'kontak', label: 'Kontak Bantuan', icon: Phone },
];

export default function PanduanPage() {
  const [activeSection, setActiveSection] = useState('tentang');
  const [expandedMenu, setExpandedMenu] = useState(null);

  const menuGuides = [
    { id: 'dashboard', icon: LayoutDashboard, title: 'Dashboard', desc: 'Halaman utama setelah login. Menampilkan statistik ringkasan dan grafik visual.', details: ['Jumlah pengawas, madrasah, pendampingan', 'Progress capaian ZI dalam bentuk grafik', 'Semua role bisa melihat (sesuai hak akses)'] },
    { id: 'pengawas', icon: Users, title: 'Data Pengawas', desc: 'Mengelola data pengawas madrasah.', details: ['Tambah data manual atau Import Excel', 'Download Template Excel untuk import', 'Edit dan Hapus data', 'Export ke PDF atau Excel'] },
    { id: 'madrasah', icon: School, title: 'Data Madrasah', desc: 'Mengelola data madrasah binaan.', details: ['Tambah, edit, hapus data madrasah', 'Filter berdasarkan jenjang (MI/MTs/MA)', 'Filter berdasarkan kecamatan', 'Pengawas hanya melihat madrasah binaannya'] },
    { id: 'pendampingan', icon: Shield, title: 'Pendampingan ZI', desc: 'Mencatat kegiatan kunjungan pendampingan.', details: ['Pilih madrasah yang didampingi', 'Isi tanggal, kegiatan, hasil, tindak lanjut', 'Riwayat pendampingan tersimpan per madrasah'] },
    { id: 'checklist', icon: ClipboardCheck, title: 'Checklist Eviden ZI', desc: 'Mencentang kelengkapan eviden per area perubahan.', details: ['Manajemen Perubahan', 'Penataan Tatalaksana', 'Penataan Sistem Manajemen SDM', 'Penguatan Akuntabilitas', 'Penguatan Pengawasan', 'Peningkatan Kualitas Pelayanan Publik'] },
    { id: 'upload', icon: Upload, title: 'Upload Eviden', desc: 'Upload dokumen bukti ZI.', details: ['Pilih area perubahan', 'Pilih file (PDF, JPG, PNG, DOC)', 'Klik Upload', 'Beri nama file yang jelas'] },
    { id: 'kartu', icon: FileCheck, title: 'Kartu Kendali', desc: 'Monitoring progress pendampingan dan capaian ZI.', details: ['Progress checklist eviden (persentase)', 'Status pendampingan per madrasah', 'Catatan tindak lanjut'] },
    { id: 'klinik', icon: Stethoscope, title: 'Klinik ZI', desc: 'Konsultasi dan bimbingan terkait Zona Integritas.', details: ['Ajukan pertanyaan/konsultasi', 'Riwayat konsultasi tersimpan'] },
    { id: 'survei', icon: MessageSquare, title: 'Survei Kepuasan', desc: 'Mengumpulkan umpan balik kepuasan (publik).', details: ['Bisa diakses tanpa login via QR Code', 'Hasil dilihat oleh Admin dan Ketua Pokjawas'] },
    { id: 'pengaduan', icon: AlertTriangle, title: 'Kanal Pengaduan', desc: 'Menerima pengaduan dari masyarakat (publik).', details: ['Bisa diakses tanpa login via QR Code', 'Bisa anonim', 'Ditindaklanjuti oleh tim'] },
    { id: 'laporan', icon: FileText, title: 'Laporan Triwulan', desc: 'Menyusun laporan pendampingan per triwulan.', details: ['Pilih periode triwulan', 'Cetak PDF atau Export Excel'] },
    { id: 'rekap', icon: BarChart3, title: 'Rekapitulasi Capaian', desc: 'Grafik dan ringkasan capaian ZI per madrasah.', details: ['Grafik progress per madrasah', 'Perbandingan antar madrasah', 'Filter per area perubahan'] },
    { id: 'cetak', icon: Printer, title: 'Cetak/Export', desc: 'Mencetak atau mengunduh data.', details: ['Export PDF dan Excel', 'Tersedia di berbagai menu'] },
    { id: 'pengaturan', icon: Settings, title: 'Pengaturan Akun', desc: 'Kelola akun dan password.', details: ['Admin: buat akun, reset password, hapus akun', 'Semua pengguna: ganti password sendiri'] },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-kemenag-green to-green-700 rounded-2xl p-6 text-white shadow-lg">
        <div className="flex items-center gap-3 mb-2">
          <BookOpen size={32} />
          <h1 className="text-2xl font-bold">Panduan Penggunaan</h1>
        </div>
        <p className="text-green-100 text-sm">SI-PANDU ZI — Sistem Pendampingan Pengawas Madrasah untuk Zona Integritas Madrasah</p>
        <p className="text-green-200 text-xs mt-1">Pokjawas Kemenag Kabupaten Jember</p>
      </div>

      {/* Navigation Tabs */}
      <div className="flex flex-wrap gap-2">
        {sections.map(s => {
          const Icon = s.icon;
          return (
            <button
              key={s.id}
              onClick={() => setActiveSection(s.id)}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                activeSection === s.id
                  ? 'bg-kemenag-green text-white shadow-md'
                  : 'bg-white dark:bg-gray-800 text-gray-600 dark:text-gray-300 hover:bg-green-50 dark:hover:bg-gray-700 border border-gray-200 dark:border-gray-600'
              }`}
            >
              <Icon size={16} />
              <span className="hidden sm:inline">{s.label}</span>
            </button>
          );
        })}
      </div>

      {/* Content */}
      <div className="card">
        {activeSection === 'tentang' && (
          <div className="space-y-4">
            <h2 className="text-xl font-bold text-kemenag-green flex items-center gap-2"><Info size={22} /> Tentang Aplikasi</h2>
            <div className="bg-green-50 dark:bg-green-900/20 rounded-xl p-5 border border-green-200 dark:border-green-800">
              <p className="text-gray-700 dark:text-gray-300 mb-3">SI-PANDU ZI adalah aplikasi berbasis web yang digunakan oleh Kelompok Kerja Pengawas Madrasah (Pokjawas) Kementerian Agama Kabupaten Jember untuk:</p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {[
                  'Mengelola data pengawas dan madrasah binaan',
                  'Mencatat kegiatan pendampingan ZI',
                  'Memantau progress checklist eviden ZI',
                  'Menyimpan dokumen bukti (eviden)',
                  'Memonitor capaian ZI setiap madrasah',
                  'Menyediakan kanal survei & pengaduan publik',
                ].map((item, i) => (
                  <div key={i} className="flex items-start gap-2">
                    <CheckCircle2 size={16} className="text-kemenag-green mt-0.5 flex-shrink-0" />
                    <span className="text-sm text-gray-600 dark:text-gray-400">{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {activeSection === 'login' && (
          <div className="space-y-4">
            <h2 className="text-xl font-bold text-kemenag-green flex items-center gap-2"><LogIn size={22} /> Cara Login</h2>
            <div className="bg-blue-50 dark:bg-blue-900/20 rounded-xl p-5 border border-blue-200 dark:border-blue-800">
              <div className="space-y-3">
                {[
                  { step: '1', text: 'Buka browser (Chrome, Firefox, Edge)' },
                  { step: '2', text: 'Ketik alamat: subariyanto.github.io/si-pandu-zi-madrasah/' },
                  { step: '3', text: 'Masukkan Username atau NIP' },
                  { step: '4', text: 'Masukkan Password' },
                  { step: '5', text: 'Klik tombol Masuk' },
                ].map((item, i) => (
                  <div key={i} className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-kemenag-green text-white flex items-center justify-center text-sm font-bold flex-shrink-0">{item.step}</div>
                    <span className="text-sm text-gray-700 dark:text-gray-300">{item.text}</span>
                  </div>
                ))}
              </div>
              <div className="mt-4 p-3 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg border border-yellow-200 dark:border-yellow-800">
                <p className="text-xs text-yellow-800 dark:text-yellow-300"><strong>⚠️ Catatan:</strong> Akun dibuat oleh Admin. Jika lupa password, hubungi Admin. Sistem otomatis logout setelah 30 menit tidak aktif.</p>
              </div>
            </div>
          </div>
        )}

        {activeSection === 'role' && (
          <div className="space-y-4">
            <h2 className="text-xl font-bold text-kemenag-green flex items-center gap-2"><Users size={22} /> Role (Peran) Pengguna</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {[
                { role: 'Admin', color: 'red', items: ['Mengelola semua data', 'Membuat akun login', 'Import & export data', 'Melihat semua laporan'] },
                { role: 'Ketua Pokjawas', color: 'purple', items: ['Melihat semua data', 'Monitoring progress ZI', 'Melihat dashboard & laporan'] },
                { role: 'Pengawas', color: 'blue', items: ['Kelola madrasah binaan', 'Catat pendampingan ZI', 'Isi checklist eviden', 'Konsultasi via Klinik ZI'] },
                { role: 'Madrasah', color: 'green', items: ['Lihat data madrasahnya', 'Upload eviden/dokumen', 'Lihat progress & kartu kendali'] },
              ].map((r, i) => (
                <div key={i} className={`rounded-xl p-4 border-2 border-${r.color}-200 dark:border-${r.color}-800 bg-${r.color}-50 dark:bg-${r.color}-900/20`}>
                  <h3 className={`font-bold text-${r.color}-700 dark:text-${r.color}-300 mb-2`}>{r.role}</h3>
                  <ul className="space-y-1">
                    {r.items.map((item, j) => (
                      <li key={j} className="flex items-start gap-2 text-sm text-gray-600 dark:text-gray-400">
                        <CheckCircle2 size={14} className={`text-${r.color}-500 mt-0.5 flex-shrink-0`} />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeSection === 'alur' && (
          <div className="space-y-4">
            <h2 className="text-xl font-bold text-kemenag-green flex items-center gap-2"><CheckCircle2 size={22} /> Alur Kerja Aplikasi</h2>
            <div className="relative">
              {[
                { step: '1', title: 'Admin input data pengawas', desc: 'Manual atau import dari Excel' },
                { step: '2', title: 'Admin buatkan akun pengawas', desc: 'Username/NIP + Password' },
                { step: '3', title: 'Pengawas tambah madrasah binaan', desc: 'Login → Data Madrasah → Tambah' },
                { step: '4', title: 'Admin buatkan akun madrasah', desc: 'Untuk kepala madrasah/operator' },
                { step: '5', title: 'Pengawas catat pendampingan', desc: 'Setelah kunjungan → menu Pendampingan' },
                { step: '6', title: 'Pengawas isi checklist eviden', desc: 'Centang item yang sudah terpenuhi' },
                { step: '7', title: 'Madrasah upload eviden', desc: 'Upload dokumen bukti per area' },
                { step: '8', title: 'Monitoring & evaluasi', desc: 'Dashboard, Kartu Kendali, Rekapitulasi' },
              ].map((item, i) => (
                <div key={i} className="flex gap-4 mb-4">
                  <div className="flex flex-col items-center">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-kemenag-green to-green-600 text-white flex items-center justify-center text-sm font-bold shadow-md">{item.step}</div>
                    {i < 7 && <div className="w-0.5 h-full bg-green-200 dark:bg-green-800 mt-1"></div>}
                  </div>
                  <div className="pb-4">
                    <h4 className="font-semibold text-gray-800 dark:text-white">{item.title}</h4>
                    <p className="text-sm text-gray-500 dark:text-gray-400">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeSection === 'menu' && (
          <div className="space-y-4">
            <h2 className="text-xl font-bold text-kemenag-green flex items-center gap-2"><LayoutDashboard size={22} /> Panduan Per Menu</h2>
            <div className="space-y-2">
              {menuGuides.map(m => {
                const Icon = m.icon;
                const isExpanded = expandedMenu === m.id;
                return (
                  <div key={m.id} className="border border-gray-200 dark:border-gray-700 rounded-xl overflow-hidden">
                    <button
                      onClick={() => setExpandedMenu(isExpanded ? null : m.id)}
                      className="w-full flex items-center gap-3 p-4 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors text-left"
                    >
                      <div className="w-9 h-9 rounded-lg bg-green-100 dark:bg-green-900/30 flex items-center justify-center flex-shrink-0">
                        <Icon size={18} className="text-kemenag-green" />
                      </div>
                      <div className="flex-1">
                        <h4 className="font-semibold text-gray-800 dark:text-white text-sm">{m.title}</h4>
                        <p className="text-xs text-gray-500 dark:text-gray-400">{m.desc}</p>
                      </div>
                      {isExpanded ? <ChevronDown size={18} className="text-gray-400" /> : <ChevronRight size={18} className="text-gray-400" />}
                    </button>
                    {isExpanded && (
                      <div className="px-4 pb-4 pt-0 ml-12">
                        <ul className="space-y-1.5">
                          {m.details.map((d, i) => (
                            <li key={i} className="flex items-start gap-2 text-sm text-gray-600 dark:text-gray-400">
                              <CheckCircle2 size={14} className="text-kemenag-green mt-0.5 flex-shrink-0" />
                              {d}
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {activeSection === 'tips' && (
          <div className="space-y-4">
            <h2 className="text-xl font-bold text-kemenag-green flex items-center gap-2"><Lightbulb size={22} /> Tips Penting</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {[
                { emoji: '🌐', text: 'Gunakan browser terbaru (Chrome, Firefox, Edge)' },
                { emoji: '🔒', text: 'Jangan bagikan password ke orang lain' },
                { emoji: '🚪', text: 'Logout setelah selesai, terutama di komputer bersama' },
                { emoji: '💾', text: 'Backup data secara berkala dengan Export Excel' },
                { emoji: '📤', text: 'Upload eviden secara rutin agar progress terupdate' },
                { emoji: '📝', text: 'Isi pendampingan segera setelah kunjungan' },
                { emoji: '🔍', text: 'Manfaatkan fitur filter untuk pencarian data' },
                { emoji: '📊', text: 'Cetak laporan triwulan sebelum batas waktu' },
              ].map((tip, i) => (
                <div key={i} className="flex items-start gap-3 p-3 bg-amber-50 dark:bg-amber-900/20 rounded-lg border border-amber-200 dark:border-amber-800">
                  <span className="text-lg">{tip.emoji}</span>
                  <span className="text-sm text-gray-700 dark:text-gray-300">{tip.text}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeSection === 'kontak' && (
          <div className="space-y-4">
            <h2 className="text-xl font-bold text-kemenag-green flex items-center gap-2"><Phone size={22} /> Kontak Bantuan</h2>
            <div className="bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 rounded-xl p-6 border border-green-200 dark:border-green-800">
              <div className="text-center">
                <div className="w-16 h-16 rounded-full bg-kemenag-green text-white flex items-center justify-center mx-auto mb-4">
                  <Phone size={28} />
                </div>
                <h3 className="font-bold text-gray-800 dark:text-white text-lg mb-2">Admin SI-PANDU ZI</h3>
                <p className="text-gray-600 dark:text-gray-400 text-sm mb-4">Pokjawas Kemenag Kabupaten Jember</p>
                <div className="bg-white dark:bg-gray-800 rounded-lg p-4 inline-block shadow-sm">
                  <p className="text-sm text-gray-600 dark:text-gray-400">Sampaikan kendala beserta <strong>screenshot</strong> (tangkapan layar) jika memungkinkan untuk mempercepat penanganan.</p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
