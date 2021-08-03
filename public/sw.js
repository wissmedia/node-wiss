const staticCacheName = 'site-static-v0';
const dynamicCacheName = 'site-dynamic-v0';
const assets = [
  '/',
  '/js/main.js',
  '/css/main.css',
  '/icons/css/all.css',
  '/fonts/SourceSansPro-Regular.ttf',
  '/icons/webfonts/fa-regular-400.woff2',
  '/icons/webfonts/fa-solid-900.woff2',
  '/icons/72.png',
  '/icons/192.png',
  '/fallback',
]

// install event
self.addEventListener('install', evt => {
  //console.log('service worker installed');
  evt.waitUntil(
    caches.open(staticCacheName).then((cache) => {
      console.log('caching shell assets');
      cache.addAll(assets);
    })
  );
});

// activate event
self.addEventListener('activate', evt => {
  //console.log('service worker activated');
  evt.waitUntil(
    caches.keys().then(keys => {
      //console.log(keys);
      return Promise.all(keys
        .filter(key => key !== staticCacheName && key !== dynamicCacheName)
        .map(key => caches.delete(key))
      );
    })
  );
});

// fetch event
self.addEventListener('fetch', evt => {
  //console.log('fetch event', evt);
  evt.respondWith(
    caches.match(evt.request).then(cacheRes => {
      return cacheRes || fetch(evt.request).then(fetchRes => {
        return caches.open(dynamicCacheName).then(cache => {
          cache.put(evt.request.url, fetchRes.clone());
          return fetchRes;
        })
      });
    }).catch(() => caches.match('/fallback'))
  );
});