function startMap() {

  const map = new google.maps.Map(document.getElementById('map'),
    {
      zoom: 13,
      center: geolocation()
    }
  );
  function geolocation() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(function (position) {
        const user_location = {
          lat: position.coords.latitude,
          lng: position.coords.longitude
        };

        map.setCenter(user_location);

        const youAreHere = new google.maps.Marker({
          position: {
            lat: user_location.lat,
            lng: user_location.lng
          },
          map: map,
          title: "You are here"
        });

      }, function () {
        console.log('Error in the geolocation service.');
      });
    } else {
      console.log('Browser does not support geolocation.');
    }
  }
}

startMap();