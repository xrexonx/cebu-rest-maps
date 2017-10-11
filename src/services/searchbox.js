const SearchBox = {

  init: map => {

    const searchInput = document.getElementById('search')
    const searchBox = new google.maps.places.SearchBox(searchInput)
    let markers = []
    map.addListener('bounds_changed', () => searchBox.setBounds(map.getBounds()))

    searchBox.addListener('places_changed', () => {

      const places = searchBox.getPlaces()
      const bounds = new google.maps.LatLngBounds()

      if (!places.length) return
      markers.map(marker => marker.setMap(null))
      markers = []
      places.map(place => {
        markers.push(new google.maps.Marker({
          map: map,
          title: place.name,
          position: place.geometry.location
        }))
        place.geometry.viewport
          ? bounds.union(place.geometry.viewport)
          : bounds.extend(place.geometry.location)
      })
      map.fitBounds(bounds)
    })
  }

}

export default SearchBox