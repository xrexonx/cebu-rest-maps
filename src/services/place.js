const Place = {

  map: null,
  placeService: null,
  defaultKeyword: 'restaurants Cebu',
  defaultLocation: null,

  init: (map, location) => {
    Place.map = map
    Place.defaultLocation = location
    Place.placeService = new google.maps.places.PlacesService(map)
    Place.getDefaultRestaurant()
  },

  textSearch: (request, callback) => {
    Place.placeService.textSearch(request, (places, status) => {
      if (status == google.maps.places.PlacesServiceStatus.OK) {
        callback(places)
      }
    })
  },

  nearbySearch: (request, callback) => {
    Place.placeService.nearbySearch(request, (places, status) => {
      if (status == google.maps.places.PlacesServiceStatus.OK) {
        callback(places)
      }
    })
  },

  radarSearch: (request, callback) => {
    Place.placeService.textSearch(request, (places, status) => {
      if (status == google.maps.places.PlacesServiceStatus.OK) {
        callback(places)
      }
    })
  },

  getDetails: (placeId, callback) => {
    Place.placeService.getDetails({ placeId }, (place, status) => {
      if (status === google.maps.places.PlacesServiceStatus.OK) {
        callback(place)
      }
    })
  },

  getPlaceDetails: placeId => {
    const _callback = place => {
      // Html.hideSpinner()
      Marker.reset()
      Marker.create(Place.map, place)
      Html.buildDetailsPanel(place)
      Html.showDetailsPanel()
      Place.map.setCenter(place.geometry.location)
      Place.map.setZoom(18)
    }
    // Html.showSpinner()
    Place.getDetails(placeId, _callback)
  },

  getDefaultRestaurant: () => {
    const _request = {
      location: Place.defaultLocation,
      radius: 1000,
      query: 'restaurants Cebu'
    }
    const _handleCallback = restaurants => {
      let list = ''
      restaurants.forEach(restaurant => {
        Marker.create(Place.map, restaurant)
        list = `${list}${Html.createListItem(restaurant)}`
      })
      Html.renderRestaurantList(list)
    }
    Place.textSearch(_request, _handleCallback)
  }


}
