const CACHE_NAME = "web-app-cache-v1";
const urlsToCache = [
  "/",
  "/index.html",
  "/page2main.html",
  "/sw.js",
 
];

// ติดตั้ง Service Worker
self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(urlsToCache);
    })
  );
});

// ดักจับคำขอและให้บริการไฟล์จาก Cache
self.addEventListener("fetch", (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => {
      return response || fetch(event.request);
    })
  );
});

// ลบ Cache เก่าเมื่อมีการเปลี่ยนแปลง
self.addEventListener("activate", (event) => {
  const cacheWhitelist = [CACHE_NAME];
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (!cacheWhitelist.includes(cacheName)) {
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});
