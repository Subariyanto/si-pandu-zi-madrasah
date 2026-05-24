import * as XLSX from 'xlsx'
import jsPDF from 'jspdf'
import 'jspdf-autotable'

export function exportToExcel(data, filename) {
  const ws = XLSX.utils.json_to_sheet(data)
  const wb = XLSX.utils.book_new()
  XLSX.utils.book_append_sheet(wb, ws, 'Data')
  XLSX.writeFile(wb, `${filename}.xlsx`)
}

export function exportToPDF(title, headers, rows, filename) {
  const doc = new jsPDF('l', 'mm', 'a4')
  
  // Header
  doc.setFontSize(14)
  doc.setTextColor(22, 101, 52)
  doc.text('KEMENTERIAN AGAMA REPUBLIK INDONESIA', doc.internal.pageSize.width / 2, 15, { align: 'center' })
  doc.setFontSize(12)
  doc.text('KELOMPOK KERJA PENGAWAS MADRASAH', doc.internal.pageSize.width / 2, 22, { align: 'center' })
  doc.setFontSize(10)
  doc.text('SI-PANDU ZI MADRASAH', doc.internal.pageSize.width / 2, 28, { align: 'center' })
  
  // Line
  doc.setDrawColor(22, 101, 52)
  doc.setLineWidth(0.5)
  doc.line(14, 32, doc.internal.pageSize.width - 14, 32)
  
  // Title
  doc.setFontSize(12)
  doc.setTextColor(0, 0, 0)
  doc.text(title, doc.internal.pageSize.width / 2, 40, { align: 'center' })
  
  // Table
  doc.autoTable({
    head: [headers],
    body: rows,
    startY: 45,
    styles: { fontSize: 8, cellPadding: 2 },
    headStyles: { fillColor: [22, 101, 52], textColor: 255 },
    alternateRowStyles: { fillColor: [240, 253, 244] },
  })
  
  // Footer
  const pageCount = doc.internal.getNumberOfPages()
  for (let i = 1; i <= pageCount; i++) {
    doc.setPage(i)
    doc.setFontSize(8)
    doc.setTextColor(128)
    doc.text(`Halaman ${i} dari ${pageCount}`, doc.internal.pageSize.width - 20, doc.internal.pageSize.height - 10)
    doc.text(`Dicetak: ${new Date().toLocaleDateString('id-ID')}`, 14, doc.internal.pageSize.height - 10)
  }
  
  doc.save(`${filename}.pdf`)
}

export function generateLaporanPDF(title, content, filename) {
  const doc = new jsPDF('p', 'mm', 'a4')
  
  // Kop
  doc.setFontSize(12)
  doc.setTextColor(22, 101, 52)
  doc.text('KEMENTERIAN AGAMA REPUBLIK INDONESIA', 105, 15, { align: 'center' })
  doc.setFontSize(11)
  doc.text('KELOMPOK KERJA PENGAWAS MADRASAH', 105, 22, { align: 'center' })
  doc.setFontSize(9)
  doc.text('Jl. Contoh Alamat No. 123, Kota Bandung', 105, 28, { align: 'center' })
  
  doc.setDrawColor(22, 101, 52)
  doc.setLineWidth(0.8)
  doc.line(20, 32, 190, 32)
  doc.setLineWidth(0.3)
  doc.line(20, 33, 190, 33)
  
  // Title
  doc.setFontSize(13)
  doc.setTextColor(0, 0, 0)
  doc.text(title, 105, 42, { align: 'center' })
  
  // Content
  doc.setFontSize(10)
  let y = 52
  if (typeof content === 'string') {
    const lines = doc.splitTextToSize(content, 170)
    doc.text(lines, 20, y)
  } else if (Array.isArray(content)) {
    content.forEach(section => {
      if (y > 270) { doc.addPage(); y = 20 }
      if (section.subtitle) {
        doc.setFontSize(11)
        doc.setFont(undefined, 'bold')
        doc.text(section.subtitle, 20, y)
        y += 7
      }
      if (section.text) {
        doc.setFontSize(10)
        doc.setFont(undefined, 'normal')
        const lines = doc.splitTextToSize(section.text, 170)
        doc.text(lines, 20, y)
        y += lines.length * 5 + 5
      }
      if (section.table) {
        doc.autoTable({
          head: [section.table.headers],
          body: section.table.rows,
          startY: y,
          styles: { fontSize: 8 },
          headStyles: { fillColor: [22, 101, 52] },
          margin: { left: 20, right: 20 },
        })
        y = doc.lastAutoTable.finalY + 10
      }
    })
  }
  
  // Tanda tangan
  const signY = Math.max(y + 20, 230)
  if (signY < 270) {
    doc.setFontSize(10)
    doc.text('Mengetahui,', 140, signY)
    doc.text('Ketua Pokjawas', 140, signY + 5)
    doc.text('', 140, signY + 25)
    doc.text('H. Ahmad Fauzi, M.Pd', 140, signY + 30)
    doc.text('NIP. 197003251995031002', 140, signY + 35)
  }
  
  doc.save(`${filename}.pdf`)
}
