
const CACHE_NAME = 'insan-mobile-v2';
const API_CACHE_NAME = 'insan-api-v2';

// Assets to cache for offline functionality
const STATIC_ASSETS = [
  '/',
  '/manifest.json',
  '/icons/icon-192x192.png',
  '/icons/icon-512x512.png'
];

// Install event - cache static assets
self.addEventListener('install', (event) => {
  event.waitUntil(
    Promise.all([
      caches.open(CACHE_NAME).then((cache) => {
        return cache.addAll(STATIC_ASSETS);
      }),
      caches.open(API_CACHE_NAME)
    ])
  );
  self.skipWaiting();
});

// Activate event - clean up old caches
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheName !== CACHE_NAME && cacheName !== API_CACHE_NAME) {
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
  self.clients.claim();
});

// Fetch event - implement cache strategies
self.addEventListener('fetch', (event) => {
  const { request } = event;
  const url = new URL(request.url);

  // Handle API requests
  if (url.pathname.startsWith('/api/')) {
    event.respondWith(handleApiRequest(request));
    return;
  }

  // Handle static assets
  if (request.destination === 'image' || request.destination === 'script' || request.destination === 'style') {
    event.respondWith(handleStaticAsset(request));
    return;
  }

  // Handle navigation requests
  if (request.mode === 'navigate') {
    event.respondWith(handleNavigation(request));
    return;
  }

  // Default strategy: network first, then cache
  event.respondWith(
    fetch(request).catch(() => {
      return caches.match(request);
    })
  );
});

// API request handler - cache with network first strategy
async function handleApiRequest(request) {
  const cache = await caches.open(API_CACHE_NAME);
  
  try {
    // Try network first
    const networkResponse = await fetch(request);
    
    // Cache successful GET requests
    if (request.method === 'GET' && networkResponse.ok) {
      cache.put(request, networkResponse.clone());
    }
    
    return networkResponse;
  } catch (error) {
    // Network failed, try cache
    const cachedResponse = await cache.match(request);
    if (cachedResponse) {
      return cachedResponse;
    }
    
    // Return offline response for critical endpoints
    if (request.url.includes('/api/users/') && request.method === 'GET') {
      return new Response(JSON.stringify({ 
        offline: true, 
        message: 'Data tidak tersedia offline' 
      }), {
        headers: { 'Content-Type': 'application/json' },
        status: 200
      });
    }
    
    throw error;
  }
}

// Static asset handler - cache first strategy
async function handleStaticAsset(request) {
  const cache = await caches.open(CACHE_NAME);
  const cachedResponse = await cache.match(request);
  
  if (cachedResponse) {
    return cachedResponse;
  }
  
  try {
    const networkResponse = await fetch(request);
    if (networkResponse.ok) {
      cache.put(request, networkResponse.clone());
    }
    return networkResponse;
  } catch (error) {
    // Return placeholder for images if offline
    if (request.destination === 'image') {
      return new Response(
        '<svg width="100" height="100" xmlns="http://www.w3.org/2000/svg"><rect width="100%" height="100%" fill="#f3f4f6"/><text x="50%" y="50%" text-anchor="middle" dy=".3em" fill="#9ca3af">Offline</text></svg>',
        { headers: { 'Content-Type': 'image/svg+xml' } }
      );
    }
    throw error;
  }
}

// Navigation handler - app shell strategy
async function handleNavigation(request) {
  try {
    return await fetch(request);
  } catch (error) {
    // Return cached app shell
    const cache = await caches.open(CACHE_NAME);
    const appShell = await cache.match('/');
    return appShell || new Response('Offline - Aplikasi tidak tersedia', { status: 503 });
  }
}

// Background sync for data synchronization
self.addEventListener('sync', (event) => {
  if (event.tag === 'background-sync') {
    event.waitUntil(syncOfflineData());
  }
});

// Sync offline data when connection is restored
async function syncOfflineData() {
  try {
    // Check if online
    const response = await fetch('/api/health');
    if (response.ok) {
      // Sync any pending offline data
      const pendingData = await getOfflineData();
      if (pendingData.length > 0) {
        await uploadPendingData(pendingData);
        await clearOfflineData();
      }
    }
  } catch (error) {
    console.log('Sync failed, will retry later');
  }
}

// Placeholder functions for offline data management
async function getOfflineData() {
  return [];
}

async function uploadPendingData(data) {
  // Implementation for uploading pending data
}

async function clearOfflineData() {
  // Implementation for clearing synced offline data
}

// Push notification handler
self.addEventListener('push', (event) => {
  if (!event.data) return;

  const data = event.data.json();
  const options = {
    body: data.body,
    icon: '/icons/icon-192x192.png',
    badge: '/icons/icon-96x96.png',
    vibrate: [100, 50, 100],
    data: {
      dateOfArrival: Date.now(),
      primaryKey: '1'
    },
    actions: [
      {
        action: 'explore',
        title: 'Lihat Detail',
        icon: '/icons/icon-96x96.png'
      },
      {
        action: 'close',
        title: 'Tutup',
        icon: '/icons/icon-96x96.png'
      }
    ]
  };

  event.waitUntil(
    self.registration.showNotification(data.title, options)
  );
});

// Notification click handler
self.addEventListener('notificationclick', (event) => {
  event.notification.close();

  if (event.action === 'explore') {
    event.waitUntil(
      clients.openWindow('/')
    );
  }
});
