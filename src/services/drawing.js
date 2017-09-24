const SHAPE_OPTIONS = {
  strokeColor: '#FF0000',
  strokeOpacity: 0.8,
  strokeWeight: 2,
  fillColor: '#FF0000',
  fillOpacity: 0.35
}

const Drawing = {

  map: null,
  placeService: null,
  drawingManager: null,
  circle: null,
  rectangle: null,
  overlay: null,

  init: (map) => {

    Drawing.map = map
    Drawing.placeService = new google.maps.places.PlacesService(map)

    Drawing.circle = new google.maps.Circle(SHAPE_OPTIONS)
    Drawing.rectangle = new google.maps.Rectangle(SHAPE_OPTIONS)

    const drawingManager = new google.maps.drawing.DrawingManager({
      drawingMode: google.maps.drawing.OverlayType.MARKER,
      drawingControl: true,
      drawingControlOptions: {
        position: google.maps.ControlPosition.TOP_CENTER,
        drawingModes: ['circle', 'rectangle']
      },
      circleOptions: Drawing.circle,
      rectangleOptions: Drawing.rectangle
    })

    Drawing.drawingManager = drawingManager

    // drawingManager.setMap(map)
    google.maps.event.addListener(drawingManager, 'overlaycomplete', event => {
      Drawing.overlay = event.overlay
      if (event.type == 'circle') Drawing.onCompleteCircle(Drawing.overlay)
      if (event.type == 'rectangle') Drawing.onCompleteRectangle(Drawing.overlay)
    })

    const drawingToolPanel = document.getElementById('drawingToolPanel')
    map.controls[google.maps.ControlPosition.TOP_RIGHT].push(drawingToolPanel)
  },

  onCompleteCircle: overlay => {
    const center = new google.maps.LatLng(
      overlay.getCenter().lat(),
      overlay.getCenter().lng()
    )
    const request = {
      location: center,
      radius: overlay.getRadius(),
      type: ['restaurant']
    }
    Place.nearbySearch(request, Drawing.overlayCallBack)
  },

  onCompleteRectangle: overlay => {
    const bounce = overlay.getBounds()
    const request = {
      bounds: bounce,
      type: 'restaurant',
      keyword: 'restaurant cebu'
    }
    // radarSearch will be deprecated soon
    Place.radarSearch(request, Drawing.overlayCallBack)
  },

  overlayCallBack: restaurants => {
    console.log('restaurants', restaurants)
    let list = ''
    Marker.reset()
    restaurants.forEach(restaurant => {
      Marker.create(Place.map, restaurant)
      list = `${list}${Html.createListItem(restaurant)}`
    })
    Html.renderRestaurantList(list)
  },

  enable: () => {
    Drawing.drawingManager.setMap(Drawing.map)
  },

  disable: () => {
    // Marker.reset()
    Drawing.drawingManager.setMap(null)
    Drawing.overlay.setMap(null)
  }

}
