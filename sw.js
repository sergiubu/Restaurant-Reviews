// Service Worker version
const cacheName = 'rest-rev-v2';
// Files to add to cache
const cacheFiles = [
    '/',
    'index.html',
    'restaurant.html',
    'css/styles.css',
    'data/restaurants.json',
    'js/dbhelper.js',
    'js/main.js',
    'js/restaurant_info.js',
    'src/img/1.jpg',
    'src/img/2.jpg',
    'src/img/3.jpg',
    'src/img/4.jpg',
    'src/img/5.jpg',
    'src/img/6.jpg',
    'src/img/7.jpg',
    'src/img/8.jpg',
    'src/img/9.jpg',
    'src/img/10.jpg'
];

// Listen for install
self.addEventListener('install', e => {
    console.log('[ServiceWorker] Installed');

    // Open new cache & add cacheFiles array
    e.waitUntil(caches.open(cacheName)
        .then(cache => {
            console.log('[ServiceWorker] Caching cacheFiles');
            return cache.addAll(cacheFiles);
        })
    )
});

// Listen for activation
self.addEventListener('activate', e => {
    console.log('[ServiceWorker] Active');

    // Get cache keys & delete old cache
    e.waitUntil(caches.keys().then(cacheNames => {
        return Promise.all(cacheNames.map(thisCacheName => {
            if (thisCacheName !== cacheName) {
                console.log('[ServiceWorker] Removing cached files from', thisCacheName);
                return caches.delete(thisCacheName);
            }
        }))
    }))
});

// Listen for resources fetch
self.addEventListener('fetch', e => {
    console.log('[ServiceWorker] Fetching', e.request.url);

    // Check if requested resource is in cache
    e.respondWith(
        caches.match(e.request).then(response => {
            if (response) console.log('[ServiceWorker] Found in cache', e.request.url);
            return response || fetch(e.request);
        })
        .catch(err => console.log('[ServiceWorker] Error in fetching & caching', err))
    )
});
