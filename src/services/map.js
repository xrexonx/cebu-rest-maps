import Drawing from './drawing'
import Place from './place'
import Directions from './directions'


const Map = {

  currentLocation: null,

  init: () => {
    // Default Location - Ayala Center Cebu LatLng
    const defaultLocation = new google.maps.LatLng(10.318548, 123.90573640000002)
    const map = new google.maps.Map(document.getElementById('map'), {
        center: defaultLocation,
        zoom: 15
    })
    Drawing.init(map)
    Place.init(map, defaultLocation)
    Directions.init(map, defaultLocation)
    Map.setCurrentLocation()
  },

  setCurrentLocation: () => {
    const current = Map.currentLocation
    if (current) return current

    const geoSuccess = position => {
      Map.currentLocation = {
        lat: position.coords.latitude,
        lng: position.coords.longitude
      }
    }
    const geoError = error => console.log('geoError', error)
    navigator.geolocation.getCurrentPosition(geoSuccess, geoError)
  },

  getCurrentLocation: () => {
    return Map.currentLocation
  }
}

export default Map