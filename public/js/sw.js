self.addEventListener('push', function(event) {
  console.log('[Service Worker] Push Received.');
  console.log(`[Service Worker] Push had this data: "${event.data.text()}"`);

  let title;
  let date;
  let options = {};
  try {
    const data = event.data.json();
    title = data.notification.title || 'No title';
    if (data.notification.body) {
      options.body = data.notification.body;
    }
    if (data.notification.tag) {
      options.tag = data.notification.tag
    }
    if (data.notification.icon) {
      options.icon = data.notification.icon;
    }
    if (data.notification.badge) {
      options.badge = data.notification.badge;
    }
    if (data.time) {
      date = new Date(data.time);
    }
  } catch(e) {
    title = event.data.text() || 'No title';
  }

  if (date) { // schedule to show push notification in the future
    const now = new Date();
    const diff = date.getTime() - now.getTime();
    if (diff <= 0) { // if should have already pushed notification
      const notificationPromise = self.registration.showNotification(title, options);
      event.waitUntil(notificationPromise);
    } else {
      setTimeout(() => {
        registration.showNotification(title, options);
      }, diff)
    }
  } else {
    const notificationPromise = self.registration.showNotification(title, options);
    event.waitUntil(notificationPromise);
  }
});

self.addEventListener('notificationclick', function(event) {
  console.log('[Service Worker] Notification click Received.');

  event.notification.close();

  event.waitUntil(
    clients.openWindow('https://developers.google.com/web/')
  );
});