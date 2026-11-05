
// Nova versão do GPS Brasil
const CACHE_NAME = "gps-brasil-v6";

// Arquivos principais
const APP_FILES = [
  "./",
  "./index.html",
  "./manifest.json"
];

// INSTALAÇÃO
self.addEventListener("install", function(event) {

  event.waitUntil(
    caches.open(CACHE_NAME).then(function(cache) {
      return cache.addAll(APP_FILES);
    })
  );

  self.skipWaiting();

});

// ATUALIZAÇÃO
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

// CARREGAMENTO DOS ARQUIVOS
self.addEventListener("fetch", function(event) {

  const request = event.request;
  const url = new URL(request.url);

  // Não interfere nos mapas externos
  if(url.origin !== self.location.origin) {
    return;
  }

  // Atualiza a página pela internet
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

  // Arquivos locais
  event.respondWith(

    caches.match(request).then(function(response) {

      return response || fetch(request);

    })

  );

});
