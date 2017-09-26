'use strict';

var Place = {

  map: null,
  placeService: null,
  defaultLocation: null,

  categories: ['Burger', 'Bar', 'Cafe', 'Pizza', 'Lechon', 'Jollibee'],

  init: function init(map, location) {
    Place.map = map;
    Place.defaultLocation = location;
    Place.placeService = new google.maps.places.PlacesService(map);
    Place.renderRestaurants();
  },

  renderRestaurants: function renderRestaurants() {
    var categoryList = '';
    Place.categories.map(function (category) {
      categoryList = '' + categoryList + Html.createListItem(category);
      Place.getRestaurantByCategory(category);
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

  getRestaurantByCategory: function getRestaurantByCategory(category, request) {
    var _request = request || {
      location: Place.defaultLocation,
      radius: 20000,
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

  _handleCallBack: function _handleCallBack(place, status, pagination, callback) {
    var statusOk = google.maps.places.PlacesServiceStatus.OK;
    if (status === statusOk) {
      // For more results
      // if (pagination.hasNextPage) pagination.nextPage()
      callback(place);
    }
  },

  textSearch: function textSearch(request, callback) {
    Place.placeService.textSearch(request, function (places, status, pagination) {
      return Place._handleCallBack(places, status, pagination, callback);
    });
  },

  nearbySearch: function nearbySearch(request, callback) {
    Place.placeService.nearbySearch(request, function (places, status, pagination) {
      return Place._handleCallBack(places, status, pagination, callback);
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