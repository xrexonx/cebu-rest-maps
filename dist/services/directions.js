'use strict';

var Directions = {

  map: null,
  directionsService: null,
  directionsDisplay: null,
  defaultOrigin: null,

  init: function init(map) {
    Directions.map = map;
    Directions.directionsService = new google.maps.DirectionsService();
    Directions.directionsDisplay = new google.maps.DirectionsRenderer();
    Directions.defaultOrigin = new google.maps.LatLng(10.3156992, 123.8854366);
    Directions.directionsDisplay.setMap(map);
  },

  get: function get(destination) {
    var origin = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : Directions.getCurrentLocation();

    var request = {
      origin: origin,
      destination: destination,
      travelMode: 'DRIVING',
      region: 'PH'
    };
    Directions.directionsService.route(request, function (result, status) {
      if (status == 'OK') {
        Marker.reset();
        Directions.directionsDisplay.setDirections(result);
      }
    });
  },

  getCurrentLocation: function getCurrentLocation() {

    var geoLoc = navigator.geolocation;
    var currentLocation = Directions.defaultOrigin;
    if (geoLoc) {
      geoLoc.getCurrentPosition(function (position) {
        currentLocation = {
          lat: position.coords.latitude,
          lng: position.coords.longitude
        };
      }, function () {
        return Directions.defaultOrigin;
      });
    }

    return currentLocation;
  }
};