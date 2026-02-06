-- Test Verisi - TYT-AYT Dersleri, Konuları ve Soruları
-- SCHEMA'ya UYGUN VERSİYON
-- Bu dosyayı Supabase SQL Editor'de çalıştır

-- ============================================================================
-- SUBJECTS (Dersler)
-- ============================================================================

INSERT INTO subjects (name, slug, color, order_index, is_active)
VALUES
  ('Matematik', 'matematik', '#3B82F6', 1, true),
  ('Fizik', 'fizik', '#8B5CF6', 2, true),
  ('Tarih', 'tarih', '#EF4444', 3, true),
  ('Coğrafya', 'cografya', '#10B981', 4, true)
ON CONFLICT (slug) DO NOTHING;

-- ============================================================================
-- TOPICS (Konular)
-- ============================================================================

-- Matematik Konuları
INSERT INTO topics (subject_id, name, slug, description, order_index, is_active)
SELECT s.id, t.* FROM subjects s
CROSS JOIN (VALUES
  ('Sayı Kümeleri', 'sayi-kumeleri', 'Doğal sayılar, tam sayılar, rasyonel ve irrasyonel sayılar', 1, true),
  ('Üslü Sayılar', 'uslu-sayilar', 'Üslü ifadeler ve kuvvet hesaplamaları', 2, true),
  ('Köklü Sayılar', 'koklu-sayilar', 'Karekök ve kökten kurtarma işlemleri', 3, true)
) AS t(name, slug, description, order_index, is_active)
WHERE s.slug = 'matematik'
ON CONFLICT (subject_id, slug) DO NOTHING;

-- Fizik Konuları
INSERT INTO topics (subject_id, name, slug, description, order_index, is_active)
SELECT s.id, t.* FROM subjects s
CROSS JOIN (VALUES
  ('Hareket', 'hareket', 'Düzgün ve düzgün değişen hareketler', 1, true),
  ('Kuvvet', 'kuvvet', 'Newton kanunları ve kuvvet türleri', 2, true),
  ('Enerji', 'enerji', 'Kinetik ve potansiyel enerji', 3, true)
) AS t(name, slug, description, order_index, is_active)
WHERE s.slug = 'fizik'
ON CONFLICT (subject_id, slug) DO NOTHING;

-- Tarih Konuları
INSERT INTO topics (subject_id, name, slug, description, order_index, is_active)
SELECT s.id, t.* FROM subjects s
CROSS JOIN (VALUES
  ('İlk Türk Devletleri', 'ilk-turk-devletleri', 'Hunlar, Göktürkler, Uygurlar', 1, true),
  ('Osmanlı Kuruluş', 'osmanli-kurulus', 'Osmanlı Devletinin kuruluş dönemi', 2, true)
) AS t(name, slug, description, order_index, is_active)
WHERE s.slug = 'tarih'
ON CONFLICT (subject_id, slug) DO NOTHING;

-- Coğrafya Konuları
INSERT INTO topics (subject_id, name, slug, description, order_index, is_active)
SELECT s.id, t.* FROM subjects s
CROSS JOIN (VALUES
  ('Dünya Coğrafyası', 'dunya-cografyasi', 'Kıtalar, okyanuslar ve iklim kuşakları', 1, true),
  ('Türkiye Coğrafyası', 'turkiye-cografyasi', 'Türkiye''nin fiziki ve beşeri özellikleri', 2, true)
) AS t(name, slug, description, order_index, is_active)
WHERE s.slug = 'cografya'
ON CONFLICT (subject_id, slug) DO NOTHING;

-- ============================================================================
-- QUESTIONS - Matematik: Sayı Kümeleri
-- ============================================================================

