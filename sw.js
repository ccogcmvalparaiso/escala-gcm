const CACHE_NAME = 'gcm-valparaiso-escala-v6';
const ARQUIVOS = ['./', './index.html', './styles.css', './cloud.js', './app.js', './manifest.json', './logo.png', './icon.png', './icon-192.png'];
self.addEventListener('install', (ev) => { self.skipWaiting(); ev.waitUntil(caches.open(CACHE_NAME).then(c => c.addAll(ARQUIVOS)).catch(() => {})); });
self.addEventListener('activate', (ev) => { ev.waitUntil(caches.keys().then(ks => Promise.all(ks.filter(k => k !== CACHE_NAME).map(k => caches.delete(k)))).then(() => self.clients.claim())); });
self.addEventListener('fetch', (ev) => {
  if (ev.request.method !== 'GET') return;
  if (new URL(ev.request.url).origin !== self.location.origin) return;
  ev.respondWith(fetch(ev.request).then(res => { if (res && res.status === 200) { const cp = res.clone(); caches.open(CACHE_NAME).then(c => c.put(ev.request, cp)).catch(() => {}); } return res; }).catch(() => caches.match(ev.request)));
});
