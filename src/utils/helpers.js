import jsPDF from 'jspdf';
import 'jspdf-autotable';
import * as XLSX from 'xlsx';

export function exportToPDF(title, headers, data, filename = 'laporan.pdf') {
  const doc = new jsPDF();
  
  // Header
  doc.setFontSize(10);
  doc.text('KEMENTERIAN AGAMA REPUBLIK INDONESIA', 105, 15, { align: 'center' });
  doc.text('KELOMPOK KERJA PENGAWAS MADRASAH', 105, 21, { align: 'center' });
  doc.setLineWidth(0.5);
  doc.line(20, 25, 190, 25);
  
  // Title
  doc.setFontSize(14);
  doc.text(title, 105, 35, { align: 'center' });
  
  // Table
  doc.autoTable({
    head: [headers],
    body: data,
    startY: 42,
    styles: { fontSize: 8, cellPadding: 2 },
    headStyles: { fillColor: [22, 101, 52], textColor: 255 },
    alternateRowStyles: { fillColor: [240, 253, 244] },
  });
  
  // Footer
  const pageCount = doc.internal.getNumberOfPages();
  for (let i = 1; i <= pageCount; i++) {
    doc.setPage(i);
    doc.setFontSize(8);
    doc.text(`Halaman ${i} dari ${pageCount}`, 105, doc.internal.pageSize.height - 10, { align: 'center' });
  }
  
  doc.save(filename);
}

export function exportToExcel(data, sheetName = 'Data', filename = 'laporan.xlsx') {
  const ws = XLSX.utils.json_to_sheet(data);
  const wb = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(wb, ws, sheetName);
  XLSX.writeFile(wb, filename);
}

export function getKategoriCapaian(nilai) {
  if (nilai >= 85) return { label: 'Siap Evaluasi ZI', color: 'text-green-700 bg-green-100' };
  if (nilai >= 70) return { label: 'Baik', color: 'text-blue-700 bg-blue-100' };
  if (nilai >= 50) return { label: 'Berkembang', color: 'text-yellow-700 bg-yellow-100' };
  return { label: 'Perlu Pembinaan Intensif', color: 'text-red-700 bg-red-100' };
}

export function getKategoriSurvei(nilai) {
  if (nilai >= 4.01) return { label: 'Sangat Baik', color: 'text-green-700 bg-green-100' };
  if (nilai >= 3.01) return { label: 'Baik', color: 'text-blue-700 bg-blue-100' };
  if (nilai >= 2.01) return { label: 'Cukup', color: 'text-yellow-700 bg-yellow-100' };
  return { label: 'Kurang', color: 'text-red-700 bg-red-100' };
}

export function hitungCapaianMadrasah(checklistData) {
  if (!checklistData) return { areas: {}, total: 0 };
  const areas = {};
  let totalSkor = 0;
  let totalIndikator = 0;
  
  Object.keys(checklistData).forEach(areaKey => {
    const areaData = checklistData[areaKey];
    const areaSkor = areaData.reduce((sum, item) => sum + item.skor, 0);
    const rataArea = areaSkor / areaData.length;
    areas[areaKey] = rataArea;
    totalSkor += areaSkor;
    totalIndikator += areaData.length;
  });
  
  const total = totalIndikator > 0 ? totalSkor / totalIndikator : 0;
  return { areas, total };
}

export function generateTicketNumber() {
  const now = new Date();
  const year = now.getFullYear();
  const num = Math.floor(Math.random() * 999) + 1;
  return `ADU-${year}-${String(num).padStart(3, '0')}`;
}

export function formatDate(dateStr) {
  if (!dateStr) return '-';
  const date = new Date(dateStr);
  return date.toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' });
}
