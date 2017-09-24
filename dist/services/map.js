'use strict';

// export default MapService = {
var MapService = {

  initMap: function initMap() {
    var defaultLocation = new google.maps.LatLng(10.3157, 123.8854);
    var map = new google.maps.Map(document.getElementById('map'), {
      center: defaultLocation,
      zoom: 13
    });

    Directions.init(map);
    Drawing.init(map);
    SearchBox.init(map);
    Place.init(map, defaultLocation);
  }
};