'use strict';

var SHAPE_OPTIONS = {
  strokeColor: '#FF0000',
  strokeOpacity: 0.8,
  strokeWeight: 2,
  fillColor: '#FF0000',
  fillOpacity: 0.35
};

var Drawing = {

  placeService: null,

  init: function init(map) {

    Drawing.placeService = new google.maps.places.PlacesService(map);

    var circleOptions = new google.maps.Circle(SHAPE_OPTIONS);
    var rectangleOptions = new google.maps.Rectangle(SHAPE_OPTIONS);

    var drawingManager = new google.maps.drawing.DrawingManager({
      drawingMode: google.maps.drawing.OverlayType.MARKER,
      drawingControl: true,
      drawingControlOptions: {
        position: google.maps.ControlPosition.TOP_CENTER,
        drawingModes: ['circle', 'rectangle']
      },
      circleOptions: circleOptions,
      rectangleOptions: rectangleOptions
    });

    // drawingManager.setMap(map)
    google.maps.event.addListener(drawingManager, 'overlaycomplete', function (event) {
      if (event.type == 'circle') Drawing.onCompleteCircle(event.overlay);
      if (event.type == 'rectangle') Drawing.onCompleteRectangle(event.overlay);
    });
  },

  onCompleteCircle: function onCompleteCircle(overlay) {
    console.log('overlay', overlay);
    var center = new google.maps.LatLng(overlay.getCenter().lat(), overlay.getCenter().lng());
    var request = {
      location: center,
      radius: overlay.getRadius(),
      query: 'restaurants Cebu'
    };
    Place.textSearch(request, Drawing.overCallBack);
  },

  onCompleteRectangle: function onCompleteRectangle(overlay) {
    var bounce = overlay.getBounds();
    var request = {
      bounds: map.getBounds(),
      type: 'restaurants',
      keyword: 'restaurants Cebu'
      // radarSearch will be deprecated soon
    };Place.radarSearch(request, Drawing.overCallBack);
  },

  overCallBack: function overCallBack(restaurants) {
    var list = '';
    restaurants.forEach(function (restaurant) {
      Marker.create(Place.map, restaurant);
      list = '' + list + Html.createListItem(restaurant);
    });
    Html.renderRestaurantList(list);
  }

};