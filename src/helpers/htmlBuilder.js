import Marker from '../services/marker'
import Directions from '../services/directions'

const Html = {

  getAddress: data => {
    return data.vicinity || data.formatted_address
  },

  getPhone: data => {
    return data.international_phone_number || data.formatted_phone_number
  },

  // Transfer to String helper
  truncateStr: (str, max) => {
  return str.length > max ? `${str.substr(0, max-1)}…` : str
  },

  getPlacesItem: (data) => {
    const {
      website,
      vicinity,
      formatted_address,
      formatted_phone_number,
      international_phone_number,
    } = data
    let placesData = []
    const _pushData = (details, icon) => placesData.push({details, icon})
    if (vicinity || formatted_address) {
      _pushData(Html.getAddress(data), 'place')
    }
    if (formatted_phone_number || international_phone_number) {
      _pushData(Html.getPhone(data), 'phone')
    }
    if (website) {
      _pushData(website, 'link')
    }
    return placesData
  },

  placeListDetails: (data) => {
    let placesData = Html.getPlacesItem(data)
    let placesList = ''
    placesData.map(place => {
      placesList = `${placesList}
      <li class="mdl-list__item detailsList">
        <span class="mdl-list__item-primary-content mdl-card__supporting-text">
          <i class="material-icons mdl-list__item-icon">${place.icon}</i>
          ${place.details}
        </span>
      </li>`
    })
    return placesList
  },

  buildDetailsPanel: data => {
    const {
      url,
      name,
      geometry: { location }
    } = data
    const detailsList = Html.placeListDetails(data)
    const detailPanelDiv = document.getElementById('detailPanel')
    const detailContent = `
      <div class="mdl-card__title">
        <h2 class="mdl-card__title-text">${name}</h2>
      </div>
      <div class="mdl-card__supporting-text">
       <ul class="mdl-list">
           ${detailsList}
        </ul>
      </div>
      <div class="mdl-card__actions mdl-card--border">
        <a class="mdl-button mdl-button--colored mdl-js-button mdl-js-ripple-effect"
            href="${url}" target="_blank">More Details</a>
        <div class="mdl-layout-spacer"></div>
        <button id="directionIcon" class="mdl-button mdl-button--icon mdl-button--colored"
          onClick=Directions.get(${JSON.stringify(location)})>
          <i class="material-icons">directions</i>
          <div class="mdl-tooltip" data-mdl-for="directionIcon">Get Directions</div>
        </button>
      </div>`

    detailPanelDiv.innerHTML = ""
    detailPanelDiv.innerHTML = detailContent
    // Upgrade newly added mdl id ad classes
    componentHandler.upgradeAllRegistered()
  },

  buildInfoWindow: data => {
    const { place_id, name, geometry: { location } } = data
    return ` 
     <div class="infoWindow">
        <div class="mdl-card__title">
          <h2 class="mdl-card__title-text">${name}</h2>
        </div>
        <div class="mdl-card__supporting-text">
           ${Html.getAddress(data)}
        </div>
        <div class="mdl-card__actions mdl-card--border">
          <a class="mdl-button mdl-button--colored mdl-js-button mdl-js-ripple-effect"
            onClick=Place.getPlaceDetails("${place_id}")>
            Show Details
          </a>
          <a class="mdl-button mdl-button--colored mdl-js-button mdl-js-ripple-effect"
            onClick=Directions.get(${JSON.stringify(location)})>
            Get Directions
          </a>
        </div>
      </div>`
  },

  createListItem: name => {
    return `
      <label class="mdl-checkbox mdl-js-checkbox mdl-js-ripple-effect" for="${name}">
        <input
          type="checkbox" 
          id="${name}" 
          class="mdl-checkbox__input" 
          checked
          onchange=Marker.filterMarkers(this.id)>
          <img src="assets/icons/${name}.png" id="icons">
        <span class="mdl-checkbox__label">${name}</span>
      </label>`
  },

  renderCategoryList: lists => {
    const listDiv = document.getElementById('categoryList')
    const ul = document.createElement('ul')
    ul.className = 'mdl-list'
    ul.innerHTML = lists
    listDiv.innerHTML = ""
    listDiv.appendChild(ul)
  },

  showDirectionsPanel: () => {
    document.getElementById('filterPanel').style.display = 'none'
    document.getElementById('directionsPanel').style.display = 'block'
  },

  hideDirectionsPanel: () => {
    document.getElementById('filterPanel').style.display = 'block'
    document.getElementById('directionsPanel').style.display = 'none'
  },

  showDetailsPanel: () => {
    document.getElementById('detailPanel').style.display = 'block'
  },

  displayResultsCount: count => {
    document.querySelector('.mdl-js-snackbar').MaterialSnackbar.showSnackbar({
      message: `Found ${count} restaurant(s) within the circle/rectangle`
    })
  }

}

export default Html