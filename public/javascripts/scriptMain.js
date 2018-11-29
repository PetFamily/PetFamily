// console.log(window.pepe.address);
const locationInfo = window.address.address
const markers = [];

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

        var contentString = '<h1>hola</h1>'
        var infowindow = new google.maps.InfoWindow({
          content: contentString
        })

        const addMarker = (lat, lng, title, icon) => new google.maps.Marker({
          position: {
            lat, lng
          },
          map: map, title, icon: { url: icon }
        })
        addMarker(user_location.lat, user_location.lng, "You are here", 'http://maps.google.com/mapfiles/ms/icons/red-dot.png');


        locationInfo.forEach(({ address: { lat, lng }, userLocationName }) => {
          addMarker(lat, lng, userLocationName, 'http://maps.google.com/mapfiles/ms/icons/blue-dot.png')
        })


        //PRUEBA 1 - error Uncaught TypeError: addMarker.addListener is not a function
        addMarker.addListener('click', function () {
          infowindow.open(map, addMarker);
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

// https://developers.google.com/maps/documentation/javascript/examples/infowindow-simple#try-it-yourself

/*
locationInfo.forEach( ({address:{lat:latitude, lng}, userLocationName}) => {
  // const {lat, lng} = e.address;
  // const userLocationName = e.userLocationName;
  addMarker(latitude, lng, userLocationName, "http://maps.google.com/mapfiles/ms/icons/blue-dot.png")})
  */

         //PRUEBA 2 - error   ReferenceError: marker is not defined
         // marker.addListener('click', function () {
         // infowindow.open(map, addMarker);
         // }); 

         //PRUEBA 3 - error  Uncaught ReferenceError: marker is not defined
         // marker.addListener('click', function () {
         //   infowindow.open(map, addMarker);
         // });