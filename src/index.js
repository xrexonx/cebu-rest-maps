import Map from '../src/services/map'
import Marker from '../src/services/marker'
import Drawing from '../src/services/drawing'
import Place from '../src/services/place'
import Directions from '../src/services/drawing'
import Html from '../src/helpers/htmlBuilder'

window.onload = function() {
  Map.init()
  // Bind to window for now. Need to have this in webpack config
  window.Map = Map
  window.Html = Html
  window.Place = Place
  window.Marker = Marker
  window.Drawing = Drawing
  window.Directions = Directions
}