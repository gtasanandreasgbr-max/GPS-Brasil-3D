
// Nova versão do aplicativo
const CACHE_NAME = "gps-brasil-v5";

// Arquivos básicos
const APP_FILES = [
  "./",
  "./index.html",
  "./manifest.json"
];

// Instala nova versão
self.addEventListener("install", function(event) {

  event.waitUntil(
    caches.open(CACHE_NAME).then(function(cache) {
      return cache.addAll(APP_FILES);
    })
  );

  self.skipWaiting();

});

// Remove caches antigos
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

// Atualiza páginas do próprio aplicativo
self.addEventListener("fetch", function(event) {

  const request = event.request;
  const url = new URL(request.url);

  // Não interfere nos servidores externos
  if(url.origin !== self.location.origin) {
    return;
  }

  // Busca a versão mais recente da página
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

  // Outros arquivos locais
  event.respondWith(

    caches.match(request).then(function(response) {

      return response || fetch(request);

    })

  );

});
