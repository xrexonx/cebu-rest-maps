const SHAPE_OPTIONS = {
  strokeColor: '#FF0000',
  strokeOpacity: 0.8,
  strokeWeight: 2,
  fillColor: '#FF0000',
  fillOpacity: 0.35
}

const Drawing = {

  placeService: null,

  init: (map) => {

    Drawing.placeService = new google.maps.places.PlacesService(map)

    const circleOptions = new google.maps.Circle(SHAPE_OPTIONS)
    const rectangleOptions = new google.maps.Rectangle(SHAPE_OPTIONS)

    const drawingManager = new google.maps.drawing.DrawingManager({
      drawingMode: google.maps.drawing.OverlayType.MARKER,
      drawingControl: true,
      drawingControlOptions: {
        position: google.maps.ControlPosition.TOP_CENTER,
        drawingModes: ['circle', 'rectangle']
      },
      circleOptions: circleOptions,
      rectangleOptions: rectangleOptions
    })

    // drawingManager.setMap(map)
    google.maps.event.addListener(drawingManager, 'overlaycomplete', event => {
      if (event.type == 'circle') Drawing.onCompleteCircle(event.overlay)
      if (event.type == 'rectangle') Drawing.onCompleteRectangle(event.overlay)
    })
  },

  onCompleteCircle: overlay => {
    console.log('overlay', overlay)
    const center = new google.maps.LatLng(
      overlay.getCenter().lat(),
      overlay.getCenter().lng()
    )
    const request = {
      location: center,
      radius: overlay.getRadius(),
      query: 'restaurants Cebu'
    }
    Place.textSearch(request, Drawing.overCallBack)
  },

  onCompleteRectangle: overlay => {
    const bounce = overlay.getBounds()
    const request = {
      bounds: map.getBounds(),
      type: 'restaurants',
      keyword: 'restaurants Cebu'
    }
    // radarSearch will be deprecated soon
    Place.radarSearch(request, Drawing.overCallBack)
  },

  overCallBack: restaurants => {
    let list = ''
    restaurants.forEach(restaurant => {
      Marker.create(Place.map, restaurant)
      list = `${list}${Html.createListItem(restaurant)}`
    })
    Html.renderRestaurantList(list)
  }

}
