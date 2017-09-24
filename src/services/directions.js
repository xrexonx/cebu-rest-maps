const Directions = {

  map: null,
  directionsService: null,
  directionsDisplay: null,
  defaultOrigin: null,

  init: map => {
    Directions.map = map
    Directions.directionsService = new google.maps.DirectionsService()
    Directions.directionsDisplay = new google.maps.DirectionsRenderer()
    Directions.defaultOrigin = new google.maps.LatLng(10.3156992,123.8854366)
    Directions.directionsDisplay.setMap(map)
  },

  get: (destination, origin = Directions.getCurrentLocation()) => {
    const request = {
      origin,
      destination,
      travelMode: 'DRIVING',
      region: 'PH'
    }
    Directions.directionsService.route(request, (result, status) => {
      if (status == 'OK') {
        Marker.reset()
        Directions.directionsDisplay.setDirections(result)
      }
    })
  },

  getCurrentLocation: () => {

    let geoLoc = navigator.geolocation
    let currentLocation = Directions.defaultOrigin
    if (geoLoc) {
      geoLoc.getCurrentPosition(position => {
        currentLocation = {
          lat: position.coords.latitude,
          lng: position.coords.longitude
        }
      }, () => Directions.defaultOrigin )
    }

    return currentLocation
  }
}
