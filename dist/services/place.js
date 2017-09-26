'use strict';

var Place = {

  map: null,
  placeService: null,
  defaultLocation: null,

  init: function init(map, location) {
    Place.map = map;
    Place.defaultLocation = location;
    Place.placeService = new google.maps.places.PlacesService(map);

    var category = ['Burger', 'Bar', 'Cafe', 'Pizza', 'Lechon', 'Coffee shop'];
    var categoryList = '';
    category.forEach(function (catName) {
      categoryList = '' + categoryList + Html.createListItem(catName);
      Place.getDefaultRestaurant(catName);
    });
    Html.renderCategoryList(categoryList);
  },

  _handleCallBack: function _handleCallBack(place, status, callback) {
    var statusOk = google.maps.places.PlacesServiceStatus.OK;
    if (status === statusOk) callback(place);
  },

  textSearch: function textSearch(request, callback) {
    Place.placeService.textSearch(request, function (places, status) {
      return Place._handleCallBack(places, status, callback);
    });
  },

  nearbySearch: function nearbySearch(request, callback) {
    Place.placeService.nearbySearch(request, function (places, status) {
      return Place._handleCallBack(places, status, callback);
    });
  },

  radarSearch: function radarSearch(request, callback) {
    Place.placeService.radarSearch(request, function (places, status) {
      return Place._handleCallBack(places, status, callback);
    });
  },

  getDetails: function getDetails(placeId, callback) {
    Place.placeService.getDetails({ placeId: placeId }, function (place, status) {
      return Place._handleCallBack(place, status, callback);
    });
  },

  getPlaceDetails: function getPlaceDetails(placeId) {
    var _callback = function _callback(place) {
      Marker.reset();
      Marker.add(Place.map, place);
      Html.buildDetailsPanel(place);
      Html.showDetailsPanel();
      Place.map.setCenter(place.geometry.location);
      Place.map.setZoom(18);
    };
    Place.getDetails(placeId, _callback);
  },

  getDefaultRestaurant: function getDefaultRestaurant(category) {
    var _request = {
      location: Place.defaultLocation,
      radius: 10000,
      type: 'restaurant',
      query: 'Cebu ' + category
    };
    var _handleCallback = function _handleCallback(places) {
      places.forEach(function (place) {
        Marker.add(Place.map, place, category);
      });
    };
    Place.textSearch(_request, _handleCallback);
  }

};