WITH topic AS (
  SELECT t.id FROM topics t
  JOIN subjects s ON t.subject_id = s.id
  WHERE s.slug = 'matematik' AND t.slug = 'sayi-kumeleri'
  LIMIT 1
)
INSERT INTO questions (topic_id, question_text, options, correct_answer, explanation, difficulty_level, is_active)
SELECT topic.id, q.* FROM topic
CROSS JOIN (VALUES
  ('Aşağıdakilerden hangisi rasyonel sayı değildir?', 
   '{"A":"1/2", "B":"0.5", "C":"√2", "D":"3"}'::jsonb,
   'C', 'Karekök 2 irrasyonel bir sayıdır çünkü kesir olarak ifade edilemez.', 'kolay', true),
  
  ('Z (tam sayılar) kümesinin elemanı olmayan hangisidir?',
   '{"A":"-5", "B":"0", "C":"1/2", "D":"7"}'::jsonb,
   'C', '1/2 kesirli sayı olduğu için tam sayılar kümesinde yer almaz.', 'kolay', true),
  
  ('N (doğal sayılar) kümesinde kaç tane eleman vardır?',
   '{"A":"100", "B":"1000", "C":"Sonsuz", "D":"0"}'::jsonb,
   'C', 'Doğal sayılar kümesi sonsuz elemanlıdır.', 'orta', true),
  
  ('π sayısı hangi kümeye aittir?',
   '{"A":"Doğal sayılar", "B":"Tam sayılar", "C":"Rasyonel sayılar", "D":"İrrasyonel sayılar"}'::jsonb,
   'D', 'π irrasyonel bir sayıdır.', 'kolay', true),
  
  ('0 sayısı aşağıdakilerden hangisinin elemanı değildir?',
   '{"A":"Doğal sayılar (bazı tanımlara göre)", "B":"Tam sayılar", "C":"Rasyonel sayılar", "D":"Gerçek sayılar"}'::jsonb,
   'A', '0, bazı tanımlarda doğal sayılar kümesine dahil edilmez.', 'orta', true)
) AS q(question_text, options, correct_answer, explanation, difficulty_level, is_active);

-- ============================================================================
-- QUESTIONS - Matematik: Üslü Sayılar
-- ============================================================================

WITH topic AS (
  SELECT t.id FROM topics t
  JOIN subjects s ON t.subject_id = s.id
  WHERE s.slug = 'matematik' AND t.slug = 'uslu-sayilar'
  LIMIT 1
)
INSERT INTO questions (topic_id, question_text, options, correct_answer, explanation, difficulty_level, is_active)
SELECT topic.id, q.* FROM topic
CROSS JOIN (VALUES
  ('2³ × 2⁴ işleminin sonucu kaçtır?',
   '{"A":"2⁷", "B":"2¹²", "C":"4⁷", "D":"8⁴"}'::jsonb,
   'A', 'Tabanlar aynı olduğunda üsler toplanır: 2³⁺⁴ = 2⁷', 'kolay', true),
  
  ('(3²)³ işleminin sonucu kaçtır?',
   '{"A":"3⁵", "B":"3⁶", "C":"9³", "D":"27²"}'::jsonb,
   'B', 'Üslü sayının üssü olduğunda üsler çarpılır: 3²×³ = 3⁶', 'kolay', true),
  
  ('5⁰ ifadesinin değeri kaçtır?',
   '{"A":"0", "B":"1", "C":"5", "D":"Tanımsız"}'::jsonb,
   'B', 'Herhangi bir sayının sıfırıncı kuvveti 1''dir.', 'kolay', true),
  
  ('2⁻³ ifadesi aşağıdakilerden hangisine eşittir?',
   '{"A":"-8", "B":"1/8", "C":"-1/8", "D":"8"}'::jsonb,
   'B', 'Negatif üs, kesrin tersi anlamına gelir: 2⁻³ = 1/2³ = 1/8', 'orta', true),
  
  ('3² × 3⁻² işleminin sonucu kaçtır?',
   '{"A":"0", "B":"1", "C":"9", "D":"1/9"}'::jsonb,
   'B', '3²⁺⁽⁻²⁾ = 3⁰ = 1', 'orta', true)
) AS q(question_text, options, correct_answer, explanation, difficulty_level, is_active);

-- ============================================================================
-- QUESTIONS - Fizik: Hareket
-- ============================================================================

