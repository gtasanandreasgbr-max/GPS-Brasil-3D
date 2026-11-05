
// Versão nova para substituir o cache antigo
const CACHE_NAME = "gps-brasil-v4";

// Arquivos básicos do aplicativo
const APP_FILES = [
  "./",
  "./index.html",
  "./manifest.json"
];

// Instala o novo cache
self.addEventListener("install", function(event) {
  event.waitUntil(
    caches.open(CACHE_NAME).then(function(cache) {
      return cache.addAll(APP_FILES);
    })
  );

  self.skipWaiting();
});

// Remove versões antigas
self.addEventListener("activate", function(event) {
  event.waitUntil(
    caches.keys().then(function(names) {
      return Promise.all(
        names.map(function(name) {
          if(name !== CACHE_NAME) {
            return caches.delete(name);
          }
        })
      );
    })
  );

  self.clients.claim();
});

// Para páginas, tenta primeiro a versão mais recente da internet
self.addEventListener("fetch", function(event) {
  const request = event.request;
  const url = new URL(request.url);

  // Não interfere nos servidores externos de mapas
  if(url.origin !== self.location.origin) {
    return;
  }

  if(request.mode === "navigate") {
    event.respondWith(
      fetch(request).then(function(response) {
        const copy = response.clone();

        caches.open(CACHE_NAME).then(function(cache) {
          cache.put("./index.html", copy);
        });

        return response;
      }).catch(function() {
        return caches.match("./index.html");
      })
    );

    return;
  }

  event.respondWith(
    caches.match(request).then(function(response) {
      return response || fetch(request);
    })
  );
});
