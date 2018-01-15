(function serviceWorkerSetup() {
  const version = 'v5';
  self.addEventListener('install', function(event) {

    // list files that the worker preload for offline use.
    const urlsToPrefetch = [
      '/images/tits.jpg',
      '/images/hot.jpg',
      '/images/big-naturals.jpg',
      '/css/style.css',
      '/fetchAPItest.js',
      '/using-async.js',
      '/index.html'
    ];

    // when the Caches API has opened a cache for our version
    //  cache the files listed above.
    event.waitUntil(
      caches.open(version).then((cache) => {
        console.log(cache);
        cache.addAll(urlsToPrefetch.map((utp) => {
          return new Request(utp, {mode: 'no-cors'});
        }))
          .then((data) => console.log('All resources cached.') || data )
          .catch(console.error);
      })
      .catch((err) => {
        console.error('PrefetchError:', err);
      })
    );
  });

  // activate event
  self.addEventListener('activate', function(event) {
    // when activating the service worker, check for version changes.
    event.waitUntil(
      caches.keys()
      .then( keys => {
        return Promise.all(
          keys
          .filter( key => key !== version )
          .map( key => caches.delete(key) ));
      })
      .then( prom => {
        console.log(
          'SRVC_WRKR Activated on',
          new Date().toLocaleTimeString());
      })
    );
  });

  // fetch events
  self.addEventListener('fetch', function(event) {

    // if we've got cache matches return them
    event.respondWith(
      caches.match(event.request)
      .then( res => {
        if (res)
          return res;
        if (!navigator.onLine)
          // create an offline page to handle requests to uncached pages
          //  while the user is offline
          return caches.match(new Request('/index.html'));

        return fetchAndUpdate(event.request);
      })
    );
  });

  // if the the request is for an uncached asset and the user is online
  //  fetch the request and update the cache, so we can serve from there
  //  in the future.
  //  Cache First strategy
  function fetchAndUpdate(request) {
    return fetch(request)
      .then( res => {
        if (res) {
          // don't cache on post requests
          if (request.method === 'POST')
            return res;
          // don't allow unauthorized url schemes
          const urlscheme = request.url.substr(0, request.url.indexOf(':'));
          console.log(urlscheme);
          const approvedURLSchemes = ['http', 'https'];
          if (approvedURLSchemes.indexOf(urlscheme) < 0)
            return res;

          return caches.open(version)
            .then( cache => {
              return cache.put(request, res.clone())
                .then( () => res )
                .catch( e => console.error(e) );
            });
        }
      });
  }

})();
