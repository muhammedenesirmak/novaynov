-- Seed Data for NovaYnov
-- Initial subjects and sample topics

-- ============================================================================
-- SUBJECTS (4 ders)
-- ============================================================================
INSERT INTO subjects (name, slug, color, order_index, is_active) VALUES
('Matematik', 'matematik', '#3B82F6', 1, true),
('Fizik', 'fizik', '#8B5CF6', 2, true),
('Tarih', 'tarih', '#F59E0B', 3, true),
('Coğrafya', 'cografya', '#10B981', 4, true);

-- ============================================================================
-- TOPICS (Her ders için örnek konular)
-- ============================================================================

-- Matematik konuları
INSERT INTO topics (subject_id, name, slug, description, order_index, difficulty_level, is_active)
SELECT 
  id,
  'Fonksiyonlar',
  'fonksiyonlar',
  'Fonksiyon kavramı, tanım kümesi, değer kümesi ve fonksiyon türleri',
  1,
  'orta',
  true
FROM subjects WHERE slug = 'matematik';

INSERT INTO topics (subject_id, name, slug, description, order_index, difficulty_level, is_active)
SELECT 
  id,
  'Türev',
  'turev',
  'Türev kavramı, türev alma kuralları ve uygulamaları',
  2,
  'zor',
  true
FROM subjects WHERE slug = 'matematik';

INSERT INTO topics (subject_id, name, slug, description, order_index, difficulty_level, is_active)
SELECT 
  id,
  'Limit ve Süreklilik',
  'limit-sureklilik',
  'Limit kavramı, limit hesaplama ve süreklilik',
  3,
  'orta',
  true
FROM subjects WHERE slug = 'matematik';

-- Fizik konuları
INSERT INTO topics (subject_id, name, slug, description, order_index, difficulty_level, is_active)
SELECT 
  id,
  'Kuvvet ve Hareket',
  'kuvvet-hareket',
  'Newton kanunları, kuvvet kavramı ve hareket türleri',
  1,
  'kolay',
  true
FROM subjects WHERE slug = 'fizik';

INSERT INTO topics (subject_id, name, slug, description, order_index, difficulty_level, is_active)
SELECT 
  id,
  'Elektrik ve Manyetizma',
  'elektrik-manyetizma',
  'Elektrik yükü, elektrik alan, manyetik alan',
  2,
  'orta',
  true
FROM subjects WHERE slug = 'fizik';

INSERT INTO topics (subject_id, name, slug, description, order_index, difficulty_level, is_active)
SELECT 
  id,
  'Optik',
  'optik',
  'Işık, yansıma, kırılma, mercekler ve aynalar',
  3,
  'orta',
  true
FROM subjects WHERE slug = 'fizik';

-- Tarih konuları
INSERT INTO topics (subject_id, name, slug, description, order_index, difficulty_level, is_active)
SELECT 
  id,
  'Osmanlı Devleti Kuruluş Dönemi',
  'osmanli-kurulus',
  'Osmanlı Devletinin kuruluşu ve ilk dönem fetihleri',
  1,
  'kolay',
  true
FROM subjects WHERE slug = 'tarih';

INSERT INTO topics (subject_id, name, slug, description, order_index, difficulty_level, is_active)
SELECT 
  id,
  'Türk İnkılap Tarihi',
  'turk-inkilap-tarihi',
  'Atatürk dönemi inkılapları ve kronolojisi',
  2,
  'orta',
  true
FROM subjects WHERE slug = 'tarih';

INSERT INTO topics (subject_id, name, slug, description, order_index, difficulty_level, is_active)
SELECT 
  id,
  'Dünya Savaşları',
  'dunya-savaslari',
  'I. ve II. Dünya Savaşları, nedenleri ve sonuçları',
  3,
  'orta',
  true
FROM subjects WHERE slug = 'tarih';

