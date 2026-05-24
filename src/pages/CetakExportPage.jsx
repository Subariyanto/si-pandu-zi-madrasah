import { useData } from '../context/DataContext';
import { useAuth } from '../context/AuthContext';
import { hitungCapaianMadrasah, exportToPDF, exportToExcel } from '../utils/helpers';
import { FileText, Download, Printer } from 'lucide-react';

export default function CetakExportPage() {
  const { madrasah, pengawas, checklist, pendampingan, survei, pengaduan } = useData();
  const { user } = useAuth();

  const reports = [
    {
      title: 'Data Pengawas',
      desc: 'Export seluruh data pengawas madrasah',
      exportExcel: () => {
        const data = pengawas.map(p => ({ Nama: p.nama, NIP: p.nip, Pangkat: p.pangkat, Wilayah: p.wilayah, HP: p.hp, Status: p.status }));
        exportToExcel(data, 'Pengawas', 'data-pengawas.xlsx');
      },
      exportPDF: () => {
        const headers = ['No', 'Nama', 'NIP', 'Pangkat', 'Wilayah', 'Status'];
        const data = pengawas.map((p, i) => [i + 1, p.nama, p.nip, p.pangkat, p.wilayah, p.status]);
        exportToPDF('DATA PENGAWAS MADRASAH', headers, data, 'data-pengawas.pdf');
      }
    },
    {
      title: 'Data Madrasah',
      desc: 'Export seluruh data madrasah binaan',
      exportExcel: () => {
        const data = madrasah.map(m => ({ Nama: m.nama, NPSN: m.npsn, Jenjang: m.jenjang, Kecamatan: m.kecamatan, Pengawas: m.pengawasNama, 'Status ZI': m.statusZI }));
        exportToExcel(data, 'Madrasah', 'data-madrasah.xlsx');
      },
      exportPDF: () => {
        const headers = ['No', 'Nama', 'NPSN', 'Jenjang', 'Kecamatan', 'Pengawas', 'Status ZI'];
        const data = madrasah.map((m, i) => [i + 1, m.nama, m.npsn, m.jenjang, m.kecamatan, m.pengawasNama, m.statusZI]);
        exportToPDF('DATA MADRASAH BINAAN', headers, data, 'data-madrasah.pdf');
      }
    },
    {
      title: 'Rekapitulasi Capaian ZI',
      desc: 'Export rekap capaian Zona Integritas semua madrasah',
      exportExcel: () => {
        const data = madrasah.map(m => {
          const cl = checklist.find(c => c.madrasahId === m.id);
          const cap = hitungCapaianMadrasah(cl?.data);
          return { Nama: m.nama, Jenjang: m.jenjang, Kecamatan: m.kecamatan, 'Nilai Akhir': cap.total.toFixed(1) };
        });
        exportToExcel(data, 'Rekapitulasi', 'rekapitulasi-zi.xlsx');
      },
      exportPDF: () => {
        const headers = ['No', 'Madrasah', 'Jenjang', 'Kecamatan', 'Nilai Akhir'];
        const data = madrasah.map((m, i) => {
          const cl = checklist.find(c => c.madrasahId === m.id);
          const cap = hitungCapaianMadrasah(cl?.data);
          return [i + 1, m.nama, m.jenjang, m.kecamatan, cap.total.toFixed(1) + '%'];
        });
        exportToPDF('REKAPITULASI CAPAIAN ZONA INTEGRITAS', headers, data, 'rekapitulasi-zi.pdf');
      }
    },
    {
      title: 'Data Pendampingan',
      desc: 'Export seluruh kegiatan pendampingan',
      exportExcel: () => {
        const data = pendampingan.map(p => ({ Tanggal: p.tanggal, Pengawas: p.pengawasNama, Madrasah: p.madrasahNama, Jenis: p.jenis, Materi: p.materi, Status: p.status }));
        exportToExcel(data, 'Pendampingan', 'data-pendampingan.xlsx');
      },
      exportPDF: () => {
        const headers = ['No', 'Tanggal', 'Pengawas', 'Madrasah', 'Jenis', 'Status'];
        const data = pendampingan.map((p, i) => [i + 1, p.tanggal, p.pengawasNama, p.madrasahNama, p.jenis, p.status]);
        exportToPDF('DATA PENDAMPINGAN ZI', headers, data, 'data-pendampingan.pdf');
      }
    },
    {
      title: 'Hasil Survei Kepuasan',
      desc: 'Export hasil survei kepuasan layanan',
      exportExcel: () => {
        const data = survei.map(s => ({
          Tanggal: s.tanggal, Madrasah: s.madrasahNama, Kategori: s.kategoriResponden,
          'Rata-rata': (s.jawaban.reduce((a, b) => a + b, 0) / s.jawaban.length).toFixed(2)
        }));
        exportToExcel(data, 'Survei', 'survei-kepuasan.xlsx');
      },
      exportPDF: () => {
        const headers = ['No', 'Tanggal', 'Madrasah', 'Kategori', 'Rata-rata'];
        const data = survei.map((s, i) => [i + 1, s.tanggal, s.madrasahNama, s.kategoriResponden, (s.jawaban.reduce((a, b) => a + b, 0) / s.jawaban.length).toFixed(2)]);
        exportToPDF('HASIL SURVEI KEPUASAN LAYANAN', headers, data, 'survei-kepuasan.pdf');
      }
    },
    {
      title: 'Data Pengaduan',
      desc: 'Export seluruh data pengaduan masyarakat',
      exportExcel: () => {
        const data = pengaduan.map(p => ({ Tiket: p.tiket, Tanggal: p.tanggal, Pelapor: p.namaPelapor, Madrasah: p.madrasahNama, Jenis: p.jenisPengaduan, Status: p.status }));
        exportToExcel(data, 'Pengaduan', 'data-pengaduan.xlsx');
      },
      exportPDF: () => {
        const headers = ['No', 'Tiket', 'Tanggal', 'Madrasah', 'Jenis', 'Status'];
        const data = pengaduan.map((p, i) => [i + 1, p.tiket, p.tanggal, p.madrasahNama, p.jenisPengaduan, p.status]);
        exportToPDF('DATA PENGADUAN MASYARAKAT', headers, data, 'data-pengaduan.pdf');
      }
    },
  ];

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-gray-800 dark:text-white">Cetak / Export Laporan</h1>
      <p className="text-gray-500 dark:text-gray-400">Pilih laporan yang ingin dicetak atau diexport.</p>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {reports.map((report, idx) => (
          <div key={idx} className="card">
            <div className="flex items-start gap-3 mb-4">
              <div className="p-2 bg-green-100 rounded-lg">
                <Printer size={20} className="text-kemenag-green" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-800 dark:text-white">{report.title}</h3>
                <p className="text-xs text-gray-500">{report.desc}</p>
              </div>
            </div>
            <div className="flex gap-2">
              <button onClick={report.exportPDF} className="btn-primary text-xs flex items-center gap-1 flex-1">
                <FileText size={14} /> PDF
              </button>
              <button onClick={report.exportExcel} className="btn-gold text-xs flex items-center gap-1 flex-1">
                <Download size={14} /> Excel
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
