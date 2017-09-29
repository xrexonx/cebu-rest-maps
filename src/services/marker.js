import Html from '../helpers/htmlBuilder'

const Marker = {

  markers: [],
  infoWindow: null,

  _setCategoryIcon: (category) => {
    return {
      url: `assets/icons/${category}.png`,
      size: new google.maps.Size(71, 71),
      origin: new google.maps.Point(0, 0),
      anchor: new google.maps.Point(17, 34),
      scaledSize: new google.maps.Size(25, 25)
    }
  },

  add: (map, place, category) => {

    const icon = Marker._setCategoryIcon(category)
    const position = place.geometry.location
    const marker = new google.maps.Marker({ map, position, category, icon })
    Marker.infoWindow = new google.maps.InfoWindow({ content: Html.buildInfoWindow(place) })
    Marker.markers.push(marker)
    marker.addListener('click', () => Marker.infoWindow.open(map, marker))
  },

  reset: () => {
    if (Marker.markers.length) {
      Marker.markers.forEach(marker => marker.setMap(null))
      Marker.markers = []
    }
  },

  filterMarkers: category => {
    Marker.markers.map(marker => {
      if (marker.category === category) {
        marker.setVisible(document.getElementById(category).checked)
      }
    })
  },

  getMarkers: () => {
    return Marker.markers
  }
}

export default Marker
