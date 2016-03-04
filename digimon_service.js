this.addEventListener('install', function(event) {
  event.waitUntil(
    caches.open('v1').then(function(cache) {
      return cache.addAll([
        '/wizardmon-needs-food-client/assets/bundle.js',
        '/wizardmon-needs-food-client/assets/workers/hunger_worker.js',
        '/wizardmon-needs-food-client/index.html'
      ]);
    })
  );
});

this.addEventListener('fetch', function(event) {
  var response;
  event.respondWith(caches.match(event.request).catch(function() {
    return fetch(event.request);
  }).then(function(r) {
    response = r;
    caches.open('v1').then(function(cache) {
      cache.put(event.request, response);
    });
    return response.clone();
  }).catch(function(err) {
    console.log(err);
  }));
});
