import Html from '../helpers/htmlBuilder'
import Marker from './marker'

const Place = {

  map: null,
  placeService: null,
  defaultLocation: null,

  categories: [
    'Burger',
    'Bar',
    'Cafe',
    'Pizza',
    'Lechon',
    'Barbecue',
    'Cafeteria',
    'Coffeehouse',
    'Buffet',
    'French'
  ],

  init: (map, location) => {
    Place.map = map
    Place.defaultLocation = location
    Place.placeService = new google.maps.places.PlacesService(map)
    Place.renderRestaurants()
  },

  renderRestaurants: () => {
    let categoryList = ''
    Place.categories.map(category => {
      categoryList = `${categoryList}${Html.createListItem(category)}`
      Place.getRestaurantByCategory(category)
    })
    Html.renderCategoryList(categoryList)
  },

  getRestaurantByCategory: (category, request) => {
    const _request = request || {
      location: Place.defaultLocation,
      radius: 20000,
      type: 'restaurant',
      query: `Cebu ${category}`
    }
    const _handleCallback = places => places.map(place => Marker.add(Place.map, place, category))
    Place.textSearch(_request, _handleCallback)
  },

  _handleCallBack: (place, status, pagination, callback) => {
    const statusOk = google.maps.places.PlacesServiceStatus.OK
    if (status === statusOk) {
      // For more results
      // if (pagination.hasNextPage) pagination.nextPage()
      callback(place)
    }
  },

  textSearch: (request, callback) => {
    Place.placeService.textSearch(request, (places, status, pagination) => Place._handleCallBack(places, status, pagination, callback))
  },

  nearbySearch: (request, callback) => {
    Place.placeService.nearbySearch(request, (places, status, pagination) => Place._handleCallBack(places, status, pagination, callback))
  },

  radarSearch: (request, callback) => {
    Place.placeService.radarSearch(request, (places, status) => Place._handleCallBack(places, status, callback))
  },

  getDetails: (placeId, callback) => {
    Place.placeService.getDetails({ placeId }, (place, status) => Place._handleCallBack(place, status, callback))
  }
}

export default Place
