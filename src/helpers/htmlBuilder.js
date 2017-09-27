import Marker from '../services/marker'
import Directions from '../services/directions'

const Html = {

  getAddress: data => {
    return data.vicinity || data.formatted_address
  },

  // Transfer to String helper
  truncateStr: (str, max) => {
  return str.length > max ? `${str.substr(0, max-1)}…` : str
  },

  buildInfoWindow: data => {
    const address = Html.getAddress(data)
    return `<div>
     <p>${data.name}</p>
     <span class="mdl-list__item-sub-title">
       ${Html.truncateStr(address, 30)}
     </span>
      <button class="mdl-button mdl-button--icon mdl-js-button mdl-js-ripple-effect"
        onClick=Directions.get(${JSON.stringify(data.geometry.location)})>
        <i id="${data.place_id}" class="material-icons mdl-color-text--blue">directions</i>
       <div class="mdl-tooltip" data-mdl-for="${data.place_id}">Directions</div>
      </button>
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
  }

}

export default Html