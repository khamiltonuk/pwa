// TODO Step 10: Add offline analytics

(function() {
  'use strict';

  self.addEventListener('notificationclose', function(event) {
    var notification = event.notification;
    var primaryKey = notification.data.primaryKey;
    console.log('Closed notification:', primaryKey);
    mainClientPort.postMessage({
      eventCategory: 'notification',
      eventAction: 'closed'
    });
  });

  self.addEventListener('notificationclick', function(event) {
    var notification = event.notification;
    var primaryKey = notification.data.primaryKey;
    var action = event.action;
    if (action === 'close') {
      notification.close();
      console.log('Closed notification:', primaryKey);
      mainClientPort.postMessage({
        eventCategory: 'notification',
        eventAction: 'closed'
      });
    } else if (action === 'open') {
      clients.openWindow('pages/page' + primaryKey + '.html');
      notification.close();
      console.log('Notification opened');
      mainClientPort.postMessage({
        eventCategory: 'notification',
        eventAction: 'opened'
      });
    } else {
      clients.openWindow('pages/page' + primaryKey + '.html');
      notification.close();
      console.log('Notification clicked');
      mainClientPort.postMessage({
        eventCategory: 'notification',
        eventAction: 'clicked'
      });
    }
  });

  var mainClientPort;
  self.addEventListener('message', function(event) {
    console.log('Service worker received message: ', event.data);
    mainClientPort = event.ports[0];
    console.log('Communication ports established');
  });

  // TODO Step 9c: Add push listener

})();
