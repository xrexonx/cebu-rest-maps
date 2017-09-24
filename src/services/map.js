// export default MapService = {
const MapService = {

  initMap: () => {
    const defaultLocation = new google.maps.LatLng(10.3157, 123.8854)
    const map = new google.maps.Map(document.getElementById('map'), {
        center: defaultLocation,
        zoom: 13
    })

    Directions.init(map)
    Drawing.init(map)
    SearchBox.init(map)
    Place.init(map, defaultLocation)
  }
}
