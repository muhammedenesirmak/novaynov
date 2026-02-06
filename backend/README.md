# NovaYnov Backend

TYT-AYT gamification platformu için Node.js backend API.

## 🚀 Kurulum

### 1. Bağımlılıkları Yükle

```bash
npm install
```

### 2. Environment Variables

`.env.example` dosyasını `.env` olarak kopyala ve değerleri doldur:

```bash
cp .env.example .env
```

### 3. Sunucuyu Başlat

**Development:**

```bash
npm run dev
```

**Production:**

```bash
npm start
```

## 📁 Klasör Yapısı

```
backend/
├── src/
│   ├── config/          # Konfigürasyon dosyaları
│   ├── middleware/      # Express middleware'leri
│   ├── routes/          # API route'ları
│   ├── controllers/     # Route controller'ları
│   ├── services/        # İş mantığı servisleri
│   ├── utils/           # Yardımcı fonksiyonlar
│   ├── app.js           # Express app setup
│   └── server.js        # Server başlatma
├── package.json
└── .env.example
```

## 🔐 API Endpoints

- `GET /health` - Sağlık kontrolü
- `GET /api` - API bilgileri
- `POST /api/auth/register` - Kayıt ol
- `POST /api/auth/login` - Giriş yap
- `GET /api/subjects` - Dersleri listele
- `POST /api/sessions/start` - Yeni oturum başlat

## 🛠️ Teknolojiler

- Node.js
- Express.js
- Supabase (PostgreSQL + Auth)
- iyzico (Ödeme)
- Cloudflare R2 (Storage)
