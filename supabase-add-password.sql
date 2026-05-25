-- Tambah kolom password ke tabel users
-- Jalankan di Supabase SQL Editor

ALTER TABLE users ADD COLUMN IF NOT EXISTS password TEXT;

-- Update password default untuk akun demo
UPDATE users SET password = 'admin123' WHERE email = 'admin@zipokjawas.id';
UPDATE users SET password = 'ketua123' WHERE email = 'ketua@zipokjawas.id';
UPDATE users SET password = 'pengawas123' WHERE email = 'pengawas@zipokjawas.id';
UPDATE users SET password = 'madrasah123' WHERE email = 'madrasah@zipokjawas.id';
