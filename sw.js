var CACHE_NAME = 'cache-v1';
var urlsToCache = [
    '/simple-service-worker/',
    '/simple-service-worker/index.html',
    '/simple-service-worker/styles/main.css',
    '/simple-service-worker/scripts/main.js',
    '/simple-service-worker/content/squeed.jpg'
];

self.addEventListener('install', function (event) {
    //Perform install steps
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then(function (cache) {
                console.log('Opened cache');
                return cache.addAll(urlsToCache);
            })
    )
});

self.addEventListener('fetch', function (event) {
    event.respondWith(
        caches.match(event.request)
            .then(function (response) {
                //Cache hit - return promise
                if (response) {
                    return response;
                }
                return fetch(event.request);
            })
    )
});

self.addEventListener('activate', function (event) {
    var cacheWhiteList = ['cache-v1'];
    event.waitUntil(
        caches.keys().then(function (cacheNames) {
            return Promise.all(
                cacheNames.map(function (cacheName) {
                    if (cacheWhiteList.indexOf(cacheName) === -1) {
                        return caches.delete(cacheName);
                    }
                })
            )
        })
    )
});