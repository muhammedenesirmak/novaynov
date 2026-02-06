# 🗄️ NovaYnov Database

Supabase PostgreSQL veritabanı şemaları ve seed dataları.

## 📋 Tablo Yapısı

Toplam **10 tablo**:

1. **users** - Kullanıcı bilgileri ve gamification
2. **subjects** - Dersler (Matematik, Fizik, Tarih, Coğrafya)
3. **topics** - Konular
4. **flashcards** - Hızlı bilgi kartları
5. **questions** - Sorular
6. **user_progress** - Kullanıcı ilerlemesi
7. **daily_stats** - Günlük istatistikler
8. **sessions** - Çalışma oturumları
9. **subscriptions** - Premium abonelikler
10. **referrals** - Davet sistemi

## 🚀 Supabase Kurulumu

### Adım 1: Supabase Projesi Oluştur

1. [supabase.com](https://supabase.com) adresine git
2. "New Project" butonuna tıkla
3. Proje adı: `novaynov`
4. Database password: Güçlü bir şifre seç
5. Region: `Europe West (Frankfurt)` seç (Türkiye'ye en yakın)
6. "Create new project" butonuna tıkla

### Adım 2: Database Şemalarını Oluştur

1. Sol menüden **SQL Editor**'ü aç
2. `migrations/001_initial_schema.sql` dosyasının içeriğini **kopyala**
3. SQL Editor'e **yapıştır**
4. **"RUN"** butonuna tıkla
5. ✅ **Success** mesajını bekle

### Adım 3: Seed Data Ekle

1. SQL Editor'de yeni bir sorgu oluştur
2. `seed/001_subjects_topics.sql` dosyasının içeriğini **kopyala**
3. SQL Editor'e **yapıştır**
4. **"RUN"** butonuna tıkla
5. ✅ Başarı mesajını bekle

### Adım 4: Authentication Ayarları

1. Sol menüden **Authentication** → **Providers**'ı aç
2. **Email** provider'ını aktif et
3. **Settings:**
   - Email confirmation: **Enabled** (isteğe bağlı)
   - Auto-confirm: **Disabled** (production'da)

### Adım 5: API Keys'i Al

1. Sol menüden **Settings** → **API**'ye git
2. **Project URL**'i kopyala → `.env` dosyasına ekle
3. **anon/public** key'i kopyala → Frontend `.env`'ye ekle
4. **service_role** key'i kopyala → Backend `.env`'ye ekle

## 🔑 Environment Variables

### Frontend (.env)

```env
VITE_SUPABASE_URL=https://YOUR_PROJECT_ID.supabase.co
VITE_SUPABASE_ANON_KEY=YOUR_ANON_KEY
```

### Backend (.env)

```env
SUPABASE_URL=https://YOUR_PROJECT_ID.supabase.co
SUPABASE_SERVICE_KEY=YOUR_SERVICE_ROLE_KEY
```

## 📊 Tablo İlişkileri

```
users (1) ----< (N) user_progress
users (1) ----< (N) daily_stats
users (1) ----< (N) sessions
users (1) ----< (N) subscriptions
users (1) ----< (N) referrals (referrer)
users (1) ----< (N) referrals (referred)

subjects (1) ----< (N) topics
topics (1) ----< (N) flashcards
topics (1) ----< (N) questions
topics (1) ----< (N) sessions

questions (1) ----< (N) user_progress
sessions (1) ----< (N) user_progress
```

## 🔒 Row Level Security (RLS)

RLS tüm tablolarda etkinleştirildi:

- ✅ Kullanıcılar sadece kendi verilerine erişebilir
- ✅ Public read access: subjects, topics, flashcards, questions
- ✅ Auth.uid() bazlı policy'ler

## 📝 Migration Dosyaları

```
database/
├── migrations/
│   └── 001_initial_schema.sql
└── seed/
    └── 001_subjects_topics.sql
```

## ✅ Verification

SQL Editor'de test sorgusu çalıştır:

```sql
-- Ders sayısını kontrol et
SELECT COUNT(*) FROM subjects;
-- Sonuç: 4 olmalı

-- Konu sayısını kontrol et
SELECT COUNT(*) FROM topics;
-- Sonuç: 12 olmalı

-- Flashcard sayısını kontrol et
SELECT COUNT(*) FROM flashcards;

-- Soru sayısını kontrol et
SELECT COUNT(*) FROM questions;
```

## 🎯 Sonraki Adımlar

1. ✅ Supabase projesi oluşturuldu
2. ✅ Tablolar oluşturuldu
3. ✅ Seed data eklendi
4. ⏳ Environment variables güncellendi
5. ⏳ Auth sistemi implementasyonu
