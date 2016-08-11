(function() {
  'use strict';

  // THIS IS NOT WORKING
  // TODO Step x: Add notification close listener
  // self.addEventListener('notificationclose', function(event) {
  //   var notification = event.notification;
  //   var primaryKey = notification.data.primaryKey;
  //   console.log('Closed notification:', primaryKey);
  //   mainClientPort.postMessage({
  //     eventCategory: 'notification',
  //     eventAction: 'closed'
  //   });
  // });

  // TODO Step x: Add notification click listener
  // self.addEventListener('notificationclick', function(event) {
  //   var notification = event.notification;
  //   var primaryKey = notification.data.primaryKey;
  //   var action = event.action;
  //   if (action === 'close') {
  //     notification.close();
  //     // Notification close GA - already done in close event
  //   } else if (action === 'open') {
  //     clients.openWindow('pages/page' + primaryKey + '.html');
  //     notification.close();
  //     console.log('Notification opened'); // action?
  //     mainClientPort.postMessage({
  //       eventCategory: 'notification',
  //       eventAction: 'opened'
  //     });
  //   } else {
  //     clients.openWindow('pages/page' + primaryKey + '.html');
  //     notification.close();
  //     console.log('Notification clicked');
  //     mainClientPort.postMessage({
  //       eventCategory: 'notification',
  //       eventAction: 'clicked'
  //     });
  //   }
  // });

  // TODO Step x: Add message listener & establish communication
  // var mainClientPort;
  // self.addEventListener('message', function(event) {
  //   console.log('Service worker received message: ', event.data);
  //   mainClientPort = event.ports[0];
  //   console.log('Communication ports established');
  // });

  // TODO Step x: Add push listener
  // self.addEventListener('push', function(event) {
  //   console.log('Push recieved');
  //   mainClientPort.postMessage({
  //     eventCategory: 'push',
  //     eventAction: 'recieved'
  //   });
  //   if (Notification.permission === 'denied') {
  //     console.warn('Push notification failed, notifications are blocked');
  //     mainClientPort.postMessage({
  //       eventCategory: 'push',
  //       eventAction: 'blocked'
  //     });
  //     return;
  //   }
  //   var options = {
  //     body: 'This notification was generated from a push!',
  //     icon: 'images/notification-flat.png',
  //     vibrate: [100, 50, 100],
  //     data: {
  //       dateOfArrival: Date.now(),
  //       primaryKey: '2'
  //     },
  //     actions: [
  //       {action: 'open', title: 'Open the site!',
  //         icon: 'images/checkmark.png'},
  //       {action: 'close', title: 'Go away!',
  //         icon: 'images/xmark.png'},
  //     ]
  //   };
  //   event.waitUntil(
  //     Promise.all([
  //       self.registration.showNotification('Hello world!', options),
  //       mainClientPort.postMessage({
  //         eventCategory: 'notification',
  //         eventAction: 'displayed-push'
  //       })
  //     ])
  //   );
  // });

})();
