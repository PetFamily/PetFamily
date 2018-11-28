console.log(window.pepe.address);

function userLocation(){
  
}

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

        const addMarker = (lat, lng, title, icon) => new google.maps.Marker({
          position: {
            lat,
            lng
          },
          map: map,
          title,
          icon: {
            url: icon
          }
        });
        addMarker(user_location.lat, user_location.lng, "España", 'http://maps.google.com/mapfiles/ms/icons/red-dot.png');
        addMarker(window.pepe.address.address.lat, window.pepe.address.address.lng, window.pepe.address.userLocationName, "http://maps.google.com/mapfiles/ms/icons/blue-dot.png");
        

      }, function () {
        console.log('Error in the geolocation service.');
      });
    } else {
      console.log('Browser does not support geolocation.');
    }
  }
}
startMap();