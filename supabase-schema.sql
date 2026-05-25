-- SI-PANDU ZI MADRASAH - Database Schema
-- Run this in Supabase SQL Editor

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Users table
CREATE TABLE IF NOT EXISTS users (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  email TEXT UNIQUE NOT NULL,
  name TEXT NOT NULL,
  role TEXT NOT NULL CHECK (role IN ('admin', 'ketua', 'pengawas', 'madrasah')),
  pengawas_id UUID,
  madrasah_id UUID,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Pengawas table
CREATE TABLE IF NOT EXISTS pengawas (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  nama TEXT NOT NULL,
  nip TEXT,
  nuptk TEXT,
  pangkat TEXT,
  jabatan TEXT,
  wilayah TEXT,
  hp TEXT,
  email TEXT,
  foto TEXT,
  status TEXT DEFAULT 'aktif',
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Madrasah table
CREATE TABLE IF NOT EXISTS madrasah (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  nama TEXT NOT NULL,
  nsm TEXT,
  npsn TEXT,
  jenjang TEXT CHECK (jenjang IN ('RA', 'MI', 'MTs', 'MA')),
  status_madrasah TEXT CHECK (status_madrasah IN ('Negeri', 'Swasta')),
  kepala_madrasah TEXT,
  hp_kepala TEXT,
  email TEXT,
  alamat TEXT,
  kecamatan TEXT,
  pengawas_id UUID REFERENCES pengawas(id),
  pengawas_nama TEXT,
  jumlah_guru INTEGER DEFAULT 0,
  jumlah_siswa INTEGER DEFAULT 0,
  status_zi TEXT DEFAULT 'Belum Mulai' CHECK (status_zi IN ('Belum Mulai', 'Proses', 'Siap Evaluasi', 'Selesai')),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Pendampingan table
CREATE TABLE IF NOT EXISTS pendampingan (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  tanggal DATE,
  pengawas_id UUID REFERENCES pengawas(id),
  pengawas_nama TEXT,
  madrasah_id UUID REFERENCES madrasah(id),
  madrasah_nama TEXT,
  jenis TEXT CHECK (jenis IN ('Online', 'Offline')),
  materi TEXT,
  permasalahan TEXT,
  rekomendasi TEXT,
  tindak_lanjut TEXT,
  target DATE,
  status TEXT DEFAULT 'Belum Ditindaklanjuti' CHECK (status IN ('Belum Ditindaklanjuti', 'Proses', 'Selesai')),
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Checklist ZI table
CREATE TABLE IF NOT EXISTS checklist (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  madrasah_id UUID REFERENCES madrasah(id),
  data JSONB NOT NULL DEFAULT '{}',
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Eviden table
CREATE TABLE IF NOT EXISTS eviden (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  madrasah_id UUID REFERENCES madrasah(id),
  madrasah_nama TEXT,
  area_id TEXT,
  area_name TEXT,
  indikator TEXT,
  jenis_doc TEXT,
  file_url TEXT,
  file_name TEXT,
  keterangan TEXT,
  status_verifikasi TEXT DEFAULT 'Menunggu' CHECK (status_verifikasi IN ('Menunggu', 'Diterima', 'Perlu Revisi')),
  catatan_verifikator TEXT,
  tanggal_upload DATE DEFAULT CURRENT_DATE,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Kartu Kendali table
CREATE TABLE IF NOT EXISTS kartu_kendali (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  bulan TEXT,
  tahun INTEGER,
  madrasah_id UUID REFERENCES madrasah(id),
  madrasah_nama TEXT,
  pengawas_id UUID REFERENCES pengawas(id),
  pengawas_nama TEXT,
  capaian TEXT,
  kendala TEXT,
  rekomendasi TEXT,
  tindak_lanjut TEXT,
  target_berikutnya TEXT,
  status TEXT DEFAULT 'Kuning' CHECK (status IN ('Merah', 'Kuning', 'Hijau')),
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Klinik ZI table
CREATE TABLE IF NOT EXISTS klinik (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  tanggal DATE,
  madrasah_id UUID REFERENCES madrasah(id),
  madrasah_nama TEXT,
  nama_peserta TEXT,
  jabatan_peserta TEXT,
  topik TEXT,
  permasalahan TEXT,
  solusi TEXT,
  tindak_lanjut TEXT,
  jadwal_monitoring DATE,
  dokumentasi TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Survei table
CREATE TABLE IF NOT EXISTS survei (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  madrasah_id UUID REFERENCES madrasah(id),
  madrasah_nama TEXT,
  tanggal DATE DEFAULT CURRENT_DATE,
  kategori_responden TEXT,
  nama_responden TEXT,
  jawaban JSONB NOT NULL DEFAULT '[]',
  kritik_saran TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Pengaduan table
CREATE TABLE IF NOT EXISTS pengaduan (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  tiket TEXT UNIQUE NOT NULL,
  tanggal DATE DEFAULT CURRENT_DATE,
  nama_pelapor TEXT,
  kategori_pelapor TEXT,
  madrasah_id UUID REFERENCES madrasah(id),
  madrasah_nama TEXT,
  jenis_pengaduan TEXT,
  isi_pengaduan TEXT,
  bukti TEXT,
  status TEXT DEFAULT 'Masuk' CHECK (status IN ('Masuk', 'Diverifikasi', 'Diproses', 'Selesai', 'Ditolak')),
  tindak_lanjut TEXT,
  tanggal_penyelesaian DATE,
  petugas_tindak_lanjut TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Row Level Security (RLS)
ALTER TABLE pengawas ENABLE ROW LEVEL SECURITY;
ALTER TABLE madrasah ENABLE ROW LEVEL SECURITY;
ALTER TABLE pendampingan ENABLE ROW LEVEL SECURITY;
ALTER TABLE checklist ENABLE ROW LEVEL SECURITY;
ALTER TABLE eviden ENABLE ROW LEVEL SECURITY;
ALTER TABLE kartu_kendali ENABLE ROW LEVEL SECURITY;
ALTER TABLE klinik ENABLE ROW LEVEL SECURITY;
ALTER TABLE survei ENABLE ROW LEVEL SECURITY;
ALTER TABLE pengaduan ENABLE ROW LEVEL SECURITY;

-- Public read policies for survei and pengaduan (public forms)
CREATE POLICY "Allow public insert survei" ON survei FOR INSERT WITH CHECK (true);
CREATE POLICY "Allow public insert pengaduan" ON pengaduan FOR INSERT WITH CHECK (true);

-- Allow authenticated users to read all data
CREATE POLICY "Allow authenticated read pengawas" ON pengawas FOR SELECT USING (true);
CREATE POLICY "Allow authenticated read madrasah" ON madrasah FOR SELECT USING (true);
CREATE POLICY "Allow authenticated read pendampingan" ON pendampingan FOR SELECT USING (true);
CREATE POLICY "Allow authenticated read checklist" ON checklist FOR SELECT USING (true);
CREATE POLICY "Allow authenticated read eviden" ON eviden FOR SELECT USING (true);
CREATE POLICY "Allow authenticated read kartu_kendali" ON kartu_kendali FOR SELECT USING (true);
CREATE POLICY "Allow authenticated read klinik" ON klinik FOR SELECT USING (true);
CREATE POLICY "Allow authenticated read survei" ON survei FOR SELECT USING (true);
CREATE POLICY "Allow authenticated read pengaduan" ON pengaduan FOR SELECT USING (true);

-- Allow authenticated users to insert/update/delete
CREATE POLICY "Allow authenticated insert pengawas" ON pengawas FOR INSERT WITH CHECK (true);
CREATE POLICY "Allow authenticated update pengawas" ON pengawas FOR UPDATE USING (true);
CREATE POLICY "Allow authenticated delete pengawas" ON pengawas FOR DELETE USING (true);

CREATE POLICY "Allow authenticated insert madrasah" ON madrasah FOR INSERT WITH CHECK (true);
CREATE POLICY "Allow authenticated update madrasah" ON madrasah FOR UPDATE USING (true);
CREATE POLICY "Allow authenticated delete madrasah" ON madrasah FOR DELETE USING (true);

CREATE POLICY "Allow authenticated insert pendampingan" ON pendampingan FOR INSERT WITH CHECK (true);
CREATE POLICY "Allow authenticated update pendampingan" ON pendampingan FOR UPDATE USING (true);
CREATE POLICY "Allow authenticated delete pendampingan" ON pendampingan FOR DELETE USING (true);

CREATE POLICY "Allow authenticated insert checklist" ON checklist FOR INSERT WITH CHECK (true);
CREATE POLICY "Allow authenticated update checklist" ON checklist FOR UPDATE USING (true);
CREATE POLICY "Allow authenticated delete checklist" ON checklist FOR DELETE USING (true);

CREATE POLICY "Allow authenticated insert eviden" ON eviden FOR INSERT WITH CHECK (true);
CREATE POLICY "Allow authenticated update eviden" ON eviden FOR UPDATE USING (true);
CREATE POLICY "Allow authenticated delete eviden" ON eviden FOR DELETE USING (true);

CREATE POLICY "Allow authenticated insert kartu_kendali" ON kartu_kendali FOR INSERT WITH CHECK (true);
CREATE POLICY "Allow authenticated update kartu_kendali" ON kartu_kendali FOR UPDATE USING (true);
CREATE POLICY "Allow authenticated delete kartu_kendali" ON kartu_kendali FOR DELETE USING (true);

CREATE POLICY "Allow authenticated insert klinik" ON klinik FOR INSERT WITH CHECK (true);
CREATE POLICY "Allow authenticated update klinik" ON klinik FOR UPDATE USING (true);
CREATE POLICY "Allow authenticated delete klinik" ON klinik FOR DELETE USING (true);

CREATE POLICY "Allow authenticated update survei" ON survei FOR UPDATE USING (true);
CREATE POLICY "Allow authenticated delete survei" ON survei FOR DELETE USING (true);

CREATE POLICY "Allow authenticated update pengaduan" ON pengaduan FOR UPDATE USING (true);
CREATE POLICY "Allow authenticated delete pengaduan" ON pengaduan FOR DELETE USING (true);

-- Insert sample data
INSERT INTO pengawas (id, nama, nip, nuptk, pangkat, jabatan, wilayah, hp, email, status) VALUES
  ('a1b2c3d4-e5f6-7890-abcd-ef1234567890', 'Ahmad Fauzi, S.Pd.I', '197501152003121004', '1234567890123456', 'Pembina / IV-a', 'Pengawas Madrasah Muda', 'Kecamatan Banjar', '081234567890', 'ahmadfauzi@kemenag.go.id', 'aktif'),
  ('b2c3d4e5-f6a7-8901-bcde-f12345678901', 'Siti Aminah, M.Pd', '198003202005012003', '2345678901234567', 'Penata Tk.I / III-d', 'Pengawas Madrasah Muda', 'Kecamatan Martapura', '082345678901', 'sitiaminah@kemenag.go.id', 'aktif'),
  ('c3d4e5f6-a7b8-9012-cdef-123456789012', 'Muhammad Hasan, M.Pd.I', '197808102002121003', '3456789012345678', 'Pembina / IV-a', 'Pengawas Madrasah Madya', 'Kecamatan Gambut', '083456789012', 'muhammadhasan@kemenag.go.id', 'aktif');

INSERT INTO madrasah (id, nama, nsm, npsn, jenjang, status_madrasah, kepala_madrasah, hp_kepala, email, alamat, kecamatan, pengawas_id, pengawas_nama, jumlah_guru, jumlah_siswa, status_zi) VALUES
  ('d4e5f6a7-b8c9-0123-defa-234567890123', 'MI Al-Ikhlas', '111263020001', '60723001', 'MI', 'Swasta', 'Hj. Fatimah, S.Ag', '085678901234', 'mi.alikhlas@gmail.com', 'Jl. Masjid No. 10', 'Kecamatan Banjar', 'a1b2c3d4-e5f6-7890-abcd-ef1234567890', 'Ahmad Fauzi, S.Pd.I', 15, 210, 'Proses'),
  ('e5f6a7b8-c9d0-1234-efab-345678901234', 'MTs Nurul Huda', '121263020002', '60723002', 'MTs', 'Swasta', 'H. Abdul Rahman, S.Pd.I', '086789012345', 'mts.nurulhuda@gmail.com', 'Jl. Pendidikan No. 5', 'Kecamatan Martapura', 'b2c3d4e5-f6a7-8901-bcde-f12345678901', 'Siti Aminah, M.Pd', 25, 350, 'Siap Evaluasi'),
  ('f6a7b8c9-d0e1-2345-fabc-456789012345', 'MA Darussalam', '131263020003', '60723003', 'MA', 'Swasta', 'Drs. H. Mahmud, M.Pd', '087890123456', 'ma.darussalam@gmail.com', 'Jl. Pesantren No. 15', 'Kecamatan Gambut', 'c3d4e5f6-a7b8-9012-cdef-123456789012', 'Muhammad Hasan, M.Pd.I', 30, 280, 'Proses'),
  ('a7b8c9d0-e1f2-3456-abcd-567890123456', 'RA Al-Hidayah', '101263020004', '60723004', 'RA', 'Swasta', 'Hj. Nurhasanah, S.Pd.I', '088901234567', 'ra.alhidayah@gmail.com', 'Jl. Melati No. 3', 'Kecamatan Banjar', 'a1b2c3d4-e5f6-7890-abcd-ef1234567890', 'Ahmad Fauzi, S.Pd.I', 8, 65, 'Belum Mulai'),
  ('b8c9d0e1-f2a3-4567-bcde-678901234567', 'MI Raudatul Jannah', '111263020005', '60723005', 'MI', 'Swasta', 'Ahmad Ridwan, S.Pd.I', '089012345678', 'mi.raudatuljannah@gmail.com', 'Jl. Dahlia No. 7', 'Kecamatan Martapura', 'b2c3d4e5-f6a7-8901-bcde-f12345678901', 'Siti Aminah, M.Pd', 12, 180, 'Proses');

-- Insert users
INSERT INTO users (email, name, role, pengawas_id, madrasah_id) VALUES
  ('admin@zipokjawas.id', 'Administrator', 'admin', NULL, NULL),
  ('ketua@zipokjawas.id', 'H. Sulaiman, M.Pd.I', 'ketua', NULL, NULL),
  ('pengawas@zipokjawas.id', 'Ahmad Fauzi, S.Pd.I', 'pengawas', 'a1b2c3d4-e5f6-7890-abcd-ef1234567890', NULL),
  ('madrasah@zipokjawas.id', 'Hj. Fatimah, S.Ag', 'madrasah', NULL, 'd4e5f6a7-b8c9-0123-defa-234567890123');

-- Create storage bucket for file uploads
INSERT INTO storage.buckets (id, name, public) VALUES ('eviden', 'eviden', true) ON CONFLICT DO NOTHING;
