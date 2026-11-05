// Nome da versão do cache do aplicativo
const CACHE_NAME = "gps-brasil-3d-v1";

// Arquivos locais básicos do aplicativo
const APP_FILES = [
  "./",
  "./index.html",
  "./manifest.json"
];

// Instala o Service Worker e guarda os arquivos locais
self.addEventListener("install", function (event) {
  event.waitUntil(
    caches.open(CACHE_NAME).then(function (cache) {
      return cache.addAll(APP_FILES);
    })
  );
  self.skipWaiting();
});

// Remove caches antigos ao ativar uma nova versão
self.addEventListener("activate", function (event) {
  event.waitUntil(
    caches.keys().then(function (names) {
      return Promise.all(
        names.map(function (name) {
          if (name !== CACHE_NAME) return caches.delete(name);
        })
      );
    })
  );
  self.clients.claim();
});

// Entrega os arquivos locais pelo cache quando possível
self.addEventListener("fetch", function (event) {
  const request = event.request;
  const url = new URL(request.url);

  // Não intercepta mapas ou bibliotecas hospedados em outros domínios
  if (url.origin !== self.location.origin) return;

  event.respondWith(
    caches.match(request).then(function (cached) {
      return cached || fetch(request).then(function (response) {
        const copy = response.clone();
        caches.open(CACHE_NAME).then(function (cache) {
          cache.put(request, copy);
        });
        return response;
      });
    })
  );
});
