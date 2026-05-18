const CACHE_NAME = "shopping-app-v1";
const ASSETS = [
  "./shopping-app-v46.html",
  "./manifest.json"
];

self.addEventListener("install", e => {
  e.waitUntil(
    caches.open(CACHE_NAME).then(cache => cache.addAll(ASSETS))
  );
  self.skipWaiting();
});

self.addEventListener("activate", e => {
  e.waitUntil(
    caches.keys().then(keys =>
      Promise.all(keys.filter(k => k !== CACHE_NAME).map(k => caches.delete(k)))
    )
  );
  self.clients.claim();
});

self.addEventListener("fetch", e => {
  // Network first for Firebase, cache fallback for app files
  if (e.request.url.includes("firestore") || e.request.url.includes("googleapis")) {
    return; // let Firebase handle its own requests
  }
  e.respondWith(
    fetch(e.request)
      .then(res => {
        // Update cache with fresh version
        const clone = res.clone();
        caches.open(CACHE_NAME).then(cache => cache.put(e.request, clone));
        return res;
      })
      .catch(() => caches.match(e.request))
  );
});
