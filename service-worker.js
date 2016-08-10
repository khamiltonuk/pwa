(function() {
  'use strict';

  // THIS IS NOT WORKING
  // TODO Step x: Add notification close listener
  self.addEventListener('notificationclose', function(event) {
    var notification = event.notification;
    var primaryKey = notification.data.primaryKey;
    console.log('Closed notification:', primaryKey);
  });

  // TODO Step x: Add notification click listener
  self.addEventListener('notificationclick', function(event) {
    var notification = event.notification;
    var primaryKey = notification.data.primaryKey;
    var action = event.action;
    if (action === 'close') {
      notification.close();
      // Notification close GA - already done in close event
    } else if (action === 'open') {
      clients.openWindow('pages/page' + primaryKey + '.html');
      notification.close();
      console.log('Notification accepted');
    } else {
      clients.openWindow('pages/page' + primaryKey + '.html');
      notification.close();
      console.log('Notification clicked');
    }
  });

  // TODO Step x: Add push listener
  self.addEventListener('push', function(event) {
    console.log('Push recieved');
    if (Notification.permission === 'denied') {
      console.log('Push notification failed, user has notifications blocked');
      return;
    }
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
    console.log('Push notification displayed');
  });

})();
