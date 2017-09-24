'use strict';

// export default Html = {
var Html = {

  getAddress: function getAddress(data) {
    return data.formatted_address || data.vicinity;
  },

  buildInfoWindow: function buildInfoWindow(data) {
    var address = Html.getAddress(data);
    return '<div>\n     <p>' + data.name + '</p>\n     <span class="mdl-list__item-sub-title">\n       ' + address + '\n     </span>\n    </div>';
  },

  createListItem: function createListItem(data) {
    var address = Html.getAddress(data);
    return '\n    <li class="mdl-list__item mdl-list__item--two-line">\n      <span class="mdl-list__item-primary-content"\n      onClick=Place.getPlaceDetails("' + data.place_id + '")>\n        <span>' + data.name + '</span>\n        <span class="mdl-list__item-sub-title">' + address + '</span>\n      </span>\n      <span class="mdl-list__item-secondary-content">\n        <button id="' + data.place_id + '" class="mdl-button mdl-button--icon mdl-js-button mdl-js-ripple-effect"\n          onClick=Directions.get(' + JSON.stringify(data.geometry.location) + ')>\n          <i class="icon material-icons mdl-color-text--blue">directions</i>\n          <div class="mdl-tooltip" data-mdl-for="' + data.place_id + '">Directions</div>\n        </button>\n      </span>\n    </li>';
  },

  renderRestaurantList: function renderRestaurantList(lists) {
    var listDiv = document.getElementById('restaurantList');
    var ul = document.createElement('ul');
    ul.className = 'mdl-list';
    ul.innerHTML = lists;
    listDiv.innerHTML = "";
    listDiv.appendChild(ul);
  },

  buildDetailsPanel: function buildDetailsPanel(data) {
    var address = Html.getAddress(data);
    var detailPanelDiv = document.getElementById('detailPanel');
    var detailPanel = '\n      <div class="mdl-card__title">\n        <h2 class="mdl-card__title-text">' + data.name + '</h2>\n      </div>\n      <div class="mdl-card__supporting-text">\n        ' + address + '\n      </div>\n      <div class="mdl-card__actions mdl-card--border">\n      <a class="mdl-button mdl-button--colored mdl-js-button mdl-js-ripple-effect"\n        onClick=Directions.get(' + JSON.stringify(data.geometry.location) + ')>\n        Get Directions\n        <i id="tooltipD" class="material-icons mdl-color-text--blue">directions</i>\n        <div class="mdl-tooltip" data-mdl-for="tooltipD">Directions</div>\n      </a>\n    </div>\n      <div class="mdl-card__menu">\n        <button class="mdl-button mdl-button--icon mdl-js-button mdl-js-ripple-effect"\n          onClick=Html.hideDetailsPanel()>\n          <i class="material-icons">keyboard_backspace</i>\n        </button>\n      </div>';

    detailPanelDiv.innerHTML = "";
    detailPanelDiv.innerHTML = detailPanel;
  },

  showDetailsPanel: function showDetailsPanel() {
    document.getElementById('listPanel').style.display = 'none';
    document.getElementById('detailPanel').style.display = 'block';
  },

  hideDetailsPanel: function hideDetailsPanel() {
    document.getElementById('listPanel').style.display = 'block';
    document.getElementById('detailPanel').style.display = 'none';
  },

  showSpinner: function showSpinner() {
    return document.getElementById('spinner').style.display = 'block';
  },
  hideSpinner: function hideSpinner() {
    return document.getElementById('spinner').style.display = 'none';
  }

};