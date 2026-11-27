const CACHE_NAME = 'gcm-valparaiso-escala-v16';
const ARQUIVOS = [
  './',
  './index.html',
  './styles.css',
  './cloud.js',
  './app.js',
  './manifest.json',
  './logo.png',
  './icon.png',
  './icon-192.png'
];

self.addEventListener('install', (ev) => {
  self.skipWaiting();
  ev.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(ARQUIVOS)).catch(() => {})
  );
});

self.addEventListener('activate', (ev) => {
  ev.waitUntil(
    caches.keys()
      .then((ks) => Promise.all(ks.filter((k) => k.startsWith('gcm-valparaiso-escala-') && k !== CACHE_NAME).map((k) => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', (ev) => {
  if (ev.request.method !== 'GET') return;
  const url = new URL(ev.request.url);
  if (url.origin !== self.location.origin) return;

  ev.respondWith(
    fetch(ev.request)
      .then((res) => {
        if (res && res.status === 200) {
          const copia = res.clone();
          caches.open(CACHE_NAME).then((c) => c.put(ev.request, copia)).catch(() => {});
        }
        return res;
      })
      .catch(async () => {
        const emCache = await caches.match(ev.request, { ignoreSearch: true });
        if (emCache) return emCache;
        if (ev.request.mode === 'navigate') {
          return caches.match('./index.html', { ignoreSearch: true });
        }
        return new Response('', { status: 504 });
      })
  );
});
