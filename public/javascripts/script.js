function startMap() {

  const map = new google.maps.Map(document.getElementById('map'),
    {
      zoom: 5,
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

<<<<<<< HEAD
// function startMap() {

//   var coordinates = {
//     lat: 40.416775,
//     lng: -3.703790
//   };
//   var map = new google.maps.Map(
//     document.getElementById('map'), { zoom: 10, center: coordinates });
//   var marker = new google.maps.Marker({ position: coordinates, map: map });
// }

// startMap();

function startMap() {

  // Store Ironhack's coordinates
  const centerPosition = { lat: 10,  lng: -3.703790 };

  // Initialize the map
  const map = new google.maps.Map(document.getElementById('map'), 
    {
      zoom: 5,
      center: centerPosition
    }
  );

  // Add a marker for Ironhack Barcelona
  // const userLocation = new google.maps.Marker({
  //   position: {
  //     lat: centerPosition.lat,
  //     lng: centerPosition.lng
  //   },
  //   map: map,
  //   title: "Ubicación Usuario"
  // });


  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(function (position) {
      const user_location = {
        lat: position.coords.latitude,
        lng: position.coords.longitude
      };

      // Center map with user location
      map.setCenter(user_location);

      // Add a marker for your user location
      const ironhackBCNMarker = new google.maps.Marker({
        position: {
          lat: user_location.lat,
          lng: user_location.lng
        },
        map: map,
        title: "You are here."
      });

    }, function () {
      console.log('Error in the geolocation service.');
    });
  } else {
    console.log('Browser does not support geolocation.');
=======

        const youAreHere = new google.maps.Marker({
          position: {
            lat: user_location.lat,
            lng: user_location.lng
          },
          map: map,
          title: "You are here."
        });

      }, function () {
        console.log('Error in the geolocation service.');
      });
    } else {
      console.log('Browser does not support geolocation.');
    }
>>>>>>> 95f5cb85689b41a801ecdc06bb8fb57bde493cd0
  }
}

startMap();