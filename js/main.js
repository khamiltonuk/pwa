(function() {
  'use strict';

  if (!('Notification' in window)) {
    console.log('This browser does not support notifications!');
    // TODO Optional step 8g: Send notification unsupported event
    ga('send', 'event', 'notifications', 'unsupported');
    return;
  }

  if (!('serviceWorker' in navigator)) {
    console.log('This browser does not support service worker');
    // TODO Optional step 8h: Send service worker unsupported event
    ga('send', 'event', 'service-worker', 'unsupported');
    return;
  }

  var purchaseButton = document.getElementById('purchase');
  purchaseButton.addEventListener('click', function() {

    // TODO Step 7: Send custom Google Analytics event
    ga('send', {
      hitType: 'event',
      eventCategory: 'products',
      eventAction: 'purchase',
      eventLabel: 'Summer products launch'
    });

  });

  // TODO Step 8a: Register the service worker
  var registration; // Store service worker registration
  navigator.serviceWorker.register('service-worker.js')
  .then(function(reg) {
    console.log('Service worker registered', reg);
    registration = reg;
  })
  .catch(function(error) {
    console.log('Service Worker registration failed:', error);
  });

  // TODO Step 8b: Add notifications
  // Browser may prompt user with permission request
  Notification.requestPermission(function(status) {
    console.log('Notification permission status:', status);
  });

  // TODO Step 8c: Add manual notification trigger to button
  var notifyButton = document.getElementById('notify');
  notifyButton.addEventListener('click', function() {
    displayNotification();
  });

  // TODO Step 8d: Display manual notifications
  function displayNotification() {
    if (Notification.permission == 'granted') {
      navigator.serviceWorker.getRegistration()
      .then(function(registration) {
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
        // TODO Step 8e: send notification display event
        ga('send', 'event', 'notification', 'displayed-standard');
      });
    } else {
      console.warn('Notifications are blocked');
      // TODO Step 8f: send notification blocked event
      ga('send', 'event', 'notification', 'blocked');
    }
  }

  // TODO Step 8i: Open communication with service worker
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

  var subscription;
  var isSubscribed = false;
  var subscribeButton = document.getElementById('subscribe');

  subscribeButton.addEventListener('click', function() {
    if (isSubscribed) {
      unsubscribe();
    } else {
      subscribe();
    }
  });

  function subscribe() {
    registration.pushManager.subscribe({userVisibleOnly: true})
    .then(function(pushSubscription) {
      subscription = pushSubscription;
      console.log('Subscribed!', subscription);
      // TODO Step 9d: send push subscribed event
      // ga('send', 'event', 'push', 'subscribe');
      subscribeButton.textContent = 'Unsubscribe';
      isSubscribed = true;
    })
    .catch(function(error) {
      if (Notification.permission === 'denied') {
        console.warn('Subscribe failed, notifications are blocked');
        // TODO Step 9e: send push blocked event
        // ga('send', 'event', 'push', 'subscribe-blocked');
      } else {
        console.log('Error subscribing', error);
        // TODO Step 9f: send push subscribe-error event
        // ga('send', 'event', 'push', 'subscribe-error');
      }
    });
  }

  function unsubscribe() {
    subscription.unsubscribe()
    .then(function() {
      console.log('Unsubscribed!');
      // TODO Step 9g: send push unsubscibe event
      // ga('send', 'event', 'push', 'unsubscribe');
      subscribeButton.textContent = 'Subscribe';
      isSubscribed = false;
    })
    .catch(function(error) {
      console.log('Error unsubscribing', error);
      // TODO Step 9h: send push unsubscribe-error event
      // ga('send', 'event', 'push', 'unsubscribe-error');
      subscribeButton.textContent = 'Subscribe';
    });
  }

})();
