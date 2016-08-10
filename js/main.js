(function() {

  // Check for service worker support
  if (!('serviceWorker' in navigator)) {
    console.log('This browser does not support service worker');
    // service worker not supported GA
    return;
  }

  // Check for notification support
  if (!('Notification' in window)) {
    console.log('This browser does not support notifications!');
    // notifications not supported GA
    return;
  }

  // Register service worker
  navigator.serviceWorker.register('service-worker.js')
  .then(function(registration) {
    console.log('Service worker registered', registration);

    // registration.pushManager.subscribe({userVisibleOnly:true}).then(function(sub) {console.log(sub);});
  })
  .catch(function(error) {
    console.log('Service Worker registration failed:', error);
  });

  // Request notification permission
  Notification.requestPermission(function(status) {
    console.log('Notification permission status:', status);
  });
  // Notification permission denied GA?

  // Check for push notification (SHOULD THIS JUST BE IN SW REGISTRATION?)
  navigator.serviceWorker.ready.then(function(registration) {
    registration.pushManager.getSubscription()
    .then(function(subscription) {

      if (!subscription) {
        if (window.confirm(
          'Would you like to subscribe to push notifications?')) {
          // subscribe accept GA
          console.log('sub yes');
          registration.pushManager.subscribe({
            userVisibleOnly: true
          })
          .then(function(subscription) {
            // supscribe successful GA
            console.log('sub complete');
          })
          .catch(function(error) {
            if (Notification.permission === 'denied') {
              console.warn('Permission for notifications was denied');
              // subscribe failed GA, notifications
            } else {
              console.log('Unable to subscribe to Push!', error);
              // subscribe failed GA, error
            }
          });
        } else {
          // Push subscription rejected GA
          console.log('sub rejected');
        }
      } else {
        console.log('User already subscribed', subscription);
        // subscription.unsubscribe();
      }

    });
  });

  // Add notification generation to UI button
  document.getElementById('display').addEventListener('click', function(event) {
    displayNotification();
  });

  // Display a standard notification
  // THIS IS A MANUAL NOTIFICATION, BUT WE also have push one too
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
        // Show notification manual GA
      });
    }
  }

  // Add custom event to UI button
  var button = document.getElementById('buy');
  button.addEventListener('click', function(event) {
    console.log('button clicked!');
    console.log(event);

    ga('send', {
      hitType: 'event',
      eventCategory: 'products',
      eventAction: 'view details',
      eventLabel: 'Summer products launch'
    });

  });

})();
