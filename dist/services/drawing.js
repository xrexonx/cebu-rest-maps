'use strict';

var SHAPE_OPTIONS = {
  strokeColor: '#FF0000',
  strokeOpacity: 0.8,
  strokeWeight: 2,
  fillColor: '#FF0000',
  fillOpacity: 0.35,
  draggable: true,
  geodesic: true,
  editable: true
};

var Drawing = {

  map: null,
  placeService: null,
  drawingManager: null,
  overlay: null,

  init: function init(map) {

    Drawing.map = map;
    Drawing.placeService = new google.maps.places.PlacesService(map);

    var circleOptions = new google.maps.Circle(SHAPE_OPTIONS);
    var rectangleOptions = new google.maps.Rectangle(SHAPE_OPTIONS);

    var drawingManager = new google.maps.drawing.DrawingManager({
      drawingMode: null,
      drawingControl: true,
      drawingControlOptions: {
        position: google.maps.ControlPosition.TOP_CENTER,
        drawingModes: ['circle', 'rectangle']
      },
      circleOptions: circleOptions,
      rectangleOptions: rectangleOptions
    });

    Drawing.drawingManager = drawingManager;
    Drawing.drawingManager.setMap(map);
    google.maps.event.addListener(drawingManager, 'overlaycomplete', function (event) {
      Drawing.overlay = event.overlay;
      Drawing.onOverComplete(event.overlay);
    });
  },

  onOverComplete: function onOverComplete(overlay) {
    var request = {
      bounds: overlay.getBounds(),
      type: 'restaurant',
      keyword: 'restaurant cebu'
    };
    var service = new google.maps.places.PlacesService(Place.map);
    service.radarSearch(request, function (results) {
      // Render or show results count.
      console.log('results', results.length);
    });
  },

  clearDrawing: function clearDrawing() {
    Drawing.overlay.setMap(null);
  }

};