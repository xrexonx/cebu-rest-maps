'use strict';

var category = ['Burger', 'Bar', 'Cafe', 'Pizza', 'Lechon', 'Jollibee'];

var Place = {

  map: null,
  placeService: null,
  defaultLocation: null,

  init: function init(map, location) {
    Place.map = map;
    Place.defaultLocation = location;
    Place.placeService = new google.maps.places.PlacesService(map);
    Place.renderRestaurants();
  },

  renderRestaurants: function renderRestaurants() {
    var categoryList = '';
    category.map(function (catName) {
      categoryList = '' + categoryList + Html.createListItem(catName);
      Place.getRestaurantByCategory(catName);
    });
    Html.renderCategoryList(categoryList);
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

  getRestaurantByCategory: function getRestaurantByCategory(category) {
    var _request = {
      location: Place.defaultLocation,
      radius: 10000,
      type: 'restaurant',
      query: 'Cebu ' + category
    };
    var _handleCallback = function _handleCallback(places) {
      return places.map(function (place) {
        return Marker.add(Place.map, place, category);
      });
    };
    Place.textSearch(_request, _handleCallback);
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
  }
};