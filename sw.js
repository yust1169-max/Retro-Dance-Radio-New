self.addEventListener('install', (e) => {
    self.skipWaiting();
});

self.addEventListener('activate', (e) => {
    e.waitUntil(clients.claim());
});

self.addEventListener('fetch', (e) => {
    const url = e.request.url;

    // Проверяем, что запрос идет именно к вашему потоку
    if (url.includes('radio.AAC')) {
        e.respondWith(
            fetch(e.request).catch(() => {
                // Это ключевой момент! 
                // Если интернет упал, мы отдаем браузеру пустой ответ.
                // Плеер на сайте получит ошибку и благодаря нашему коду 
                // в index.html (onStalled/onError) сам нажмет "переподключить".
                return new Response();
            })
        );
    }
});
