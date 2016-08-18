(function() {
  'use strict';

  if (!('Notification' in window)) {
    console.log('This browser does not support notifications!');
    // TODO Optional step 8x: Send notification unsupported event
    return;
  }

  if (!('serviceWorker' in navigator)) {
    console.log('This browser does not support service worker');
    // TODO Optional step 8y: Send service worker unsupported event
    return;
  }

  var purchaseButton = document.getElementById('purchase');
  purchaseButton.addEventListener('click', function() {

    // TODO Step 7: Send custom Google Analytics event

  });

  // TODO Step 8a: Register the service worker

  // TODO Step 8b: Add notifications

  // TODO Step 8c: Add manual notification trigger to button

  // TODO Step 8d: Display manual notifications

  // TODO Step 8i: Open communication with service worker

  // TODO Step 9b: Add push notification

})();
