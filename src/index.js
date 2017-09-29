import Map from '../src/services/map'
import Marker from '../src/services/marker'
import Drawing from '../src/services/drawing'
import Place from '../src/services/place'
import Html from '../src/helpers/htmlBuilder'
import Directions from '../src/services/directions'

window.onload = () => {
  Map.init()
  // Bind to window for now. Need to have this in webpack config
  window.Map = Map
  window.Html = Html
  window.Place = Place
  window.Marker = Marker
  window.Drawing = Drawing
  window.Directions = Directions
}