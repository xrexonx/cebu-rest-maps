'use strict';

var Marker = {

  markers: [],

  add: function add(map, place, category) {

    var image = {
      url: place.icon,
      size: new google.maps.Size(71, 71),
      origin: new google.maps.Point(0, 0),
      anchor: new google.maps.Point(17, 34),
      scaledSize: new google.maps.Size(25, 25)
    };

    if (!place.geometry) return;
    var position = place.geometry.location;
    var markerOptions = {
      map: map,
      position: position,
      category: category,
      icon: image
    };
    var marker = new google.maps.Marker(markerOptions);

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
  },

  filterMarkers: function filterMarkers(category) {
    var isChecked = document.getElementById(category).checked;
    Marker.markers.map(function (marker) {
      if (marker.category === category) {
        marker.setVisible(isChecked);
      }
    });
  }
};