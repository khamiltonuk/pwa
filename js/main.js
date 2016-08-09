(function() {

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
