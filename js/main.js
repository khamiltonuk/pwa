(function() {

  var button = document.getElementById('buy');
  button.addEventListener('click', function(event) {
    console.log('button clicked!');
    console.log(event);

    ga('send', {
      hitType: 'event',
      eventCategory: 'purchase stuff',
      eventAction: 'buy now',
      eventLabel: 'store front'
    });

  });

})();
