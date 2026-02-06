-- RLS Fix for Backend Service Role
-- Bu SQL'i Supabase SQL Editor'de çalıştır

-- Option 1: Service role için bypass policy ekle (ÖNERİLEN)
-- Backend service_role kullandığı için otomatik bypass olmalı
-- Ama ek güvenlik için explicit policy ekleyebiliriz

-- Users tablosundaki mevcut SELECT policy'yi kontrol et
SELECT * FROM pg_policies WHERE tablename = 'users';

-- Eğer problem devam ederse, geçici olarak RLS'i kapat (SADECE TEST İÇİN)
-- ALTER TABLE users DISABLE ROW LEVEL SECURITY;

-- VEYA: Backend için özel policy ekle (daha güvenli)
CREATE POLICY "Service role can read all users"
  ON users FOR SELECT
  TO service_role
  USING (true);

-- Not: service_role zaten RLS'i bypass eder, 
-- ama bazı durumlarda explicit policy gerekebilir