-- Coğrafya konuları
INSERT INTO topics (subject_id, name, slug, description, order_index, difficulty_level, is_active)
SELECT 
  id,
  'Harita Bilgisi',
  'harita-bilgisi',
  'Harita okuma, koordinat sistemi, ölçek',
  1,
  'kolay',
  true
FROM subjects WHERE slug = 'cografya';

INSERT INTO topics (subject_id, name, slug, description, order_index, difficulty_level, is_active)
SELECT 
  id,
  'İklim ve Bitkiler',
  'iklim-bitkiler',
  'İklim türleri, iklim elemanları ve bitki örtüsü',
  2,
  'orta',
  true
FROM subjects WHERE slug = 'cografya';

INSERT INTO topics (subject_id, name, slug, description, order_index, difficulty_level, is_active)
SELECT 
  id,
  'Türkiye Coğrafyası',
  'turkiye-cografyasi',
  'Türkiye fiziki coğrafyası, bölgeler ve ekonomi',
  3,
  'orta',
  true
FROM subjects WHERE slug = 'cografya';

-- ============================================================================
-- SAMPLE FLASHCARDS (Her konu için 2-3 tane)
-- ============================================================================

-- Fonksiyonlar flashcard'ları
INSERT INTO flashcards (topic_id, front_text, back_text, order_index)
SELECT 
  id,
  'Fonksiyon nedir?',
  'İki küme arasında tanımlanan özel bir bağıntıdır. Her x değerine karşılık yalnız bir y değeri vardır.',
  1
FROM topics WHERE slug = 'fonksiyonlar';

INSERT INTO flashcards (topic_id, front_text, back_text, order_index)
SELECT 
  id,
  'Tanım kümesi nedir?',
  'Fonksiyonda x değerlerinin oluşturduğu kümedir. A kümesi ile gösterilir.',
  2
FROM topics WHERE slug = 'fonksiyonlar';

-- Kuvvet ve Hareket flashcard'ları
INSERT INTO flashcards (topic_id, front_text, back_text, order_index)
SELECT 
  id,
  'Newton''un 1. Kanunu nedir?',
  'Bir cisme dışarıdan kuvvet uygulanmadığı sürece, duruyorsa durmaya, hareket ediyorsa sabit hızla düzgün doğrusal harekete devam eder.',
  1
FROM topics WHERE slug = 'kuvvet-hareket';

INSERT INTO flashcards (topic_id, front_text, back_text, order_index)
SELECT 
  id,
  'Kuvvet birimi nedir?',
  'Kuvvetin SI birimi Newton (N)''dur. 1 Newton = 1 kg·m/s²',
  2
FROM topics WHERE slug = 'kuvvet-hareket';

-- Osmanlı Kuruluş flashcard'ları
INSERT INTO flashcards (topic_id, front_text, back_text, order_index)
SELECT 
  id,
  'Osmanlı Devleti ne zaman kuruldu?',
  '1299 yılında Osman Bey tarafından kurulmuştur.',
  1
FROM topics WHERE slug = 'osmanli-kurulus';

INSERT INTO flashcards (topic_id, front_text, back_text, order_index)
SELECT 
  id,
  'İlk Osmanlı başkenti neresidir?',
  'Söğüt ve ardından Bursa ilk başkentlerdir.',
  2
FROM topics WHERE slug = 'osmanli-kurulus';

-- Harita Bilgisi flashcard'ları
INSERT INTO flashcards (topic_id, front_text, back_text, order_index)
SELECT 
  id,
  'Enlem nedir?',
  'Ekvator''a göre kuzey veya güney yönündeki açısal uzaklıktır. 0° ile 90° arasında değişir.',
  1
FROM topics WHERE slug = 'harita-bilgisi';

INSERT INTO flashcards (topic_id, front_text, back_text, order_index)
SELECT 
  id,
  'Boylam nedir?',
  'Greenwich meridyenine göre doğu veya batı yönündeki açısal uzaklıktır. 0° ile 180° arasında değişir.',
  2
