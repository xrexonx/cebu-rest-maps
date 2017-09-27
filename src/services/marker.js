import Html from '../helpers/htmlBuilder'

const Marker = {

  markers: [],

  add: (map, place, category) => {

    const icon = {
      url: `assets/icons/${category}.png`,
      size: new google.maps.Size(71, 71),
      origin: new google.maps.Point(0, 0),
      anchor: new google.maps.Point(17, 34),
      scaledSize: new google.maps.Size(25, 25)
    }

    const position = place.geometry.location
    const marker = new google.maps.Marker({ map, position, category, icon })
    const infoWindow = new google.maps.InfoWindow({ content: Html.buildInfoWindow(place) })

    Marker.markers.push(marker)
    marker.addListener('click', () => infoWindow.open(map, marker))
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
  }
}

export default Marker