WITH topic AS (
  SELECT t.id FROM topics t
  JOIN subjects s ON t.subject_id = s.id
  WHERE s.slug = 'fizik' AND t.slug = 'hareket'
  LIMIT 1
)
INSERT INTO questions (topic_id, question_text, options, correct_answer, explanation, difficulty_level, is_active)
SELECT topic.id, q.* FROM topic
CROSS JOIN (VALUES
  ('Hız birimi aşağıdakilerden hangisidir?',
   '{"A":"m/s", "B":"m/s²", "C":"kg.m/s", "D":"N"}'::jsonb,
   'A', 'Hız, yol/zaman olduğu için birimi m/s''dir.', 'kolay', true),
  
  ('Düzgün hareketli bir cismin hızı nasıldır?',
   '{"A":"Artar", "B":"Azalır", "C":"Sabittir", "D":"Değişkendir"}'::jsonb,
   'C', 'Düzgün harekette hız sabittir.', 'kolay', true),
  
  ('İvme birimi aşağıdakilerden hangisidir?',
   '{"A":"m/s", "B":"m/s²", "C":"kg", "D":"N"}'::jsonb,
   'B', 'İvme, hız değişimi/zaman olduğu için birimi m/s²''dir.', 'kolay', true),
  
  ('Bir cisim 10 m/s hızla 5 saniye hareket ederse kaç metre yol alır?',
   '{"A":"2 m", "B":"15 m", "C":"50 m", "D":"100 m"}'::jsonb,
   'C', 'Yol = Hız × Zaman = 10 × 5 = 50 m', 'orta', true),
  
  ('Serbest düşen bir cismin ivmesi yaklaşık kaç m/s²''dir?',
   '{"A":"5", "B":"10", "C":"15", "D":"20"}'::jsonb,
   'B', 'Yer çekimi ivmesi yaklaşık 10 m/s²''dir (g ≈ 10 m/s²).', 'kolay', true)
) AS q(question_text, options, correct_answer, explanation, difficulty_level, is_active);

-- ============================================================================
-- FLASHCARDS - Matematik: Sayı Kümeleri
-- ============================================================================

WITH topic AS (
  SELECT t.id FROM topics t
  JOIN subjects s ON t.subject_id = s.id
  WHERE s.slug = 'matematik' AND t.slug = 'sayi-kumeleri'
  LIMIT 1
)
INSERT INTO flashcards (topic_id, front_text, back_text, order_index, is_active)
SELECT topic.id, f.* FROM topic
CROSS JOIN (VALUES
  ('Doğal Sayılar (N) nedir?', '0, 1, 2, 3, 4, ... şeklinde devam eden sayılardır. Bazı tanımlarda 0 dahil edilmez.', 1, true),
  ('Tam Sayılar (Z) nedir?', '..., -3, -2, -1, 0, 1, 2, 3, ... şeklinde negatif ve pozitif sayıları içeren kümedir.', 2, true),
  ('Rasyonel Sayılar (Q) nedir?', 'a/b şeklinde (b≠0) kesir olarak ifade edilebilen sayılardır. Örnek: 1/2, 0.5, 3', 3, true),
  ('İrrasyonel Sayılar nedir?', 'Kesir şeklinde yazılamayan sayılardır. Örnek: √2, π, e', 4, true),
  ('Gerçek Sayılar (R) nedir?', 'Rasyonel ve irrasyonel sayıların birleşimidir.', 5, true)
) AS f(front_text, back_text, order_index, is_active);

-- ============================================================================
-- FLASHCARDS - Fizik: Hareket
-- ============================================================================

WITH topic AS (
  SELECT t.id FROM topics t
  JOIN subjects s ON t.subject_id = s.id
  WHERE s.slug = 'fizik' AND t.slug = 'hareket'
  LIMIT 1
)
INSERT INTO flashcards (topic_id, front_text, back_text, order_index, is_active)
SELECT topic.id, f.* FROM topic
CROSS JOIN (VALUES
  ('Hız nedir?', 'Birim zamanda alınan yoldur. Formül: v = s/t (m/s)', 1, true),
  ('İvme nedir?', 'Birim zamandaki hız değişimidir. Formül: a = Δv/t (m/s²)', 2, true),
  ('Düzgün hareket nedir?', 'Hızın sabit olduğu harekettir. İvme = 0', 3, true),
  ('Düzgün değişen hareket nedir?', 'İvmenin sabit olduğu harekettir.', 4, true),
  ('Yer çekimi ivmesi (g) kaçtır?', 'Yaklaşık 10 m/s² (daha hassas: 9.8 m/s²)', 5, true)
) AS f(front_text, back_text, order_index, is_active);

-- Başarı mesajı
SELECT 
  'Test verisi başarıyla oluşturuldu!' as message,
  (SELECT COUNT(*) FROM subjects) as subjects_count,
  (SELECT COUNT(*) FROM topics) as topics_count,
  (SELECT COUNT(*) FROM questions) as questions_count,
  (SELECT COUNT(*) FROM flashcards) as flashcards_count;
