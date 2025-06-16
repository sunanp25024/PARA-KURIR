
const CACHE_NAME = 'insan-mobile-v2';
const urlsToCache = [
  '/',
  '/auth',
  '/login',
  '/static/js/bundle.js',
  '/static/css/main.css',
  '/manifest.json',
  '/lovable-uploads/c005202f-c3fd-4bcd-be23-7edff7d62bb7.png'
];

// Install event - cache resources
self.addEventListener('install', (event) => {
  console.log('Service Worker installing...');
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => {
        console.log('Caching app shell');
        return cache.addAll(urlsToCache);
      })
      .then(() => self.skipWaiting())
  );
});

// Activate event - clean up old caches
self.addEventListener('activate', (event) => {
  console.log('Service Worker activating...');
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheName !== CACHE_NAME) {
            console.log('Deleting old cache:', cacheName);
            return caches.delete(cacheName);
          }
        })
      );
    }).then(() => self.clients.claim())
  );
});

// Fetch event - serve from cache when offline, network first for API calls
self.addEventListener('fetch', (event) => {
  // Handle API calls with network first strategy
  if (event.request.url.includes('/api/') || event.request.url.includes('supabase.co')) {
    event.respondWith(
      fetch(event.request)
        .then((response) => {
          // Clone the response before caching
          const responseToCache = response.clone();
          caches.open(CACHE_NAME)
            .then((cache) => {
              cache.put(event.request, responseToCache);
            });
          return response;
        })
        .catch(() => {
          // If network fails, try cache
          return caches.match(event.request);
        })
    );
    return;
  }

  // Handle other requests with cache first strategy
  event.respondWith(
    caches.match(event.request)
      .then((response) => {
        // Return cached version or fetch from network
        if (response) {
          return response;
        }
        
        return fetch(event.request)
          .then((response) => {
            // Don't cache if not a valid response
            if (!response || response.status !== 200 || response.type !== 'basic') {
              return response;
            }

            // Clone the response before caching
            const responseToCache = response.clone();
            caches.open(CACHE_NAME)
              .then((cache) => {
                cache.put(event.request, responseToCache);
              });

            return response;
          });
      }
    )
  );
});

// Handle background sync for offline actions
self.addEventListener('sync', (event) => {
  if (event.tag === 'package-update') {
    console.log('Background sync: package-update');
    // Handle offline package updates when back online
  }
});

// Handle push notifications
self.addEventListener('push', (event) => {
  console.log('Push notification received');
  
  const options = {
    body: event.data ? event.data.text() : 'Ada update baru dari INSAN MOBILE',
    icon: '/lovable-uploads/c005202f-c3fd-4bcd-be23-7edff7d62bb7.png',
    badge: '/lovable-uploads/c005202f-c3fd-4bcd-be23-7edff7d62bb7.png',
    vibrate: [200, 100, 200],
    data: {
      dateOfArrival: Date.now(),
      primaryKey: 1
    },
    actions: [
      {
        action: 'explore',
        title: 'Buka Aplikasi',
        icon: '/lovable-uploads/c005202f-c3fd-4bcd-be23-7edff7d62bb7.png'
      },
      {
        action: 'close',
        title: 'Tutup',
        icon: '/lovable-uploads/c005202f-c3fd-4bcd-be23-7edff7d62bb7.png'
      }
    ]
  };

  event.waitUntil(
    self.registration.showNotification('INSAN MOBILE', options)
  );
});

// Handle notification clicks
self.addEventListener('notificationclick', (event) => {
  console.log('Notification clicked');
  event.notification.close();

  if (event.action === 'explore') {
    // Open the app
    event.waitUntil(
      clients.openWindow('/')
    );
  }
});
