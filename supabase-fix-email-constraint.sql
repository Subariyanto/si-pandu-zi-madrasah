-- Fix: allow multiple users without email (remove unique constraint)
-- Jalankan di Supabase SQL Editor

ALTER TABLE users ALTER COLUMN email DROP NOT NULL;
ALTER TABLE users DROP CONSTRAINT IF EXISTS users_email_key;
