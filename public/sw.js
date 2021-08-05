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
  '/icons/512.png',
  '/icons/maskable_icon_x192.png',
  '/icons/maskable_icon_x512.png',
  '/fallback',
]

// cache size limit fucntion
const limitCacheSize = (name, size) => {
  caches.open(name).then(cache => {
    cache.keys().then(keys => {
      if(keys.length > size){
        cache.delete(keys[0]).then(limitCacheSize(name, size))
      }
    })
  })
}

// install event
self.addEventListener('install', evt => {
  console.log('service worker installed');
  evt.waitUntil(
    caches.open(staticCacheName).then((cache) => {
      console.log('caching shell assets');
      cache.addAll(assets);
    })
  );
});

// activate event
self.addEventListener('activate', evt => {
  console.log('service worker activated');
  evt.waitUntil(
    caches.keys().then(keys => {
      console.log(keys);
      return Promise.all(keys
        .filter(key => key !== staticCacheName && key !== dynamicCacheName)
        .map(key => caches.delete(key))
      );
    })
  );
});

// fetch event
self.addEventListener('fetch', evt => {
  evt.respondWith(
    caches.match(evt.request).then(cacheRes => {
      return cacheRes || fetch(evt.request).then(fetchRes => {
        return caches.open(dynamicCacheName).then(cache => {
          cache.put(evt.request.url, fetchRes.clone());
          limitCacheSize(dynamicCacheName, 15)
          return fetchRes;
        })
      });
    }).catch(() => caches.match('/fallback'))
  );
});