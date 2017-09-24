'use strict';

var Place = {

  map: null,
  placeService: null,
  defaultKeyword: 'restaurants Cebu',
  defaultLocation: null,

  init: function init(map, location) {
    Place.map = map;
    Place.defaultLocation = location;
    Place.placeService = new google.maps.places.PlacesService(map);
    Place.getDefaultRestaurant();
  },

  textSearch: function textSearch(request, callback) {
    Place.placeService.textSearch(request, function (places, status) {
      if (status == google.maps.places.PlacesServiceStatus.OK) {
        callback(places);
      }
    });
  },

  radarSearch: function radarSearch(request, callback) {
    Place.placeService.textSearch(request, function (places, status) {
      if (status == google.maps.places.PlacesServiceStatus.OK) {
        callback(places);
      }
    });
  },

  getDetails: function getDetails(placeId, callback) {
    Place.placeService.getDetails({ placeId: placeId }, function (place, status) {
      if (status === google.maps.places.PlacesServiceStatus.OK) {
        callback(place);
      }
    });
  },

  getPlaceDetails: function getPlaceDetails(placeId) {
    var _callback = function _callback(place) {
      // Html.hideSpinner()
      Marker.reset();
      Marker.create(Place.map, place);
      Html.buildDetailsPanel(place);
      Html.showDetailsPanel();
    };
    // Html.showSpinner()
    Place.getDetails(placeId, _callback);
  },

  getDefaultRestaurant: function getDefaultRestaurant() {
    var _request = {
      location: Place.defaultLocation,
      radius: 1000,
      query: 'restaurants Cebu'
    };
    var _handleCallback = function _handleCallback(restaurants) {
      var list = '';
      restaurants.forEach(function (restaurant) {
        Marker.create(Place.map, restaurant);
        list = '' + list + Html.createListItem(restaurant);
      });
      Html.renderRestaurantList(list);
    };
    Place.textSearch(_request, _handleCallback);
  }

};