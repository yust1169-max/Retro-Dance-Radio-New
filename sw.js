// sw.js - Service Worker для Retro Dance Radio
const CACHE_NAME = 'radio-cache-v2';

self.addEventListener('install', (event) => {
    self.skipWaiting();
});

self.addEventListener('activate', (event) => {
    event.waitUntil(clients.claim());
});

self.addEventListener('fetch', (event) => {
    const url = event.request.url;
    if (url.includes('radio.AAC')) {
        event.respondWith(
            fetch(event.request).catch(() => {
                return new Response();
            })
        );
    }
});
