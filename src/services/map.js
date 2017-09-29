import Drawing from './drawing'
import Place from './place'
import Directions from './directions'
import Const from '../constants/constant'

const Map = {

  currentLocation: null,

  init: () => {
    const defaultLocation = new google.maps.LatLng(Const.cebuLatLng.lat, Const.cebuLatLng.lng)
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