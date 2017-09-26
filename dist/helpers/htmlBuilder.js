'use strict';

// export default Html = {
var Html = {

  getAddress: function getAddress(data) {
    return data.vicinity || data.formatted_address;
  },

  // Transfer to String helper
  truncateStr: function truncateStr(str, max) {
    return str.length > max ? str.substr(0, max - 1) + '\u2026' : str;
  },

  buildInfoWindow: function buildInfoWindow(data) {
    var address = Html.getAddress(data);
    return '<div>\n     <p>' + data.name + '</p>\n     <span class="mdl-list__item-sub-title">\n       ' + Html.truncateStr(address, 30) + '\n     </span>\n      <button class="mdl-button mdl-button--icon mdl-js-button mdl-js-ripple-effect"\n        onClick=Directions.get(' + JSON.stringify(data.geometry.location) + ')>\n        <i id="' + data.place_id + '" class="material-icons mdl-color-text--blue">directions</i>\n       <div class="mdl-tooltip" data-mdl-for="' + data.place_id + '">Directions</div>\n      </button>\n    </div>';
  },

  createListItem: function createListItem(name) {
    return '\n      <label class="mdl-checkbox mdl-js-checkbox mdl-js-ripple-effect" for="' + name + '">\n        <input\n          type="checkbox" \n          id="' + name + '" \n          class="mdl-checkbox__input" \n          checked\n          onchange=Marker.filterMarkers(this.id)>\n        <span class="mdl-checkbox__label">' + name + '</span>\n      </label>\n';
  },

  renderCategoryList: function renderCategoryList(lists) {
    var listDiv = document.getElementById('categoryList');
    var ul = document.createElement('ul');
    ul.className = 'mdl-list';
    ul.innerHTML = lists;
    listDiv.innerHTML = "";
    listDiv.appendChild(ul);
  },

  buildReview: function buildReview(reviews) {

    var reviewTemplate = '';
    reviews.forEach(function (review) {
      reviewTemplate = '\n        ' + reviewTemplate + '\n        <li class="mdl-list__item mdl-list__item--two-line">\n          <span class="mdl-list__item-primary-content">\n            <i class="material-icons mdl-list__item-avatar">person</i>\n            <span>' + review.author_name + '</span>\n            <span class="mdl-list__item-sub-title">\n              ' + review.text + '\n            </span>\n          </span>\n          <span class="mdl-list__item-secondary-content">\n            <i class="material-icons mdl-color-text--amber-900">star</i>\n          </span>\n        </li>\n      ';
    });
    return reviewTemplate;
  },

  buildDetailsPanel: function buildDetailsPanel(data) {
    var address = Html.getAddress(data);
    var placeReviews = Html.buildReview(data.reviews);
    var detailPanelDiv = document.getElementById('detailPanel');
    var detailPanel = '\n      <div class="mdl-card__title">\n        <h2 class="mdl-card__title-text">' + data.name + '</h2>\n      </div>\n      <div class="mdl-card__supporting-text">\n        <strong>Adress:</strong> ' + address + ' <br>\n        <strong>Phone Numer:</strong>: ' + data.international_phone_number + ' / ' + data.formatted_phone_number + ' <br>\n        <strong>Rating:</strong> ' + data.rating + ' <br>\n      </div>\n      <div class="mdl-card__actions mdl-card--border">\n      <a class="mdl-button mdl-button--colored mdl-js-button mdl-js-ripple-effect"\n        onClick=Directions.get(' + JSON.stringify(data.geometry.location) + ')>\n        Get Directions\n      </a>\n      <a href="' + data.website + '" target="_blank"\n      class="mdl-button mdl-button--colored mdl-js-button mdl-js-ripple-effect">\n        Website\n      </a>\n      <a href="' + data.url + '" target="_blank"\n      class="mdl-button mdl-button--colored mdl-js-button mdl-js-ripple-effec">\n        More Details\n      </a>\n      <div class="mdl-card__title">\n        <h2 id="recommendedDiv" class="mdl-card__title-text">Reviews</h2>\n      </div>\n      <div id="reviewPanel">\n        <ul class="demo-list-two mdl-list">\n          ' + placeReviews + '\n        </ul>\n      </div>\n    </div>\n    <div class="mdl-card__menu">\n      <button class="mdl-button mdl-button--icon mdl-js-button mdl-js-ripple-effect"\n        onClick=Html.hideDetailsPanel()>\n        <i class="material-icons">keyboard_backspace</i>\n      </button>\n    </div>';

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