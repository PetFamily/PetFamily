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
  var input = document.getElementById('pac-input');
  var searchBox = new google.maps.places.SearchBox(input);

  map.addListener('bounds_changed', function () {
    searchBox.setBounds(map.getBounds());
  });
  var markers = [];

  searchBox.addListener('places_changed', function () {
    var places = searchBox.getPlaces();

    if (places.length == 0) {
      return;
    }

    // Clear out the old markers.
    markers.forEach(function (marker) {
      marker.setMap(null);
    });
    markers = [];

    // For each place, get the icon, name and location.
    var bounds = new google.maps.LatLngBounds();
    places.forEach(function (place) {
      if (!place.geometry) {
        console.log("Returned place contains no geometry");
        return;
      }
      var icon = {
        url: 'http://maps.google.com/mapfiles/ms/icons/blue-dot.png',
        size: new google.maps.Size(120, 120),
        origin: new google.maps.Point(0, 0),
        // anchor: new google.maps.Point(17, 34),
        scaledSize: new google.maps.Size(40, 40)
      };

      // Create a marker for each place.
      markers.push(new google.maps.Marker({
        map: map,
        icon: icon,
        title: document.querySelector("#userLocationName").innerHTML,
        position: place.geometry.location
      }));

      if (place.geometry.viewport) {
        // Only geocodes have viewport.
        console.log(place.geometry.location.lat())
        document.querySelector("#lat").value = place.geometry.location.lat()
        document.querySelector("#lng").value = place.geometry.location.lng()
        bounds.union(place.geometry.viewport);
      } else {
        bounds.extend(place.geometry.location);
      }
    });
    map.fitBounds(bounds);
  });
}
function saveCoordinatesInDOM(lat, lng) {
  document.querySelector("#lat").value = lat
  document.querySelector("#lng").value = lng
  // console.log(document.querySelector("#lat"))
}
startMap();
