'use strict';

var SearchBox = {

  init: function init(map) {

    var searchpanel = document.getElementById('search-panel');
    var searchInput = document.getElementById('search-input');
    var searchBox = new google.maps.places.SearchBox(searchInput);

    // map.controls[google.maps.ControlPosition.TOP_LEFT].push(searchpanel)

    map.addListener('bounds_changed', function () {
      return searchBox.setBounds(map.getBounds());
    });

    searchBox.addListener('places_changed', function () {

      var places = searchBox.getPlaces();
      var bounds = new google.maps.LatLngBounds();

      if (!places.length) return;

      Marker.reset();
      var list = '';
      places.forEach(function (place) {

        Marker.create(map, place);
        list = '' + list + Html.createListItem(place);

        place.geometry.viewport ? bounds.union(place.geometry.viewport) : bounds.extend(place.geometry.location);
      });
      Html.renderRestaurantList(list);
      map.fitBounds(bounds);
    });
  }

};