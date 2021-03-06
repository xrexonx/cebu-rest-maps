import Marker from './marker'
import Fetch from './fetch'
import Html from '../helpers/htmlBuilder'
import Const from '../constants/constant'

const Place = {

  map: null,
  placeService: null,
  defaultLocation: null,
  results: {},

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
    if (category === 'Coffeehouse') {
      category = `starbucks|coffee shops`
    }
    return `${category.toLowerCase()} in Cebu, PH`
  },

  getRestaurantByCategory: (category, request) => {
    const _request = request || {
      location: Place.defaultLocation,
      radius: 1000,
      type: ['restaurant', 'cafe', 'food'],
      query: Place._buildAdvanceSearchQuery(category)
    }
    const callback = places => {
      Place.results[category] = places
      places.map(place => Marker.add(Place.map, place, category))
    }
    Place.textSearch(_request, callback)
  },

  _handleCallBack: (place, status, pagination, callback) => {
    const statusOk = google.maps.places.PlacesServiceStatus.OK
    if (status === statusOk) {
      if (pagination.hasNextPage) pagination.nextPage()
      callback(place)
    }
  },

  getPlaceDetails: placeId => {

    const _callback = place => {
      const { name, geometry: { location } } = place
      const locStr = JSON.parse(JSON.stringify(location))

      const _renderDetails = (place) => {
        Html.buildDetailsPanel(place)
        Html.showDetailsPanel()
      }

      Promise.all([
        Fetch.zomatoSearch(name, locStr),
        Fetch.fourSquareSearch(name, locStr)
      ]).then(results => {
        const [zomato, fs] = results
        const {stats, hereNow} = fs[0]
        place.stats = stats
        place.hereNow = hereNow
        place.menuUrl = zomato.menu_url
        _renderDetails(place)
      }).catch(() => _renderDetails(place))

    }
    Place.getDetails(placeId, _callback)
  },

  hideAnalytics: () => {
    document.querySelector('#map').style.display = 'block'
    document.querySelector('#analyticsDiv').style.display = 'none'
  },

  viewAnalytics: () => {

    document.querySelector('#map').style.display = 'none'
    document.querySelector('#analyticsDiv').style.display = 'block'
    document.querySelector('#graph').style.display = 'block'

    const drawChart = () => {
      const data = google.visualization.arrayToDataTable(Place.getAnalyticsByRating())
      const options = {
        chart: {
          title: 'Restaurants customer\'s ratings per food category',
        },
        hAxis: {
          title: 'Total Restaurant counts',
        },
        bars: 'horizontal'
      }
      const chart = new google.charts.Bar(document.querySelector('#graph'))
      chart.draw(data, google.charts.Bar.convertOptions(options))
    }
    google.charts.load('current', {'packages':['bar']})
    google.charts.setOnLoadCallback(drawChart)
  },

  getAnalyticsByRating: () => {

    const ratingsAnalytics = [
      ['Restaurants Category', 'Five', 'Four', 'Three', 'Two', 'One']
    ]
    const one = []
    const two = []
    const three = []
    const four = []
    const five = []
    // TODO: Move to helpers/utils
    const _groupBy = (list, key) => list.reduce((rv, x) => {
      (rv[x[key]] = rv[x[key]] || []).push(x)
      return rv
    }, {})

    Object.keys(Place.results).map(cat => {
      const category = Place.results[cat]
      const groupedRatings = _groupBy(category, 'rating')
      Object.keys(groupedRatings).map(rating => {
        if (Math.round(rating) === 1) one.push(groupedRatings[rating])
        if (Math.round(rating) === 2) two.push(groupedRatings[rating])
        if (Math.round(rating) === 3) three.push(groupedRatings[rating])
        if (Math.round(rating) === 4) four.push(groupedRatings[rating])
        if (Math.round(rating) === 5) five.push(groupedRatings[rating])
      })
      ratingsAnalytics.push([
        cat,
        five.length,
        four.length,
        three.length,
        two.length,
        one.length,
      ])
    })

    return ratingsAnalytics
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
