'use strict';

var SHAPE_OPTIONS = {
  strokeColor: '#FF0000',
  strokeOpacity: 0.8,
  strokeWeight: 2,
  fillColor: '#FF0000',
  fillOpacity: 0.35
};

var Drawing = {

  map: null,
  placeService: null,
  drawingManager: null,
  circle: null,
  rectangle: null,
  overlay: null,

  init: function init(map) {

    Drawing.map = map;
    Drawing.placeService = new google.maps.places.PlacesService(map);

    Drawing.circle = new google.maps.Circle(SHAPE_OPTIONS);
    Drawing.rectangle = new google.maps.Rectangle(SHAPE_OPTIONS);

    var drawingManager = new google.maps.drawing.DrawingManager({
      drawingMode: google.maps.drawing.OverlayType.MARKER,
      drawingControl: true,
      drawingControlOptions: {
        position: google.maps.ControlPosition.TOP_CENTER,
        drawingModes: ['circle', 'rectangle']
      },
      circleOptions: Drawing.circle,
      rectangleOptions: Drawing.rectangle
    });

    Drawing.drawingManager = drawingManager;

    // drawingManager.setMap(map)
    google.maps.event.addListener(drawingManager, 'overlaycomplete', function (event) {
      Drawing.overlay = event.overlay;
      if (event.type == 'circle') Drawing.onCompleteCircle(Drawing.overlay);
      if (event.type == 'rectangle') Drawing.onCompleteRectangle(Drawing.overlay);
    });
  },

  onCompleteCircle: function onCompleteCircle(overlay) {
    var center = new google.maps.LatLng(overlay.getCenter().lat(), overlay.getCenter().lng());
    var request = {
      location: center,
      radius: overlay.getRadius(),
      type: ['restaurant']
    };
    Place.nearbySearch(request, Drawing.overlayCallBack);
  },

  onCompleteRectangle: function onCompleteRectangle(overlay) {
    var bounce = overlay.getBounds();
    var request = {
      bounds: bounce,
      type: 'restaurant',
      keyword: 'restaurant cebu'
      // radarSearch will be deprecated soon
    };Place.radarSearch(request, Drawing.overlayCallBack);
  },

  overlayCallBack: function overlayCallBack(restaurants) {
    console.log('restaurants', restaurants);
    var list = '';
    Marker.reset();
    restaurants.forEach(function (restaurant) {
      Marker.create(Place.map, restaurant);
      list = '' + list + Html.createListItem(restaurant);
    });
    Html.renderRestaurantList(list);
  },

  enable: function enable() {
    Drawing.drawingManager.setMap(Drawing.map);
  },

  disable: function disable() {
    // Marker.reset()
    Drawing.drawingManager.setMap(null);
    Drawing.overlay.setMap(null);
  }

};