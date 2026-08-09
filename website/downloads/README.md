# SıfırNoktası İndirmeler

## Android APK

APK dosyası EAS Build (Expo bulut derleme) ile üretilir.

1. Expo hesabı oluştur: https://expo.dev/signup
2. Proje klasöründe oturum aç: `npx eas-cli login`
3. `eas-cli` kur: `npm install -g eas-cli` (veya `npx eas-cli`)
4. Yapılandır: `npx eas-cli build:configure`
5. APK üret (ücretsiz, bulutta):
   ```bash
   npx eas-cli build -p android --profile preview
   ```
6. İndirilen APK'yı `website/downloads/sifirnoktasi-v1.0.0.apk` olarak kopyala.

## PC Sürümü

PC sürümü PWA (Progressive Web App) olarak sunulur:
- `website/app/` klasörü Expo web build'idir.
- Tarayıcıda açıp "Kur" düğmesiyle Windows/Mac/Linux'ta ana ekrana kurulur.

## Web Build'i Güncelleme

```bash
npm run build:web
```

## Web Sitesini Yerel Test Etme

```bash
cd website
npx serve .
```
