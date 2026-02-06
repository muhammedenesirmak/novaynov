<div align="center">

# ⚡ NovaYnov

### _TYT-AYT için Yeni Nesil Öğrenme Deneyimi_

[![React](https://img.shields.io/badge/React-18-61DAFB?style=for-the-badge&logo=react&logoColor=white)](https://reactjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Node.js](https://img.shields.io/badge/Node.js-20-339933?style=for-the-badge&logo=node.js&logoColor=white)](https://nodejs.org/)
[![Supabase](https://img.shields.io/badge/Supabase-Database-3FCF8E?style=for-the-badge&logo=supabase&logoColor=white)](https://supabase.com/)
[![License](https://img.shields.io/badge/License-MIT-yellow?style=for-the-badge)](LICENSE)

<br/>

<img src="https://readme-typing-svg.demolab.com?font=Fira+Code&weight=600&size=22&pause=1000&color=8B5CF6&center=true&vCenter=true&random=false&width=500&lines=Duolingo+tarz%C4%B1+gamification+%F0%9F%8E%AE;Spaced+Repetition+algoritmas%C4%B1+%F0%9F%A7%A0;XP+%2B+Level+%2B+Streak+sistemi+%F0%9F%94%A5;Premium+analizler+%F0%9F%93%8A" alt="Typing SVG" />

<br/>

[🚀 Demo](#demo) • [✨ Özellikler](#-özellikler) • [🛠️ Kurulum](#-kurulum) • [📖 Dokümantasyon](#-api-dokümantasyonu) • [🤝 Katkı](#-katkıda-bulunma)

---

</div>

## 🎯 Neden NovaYnov?

> _"Öğrenmek sıkıcı olmak zorunda değil."_

NovaYnov, TYT-AYT hazırlık sürecini **oyunlaştırarak** öğrencilerin motivasyonunu artırır. Duolingo'nun kanıtlanmış metodolojisini Türkiye'nin sınav sistemine uyarladık.

<div align="center">

|          🎮 Gamification          |         🧠 Akıllı Tekrar         |      💎 Freemium       |
| :-------------------------------: | :------------------------------: | :--------------------: |
| XP kazan, level atla, streak koru | Bilimsel maruz kalma algoritması | Günlük 3 test ücretsiz |

</div>

---

## ✨ Özellikler

<table>
<tr>
<td width="50%">

### 🎴 Flashcard Sistemi

Konseptleri hızlıca öğren ve pekiştir

### 🎮 Gamification

- 🏆 XP & Level sistemi
- 🔥 Günlük streak takibi
- 🎯 Başarım rozetleri

### 🧠 Spaced Repetition

Bilimsel olarak kanıtlanmış maruz kalma algoritması ile kalıcı öğrenme

</td>
<td width="50%">

### 💎 Premium Özellikler

- 📊 Detaylı performans analizleri
- ♾️ Sınırsız test çözme
- � İlerleme grafikleri

### 🎁 Davet Sistemi

3 arkadaşını davet et, 1 ay premium kazan!

### 💳 Güvenli Ödeme

iyzico entegrasyonu ile güvenli işlemler

</td>
</tr>
</table>

---

## 🏗️ Mimari

```
novaynov/
├── 🎨 frontend/          # React + TypeScript + Vite
│   ├── src/
│   │   ├── components/   # UI bileşenleri
│   │   ├── pages/        # Sayfa componentleri
│   │   ├── hooks/        # Custom hooks
│   │   ├── stores/       # Zustand state
│   │   └── api/          # API servisleri
│   └── ...
│
├── ⚙️ backend/            # Node.js + Express
│   ├── src/
│   │   ├── routes/       # API rotaları
│   │   ├── controllers/  # İş mantığı
│   │   ├── middleware/   # Auth & validation
│   │   └── services/     # Harici servisler
│   └── ...
│
└── 🗄️ database/           # Supabase şemaları
```

---

## �️ Kurulum

### Gereksinimler

- Node.js 18+
- npm veya yarn
- Supabase hesabı

### Hızlı Başlangıç

```bash
# 1️⃣ Repo'yu klonla
git clone https://github.com/muhammedenesirmak/novaynov.git
cd novaynov

# 2️⃣ Frontend kurulumu
cd frontend
npm install
cp .env.example .env  # .env dosyasını düzenle
npm run dev

# 3️⃣ Backend kurulumu (yeni terminal)
cd backend
npm install
cp .env.example .env  # .env dosyasını düzenle
npm run dev
```

<div align="center">

| Servis      | URL                     |
| ----------- | ----------------------- |
| 🎨 Frontend | `http://localhost:5173` |
| ⚙️ Backend  | `http://localhost:5000` |

</div>

---

## 🔐 Environment Variables

<details>
<summary><strong>Frontend (.env)</strong></summary>

```env
VITE_SUPABASE_URL=your_supabase_url
VITE_SUPABASE_ANON_KEY=your_anon_key
VITE_API_BASE_URL=http://localhost:5000/api
VITE_CLOUDFLARE_R2_PUBLIC_URL=your_r2_url
```

</details>

<details>
<summary><strong>Backend (.env)</strong></summary>

```env
PORT=5000
SUPABASE_URL=your_supabase_url
SUPABASE_SERVICE_KEY=your_service_key
IYZICO_API_KEY=your_iyzico_key
IYZICO_SECRET_KEY=your_iyzico_secret
FRONTEND_URL=http://localhost:5173
```

</details>

---

## � Tech Stack

<div align="center">

### Frontend

![React](https://img.shields.io/badge/React_18-61DAFB?style=flat-square&logo=react&logoColor=black)
![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=flat-square&logo=typescript&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-646CFF?style=flat-square&logo=vite&logoColor=white)
![TailwindCSS](https://img.shields.io/badge/TailwindCSS-06B6D4?style=flat-square&logo=tailwindcss&logoColor=white)
![Zustand](https://img.shields.io/badge/Zustand-433D37?style=flat-square&logo=react&logoColor=white)
![TanStack Query](https://img.shields.io/badge/TanStack_Query-FF4154?style=flat-square&logo=reactquery&logoColor=white)
![Framer Motion](https://img.shields.io/badge/Framer_Motion-0055FF?style=flat-square&logo=framer&logoColor=white)

### Backend

![Node.js](https://img.shields.io/badge/Node.js-339933?style=flat-square&logo=node.js&logoColor=white)
![Express](https://img.shields.io/badge/Express-000000?style=flat-square&logo=express&logoColor=white)
![Supabase](https://img.shields.io/badge/Supabase-3FCF8E?style=flat-square&logo=supabase&logoColor=white)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-4169E1?style=flat-square&logo=postgresql&logoColor=white)

### Araçlar

![iyzico](https://img.shields.io/badge/iyzico-1E3A5F?style=flat-square&logo=stripe&logoColor=white)
![Cloudflare](https://img.shields.io/badge/Cloudflare_R2-F38020?style=flat-square&logo=cloudflare&logoColor=white)

</div>

---

## 📈 Yol Haritası

- [x] ✅ Temel altyapı kurulumu
- [x] ✅ Database şeması
- [ ] 🔄 Auth sistemi
- [ ] 🔄 Ders/Konu sistemi
- [ ] 🔄 Flashcard & Soru çözme
- [ ] 🔄 Gamification mekanikleri
- [ ] 🔄 Premium & Ödeme sistemi
- [ ] 🔄 Analytics dashboard
- [ ] 🔄 Production deployment

---

## 🤝 Katkıda Bulunma

Katkılarınızı memnuniyetle karşılıyoruz! Detaylar için [CONTRIBUTING.md](CONTRIBUTING.md) dosyasına bakın.

```bash
# Fork & Clone
git clone https://github.com/YOUR_USERNAME/novaynov.git

# Branch oluştur
git checkout -b feature/amazing-feature

# Commit & Push
git commit -m "feat: Add amazing feature"
git push origin feature/amazing-feature

# Pull Request aç
```

---

<div align="center">

## 👨‍💻 Geliştirici

**Enes İMRAK**

[![GitHub](https://img.shields.io/badge/GitHub-100000?style=for-the-badge&logo=github&logoColor=white)](https://github.com/muhammedenesirmak)

---

### ⭐ Bu projeyi beğendiyseniz yıldız vermeyi unutmayın!

<br/>

[![MIT License](https://img.shields.io/badge/License-MIT-green.svg?style=for-the-badge)](LICENSE)

<sub>Made with 💜 in Turkey</sub>

</div>
