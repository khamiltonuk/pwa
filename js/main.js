(function() {
  'use strict';

  if (!('Notification' in window)) {
    console.log('This browser does not support notifications!');
    ga('send', 'event', 'notification', 'unsupported');
    return;
  }

  if (!('serviceWorker' in navigator)) {
    console.log('This browser does not support service worker');
    ga('send', 'event', 'service-worker', 'unsupported');
    return;
  }

  var purchaseButton = document.getElementById('purchase');
  purchaseButton.addEventListener('click', function() {
    ga('send', 'event', 'products', 'purchase', 'Summer product launch');
  });

  var registration; // Store service worker registration
  navigator.serviceWorker.register('service-worker.js')
  .then(function(reg) {
    console.log('Service worker registered', reg);
    registration = reg;
  })
  .catch(function(error) {
    console.log('Service Worker registration failed:', error);
  });

  // Browser may prompt user with permission request
  Notification.requestPermission(function(status) {
    console.log('Notification permission status:', status);
  });

  var notifyButton = document.getElementById('notify');
  notifyButton.addEventListener('click', function() {
    displayNotification();
  });

  function displayNotification() {
    if (Notification.permission == 'granted') {
      var options = {
        body: 'You have a new notification!',
        icon: 'images/notification-flat.png',
        vibrate: [100, 50, 100],
        data: {
          dateOfArrival: Date.now(),
          primaryKey: 1
        },
        actions: [
          {action: 'open', title: 'Open the site!',
            icon: 'images/checkmark.png'},
          {action: 'close', title: 'Go away!',
            icon: 'images/xmark.png'},
        ]
      };
      registration.showNotification('Hello world!', options);
      ga('send', 'event', 'notification', 'displayed-standard');
    } else {
      console.warn('Notifications are blocked');
      ga('send', 'event', 'notification', 'blocked');
    }
  }

  function openCommunication() {
    var msgChannel = new MessageChannel();
    msgChannel.port1.onmessage = function(msgEvent) {
      sendAnalytics(msgEvent.data);
    };
    navigator.serviceWorker.controller.postMessage(
      'Establishing contact with service worker', [msgChannel.port2]
    );
  }
  openCommunication();

  function sendAnalytics(message) {
    var eventCategory = message.eventCategory;
    var eventAction = message.eventAction;
    ga('send', 'event', eventCategory, eventAction);
  }

  // TODO Step 9b: Add push notification

})();
