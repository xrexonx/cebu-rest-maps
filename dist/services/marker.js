'use strict';

var Marker = {

  markers: [],

  create: function create(map, place) {

    if (!place.geometry) return;
    var position = place.geometry.location;
    var marker = new google.maps.Marker({ map: map, position: position });

    var content = Html.buildInfoWindow(place);
    var infoWindow = new google.maps.InfoWindow({ content: content });

    marker.addListener('mouseout', function () {
      return infoWindow.close();
    });
    marker.addListener('mouseover', function () {
      return infoWindow.open(map, marker);
    });
    Marker.markers.push(marker);
  },

  reset: function reset() {
    if (Marker.markers.length) {
      Marker.markers.forEach(function (marker) {
        return marker.setMap(null);
      });
      Marker.markers = [];
    }
  }

};