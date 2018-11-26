document.addEventListener('DOMContentLoaded', () => {

  console.log('IronGenerator JS imported successfully!');

}, false);

function startMap() {

  var coordinates = {
    lat: 40.416775,
    lng: -3.703790
  };
  var map = new google.maps.Map(
    document.getElementById('map'), { zoom: 10, center: coordinates });
  var marker = new google.maps.Marker({ position: coordinates, map: map });
}

startMap();