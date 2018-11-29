// console.log(window.pepe.address);
const locationInfo = window.address.address;


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
        const addMarker = (lat, lng, title, icon, username, email, userType, availability, pricePerHour, typeActivity) => new google.maps.Marker({
          position: {
            lat, lng
          },
          map: map,
          title,
          username,
          userType,
          availability,
          pricePerHour,
          typeActivity,
          email,
          icon: {
            url: icon,
            origin: new google.maps.Point(0, 0),
            scaledSize: new google.maps.Size(40, 40)
          }
        });

        addMarker(user_location.lat, user_location.lng, "You are here", 'http://maps.google.com/mapfiles/ms/icons/red-dot.png');

        let allMarkers = locationInfo.map(({ address: { lat, lng }, userLocationName, username, email, userType, availability, pricePerHour, typeActivity }) => {
          return addMarker(lat, lng, userLocationName, 'http://maps.google.com/mapfiles/ms/icons/blue-dot.png', username, email, userType, availability, pricePerHour, typeActivity)
        })
        allMarkers.forEach((element) => {
          var infowindow = new google.maps.InfoWindow({
            content: `<div class="icon-container">` + `<h6 class="icon-title"> ${element.username}` + `<h6 class="icon-text">${element.email}</h6>` + `<h6 class="icon-text">${element.typeActivity}</h6>` +
              `<h6 class="icon-text">${element.userType}</h6>` + `<h6 class="icon-text">${element.availability}</h6>` + `<h6 class="icon-text">${element.pricePerHour}€</h6></div>`
          });
          element.addListener('click', () => {
            infowindow.open(map, element)
          })
        })
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