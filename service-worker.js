// THIS IS NOT WORKING
self.addEventListener('notificationclose', function(event) {
  var notification = event.notification;
  var primaryKey = notification.data.primaryKey;
  console.log('Closed notification: ' + primaryKey);
  // Notification closed GA
});

self.addEventListener('notificationclick', function(event) {
  var notification = event.notification;
  var primaryKey = notification.data.primaryKey;
  var action = event.action;
  if (action === 'close') {
    notification.close();
    // Notification close GA - already done in close event
  } else if (action === 'open') {
    clients.openWindow('samples/page' + primaryKey + '.html');
    notification.close();
    // Notification opened GA
  } else {
    clients.openWindow('samples/page' + primaryKey + '.html');
    notification.close();
    // Notification clicked GA
  }
});

self.addEventListener('push', function(event) {
  // Push event recieved GA
  var options = {
    body: 'This notification was generated from a push!',
    icon: 'images/notification-flat.png',
    vibrate: [100, 50, 100],
    data: {
      dateOfArrival: Date.now(),
      primaryKey: '2'
    },
    actions: [
      {action: 'open', title: 'Open the site!',
        icon: 'images/checkmark.png'},
      {action: 'close', title: 'Go away!',
        icon: 'images/xmark.png'},
    ]
  };
  event.waitUntil(
    self.registration.showNotification('Hello world!', options)
  );
  // Show notification push GA

});
