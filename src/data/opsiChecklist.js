/**
 * Opsi dropdown per indikator untuk Checklist Eviden ZI
 * Struktur: OPSI_PER_INDIKATOR.area[index] = { keterangan, catatan, rekomendasi }
 * Konteks: Madrasah di bawah Kemenag
 */

export const OPSI_PER_INDIKATOR = {
  // ========================================
  // AREA 1: MANAJEMEN PERUBAHAN
  // ========================================
  area1: [
    // Indikator 1: Tim kerja ZI telah dibentuk
    {
      keterangan: [
        "SK Tim Kerja Pembangunan ZI telah diterbitkan oleh Kepala Madrasah tahun berjalan",
        "SK Tim ZI tersedia namun belum diperbarui untuk tahun berjalan",
        "Tim ZI dibentuk secara lisan tanpa didukung SK resmi",
        "Belum ada pembentukan Tim Kerja ZI di madrasah",
        "SK Tim ZI tersedia lengkap dengan uraian tugas masing-masing anggota",
      ],
      catatan: [
        "SK sudah sesuai format dan mencantumkan seluruh komponen yang diperlukan",
        "SK perlu diperbarui karena masih menggunakan tahun sebelumnya",
        "Komposisi tim belum mencerminkan keterwakilan seluruh unsur madrasah",
        "Perlu ditambahkan uraian tugas yang lebih rinci pada SK",
        "Dokumen SK sudah baik, namun belum disosialisasikan kepada seluruh pegawai",
      ],
      rekomendasi: [
        "Segera terbitkan SK Tim Kerja ZI yang baru untuk tahun berjalan",
        "Lengkapi SK dengan uraian tugas dan tanggung jawab setiap anggota tim",
        "Libatkan perwakilan dari seluruh unsur madrasah dalam tim ZI",
        "Sosialisasikan SK Tim ZI kepada seluruh warga madrasah",
        "Dokumentasikan SK dan arsipkan dengan baik sebagai bukti dukung",
      ],
    },
    // Indikator 2: Dokumen rencana kerja ZI tersedia
    {
      keterangan: [
        "Dokumen rencana kerja pembangunan ZI tersedia lengkap dengan timeline dan target",
        "Rencana kerja ZI tersedia namun belum mencakup seluruh area perubahan",
        "Rencana kerja masih berupa draft dan belum disahkan Kepala Madrasah",
        "Belum ada dokumen rencana kerja pembangunan ZI",
        "Rencana kerja ZI tersedia dan sudah terintegrasi dengan RKM/RKAM",
      ],
      catatan: [
        "Rencana kerja sudah komprehensif dan mencakup 6 area perubahan",
        "Dokumen perlu dilengkapi dengan indikator keberhasilan yang terukur",
        "Timeline pelaksanaan belum realistis dengan kapasitas SDM yang ada",
        "Rencana kerja sudah baik namun belum ada mekanisme monitoring",
        "Perlu sinkronisasi antara rencana kerja ZI dengan program kerja madrasah",
      ],
      rekomendasi: [
        "Susun rencana kerja ZI yang mencakup seluruh 6 area perubahan dengan timeline jelas",
        "Tambahkan indikator keberhasilan yang terukur pada setiap target",
        "Integrasikan rencana kerja ZI ke dalam RKM/RKAM madrasah",
        "Tetapkan mekanisme monitoring dan evaluasi berkala",
        "Sahkan dokumen rencana kerja melalui keputusan Kepala Madrasah",
      ],
    },
    // Indikator 3: Sosialisasi ZI telah dilakukan
    {
      keterangan: [
        "Sosialisasi ZI telah dilakukan kepada seluruh warga madrasah dengan dokumentasi lengkap",
        "Sosialisasi dilakukan terbatas hanya kepada tenaga pendidik",
        "Sosialisasi dilakukan melalui media digital (grup WhatsApp/website)",
        "Belum dilakukan sosialisasi pembangunan ZI kepada warga madrasah",
        "Sosialisasi dilakukan bertahap melalui rapat dinas dan papan informasi",
      ],
      catatan: [
        "Dokumentasi sosialisasi lengkap berupa notulen, daftar hadir, dan foto kegiatan",
        "Sosialisasi perlu diperluas mencakup tenaga kependidikan dan komite madrasah",
        "Media sosialisasi sudah variatif namun belum menjangkau orang tua/wali murid",
        "Frekuensi sosialisasi perlu ditingkatkan minimal setiap triwulan",
        "Materi sosialisasi sudah baik namun perlu disesuaikan dengan audiens",
      ],
      rekomendasi: [
        "Lakukan sosialisasi berkala minimal setiap triwulan kepada seluruh stakeholder",
        "Perluas sasaran sosialisasi mencakup komite madrasah dan orang tua/wali",
        "Dokumentasikan setiap kegiatan sosialisasi dengan notulen, daftar hadir, dan foto",
        "Gunakan media yang variatif termasuk banner, leaflet, dan media sosial",
        "Evaluasi efektivitas sosialisasi melalui survei pemahaman warga madrasah",
      ],
    },
    // Indikator 4: Agen perubahan ditetapkan
    {
      keterangan: [
        "Agen perubahan telah ditetapkan melalui SK dan aktif menjalankan peran",
        "Agen perubahan sudah ditetapkan namun belum menjalankan program kerja",
        "Penetapan agen perubahan masih dalam proses pengusulan",
        "Belum ada penetapan agen perubahan di madrasah",
        "Agen perubahan ditetapkan dan telah mengikuti pelatihan/bimtek terkait",
      ],
      catatan: [
        "Agen perubahan aktif dan telah menghasilkan inovasi yang berdampak",
        "Perlu peningkatan kapasitas agen perubahan melalui pelatihan",
        "Jumlah agen perubahan belum proporsional dengan jumlah pegawai",
        "Agen perubahan sudah ditetapkan tapi belum memiliki program kerja tertulis",
        "Role model dan keteladanan agen perubahan sudah terlihat di lingkungan madrasah",
      ],
      rekomendasi: [
        "Tetapkan agen perubahan melalui SK Kepala Madrasah dengan uraian tugas jelas",
        "Ikutsertakan agen perubahan dalam pelatihan/bimtek pembangunan ZI",
        "Susun program kerja agen perubahan yang terukur dan realistis",
        "Fasilitasi agen perubahan untuk mengembangkan inovasi layanan",
        "Lakukan evaluasi kinerja agen perubahan secara berkala",
      ],
    },
    // Indikator 5: Budaya kerja integritas dilaksanakan
    {
      keterangan: [
        "Budaya kerja integritas dilaksanakan secara konsisten dengan bukti dokumentasi kegiatan",
        "Terdapat kegiatan pembiasaan integritas namun belum terjadwal rutin",
        "Budaya kerja integritas baru sebatas himbauan tanpa program konkret",
        "Belum ada program budaya kerja integritas yang terstruktur",
        "Nilai-nilai integritas sudah terinternalisasi dalam kegiatan harian madrasah",
      ],
      catatan: [
        "Program budaya integritas sudah berjalan baik dan menjadi kebiasaan warga madrasah",
        "Perlu penjadwalan yang lebih terstruktur untuk kegiatan pembiasaan integritas",
        "Keterlibatan seluruh warga madrasah dalam program integritas perlu ditingkatkan",
        "Dokumentasi kegiatan budaya integritas perlu dilengkapi",
        "Program sudah variatif meliputi apel pagi, ikrar integritas, dan kegiatan keagamaan",
      ],
      rekomendasi: [
        "Susun program budaya kerja integritas yang terstruktur dan terjadwal",
        "Libatkan seluruh warga madrasah termasuk peserta didik dalam pembiasaan integritas",
        "Dokumentasikan setiap kegiatan budaya integritas sebagai bukti dukung",
        "Integrasikan nilai integritas dalam pembelajaran dan kegiatan ekstrakurikuler",
        "Lakukan evaluasi berkala terhadap efektivitas program budaya integritas",
      ],
    },
  ],

  // ========================================
  // AREA 2: PENATAAN TATA LAKSANA
  // ========================================
  area2: [
    // Indikator 1: SOP layanan tersedia
    {
      keterangan: [
        "SOP layanan tersedia lengkap untuk seluruh jenis layanan madrasah",
        "SOP tersedia sebagian namun belum mencakup seluruh layanan",
        "SOP tersedia namun belum disahkan oleh Kepala Madrasah",
        "Belum ada SOP layanan yang terdokumentasi di madrasah",
        "SOP layanan tersedia, disahkan, dan sudah direview tahun berjalan",
      ],
      catatan: [
        "SOP sudah lengkap dan sesuai dengan standar format yang ditetapkan",
        "Beberapa SOP perlu diperbarui menyesuaikan regulasi terbaru",
        "SOP belum mencantumkan waktu penyelesaian layanan secara jelas",
        "Format SOP sudah baik namun perlu ditambahkan flowchart alur layanan",
        "SOP sudah mencakup layanan akademik dan administrasi",
      ],
      rekomendasi: [
        "Lengkapi SOP untuk seluruh jenis layanan yang ada di madrasah",
        "Review dan perbarui SOP secara berkala minimal setiap tahun",
        "Cantumkan waktu penyelesaian dan penanggung jawab pada setiap SOP",
        "Sahkan seluruh SOP melalui keputusan Kepala Madrasah",
        "Tambahkan flowchart/diagram alur pada setiap SOP untuk memudahkan pemahaman",
      ],
    },
    // Indikator 2: Alur layanan dipublikasikan
    {
      keterangan: [
        "Alur layanan dipublikasikan melalui papan informasi dan media digital",
        "Alur layanan hanya tersedia di ruang tata usaha",
        "Alur layanan dipublikasikan melalui website/media sosial madrasah",
        "Belum ada publikasi alur layanan kepada pengguna layanan",
        "Alur layanan dipublikasikan di area strategis yang mudah diakses masyarakat",
      ],
      catatan: [
        "Publikasi alur layanan sudah menjangkau seluruh pengguna layanan",
        "Perlu penempatan di lokasi yang lebih strategis dan mudah terlihat",
        "Media publikasi perlu diperluas tidak hanya fisik tapi juga digital",
        "Desain alur layanan perlu dibuat lebih informatif dan mudah dipahami",
        "Publikasi sudah baik namun perlu diperbarui sesuai perubahan SOP terbaru",
      ],
      rekomendasi: [
        "Publikasikan alur layanan di lokasi strategis yang mudah diakses masyarakat",
        "Gunakan media publikasi yang variatif meliputi fisik dan digital",
        "Buat desain alur layanan yang informatif dengan bahasa sederhana",
        "Perbarui publikasi setiap ada perubahan prosedur layanan",
        "Sediakan alur layanan dalam format yang ramah disabilitas",
      ],
    },
    // Indikator 3: Layanan berbasis digital tersedia
    {
      keterangan: [
        "Layanan berbasis digital tersedia dan berjalan aktif untuk berbagai layanan",
        "Layanan digital tersedia namun baru mencakup sebagian kecil layanan",
        "Sistem digital dalam tahap pengembangan dan belum digunakan secara penuh",
        "Belum ada layanan berbasis digital di madrasah",
        "Layanan digital terintegrasi dengan sistem informasi madrasah secara menyeluruh",
      ],
      catatan: [
        "Pemanfaatan teknologi digital sudah optimal dan mempercepat layanan",
        "Perlu peningkatan kapasitas SDM dalam mengoperasikan layanan digital",
        "Infrastruktur IT perlu ditingkatkan untuk mendukung layanan digital",
        "Layanan digital sudah ada namun sosialisasi ke pengguna masih kurang",
        "Perlu backup data secara berkala untuk keamanan informasi",
      ],
      rekomendasi: [
        "Kembangkan layanan berbasis digital untuk mempermudah akses masyarakat",
        "Tingkatkan kapasitas SDM dalam pengelolaan layanan digital",
        "Perkuat infrastruktur IT termasuk jaringan internet yang memadai",
        "Sosialisasikan layanan digital kepada seluruh pengguna layanan",
        "Lakukan backup data secara berkala dan terapkan keamanan sistem informasi",
      ],
    },
    // Indikator 4: Informasi layanan mudah diakses
    {
      keterangan: [
        "Informasi layanan tersedia lengkap dan mudah diakses melalui berbagai media",
        "Informasi layanan tersedia di papan pengumuman madrasah",
        "Informasi layanan hanya tersedia jika diminta langsung ke petugas",
        "Belum ada penyediaan informasi layanan yang terstruktur",
        "Informasi layanan dipublikasikan melalui website, media sosial, dan papan informasi",
      ],
      catatan: [
        "Aksesibilitas informasi layanan sudah baik dan menjangkau berbagai kalangan",
        "Perlu penambahan kanal informasi untuk menjangkau masyarakat lebih luas",
        "Informasi layanan perlu diperbarui secara berkala agar tetap aktual",
        "Bahasa penyampaian informasi perlu disederhanakan agar mudah dipahami",
        "Informasi sudah lengkap mencakup persyaratan, prosedur, dan waktu layanan",
      ],
      rekomendasi: [
        "Sediakan informasi layanan melalui berbagai kanal yang mudah diakses",
        "Perbarui informasi layanan secara berkala sesuai perkembangan terbaru",
        "Gunakan bahasa yang sederhana dan mudah dipahami oleh masyarakat umum",
        "Cantumkan informasi lengkap meliputi persyaratan, biaya, dan waktu penyelesaian",
        "Sediakan layanan informasi yang ramah terhadap penyandang disabilitas",
      ],
    },
    // Indikator 5: Evaluasi SOP dilakukan
    {
      keterangan: [
        "Evaluasi SOP dilakukan secara berkala dengan hasil terdokumentasi",
        "Evaluasi SOP baru dilakukan satu kali dalam tahun berjalan",
        "Evaluasi SOP dilakukan namun belum ada tindak lanjut perbaikan",
        "Belum pernah dilakukan evaluasi terhadap SOP yang ada",
        "Evaluasi SOP dilakukan berkala dan hasilnya digunakan untuk perbaikan layanan",
      ],
      catatan: [
        "Evaluasi berjalan baik dan menghasilkan perbaikan SOP yang signifikan",
        "Perlu penjadwalan evaluasi yang lebih terstruktur minimal setiap semester",
        "Hasil evaluasi belum ditindaklanjuti dengan revisi SOP secara nyata",
        "Perlu melibatkan pengguna layanan dalam proses evaluasi SOP",
        "Mekanisme evaluasi sudah baik namun perlu instrumen yang lebih terukur",
      ],
      rekomendasi: [
        "Lakukan evaluasi SOP secara berkala minimal setiap semester",
        "Libatkan pengguna layanan dalam proses evaluasi untuk mendapat masukan langsung",
        "Tindaklanjuti hasil evaluasi dengan revisi SOP yang diperlukan",
        "Dokumentasikan seluruh proses dan hasil evaluasi sebagai bukti dukung",
        "Kembangkan instrumen evaluasi yang terukur dan komprehensif",
      ],
    },
  ],

  // ========================================
  // AREA 3: PENATAAN MANAJEMEN SDM
  // ========================================
  area3: [
    // Indikator 1: Data SDM tersedia
    {
      keterangan: [
        "Data SDM tersedia lengkap dan terkelola dalam sistem informasi yang terbarui",
        "Data SDM tersedia namun belum seluruhnya diperbarui tahun berjalan",
        "Data SDM tersedia dalam bentuk manual/hardcopy tanpa sistem digital",
        "Belum ada pengelolaan data SDM yang terstruktur di madrasah",
        "Database SDM terintegrasi dengan SIMPATIKA/EMIS dan diperbarui berkala",
      ],
      catatan: [
        "Pengelolaan data SDM sudah baik dan terhubung dengan sistem nasional",
        "Data perlu segera diperbarui karena ada perubahan status kepegawaian",
        "Perlu migrasi dari sistem manual ke digital untuk efisiensi pengelolaan",
        "Data SDM sudah lengkap namun perlu validasi keakuratan secara berkala",
        "Pengelolaan data sudah menggunakan sistem namun belum seluruh pegawai terinput",
      ],
      rekomendasi: [
        "Kelola data SDM dalam sistem informasi digital yang mudah diakses dan diperbarui",
        "Lakukan pemutakhiran data SDM secara berkala minimal setiap semester",
        "Sinkronkan data SDM dengan SIMPATIKA/EMIS Kemenag secara rutin",
        "Validasi keakuratan data melalui konfirmasi langsung kepada pegawai",
        "Tunjuk petugas pengelola data SDM dengan uraian tugas yang jelas",
      ],
    },
    // Indikator 2: Pembagian tugas jelas
    {
      keterangan: [
        "Pembagian tugas terdokumentasi dalam SK dan dipahami seluruh pegawai",
        "Pembagian tugas ada namun belum seluruhnya dituangkan dalam SK",
        "Pembagian tugas dilakukan secara lisan tanpa dokumen tertulis",
        "Belum ada pembagian tugas yang terstruktur dan terdokumentasi",
        "SK pembagian tugas lengkap mencakup tugas pokok, tambahan, dan uraian jabatan",
      ],
      catatan: [
        "Pembagian tugas sudah proporsional dan sesuai kompetensi masing-masing",
        "Beberapa pegawai memiliki beban tugas yang tidak merata perlu penyesuaian",
        "SK pembagian tugas perlu diperbarui menyesuaikan perubahan personel",
        "Uraian tugas sudah jelas namun perlu ditambahkan indikator kinerja",
        "Pembagian tugas sudah baik dan mendukung efektivitas pelayanan",
      ],
      rekomendasi: [
        "Terbitkan SK pembagian tugas yang mencakup seluruh pegawai dengan uraian jelas",
        "Sesuaikan pembagian tugas dengan kompetensi dan kualifikasi pegawai",
        "Distribusikan beban kerja secara merata dan proporsional",
        "Perbarui SK pembagian tugas setiap ada perubahan personel atau kebijakan",
        "Sertakan indikator kinerja dalam uraian tugas setiap pegawai",
      ],
    },
    // Indikator 3: Disiplin pegawai dipantau
    {
      keterangan: [
        "Pemantauan disiplin pegawai dilakukan melalui fingerprint dan rekap kehadiran",
        "Pemantauan disiplin dilakukan manual melalui absensi tulis tangan",
        "Pemantauan disiplin ada namun belum konsisten dan terdokumentasi",
        "Belum ada mekanisme pemantauan disiplin pegawai yang terstruktur",
        "Sistem pemantauan disiplin terintegrasi dengan penilaian kinerja pegawai",
      ],
      catatan: [
        "Pemantauan disiplin berjalan baik dan tingkat kehadiran pegawai tinggi",
        "Perlu peningkatan konsistensi dalam penerapan sanksi pelanggaran disiplin",
        "Sistem fingerprint sudah ada namun sering mengalami kendala teknis",
        "Perlu tindak lanjut yang lebih tegas terhadap pegawai yang sering tidak hadir",
        "Rekap kehadiran sudah rutin dibuat namun belum dianalisis secara mendalam",
      ],
      rekomendasi: [
        "Terapkan sistem absensi elektronik (fingerprint/face recognition) untuk akurasi data",
        "Lakukan rekap dan evaluasi kehadiran pegawai secara rutin setiap bulan",
        "Terapkan reward and punishment yang konsisten terkait kedisiplinan",
        "Integrasikan data disiplin dengan sistem penilaian kinerja pegawai",
        "Dokumentasikan seluruh pemantauan dan tindak lanjut disiplin pegawai",
      ],
    },
    // Indikator 4: Pengembangan kompetensi dilakukan
    {
      keterangan: [
        "Pengembangan kompetensi dilakukan melalui pelatihan, workshop, dan bimtek rutin",
        "Pengembangan kompetensi ada namun belum terprogram secara terstruktur",
        "Pengembangan kompetensi baru berupa penugasan mengikuti kegiatan eksternal",
        "Belum ada program pengembangan kompetensi yang terencana",
        "Program pengembangan kompetensi tersedia berbasis hasil analisis kebutuhan pegawai",
      ],
      catatan: [
        "Program pengembangan kompetensi sudah variatif dan berdampak pada kinerja",
        "Perlu analisis kebutuhan pelatihan yang lebih sistematis",
        "Anggaran pengembangan kompetensi perlu ditingkatkan dari sumber yang ada",
        "Pelatihan internal (in-house training) perlu dikembangkan lebih intensif",
        "Dokumentasi kegiatan pengembangan kompetensi sudah lengkap dan terarsip baik",
      ],
      rekomendasi: [
        "Susun program pengembangan kompetensi berdasarkan analisis kebutuhan pegawai",
        "Alokasikan anggaran yang memadai untuk kegiatan pengembangan SDM",
        "Selenggarakan pelatihan internal secara berkala sesuai kebutuhan madrasah",
        "Fasilitasi pegawai untuk mengikuti pelatihan eksternal yang relevan",
        "Evaluasi dampak pelatihan terhadap peningkatan kinerja pegawai",
      ],
    },
    // Indikator 5: Penilaian kinerja dilaksanakan
    {
      keterangan: [
        "Penilaian kinerja dilaksanakan secara berkala menggunakan SKP dan PPK",
        "Penilaian kinerja dilakukan namun belum seluruh pegawai tercover",
        "Penilaian kinerja baru dilakukan di akhir tahun tanpa monitoring berkala",
        "Belum ada pelaksanaan penilaian kinerja yang terstruktur",
        "Penilaian kinerja terintegrasi dengan sistem e-kinerja dan terdokumentasi baik",
      ],
      catatan: [
        "Pelaksanaan penilaian kinerja sudah sesuai regulasi dan berjalan konsisten",
        "Perlu peningkatan objektivitas dalam penilaian melalui indikator yang terukur",
        "Penilaian kinerja perlu dilakukan secara berkala tidak hanya di akhir tahun",
        "Hasil penilaian kinerja belum optimal digunakan sebagai dasar pengembangan SDM",
        "Sistem penilaian sudah baik dan mencakup aspek kuantitas, kualitas, dan perilaku",
      ],
      rekomendasi: [
        "Laksanakan penilaian kinerja secara berkala sesuai ketentuan yang berlaku",
        "Gunakan indikator kinerja yang terukur dan objektif dalam penilaian",
        "Manfaatkan hasil penilaian sebagai dasar pengembangan karir dan kompetensi",
        "Lakukan monitoring pencapaian kinerja secara triwulanan",
        "Dokumentasikan seluruh proses dan hasil penilaian kinerja dengan baik",
      ],
    },
  ],

  // ========================================
  // AREA 4: PENGUATAN AKUNTABILITAS
  // ========================================
  area4: [
    // Indikator 1: Perencanaan kinerja tersedia
    {
      keterangan: [
        "Dokumen perencanaan kinerja tersedia lengkap meliputi RKM, RKAM, dan perjanjian kinerja",
        "Perencanaan kinerja tersedia namun belum terintegrasi antar dokumen",
        "Perencanaan kinerja ada secara parsial tanpa dokumen perjanjian kinerja",
        "Belum ada dokumen perencanaan kinerja yang terstruktur",
        "Perencanaan kinerja tersedia lengkap dan sudah diselaraskan dengan Renstra Kemenag",
      ],
      catatan: [
        "Dokumen perencanaan kinerja sudah komprehensif dan saling terintegrasi",
        "Perlu penyelarasan antara perencanaan madrasah dengan target kinerja Kemenag",
        "Perjanjian kinerja belum dibuat untuk seluruh jabatan di madrasah",
        "Perencanaan sudah ada namun indikator kinerja belum SMART",
        "Dokumen sudah baik dan mencakup target jangka pendek maupun menengah",
      ],
      rekomendasi: [
        "Susun dokumen perencanaan kinerja yang komprehensif dan terintegrasi",
        "Selaraskan perencanaan kinerja madrasah dengan Renstra dan RKT Kemenag",
        "Buat perjanjian kinerja untuk seluruh pejabat dan pegawai madrasah",
        "Rumuskan indikator kinerja yang SMART (Specific, Measurable, Achievable, Relevant, Time-bound)",
        "Review dan perbarui perencanaan kinerja setiap awal tahun anggaran",
      ],
    },
    // Indikator 2: Target kinerja madrasah ditetapkan
    {
      keterangan: [
        "Target kinerja madrasah ditetapkan secara terukur dan terdokumentasi dalam RKM",
        "Target kinerja ada namun belum seluruhnya terukur dan realistis",
        "Target kinerja ditetapkan secara lisan tanpa dokumentasi formal",
        "Belum ada penetapan target kinerja yang terstruktur",
        "Target kinerja ditetapkan berdasarkan evaluasi tahun sebelumnya dan kebutuhan stakeholder",
      ],
      catatan: [
        "Target kinerja sudah terukur dan realistis sesuai kapasitas madrasah",
        "Beberapa target perlu disesuaikan dengan kondisi aktual di lapangan",
        "Penetapan target perlu melibatkan seluruh unsur madrasah melalui musyawarah",
        "Target sudah ada namun belum dikomunikasikan kepada seluruh pegawai",
        "Baseline data untuk penetapan target perlu diperkuat agar lebih akurat",
      ],
      rekomendasi: [
        "Tetapkan target kinerja yang terukur berdasarkan data dan analisis yang valid",
        "Libatkan seluruh unsur madrasah dalam proses penetapan target kinerja",
        "Komunikasikan target kinerja kepada seluruh pegawai agar menjadi komitmen bersama",
        "Lakukan cascading target dari level madrasah ke level individu pegawai",
        "Evaluasi dan sesuaikan target secara berkala berdasarkan perkembangan aktual",
      ],
    },
    // Indikator 3: Laporan kinerja dibuat
    {
      keterangan: [
        "Laporan kinerja dibuat secara berkala (triwulanan dan tahunan) dengan data akurat",
        "Laporan kinerja hanya dibuat di akhir tahun tanpa laporan periodik",
        "Laporan kinerja dibuat namun belum mencakup seluruh indikator yang ditetapkan",
        "Belum ada pembuatan laporan kinerja yang terstruktur",
        "Laporan kinerja komprehensif mencakup capaian, kendala, dan rencana tindak lanjut",
      ],
      catatan: [
        "Laporan kinerja sudah lengkap dan disampaikan tepat waktu",
        "Perlu peningkatan kualitas analisis dalam laporan kinerja",
        "Laporan perlu ditambahkan perbandingan capaian dengan target yang ditetapkan",
        "Format laporan sudah baik namun data pendukung perlu diperkuat",
        "Laporan sudah memuat rekomendasi perbaikan namun belum ditindaklanjuti secara konsisten",
      ],
      rekomendasi: [
        "Buat laporan kinerja secara berkala minimal setiap triwulan",
        "Sertakan analisis gap antara target dan capaian dalam setiap laporan",
        "Lengkapi laporan dengan data pendukung dan bukti capaian kinerja",
        "Sampaikan laporan kinerja tepat waktu sesuai ketentuan yang berlaku",
        "Gunakan laporan kinerja sebagai bahan evaluasi dan perbaikan berkelanjutan",
      ],
    },
    // Indikator 4: Evaluasi kinerja dilakukan
    {
      keterangan: [
        "Evaluasi kinerja dilakukan secara berkala dengan instrumen yang terstandar",
        "Evaluasi kinerja dilakukan namun belum menggunakan instrumen baku",
        "Evaluasi kinerja hanya dilakukan secara informal tanpa dokumentasi",
        "Belum ada pelaksanaan evaluasi kinerja secara terstruktur",
        "Evaluasi kinerja dilakukan komprehensif melibatkan self-assessment dan penilaian atasan",
      ],
      catatan: [
        "Proses evaluasi kinerja sudah berjalan baik dan menghasilkan perbaikan nyata",
        "Instrumen evaluasi perlu disesuaikan dengan indikator kinerja yang telah ditetapkan",
        "Evaluasi perlu dilakukan lebih sering tidak hanya di akhir tahun",
        "Hasil evaluasi belum optimal dimanfaatkan untuk pengambilan keputusan",
        "Objektivitas evaluasi perlu ditingkatkan melalui multi-rater assessment",
      ],
      rekomendasi: [
        "Lakukan evaluasi kinerja secara berkala menggunakan instrumen terstandar",
        "Gunakan pendekatan multi-rater untuk meningkatkan objektivitas evaluasi",
        "Manfaatkan hasil evaluasi sebagai dasar pengambilan keputusan manajemen",
        "Berikan umpan balik konstruktif kepada pegawai berdasarkan hasil evaluasi",
        "Dokumentasikan seluruh proses evaluasi dan tindak lanjutnya",
      ],
    },
    // Indikator 5: Tindak lanjut evaluasi tersedia
    {
      keterangan: [
        "Tindak lanjut evaluasi tersedia dan terdokumentasi dengan timeline pelaksanaan",
        "Tindak lanjut evaluasi ada namun belum seluruhnya dilaksanakan",
        "Tindak lanjut hanya berupa catatan tanpa rencana aksi yang jelas",
        "Belum ada tindak lanjut dari hasil evaluasi kinerja",
        "Tindak lanjut evaluasi dilaksanakan konsisten dan berdampak pada peningkatan kinerja",
      ],
      catatan: [
        "Tindak lanjut sudah dilaksanakan secara konsisten dan berdampak positif",
        "Perlu percepatan pelaksanaan tindak lanjut yang masih tertunda",
        "Monitoring tindak lanjut perlu ditingkatkan agar berjalan sesuai timeline",
        "Beberapa tindak lanjut memerlukan dukungan anggaran yang belum tersedia",
        "Dokumentasi pelaksanaan tindak lanjut sudah baik dan dapat diverifikasi",
      ],
      rekomendasi: [
        "Susun rencana tindak lanjut yang konkret dengan timeline dan penanggung jawab",
        "Monitor pelaksanaan tindak lanjut secara berkala untuk memastikan ketepatan waktu",
        "Alokasikan sumber daya yang diperlukan untuk pelaksanaan tindak lanjut",
        "Laporkan progress pelaksanaan tindak lanjut dalam rapat pimpinan berkala",
        "Evaluasi efektivitas tindak lanjut terhadap peningkatan kinerja madrasah",
      ],
    },
  ],

  // ========================================
  // AREA 5: PENGUATAN PENGAWASAN
  // ========================================
  area5: [
    // Indikator 1: Pengendalian gratifikasi disosialisasikan
    {
      keterangan: [
        "Sosialisasi pengendalian gratifikasi dilakukan secara rutin dengan dokumentasi lengkap",
        "Sosialisasi gratifikasi dilakukan satu kali dalam tahun berjalan",
        "Informasi pengendalian gratifikasi tersedia di papan pengumuman saja",
        "Belum ada sosialisasi pengendalian gratifikasi kepada pegawai",
        "Sosialisasi gratifikasi dilakukan berkala dan pegawai memahami mekanisme pelaporan",
      ],
      catatan: [
        "Pemahaman pegawai tentang gratifikasi sudah baik berdasarkan hasil sosialisasi",
        "Perlu peningkatan frekuensi sosialisasi agar seluruh pegawai paham",
        "Materi sosialisasi perlu dilengkapi dengan contoh kasus yang relevan",
        "Perlu penyediaan saluran pelaporan gratifikasi yang mudah diakses",
        "Sosialisasi sudah mencakup definisi, jenis, dan mekanisme pelaporan gratifikasi",
      ],
      rekomendasi: [
        "Lakukan sosialisasi pengendalian gratifikasi secara berkala minimal setiap semester",
        "Sediakan materi sosialisasi dengan contoh kasus yang relevan di lingkungan madrasah",
        "Pasang banner/poster anti gratifikasi di area yang mudah terlihat",
        "Sediakan saluran pelaporan gratifikasi yang mudah diakses pegawai",
        "Dokumentasikan bukti sosialisasi berupa notulen, daftar hadir, dan materi",
      ],
    },
    // Indikator 2: Kanal pengaduan tersedia
    {
      keterangan: [
        "Kanal pengaduan tersedia dan berfungsi aktif melalui berbagai media",
        "Kanal pengaduan tersedia namun belum disosialisasikan secara optimal",
        "Hanya tersedia kotak saran fisik yang jarang dipantau",
        "Belum ada kanal pengaduan yang disediakan untuk masyarakat",
        "Kanal pengaduan terintegrasi meliputi kotak saran, WhatsApp, email, dan SP4N-LAPOR",
      ],
      catatan: [
        "Kanal pengaduan berfungsi baik dan responsif terhadap laporan masyarakat",
        "Perlu penambahan kanal digital untuk mempermudah akses masyarakat",
        "Pengelolaan pengaduan perlu ditingkatkan agar lebih responsif",
        "Kanal sudah tersedia namun masyarakat belum banyak yang mengetahui",
        "Perlu penunjukan petugas khusus pengelola pengaduan dengan SOP yang jelas",
      ],
      rekomendasi: [
        "Sediakan kanal pengaduan yang variatif dan mudah diakses masyarakat",
        "Sosialisasikan keberadaan kanal pengaduan kepada seluruh stakeholder",
        "Tunjuk petugas pengelola pengaduan dengan uraian tugas yang jelas",
        "Integrasikan kanal pengaduan madrasah dengan SP4N-LAPOR Kemenag",
        "Buat SOP pengelolaan pengaduan dengan standar waktu penyelesaian",
      ],
    },
    // Indikator 3: Benturan kepentingan dicegah
    {
      keterangan: [
        "Pencegahan benturan kepentingan terdokumentasi melalui pakta integritas dan kebijakan",
        "Pakta integritas sudah ditandatangani namun belum ada kebijakan pencegahan lainnya",
        "Pencegahan benturan kepentingan baru sebatas himbauan lisan",
        "Belum ada upaya pencegahan benturan kepentingan yang terdokumentasi",
        "Kebijakan pencegahan benturan kepentingan sudah komprehensif dan dipahami seluruh pegawai",
      ],
      catatan: [
        "Pakta integritas sudah ditandatangani seluruh pegawai dan dipahami dengan baik",
        "Perlu identifikasi titik-titik rawan benturan kepentingan di madrasah",
        "Kebijakan pencegahan perlu diperkuat dengan sanksi yang jelas",
        "Pemahaman pegawai tentang benturan kepentingan perlu ditingkatkan",
        "Sudah ada mekanisme penanganan jika terjadi benturan kepentingan",
      ],
      rekomendasi: [
        "Buat kebijakan pencegahan benturan kepentingan secara tertulis",
        "Identifikasi titik-titik rawan benturan kepentingan dalam pelayanan madrasah",
        "Wajibkan penandatanganan pakta integritas oleh seluruh pegawai setiap tahun",
        "Sosialisasikan kebijakan pencegahan benturan kepentingan secara berkala",
        "Tetapkan mekanisme penanganan dan sanksi jika terjadi benturan kepentingan",
      ],
    },
    // Indikator 4: Pengawasan internal dilakukan
    {
      keterangan: [
        "Pengawasan internal dilakukan secara berkala oleh Kepala Madrasah dan tim pengawas",
        "Pengawasan internal dilakukan namun belum terjadwal secara rutin",
        "Pengawasan hanya dilakukan saat ada pemeriksaan dari pihak eksternal",
        "Belum ada mekanisme pengawasan internal yang terstruktur",
        "Sistem pengawasan internal berjalan efektif dengan instrumen dan jadwal yang jelas",
      ],
      catatan: [
        "Pengawasan internal berjalan baik dan menghasilkan temuan yang ditindaklanjuti",
        "Perlu penyusunan jadwal pengawasan yang lebih terstruktur",
        "Instrumen pengawasan perlu distandarkan agar hasilnya terukur",
        "Tindak lanjut temuan pengawasan internal perlu dipercepat",
        "Pengawasan sudah mencakup aspek keuangan, administrasi, dan pelayanan",
      ],
      rekomendasi: [
        "Susun jadwal pengawasan internal yang terstruktur dan terdokumentasi",
        "Kembangkan instrumen pengawasan yang terstandar untuk setiap aspek",
        "Tindaklanjuti setiap temuan pengawasan internal secara tepat waktu",
        "Libatkan unsur pengawas madrasah dalam pelaksanaan pengawasan",
        "Laporkan hasil pengawasan internal dalam rapat pimpinan secara berkala",
      ],
    },
    // Indikator 5: Tindak lanjut pengaduan terdokumentasi
    {
      keterangan: [
        "Seluruh tindak lanjut pengaduan terdokumentasi lengkap dengan bukti penyelesaian",
        "Tindak lanjut pengaduan ada namun dokumentasi belum lengkap",
        "Pengaduan ditangani secara informal tanpa pencatatan yang memadai",
        "Belum ada mekanisme tindak lanjut pengaduan yang terdokumentasi",
        "Tindak lanjut pengaduan tercatat dalam register dan dilaporkan secara berkala",
      ],
      catatan: [
        "Penanganan pengaduan sudah baik dengan waktu respon yang cepat",
        "Perlu penyempurnaan sistem pencatatan dan tracking pengaduan",
        "Beberapa pengaduan belum ditindaklanjuti sesuai standar waktu yang ditetapkan",
        "Register pengaduan sudah tersedia namun belum dianalisis secara berkala",
        "Perlu pelaporan berkala tentang statistik dan penanganan pengaduan",
      ],
      rekomendasi: [
        "Buat register pengaduan yang mencatat seluruh laporan dan tindak lanjutnya",
        "Tetapkan standar waktu penyelesaian untuk setiap jenis pengaduan",
        "Dokumentasikan bukti penyelesaian pengaduan secara lengkap",
        "Laporkan statistik pengaduan dan penanganannya secara berkala",
        "Analisis tren pengaduan untuk perbaikan layanan secara berkelanjutan",
      ],
    },
  ],

  // ========================================
  // AREA 6: PENINGKATAN KUALITAS PELAYANAN PUBLIK
  // ========================================
  area6: [
    // Indikator 1: Standar layanan tersedia
    {
      keterangan: [
        "Standar layanan tersedia lengkap untuk seluruh jenis layanan madrasah",
        "Standar layanan tersedia sebagian dan belum mencakup seluruh layanan",
        "Standar layanan dalam proses penyusunan dan belum ditetapkan resmi",
        "Belum ada standar layanan yang terdokumentasi di madrasah",
        "Standar layanan tersedia mencakup komponen pelayanan sesuai Permenpan RB",
      ],
      catatan: [
        "Standar layanan sudah lengkap dan sesuai dengan ketentuan peraturan perundangan",
        "Perlu penambahan standar untuk layanan baru yang belum tercakup",
        "Standar layanan perlu disesuaikan dengan perkembangan regulasi terbaru",
        "Komponen standar layanan perlu dilengkapi terutama mekanisme pengaduan",
        "Standar sudah mencakup persyaratan, prosedur, waktu, biaya, dan jaminan layanan",
      ],
      rekomendasi: [
        "Susun standar layanan untuk seluruh jenis layanan yang diberikan madrasah",
        "Pastikan standar layanan memuat komponen sesuai Permenpan RB yang berlaku",
        "Review dan perbarui standar layanan secara berkala minimal setiap tahun",
        "Tetapkan standar layanan melalui keputusan Kepala Madrasah",
        "Sosialisasikan standar layanan kepada seluruh petugas pelayanan",
      ],
    },
    // Indikator 2: Maklumat layanan dipublikasikan
    {
      keterangan: [
        "Maklumat layanan dipublikasikan dan dipasang di area pelayanan yang strategis",
        "Maklumat layanan tersedia namun belum dipublikasikan secara luas",
        "Maklumat layanan masih dalam proses penyusunan",
        "Belum ada maklumat layanan yang dibuat dan dipublikasikan",
        "Maklumat layanan dipublikasikan melalui media fisik dan digital secara bersamaan",
      ],
      catatan: [
        "Maklumat layanan sudah terpasang baik dan mudah dibaca oleh masyarakat",
        "Penempatan maklumat perlu dipindahkan ke lokasi yang lebih strategis",
        "Isi maklumat perlu disesuaikan dengan standar layanan yang telah ditetapkan",
        "Maklumat layanan perlu diterjemahkan ke dalam bahasa yang mudah dipahami",
        "Desain maklumat sudah menarik dan mencantumkan janji layanan yang jelas",
      ],
      rekomendasi: [
        "Buat dan publikasikan maklumat layanan di area strategis yang mudah terlihat",
        "Cantumkan janji layanan yang realistis dan dapat dipenuhi dalam maklumat",
        "Publikasikan maklumat layanan juga melalui media digital madrasah",
        "Desain maklumat layanan secara menarik dan mudah dibaca oleh masyarakat",
        "Perbarui maklumat layanan jika ada perubahan standar atau prosedur layanan",
      ],
    },
    // Indikator 3: Survei kepuasan masyarakat dilakukan
    {
      keterangan: [
        "Survei kepuasan masyarakat dilakukan secara berkala dan hasilnya ditindaklanjuti",
        "Survei kepuasan dilakukan satu kali dalam tahun berjalan",
        "Survei kepuasan dalam tahap perencanaan dan belum dilaksanakan",
        "Belum pernah dilakukan survei kepuasan masyarakat",
        "Survei kepuasan dilakukan menggunakan instrumen terstandar sesuai Permenpan RB",
      ],
      catatan: [
        "Hasil survei menunjukkan tingkat kepuasan yang baik dan terus meningkat",
        "Perlu peningkatan jumlah responden agar hasil lebih representatif",
        "Instrumen survei perlu disesuaikan dengan standar yang ditetapkan Permenpan RB",
        "Hasil survei belum optimal digunakan sebagai bahan perbaikan layanan",
        "Pelaksanaan survei sudah melibatkan seluruh pengguna layanan madrasah",
      ],
      rekomendasi: [
        "Lakukan survei kepuasan masyarakat secara berkala minimal setiap semester",
        "Gunakan instrumen survei sesuai Permenpan RB yang berlaku",
        "Tingkatkan jumlah responden untuk meningkatkan representativitas hasil",
        "Analisis dan tindaklanjuti hasil survei untuk perbaikan layanan",
        "Publikasikan hasil survei kepuasan sebagai bentuk transparansi",
      ],
    },
    // Indikator 4: Pengaduan masyarakat ditindaklanjuti
    {
      keterangan: [
        "Seluruh pengaduan masyarakat ditindaklanjuti dan terdokumentasi dengan baik",
        "Pengaduan ditindaklanjuti namun belum seluruhnya terdokumentasi",
        "Penanganan pengaduan dilakukan secara informal tanpa mekanisme baku",
        "Belum ada mekanisme penanganan pengaduan masyarakat yang terstruktur",
        "Pengaduan ditindaklanjuti sesuai SOP dengan standar waktu penyelesaian yang jelas",
      ],
      catatan: [
        "Penanganan pengaduan sudah responsif dan memuaskan pelapor",
        "Perlu peningkatan kecepatan respon dalam menangani pengaduan",
        "Mekanisme feedback kepada pelapor perlu diperbaiki",
        "Register pengaduan perlu dikelola secara lebih sistematis",
        "Sudah ada kategorisasi pengaduan berdasarkan tingkat urgensi penanganan",
      ],
      rekomendasi: [
        "Buat SOP penanganan pengaduan dengan standar waktu penyelesaian",
        "Tingkatkan responsivitas dalam menangani setiap pengaduan yang masuk",
        "Berikan feedback kepada pelapor tentang status penanganan pengaduannya",
        "Kelola register pengaduan secara sistematis dan terdokumentasi",
        "Analisis tren pengaduan untuk mengidentifikasi area perbaikan layanan",
      ],
    },
    // Indikator 5: Inovasi pelayanan madrasah tersedia
    {
      keterangan: [
        "Inovasi pelayanan tersedia dan memberikan dampak positif terhadap kualitas layanan",
        "Inovasi pelayanan ada namun masih dalam tahap uji coba",
        "Ide inovasi sudah direncanakan namun belum diimplementasikan",
        "Belum ada inovasi pelayanan yang dikembangkan di madrasah",
        "Inovasi pelayanan sudah berjalan berkelanjutan dan direplikasi oleh madrasah lain",
      ],
      catatan: [
        "Inovasi layanan sudah berdampak signifikan dan mendapat apresiasi stakeholder",
        "Perlu pengembangan inovasi yang lebih berdampak pada pengguna layanan",
        "Inovasi perlu didokumentasikan secara sistematis agar dapat direplikasi",
        "Dukungan anggaran dan SDM untuk inovasi perlu ditingkatkan",
        "Inovasi sudah memanfaatkan teknologi digital untuk kemudahan akses layanan",
      ],
      rekomendasi: [
        "Kembangkan inovasi pelayanan yang berdampak langsung pada kepuasan masyarakat",
        "Dokumentasikan inovasi secara sistematis meliputi latar belakang, proses, dan dampak",
        "Alokasikan sumber daya yang memadai untuk pengembangan inovasi layanan",
        "Libatkan seluruh warga madrasah dalam proses pengembangan inovasi",
        "Daftarkan inovasi pada kompetisi inovasi pelayanan publik tingkat Kemenag",
      ],
    },
  ],
};
