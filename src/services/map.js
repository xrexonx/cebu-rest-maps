
const MapService = {

  currentLocation: null,

  initMap: () => {
    // Default Location - Ayala Center Cebu LatLng
    const defaultLocation = new google.maps.LatLng(10.318548, 123.90573640000002)
    const map = new google.maps.Map(document.getElementById('map'), {
        center: defaultLocation,
        zoom: 15
    })

    Drawing.init(map)
    SearchBox.init(map)
    Place.init(map, defaultLocation)
    Directions.init(map, defaultLocation)
    MapService.getCurrentLocation()
  },

  getCurrentLocation: () => {

    const current = MapService.currentLocation
    if (current) return current

    const geoError = error => console.log('geoError', error)
    const geoSuccess = position => {
      MapService.currentLocation = {
        lat: position.coords.latitude,
        lng: position.coords.longitude
      }
    }
    navigator.geolocation.getCurrentPosition(geoSuccess, geoError)
  }
}
