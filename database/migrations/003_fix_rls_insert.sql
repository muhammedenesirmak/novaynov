-- RLS Policy Fix - Users Table INSERT
-- Bu dosyayı Supabase SQL Editor'de çalıştır

-- Users tablosuna INSERT policy ekle (kayıt açık olmalı)
CREATE POLICY "Anyone can insert users during registration"
  ON users FOR INSERT
  WITH CHECK (true);

-- NOT: Bu geçici bir çözüm
-- Production'da daha güvenli bir yöntem kullanılmalı
-- (örneğin: auth.uid() kontrolü ya da backend'den service_role kullanımı)
