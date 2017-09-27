import Html from '../helpers/htmlBuilder'

const Marker = {

  markers: [],

  add: (map, place, category) => {

    const image = {
      url: `assets/icons/${category}.png`,
      size: new google.maps.Size(71, 71),
      origin: new google.maps.Point(0, 0),
      anchor: new google.maps.Point(17, 34),
      scaledSize: new google.maps.Size(25, 25)
    }

    if (!place.geometry) return
    const position = place.geometry.location
    const markerOptions = {
      map,
      position,
      category,
      icon: image
    }
    const marker = new google.maps.Marker(markerOptions)

    const content = Html.buildInfoWindow(place)
    const infoWindow = new google.maps.InfoWindow({ content })

    marker.addListener('click', () => infoWindow.open(map, marker))
    Marker.markers.push(marker)
  },

  reset: () => {
    if (Marker.markers.length) {
      Marker.markers.forEach(marker => marker.setMap(null))
      Marker.markers = []
    }
  },

  filterMarkers: category => {
    const isChecked = document.getElementById(category).checked
    Marker.markers.map(marker => {
      if (marker.category === category) {
        marker.setVisible(isChecked)
      }
    })
  }
}

export default Marker
