# Katkıda Bulunma Rehberi

NovaYnov projesine katkıda bulunmak istediğiniz için teşekkür ederiz! 🎓

## 🚀 Başlarken

1. Projeyi fork edin
2. Feature branch oluşturun (`git checkout -b feature/amazing-feature`)
3. Değişikliklerinizi commit edin (`git commit -m 'feat: Add amazing feature'`)
4. Branch'inizi push edin (`git push origin feature/amazing-feature`)
5. Pull Request açın

## 📝 Commit Mesajları

[Conventional Commits](https://www.conventionalcommits.org/) standardını kullanıyoruz:

- `feat:` - Yeni özellik
- `fix:` - Bug düzeltmesi
- `docs:` - Dokümantasyon
- `style:` - Kod formatı (mantık değişikliği yok)
- `refactor:` - Kod refactoring
- `test:` - Test ekleme/düzenleme
- `chore:` - Build, config değişiklikleri

## 🔧 Geliştirme Ortamı

```bash
# Frontend
cd frontend
npm install
npm run dev

# Backend
cd backend
npm install
npm run dev
```

## 📋 Code Review Süreci

- PR'lar en az 1 kişi tarafından onaylanmalı
- Tüm testler geçmeli
- Lint hataları olmamalı

## 🐛 Bug Raporlama

Issue açarken lütfen şunları belirtin:

- Bug'ın açıklaması
- Tekrar etme adımları
- Beklenen davranış
- Ekran görüntüleri (varsa)

## 💡 Özellik Önerisi

Yeni özellik önerileri için Issue açabilirsiniz. Lütfen:

- Özelliğin ne olduğunu açıklayın
- Neden gerekli olduğunu belirtin
- Mümkünse mockup/tasarım ekleyin
