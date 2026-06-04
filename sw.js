// BlogPrompt+ Service Worker v2.0
const CACHE = 'blogprompt-v2';

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE).then(cache => cache.addAll(['/blogprompt/index.html', '/blogprompt/']))
      .catch(() => caches.open(CACHE).then(c => c.addAll(['/index.html'])))
  );
  self.skipWaiting();
});

self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(keys =>
      Promise.all(keys.filter(k => k !== CACHE).map(k => caches.delete(k)))
    )
  );
  self.clients.claim();
});

self.addEventListener('fetch', event => {
  const url = new URL(event.request.url);
  if (url.hostname === 'api.anthropic.com') {
    event.respondWith(
      fetch(event.request).catch(() =>
        new Response(JSON.stringify({
          content: [{ text: 'Offline — blog generation needs internet. Entries are saved. Try again when connected.' }]
        }), { headers: { 'Content-Type': 'application/json' } })
      )
    );
    return;
  }
  event.respondWith(
    caches.match(event.request).then(cached => {
      if (cached) return cached;
      return fetch(event.request).then(response => {
        if (response && response.status === 200 && !url.hostname.includes('api.')) {
          const clone = response.clone();
          caches.open(CACHE).then(c => c.put(event.request, clone));
        }
        return response;
      }).catch(() => caches.match('/blogprompt/index.html') || caches.match('/index.html'));
    })
  );
});

// ── NOTIFICATION HANDLER
self.addEventListener('notificationclick', event => {
  event.notification.close();
  event.waitUntil(
    clients.matchAll({ type: 'window', includeUncontrolled: true }).then(clientList => {
      for (const client of clientList) {
        if (client.url.includes('blogprompt') && 'focus' in client) {
          return client.focus();
        }
      }
      if (clients.openWindow) return clients.openWindow('/blogprompt/');
    })
  );
});

// ── SCHEDULED QUERY ALARM (via postMessage from app)
self.addEventListener('message', event => {
  if (event.data && event.data.type === 'FIRE_NOTIFICATION') {
    const { title, body } = event.data;
    self.registration.showNotification(title || 'BlogPrompt+ Query', {
      body: body || 'Time to log something — tap to answer.',
      icon: '/blogprompt/icon-192.png',
      badge: '/blogprompt/icon-192.png',
      tag: 'blogprompt-query',
      renotify: true,
      requireInteraction: false,
      vibrate: [100, 50, 100],
      actions: [
        { action: 'open', title: 'Answer Now' },
        { action: 'skip', title: 'Skip' }
      ]
    });
  }
});
