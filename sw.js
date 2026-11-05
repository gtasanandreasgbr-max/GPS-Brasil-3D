
// Nome da versão do cache
const CACHE_NAME = "gps-brasil-v2";

// Arquivos locais do aplicativo
const APP_FILES = [
  "./",
  "./index.html",
  "./manifest.json"
];

// Instala o Service Worker
self.addEventListener("install", function(event) {
  event.waitUntil(
    caches.open(CACHE_NAME).then(function(cache) {
      return cache.addAll(APP_FILES);
    })
  );
  self.skipWaiting();
});

// Ativa a nova versão
self.addEventListener("activate", function(event) {
  event.waitUntil(
    caches.keys().then(function(names) {
      return Promise.all(
        names.map(function(name) {
          if (name !== CACHE_NAME) {
            return caches.delete(name);
          }
        })
      );
    })
  );
  self.clients.claim();
});

// Cacheia apenas arquivos do próprio site
self.addEventListener("fetch", function(event) {
  const url = new URL(event.request.url);

  // Não interfere nos mapas e bibliotecas externas
  if (url.origin !== self.location.origin) {
    return;
  }

  event.respondWith(
    caches.match(event.request).then(function(response) {
      if (response) return response;

      return fetch(event.request).then(function(networkResponse) {
        if (networkResponse && networkResponse.ok) {
          const copy = networkResponse.clone();

          caches.open(CACHE_NAME).then(function(cache) {
            cache.put(event.request, copy);
          });
        }

        return networkResponse;
      });
    })
  );
});
