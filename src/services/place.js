import Marker from './marker'
import Fetch from './fetch'
import Html from '../helpers/htmlBuilder'
import Const from '../constants/constant'

const Place = {

  map: null,
  placeService: null,
  defaultLocation: null,

  categories: Const.categories,

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

  _buildAdvanceSearchQuery: (category) => {
    return `restaurants|food|${category.toLowerCase()} in Cebu, PH`
  },

  getRestaurantByCategory: (category, request) => {
    const _request = request || {
      location: Place.defaultLocation,
      radius: 20000,
      type: 'restaurant',
      query: Place._buildAdvanceSearchQuery(category)
    }
    const callback = places => places.map(place => Marker.add(Place.map, place, category))
    Place.textSearch(_request, callback)
  },

  _handleCallBack: (place, status, pagination, callback) => {
    const statusOk = google.maps.places.PlacesServiceStatus.OK
    if (status === statusOk) {
      if (pagination.hasNextPage) pagination.nextPage()
      callback(place)
    }
  },

  buildQueryParams: (location, name, vicinity) => {
    const loc = JSON.parse(JSON.stringify(location))
    return `q=${name} ${vicinity}&lat=${loc.lat}&lon=${loc.lng}`
  },

  getMenuUrl: (location, name) => {
    const queryParams = Place.buildQueryParams(location, name)
    const url = `${Const.zomato.API_SEARCH_URL}?${queryParams}`
    return Fetch.searchRestaurants(encodeURI(url)).then(restaurant => restaurant.menu_url.split('?')[0])
  },

  getPlaceDetails: placeId => {
    const _callback = place => {
      const { name, vicinity, geometry: { location } } = place
      const menuUrlPs = Place.getMenuUrl(location, name, vicinity)
      menuUrlPs.then(url => {
        place.menuUrl = url
        Html.buildDetailsPanel(place)
        Html.showDetailsPanel()
      })
    }
    Place.getDetails(placeId, _callback)
  },

  textSearch: (request, callback) => {
    Place.placeService.textSearch(request, (places, status, pagination) => Place._handleCallBack(places, status, pagination, callback))
  },

  nearbySearch: (request, callback) => {
    Place.placeService.nearbySearch(request, (places, status, pagination) => Place._handleCallBack(places, status, pagination, callback))
  },

  radarSearch: (request, callback) => {
    Place.placeService.radarSearch(request, (places, status, pagination) => Place._handleCallBack(places, status, pagination, callback))
  },

  getDetails: (placeId, callback) => {
    Place.placeService.getDetails({ placeId }, place => callback(place))
  }
}

export default Place
