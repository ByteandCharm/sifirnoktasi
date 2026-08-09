const fs = require('fs');
const path = require('path');

const BASE = '/sifirnoktasi/app';
const indexPath = path.join(__dirname, '..', 'website', 'app', 'index.html');

const headInject = [
  `<meta name="description" content="SıfırNoktası - Dijital bağımlılığın erken evrelerinde tespit edilmesini sağlayan yapay zeka destekli proaktif sağlık uygulaması" />`,
  `<meta name="mobile-web-app-capable" content="yes" />`,
  `<meta name="apple-mobile-web-app-capable" content="yes" />`,
  `<meta name="apple-mobile-web-app-status-bar-style" content="default" />`,
  `<meta name="apple-mobile-web-app-title" content="SıfırNoktası" />`,
  `<link rel="manifest" href="${BASE}/manifest.json" />`,
  `<link rel="apple-touch-icon" href="${BASE}/icons/icon-192.png" />`,
].join('\n');

const bodyInject = `
    <script>
      if ('serviceWorker' in navigator) {
        window.addEventListener('load', function () {
          navigator.serviceWorker.register('${BASE}/sw.js').catch(function (err) {
            console.warn('SW registration failed:', err);
          });
        });
      }
    </script>`;

try {
  let html = fs.readFileSync(indexPath, 'utf8');

  if (html.includes('serviceWorker')) {
    console.log('postbuild: PWA enjeksiyonu zaten yapilmis, atlaniyor.');
    process.exit(0);
  }

  html = html.replace('<title>', headInject + '\n<title>');
  html = html.replace('</body>', bodyInject + '\n</body>');

  fs.writeFileSync(indexPath, html, 'utf8');
  console.log('postbuild: PWA head/body enjeksiyonu tamamlandi.');
} catch (err) {
  console.error('postbuild HATASI:', err.message);
  process.exit(1);
}
