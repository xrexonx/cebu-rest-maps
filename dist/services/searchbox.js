'use strict';

var SearchBox = {

  init: function init(map) {

    var searchInput = document.getElementById('search-input');
    var searchBox = new google.maps.places.SearchBox(searchInput);

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
      SearchBox.renderResults(list);
      map.fitBounds(bounds);
    });
  },

  renderResults: function renderResults(list) {
    Html.renderRestaurantList(list);
  }

};