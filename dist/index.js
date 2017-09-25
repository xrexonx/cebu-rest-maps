"use strict";

// import MapService from './map'

var initialize = function initialize() {
  return MapService.initMap();
};
var enableDrawingTool = function enableDrawingTool() {
  return Drawing.enable();
};
var disableDrawingTool = function disableDrawingTool() {
  return Drawing.disable();
};