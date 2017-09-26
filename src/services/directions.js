const Directions = {

  map: null,
  directionsService: null,
  directionsDisplay: null,
  defaultOrigin: null,

  init: (map, defaultLocation) => {
    Directions.map = map
    Directions.defaultOrigin = defaultLocation
    Directions.directionsService = new google.maps.DirectionsService()
    Directions.directionsDisplay = new google.maps.DirectionsRenderer()
    Directions.directionsDisplay.setMap(map)
    Directions.directionsDisplay.setPanel(document.getElementById('directionsPanel'))
  },

  get: (destination, origin = MapService.currentLocation) => {
    const request = {
      origin: origin || Directions.defaultOrigin,
      destination: destination,
      travelMode: 'DRIVING',
      region: 'PH'
    }
    Directions.directionsService.route(request, (result, status) => {
      if (status === 'OK') {
        Directions.directionsDisplay.setDirections(result)
      }
    })
  }
}
