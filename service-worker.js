(function() {
  'use strict';

  // THIS IS NOT WORKING
  // TODO Step 8g: Add notification close listener
  self.addEventListener('notificationclose', function(event) {
    var notification = event.notification;
    var primaryKey = notification.data.primaryKey;
    console.log('Closed notification:', primaryKey);
    // TODO Step 8k: send notification close event
    mainClientPort.postMessage({
      eventCategory: 'notification',
      eventAction: 'closed'
    });
  });

  // TODO Step 8h: Add notification click listener
  self.addEventListener('notificationclick', function(event) {
    var notification = event.notification;
    var primaryKey = notification.data.primaryKey;
    var action = event.action;
    if (action === 'close') {
      notification.close();
      // TODO // notificationclose listener sends notification close event
    } else if (action === 'open') {
      clients.openWindow('pages/page' + primaryKey + '.html');
      notification.close();
      console.log('Notification opened');
      // TODO Step 8l: Send notification opened event
      mainClientPort.postMessage({
        eventCategory: 'notification',
        eventAction: 'opened'
      });
    } else {
      clients.openWindow('pages/page' + primaryKey + '.html');
      notification.close();
      console.log('Notification clicked');
      // TODO Step 8m: Send notification clicked event
      mainClientPort.postMessage({
        eventCategory: 'notification',
        eventAction: 'clicked'
      });
    }
  });

  // TODO Step 8j: Add message listener & establish communication
  var mainClientPort;
  self.addEventListener('message', function(event) {
    console.log('Service worker received message: ', event.data);
    mainClientPort = event.ports[0];
    console.log('Communication ports established');
  });

  // TODO Step 9c: Add push listener
  self.addEventListener('push', function(event) {
    console.log('Push recieved');
    // TODO Step 9i: Send push received event
    // mainClientPort.postMessage({
    //   eventCategory: 'push',
    //   eventAction: 'recieved'
    // });
    if (Notification.permission === 'denied') {
      console.warn('Push notification failed, notifications are blocked');
      // TODO Step 9j: Send push blocked event
      // mainClientPort.postMessage({
      //   eventCategory: 'push',
      //   eventAction: 'blocked'
      // });
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
      Promise.all([
        self.registration.showNotification('Hello world!', options),
        // TODO Step 9k: Send notification displayed-push event
        // mainClientPort.postMessage({
        //   eventCategory: 'notification',
        //   eventAction: 'displayed-push'
        // })
      ])
    );
  });

})();
