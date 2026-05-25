-- Tambah kolom username dan nip ke tabel users
-- Jalankan di Supabase SQL Editor

ALTER TABLE users ADD COLUMN IF NOT EXISTS username TEXT;
ALTER TABLE users ADD COLUMN IF NOT EXISTS nip TEXT;

-- Update NIP untuk user pengawas demo
UPDATE users SET nip = '197501152003121004', username = 'ahmadfauzi' WHERE email = 'pengawas@zipokjawas.id';