FROM topics WHERE slug = 'harita-bilgisi';

-- ============================================================================
-- SAMPLE QUESTIONS (Her konu için 3-5 örnek soru)
-- ============================================================================

-- Fonksiyonlar soruları
INSERT INTO questions (topic_id, question_text, options, correct_answer, explanation, difficulty_level)
SELECT 
  id,
  'f(x) = 2x + 3 fonksiyonunda f(5) değeri kaçtır?',
  '[
    {"key": "A", "text": "8"},
    {"key": "B", "text": "10"},
    {"key": "C", "text": "11"},
    {"key": "D", "text": "13"},
    {"key": "E", "text": "15"}
  ]'::jsonb,
  'D',
  'f(5) = 2(5) + 3 = 10 + 3 = 13',
  'kolay'
FROM topics WHERE slug = 'fonksiyonlar';

INSERT INTO questions (topic_id, question_text, options, correct_answer, explanation, difficulty_level)
SELECT 
  id,
  'Bir fonksiyonun tersi olması için gerekli şart nedidir?',
  '[
    {"key": "A", "text": "Sürekli olmalı"},
    {"key": "B", "text": "Bire bir ve örten olmalı"},
    {"key": "C", "text": "Doğrusal olmalı"},
    {"key": "D", "text": "Pozitif olmalı"},
    {"key": "E", "text": "Artmalı"}
  ]'::jsonb,
  'B',
  'Bir fonksiyonun tersi olabilmesi için hem bire bir hem de örten olması gerekir.',
  'orta'
FROM topics WHERE slug = 'fonksiyonlar';

-- Kuvvet ve Hareket soruları
INSERT INTO questions (topic_id, question_text, options, correct_answer, explanation, difficulty_level)
SELECT 
  id,
  '10 kg kütleli bir cisme 50 N kuvvet uygulanıyor. İvmesi kaç m/s² olur?',
  '[
    {"key": "A", "text": "2"},
    {"key": "B", "text": "3"},
    {"key": "C", "text": "5"},
    {"key": "D", "text": "10"},
    {"key": "E", "text": "50"}
  ]'::jsonb,
  'C',
  'F = m × a formülünden: a = F/m = 50/10 = 5 m/s²',
  'kolay'
FROM topics WHERE slug = 'kuvvet-hareket';

-- Osmanlı Kuruluş soruları
INSERT INTO questions (topic_id, question_text, options, correct_answer, explanation, difficulty_level)
SELECT 
  id,
  'Osmanlı Devletinin ilk savaşı hangisidir?',
  '[
    {"key": "A", "text": "Malazgirt"},
    {"key": "B", "text": "Miryokefalon"},
    {"key": "C", "text": "Bafeus"},
    {"key": "D", "text": "Kösedağ"},
    {"key": "E", "text": "Manzikert"}
  ]'::jsonb,
  'C',
  '1302 yılındaki Bafeus Savaşı, Osmanlı Devletinin ilk önemli zaferidir.',
  'orta'
FROM topics WHERE slug = 'osmanli-kurulus';

-- Harita Bilgisi soruları
INSERT INTO questions (topic_id, question_text, options, correct_answer, explanation, difficulty_level)
SELECT 
  id,
  'Bir haritada 1 cm, gerçekte 100 km ise bu haritanın ölçeği nedir?',
  '[
    {"key": "A", "text": "1/100.000"},
    {"key": "B", "text": "1/1.000.000"},
    {"key": "C", "text": "1/10.000.000"},
    {"key": "D", "text": "1/100.000.000"},
    {"key": "E", "text": "1/1.000"}
  ]'::jsonb,
  'C',
  '100 km = 10.000.000 cm olduğundan, ölçek 1/10.000.000 olur.',
  'orta'
FROM topics WHERE slug = 'harita-bilgisi';
