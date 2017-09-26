'use strict';

var MapService = {

  currentLocation: null,

  initMap: function initMap() {
    // Default Location - Ayala Center Cebu LatLng
    var defaultLocation = new google.maps.LatLng(10.318548, 123.90573640000002);
    var map = new google.maps.Map(document.getElementById('map'), {
      center: defaultLocation,
      zoom: 15
    });

    Drawing.init(map);
    SearchBox.init(map);
    Place.init(map, defaultLocation);
    Directions.init(map, defaultLocation);
    MapService.getCurrentLocation();
  },

  getCurrentLocation: function getCurrentLocation() {

    var current = MapService.currentLocation;
    if (current) return current;

    var geoError = function geoError(error) {
      return console.log('geoError', error);
    };
    var geoSuccess = function geoSuccess(position) {
      MapService.currentLocation = {
        lat: position.coords.latitude,
        lng: position.coords.longitude
      };
    };
    navigator.geolocation.getCurrentPosition(geoSuccess, geoError);
  }
};