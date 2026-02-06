# 🎓 NovaYnov - TYT AYT Gamification Platform

TYT-AYT öğrencileri için Duolingo tarzında gamification ile soru çözme platformu.

## 📋 Özellikler

- ✅ Flashcard + Soru çözme sistemi
- 🎮 Gamification (XP, Level, Streak)
- 🧠 Spaced Repetition (Maruz kalma algoritması)
- 💎 Freemium model (Günlük 3 test free, Premium sınırsız)
- 📊 Detaylı analiz (Premium)
- 🎁 Davet sistemi (3 arkadaş = 1 ay premium)
- 💳 İyzico entegrasyonu

## 🏗️ Proje Yapısı

```
novaynov/
├── frontend/          # React + TypeScript + Vite
├── backend/           # Node.js + Express
└── README.md
```

## 🚀 Kurulum

### Frontend

```bash
cd frontend
npm install
npm run dev
```

Frontend: http://localhost:5173

### Backend

```bash
cd backend
npm install
npm run dev
```

Backend: http://localhost:5000

## 📚 Teknoloji Stack'i

### Frontend

- React 18 + TypeScript
- Vite
- TailwindCSS
- Zustand (State Management)
- TanStack Query (Server State)
- React Router v6
- Axios
- Framer Motion
- Recharts

### Backend

- Node.js
- Express.js
- Supabase (PostgreSQL + Auth)
- iyzico (Payment Gateway)
- Cloudflare R2 (Object Storage)

## 🔐 Environment Variables

Her iki klasörde de `.env.example` dosyasını `.env` olarak kopyala ve gerekli değerleri doldur.

### Frontend (.env)

```env
VITE_SUPABASE_URL=
VITE_SUPABASE_ANON_KEY=
VITE_API_BASE_URL=http://localhost:5000/api
VITE_CLOUDFLARE_R2_PUBLIC_URL=
```

### Backend (.env)

```env
PORT=5000
SUPABASE_URL=
SUPABASE_SERVICE_KEY=
IYZICO_API_KEY=
IYZICO_SECRET_KEY=
FRONTEND_URL=http://localhost:5173
```

## 📖 Geliştirme Süreci

1. ✅ Temel altyapı kurulumu
2. 🔄 Database şeması oluşturma
3. 🔄 Auth sistemi
4. 🔄 Ders/Konu sistemi
5. 🔄 Flashcard & Soru çözme
6. 🔄 Gamification mekanikleri
7. 🔄 Premium & Ödeme sistemi
8. 🔄 Analytics
9. 🔄 Deployment

## 👨‍💻 Geliştirici

Rabia

## 📄 Lisans

MIT
