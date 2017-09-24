const Marker = {

  markers: [],

  create: (map, place) => {

    if (!place.geometry) return
    const position = place.geometry.location
    const marker = new google.maps.Marker({ map, position })

    const content = Html.buildInfoWindow(place)
    const infoWindow = new google.maps.InfoWindow({ content })

    marker.addListener('mouseout', () => infoWindow.close())
    marker.addListener('mouseover', () => infoWindow.open(map, marker))
    Marker.markers.push(marker)
  },

  reset: () => {
    if (Marker.markers.length) {
      Marker.markers.forEach(marker => marker.setMap(null))
      Marker.markers = []
    }
  }

}
