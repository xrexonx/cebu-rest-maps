const SearchBox = {

  init: map => {

    const searchInput = document.getElementById('search-input')
    const searchBox = new google.maps.places.SearchBox(searchInput)

    map.addListener('bounds_changed', () => searchBox.setBounds(map.getBounds()))

    searchBox.addListener('places_changed', () => {
      const places = searchBox.getPlaces()
      const bounds = new google.maps.LatLngBounds()

      if (!places.length) return

      Marker.reset()
      let list = ''
      places.forEach(place => {

        Marker.add(map, place)
        list = `${list}${Html.createListItem(place)}`

        place.geometry.viewport
          ? bounds.union(place.geometry.viewport)
          : bounds.extend(place.geometry.location)
      })
      SearchBox.renderResults(list)
      map.fitBounds(bounds)
    })
  },

  renderResults: list => {
    Html.renderRestaurantList(list)
  }

}
