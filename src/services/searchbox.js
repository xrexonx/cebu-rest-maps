const SearchBox = {

  init: map => {

    const searchpanel = document.getElementById('search-panel')
    const searchInput = document.getElementById('search-input')
    const searchBox = new google.maps.places.SearchBox(searchInput)

    // map.controls[google.maps.ControlPosition.TOP_LEFT].push(searchpanel)

    map.addListener('bounds_changed', () => searchBox.setBounds(map.getBounds()))

    searchBox.addListener('places_changed', () => {

        const places = searchBox.getPlaces()
        const bounds = new google.maps.LatLngBounds()

        if (!places.length) return

        Marker.reset()
        let list = ''
        places.forEach(place => {

          Marker.create(map, place)
          list = `${list}${Html.createListItem(place)}`

          place.geometry.viewport
            ? bounds.union(place.geometry.viewport)
            : bounds.extend(place.geometry.location)
        })
        Html.renderRestaurantList(list)
        map.fitBounds(bounds)
    })
  }

}
