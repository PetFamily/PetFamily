let marker;
function startMap() {
  let storeMarkers;
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

      }, function () {
        console.log('Error in the geolocation service.');
      });
    } else {
      console.log('Browser does not support geolocation.');
    }
  }

  google.maps.event.addDomListener(map, 'click', function (event) {
    console.log(event.latLng.lat(), event.latLng.lng())
    if (marker && marker.setMap) {
      marker.setMap(null)
    }
    marker = new google.maps.Marker({
      position: {
        lat: event.latLng.lat(),
        lng: event.latLng.lng()
      },
      map: map,
      title: document.querySelector("#userLocationName").innerHTML
    });
    saveCoordinatesInDOM(event.latLng.lat(), event.latLng.lng())
  });
}
function saveCoordinatesInDOM(lat, lng) {
  document.querySelector("#lat").value = lat
  document.querySelector("#lng").value = lng
  // console.log(document.querySelector("#lat"))
}
startMap();