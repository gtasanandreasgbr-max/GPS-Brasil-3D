// Identificador do cache local do aplicativo
const CACHE_NAME = "gps-brasil-2d-v1";

// Arquivos básicos que podem ser guardados no aparelho
const APP_FILES = ["./", "./index.html", "./manifest.json"];

// Guarda os arquivos locais durante a instalação
self.addEventListener("install", function (event) {
  event.waitUntil(
    caches.open(CACHE_NAME).then(function (cache) {
      return cache.addAll(APP_FILES);
    })
  );
  self.skipWaiting();
});

// Limpa versões antigas do cache
self.addEventListener("activate", function (event) {
  event.waitUntil(
    caches.keys().then(function (names) {
      return Promise.all(names.map(function (name) {
        if (name !== CACHE_NAME) return caches.delete(name);
      }));
    })
  );
  self.clients.claim();
});

// Disponibiliza arquivos locais quando o aparelho estiver sem conexão
self.addEventListener("fetch", function (event) {
  const request = event.request;
  const url = new URL(request.url);

  // Não tenta guardar blocos de mapas ou bibliotecas externas
  if (url.origin !== self.location.origin) return;

  event.respondWith(
    caches.match(request).then(function (cached) {
      if (cached) return cached;

      return fetch(request).then(function (response) {
        if (response && response.ok) {
          const copy = response.clone();
          caches.open(CACHE_NAME).then(function (cache) {
            cache.put(request, copy);
          });
        }
        return response;
      });
    })
  );
});
