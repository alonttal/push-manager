self.addEventListener('push', function(event) {
  console.log('[Service Worker] Push Received.');
  console.log(`[Service Worker] Push had this data: "${event.data.text()}"`);

  let title;
  let options = {};
  try {
    const data = event.data.json();
    title = data.title || 'No title';
    if (data.body) {
      options.body = data.body;
    }
    if (data.icon) {
      options.icon = data.icon;
    }
    if (data.badge) {
      options.badge = data.badge;
    }
  } catch(e) {
    title = event.data.text() || 'No title';
  }

  const notificationPromise = self.registration.showNotification(title, options);
  event.waitUntil(notificationPromise);
});

self.addEventListener('notificationclick', function(event) {
  console.log('[Service Worker] Notification click Received.');

  event.notification.close();

  event.waitUntil(
    clients.openWindow('https://developers.google.com/web/')
  );
});