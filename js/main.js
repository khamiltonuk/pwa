(function() {
  'use strict';

  if (!('serviceWorker' in navigator)) {
    console.log('This browser does not support service worker');
    return;
  }

  if (!('Notification' in window)) {
    console.log('This browser does not support notifications!');
    return;
  }

  var registration; // Store service worker registration
  navigator.serviceWorker.register('service-worker.js')
  .then(function(reg) {
    console.log('Service worker registered', reg);
    registration = reg;
  })
  .catch(function(error) {
    console.log('Service Worker registration failed:', error);
  });

  var purchaseButton = document.getElementById('purchase');
  purchaseButton.addEventListener('click', function() {

    // TODO Step x: Add custom Google Analytics event
    ga('send', {
      hitType: 'event',
      eventCategory: 'products',
      eventAction: 'purchase',
      eventLabel: 'Summer products launch'
    });
    // no need console.log

  });

  // TODO Step x: Request notification permission
  // Browser may prompt user with permission request
  Notification.requestPermission(function(status) {
    console.log('Notification permission status:', status);
  });

  // TODO Step x: Add manual notification generation
  var notifyButton = document.getElementById('notify');
  notifyButton.addEventListener('click', function() {
    displayNotification();
  });

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
        console.log('Manual notification displayed');
      });
    } else {
      console.log('Notification failed, user has notifications blocked');
    }
  }

  // TODO Step x: Add push notification

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
      subscribeButton.textContent = 'Unsubscribe';
      isSubscribed = true;
    })
    .catch(function(error) {
      if (Notification.permission === 'denied') {
        console.log('Subscribe failed, user has notifications blocked');
      } else {
        console.log('Error subscribing', error);
      }
    });
  }

  function unsubscribe() {
    subscription.unsubscribe()
    .then(function() {
      console.log('Unsubscribed!');
      subscribeButton.textContent = 'Subscribe';
      isSubscribed = false;
    })
    .catch(function(error) {
      console.log('Error unsubscribing', error);
      subscribeButton.textContent = 'Subscribe';
    });
  }

})();
