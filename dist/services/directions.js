'use strict';

var Directions = {

  map: null,
  directionsService: null,
  directionsDisplay: null,
  defaultOrigin: null,

  init: function init(map, defaultLocation) {
    Directions.map = map;
    Directions.defaultOrigin = defaultLocation;
    Directions.directionsService = new google.maps.DirectionsService();
    Directions.directionsDisplay = new google.maps.DirectionsRenderer();
    Directions.directionsDisplay.setMap(map);
  },

  get: function get(destination) {
    var origin = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : MapService.currentLocation;

    var request = {
      origin: origin || Directions.defaultOrigin,
      destination: destination,
      travelMode: 'DRIVING',
      region: 'PH'
    };
    Directions.directionsService.route(request, function (result, status) {
      if (status === 'OK') {
        Marker.reset();
        Directions.directionsDisplay.setDirections(result);
      }
    });
  }
};