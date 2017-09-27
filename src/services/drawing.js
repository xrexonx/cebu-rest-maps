const SHAPE_OPTIONS = {
  strokeColor: '#FF0000',
  strokeOpacity: 0.8,
  strokeWeight: 2,
  fillColor: '#FF0000',
  fillOpacity: 0.35,
  draggable: true,
  geodesic: true,
  editable: true
}

const Drawing = {

  map: null,
  placeService: null,
  drawingManager: null,
  overlay: null,
  shapes: [],

  init: (map) => {

    Drawing.map = map
    Drawing.placeService = new google.maps.places.PlacesService(map)

    const circleOptions = new google.maps.Circle(SHAPE_OPTIONS)
    const rectangleOptions = new google.maps.Rectangle(SHAPE_OPTIONS)

    const drawingManager = new google.maps.drawing.DrawingManager({
      drawingMode: null,
      drawingControl: true,
      drawingControlOptions: {
        position: google.maps.ControlPosition.TOP_CENTER,
        drawingModes: ['circle', 'rectangle']
      },
      circleOptions: circleOptions,
      rectangleOptions: rectangleOptions
    })

    Drawing.drawingManager = drawingManager
    Drawing.drawingManager.setMap(map)
    google.maps.event.addListener(drawingManager, 'overlaycomplete', event => {
      Drawing.clear()
      Drawing.overlay = event.overlay
      Drawing.shapes.push(Drawing.overlay)
      Drawing.onOverlayComplete(Drawing.overlay)
    })
  },

  onOverlayComplete: overlay => {
    const request = {
      bounds: overlay.getBounds(),
      type: 'restaurant',
      keyword: 'restaurant cebu'
    }
    const service = new google.maps.places.PlacesService(Place.map)
    service.radarSearch(request, results => {
      const notification = document.querySelector('.mdl-js-snackbar')
      const message = `Found ${results.length} restaurant within the circle/rectangle`
      notification.MaterialSnackbar.showSnackbar({ message, timeout: 50000 })
    })
  },

  clear: () => Drawing.shapes.map(overlay => overlay.setMap(null))

}

export default Drawing