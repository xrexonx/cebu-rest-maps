const category = [
  'Burger',
  'Bar',
  'Cafe',
  'Pizza',
  'Lechon',
  'Jollibee'
]

const Place = {

  map: null,
  placeService: null,
  defaultLocation: null,

  init: (map, location) => {
    Place.map = map
    Place.defaultLocation = location
    Place.placeService = new google.maps.places.PlacesService(map)
    Place.renderRestaurants()
  },

  renderRestaurants: () => {
    let categoryList = ''
    category.map(catName => {
      categoryList = `${categoryList}${Html.createListItem(catName)}`
      Place.getRestaurantByCategory(catName)
    })
    Html.renderCategoryList(categoryList)
  },

  getPlaceDetails: placeId => {
    const _callback = place => {
      Marker.reset()
      Marker.add(Place.map, place)
      Html.buildDetailsPanel(place)
      Html.showDetailsPanel()
      Place.map.setCenter(place.geometry.location)
      Place.map.setZoom(18)
    }
    Place.getDetails(placeId, _callback)
  },

  getRestaurantByCategory: category => {
    const _request = {
      location: Place.defaultLocation,
      radius: 10000,
      type: 'restaurant',
      query: `Cebu ${category}`
    }
    const _handleCallback = places => places.map(place => Marker.add(Place.map, place, category))
    Place.textSearch(_request, _handleCallback)
  },

  _handleCallBack: (place, status, callback) => {
    const statusOk = google.maps.places.PlacesServiceStatus.OK
    if (status === statusOk) callback(place)
  },

  textSearch: (request, callback) => {
    Place.placeService.textSearch(request, (places, status) => Place._handleCallBack(places, status, callback))
  },

  nearbySearch: (request, callback) => {
    Place.placeService.nearbySearch(request, (places, status) => Place._handleCallBack(places, status, callback))
  },

  radarSearch: (request, callback) => {
    Place.placeService.radarSearch(request, (places, status) => Place._handleCallBack(places, status, callback))
  },

  getDetails: (placeId, callback) => {
    Place.placeService.getDetails({ placeId }, (place, status) => Place._handleCallBack(place, status, callback))
  }
}
