import { useState } from 'react';
import { useData } from '../context/DataContext';
import { useAuth } from '../context/AuthContext';
import { hitungCapaianMadrasah, exportToExcel } from '../utils/helpers';
import { FileText, Download, Printer, X, Eye } from 'lucide-react';
import jsPDF from 'jspdf';
import 'jspdf-autotable';

function generatePDFDoc(title, headers, data) {
  const doc = new jsPDF();
  
  doc.setFontSize(10);
  doc.text('KEMENTERIAN AGAMA REPUBLIK INDONESIA', 105, 15, { align: 'center' });
  doc.text('KELOMPOK KERJA PENGAWAS MADRASAH', 105, 21, { align: 'center' });
  doc.setLineWidth(0.5);
  doc.line(20, 25, 190, 25);
  
  doc.setFontSize(14);
  doc.text(title, 105, 35, { align: 'center' });
  
  doc.autoTable({
    head: [headers],
    body: data,
    startY: 42,
    styles: { fontSize: 8, cellPadding: 2 },
    headStyles: { fillColor: [22, 101, 52], textColor: 255 },
    alternateRowStyles: { fillColor: [240, 253, 244] },
  });
  
  const pageCount = doc.internal.getNumberOfPages();
  for (let i = 1; i <= pageCount; i++) {
    doc.setPage(i);
    doc.setFontSize(8);
    doc.text(`Halaman ${i} dari ${pageCount}`, 105, doc.internal.pageSize.height - 10, { align: 'center' });
  }
  
  return doc;
}

export default function CetakExportPage() {
  const { madrasah, pengawas, checklist, pendampingan, survei, pengaduan } = useData();
  const { user } = useAuth();
  const [previewUrl, setPreviewUrl] = useState(null);
  const [previewTitle, setPreviewTitle] = useState('');
  const [previewFilename, setPreviewFilename] = useState('');

  const handlePreviewPDF = (title, headers, data, filename) => {
    const doc = generatePDFDoc(title, headers, data);
    const blob = doc.output('blob');
    const url = URL.createObjectURL(blob);
    setPreviewUrl(url);
    setPreviewTitle(title);
    setPreviewFilename(filename);
  };

  const handleDownloadPDF = () => {
    if (previewUrl) {
      const a = document.createElement('a');
      a.href = previewUrl;
      a.download = previewFilename;
      a.click();
    }
  };

  const closePreview = () => {
    if (previewUrl) URL.revokeObjectURL(previewUrl);
    setPreviewUrl(null);
    setPreviewTitle('');
    setPreviewFilename('');
  };

  const reports = [
    {
      title: 'Data Pengawas',
      desc: 'Export seluruh data pengawas madrasah',
      exportExcel: () => {
        const data = pengawas.map(p => ({ Nama: p.nama, NIP: p.nip, Pangkat: p.pangkat, Wilayah: p.wilayah, HP: p.hp, Status: p.status }));
        exportToExcel(data, 'Pengawas', 'data-pengawas.xlsx');
      },
      previewPDF: () => {
        const headers = ['No', 'Nama', 'NIP', 'Pangkat', 'Wilayah', 'Status'];
        const data = pengawas.map((p, i) => [i + 1, p.nama, p.nip, p.pangkat, p.wilayah, p.status]);
        handlePreviewPDF('DATA PENGAWAS MADRASAH', headers, data, 'data-pengawas.pdf');
      }
    },
    {
      title: 'Data Madrasah',
      desc: 'Export seluruh data madrasah binaan',
      exportExcel: () => {
        const data = madrasah.map(m => ({ Nama: m.nama, NPSN: m.npsn, Jenjang: m.jenjang, Kecamatan: m.kecamatan, Pengawas: m.pengawasNama, 'Status ZI': m.statusZI }));
        exportToExcel(data, 'Madrasah', 'data-madrasah.xlsx');
      },
      previewPDF: () => {
        const headers = ['No', 'Nama', 'NPSN', 'Jenjang', 'Kecamatan', 'Pengawas', 'Status ZI'];
        const data = madrasah.map((m, i) => [i + 1, m.nama, m.npsn, m.jenjang, m.kecamatan, m.pengawasNama, m.statusZI]);
        handlePreviewPDF('DATA MADRASAH BINAAN', headers, data, 'data-madrasah.pdf');
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
      previewPDF: () => {
        const headers = ['No', 'Madrasah', 'Jenjang', 'Kecamatan', 'Nilai Akhir'];
        const data = madrasah.map((m, i) => {
          const cl = checklist.find(c => c.madrasahId === m.id);
          const cap = hitungCapaianMadrasah(cl?.data);
          return [i + 1, m.nama, m.jenjang, m.kecamatan, cap.total.toFixed(1) + '%'];
        });
        handlePreviewPDF('REKAPITULASI CAPAIAN ZONA INTEGRITAS', headers, data, 'rekapitulasi-zi.pdf');
      }
    },
    {
      title: 'Data Pendampingan',
      desc: 'Export seluruh kegiatan pendampingan',
      exportExcel: () => {
        const data = pendampingan.map(p => ({ Tanggal: p.tanggal, Pengawas: p.pengawasNama, Madrasah: p.madrasahNama, Jenis: p.jenis, Materi: p.materi, Status: p.status }));
        exportToExcel(data, 'Pendampingan', 'data-pendampingan.xlsx');
      },
      previewPDF: () => {
        const headers = ['No', 'Tanggal', 'Pengawas', 'Madrasah', 'Jenis', 'Status'];
        const data = pendampingan.map((p, i) => [i + 1, p.tanggal, p.pengawasNama, p.madrasahNama, p.jenis, p.status]);
        handlePreviewPDF('DATA PENDAMPINGAN ZI', headers, data, 'data-pendampingan.pdf');
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
      previewPDF: () => {
        const headers = ['No', 'Tanggal', 'Madrasah', 'Kategori', 'Rata-rata'];
        const data = survei.map((s, i) => [i + 1, s.tanggal, s.madrasahNama, s.kategoriResponden, (s.jawaban.reduce((a, b) => a + b, 0) / s.jawaban.length).toFixed(2)]);
        handlePreviewPDF('HASIL SURVEI KEPUASAN LAYANAN', headers, data, 'survei-kepuasan.pdf');
      }
    },
    {
      title: 'Data Pengaduan',
      desc: 'Export seluruh data pengaduan masyarakat',
      exportExcel: () => {
        const data = pengaduan.map(p => ({ Tiket: p.tiket, Tanggal: p.tanggal, Pelapor: p.namaPelapor, Madrasah: p.madrasahNama, Jenis: p.jenisPengaduan, Status: p.status }));
        exportToExcel(data, 'Pengaduan', 'data-pengaduan.xlsx');
      },
      previewPDF: () => {
        const headers = ['No', 'Tiket', 'Tanggal', 'Madrasah', 'Jenis', 'Status'];
        const data = pengaduan.map((p, i) => [i + 1, p.tiket, p.tanggal, p.madrasahNama, p.jenisPengaduan, p.status]);
        handlePreviewPDF('DATA PENGADUAN MASYARAKAT', headers, data, 'data-pengaduan.pdf');
      }
    },
  ];

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-gray-800 dark:text-white">Cetak / Export Laporan</h1>
      <p className="text-gray-500 dark:text-gray-400">Pilih laporan yang ingin dicetak atau diexport. PDF akan ditampilkan preview terlebih dahulu.</p>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {reports.map((report, idx) => (
          <div key={idx} className="card">
            <div className="flex items-start gap-3 mb-4">
              <div className="p-2 bg-green-100 dark:bg-green-900/30 rounded-lg">
                <Printer size={20} className="text-kemenag-green" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-800 dark:text-white">{report.title}</h3>
                <p className="text-xs text-gray-500 dark:text-gray-400">{report.desc}</p>
              </div>
            </div>
            <div className="flex gap-2">
              <button onClick={report.previewPDF} className="btn-primary text-xs flex items-center gap-1 flex-1">
                <Eye size={14} /> Preview PDF
              </button>
              <button onClick={report.exportExcel} className="btn-gold text-xs flex items-center gap-1 flex-1">
                <Download size={14} /> Excel
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* PDF Preview Modal */}
      {previewUrl && (
        <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4">
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl w-full max-w-5xl h-[90vh] flex flex-col">
            {/* Modal Header */}
            <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-700">
              <div className="flex items-center gap-3">
                <FileText size={20} className="text-kemenag-green" />
                <h3 className="font-semibold text-gray-800 dark:text-white">{previewTitle}</h3>
              </div>
              <div className="flex items-center gap-2">
                <button onClick={handleDownloadPDF} className="btn-primary text-xs flex items-center gap-1">
                  <Download size={14} /> Download PDF
                </button>
                <button onClick={closePreview} className="p-2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg">
                  <X size={20} />
                </button>
              </div>
            </div>
            {/* PDF Viewer */}
            <div className="flex-1 p-2">
              <iframe
                src={previewUrl}
                className="w-full h-full rounded-lg border border-gray-200 dark:border-gray-700"
                title="PDF Preview"
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
