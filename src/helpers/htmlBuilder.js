// export default Html = {
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

  buildReview: reviews => {

    let reviewTemplate = ''
    reviews.forEach(review => {
      reviewTemplate = `
        ${reviewTemplate}
        <li class="mdl-list__item mdl-list__item--two-line">
          <span class="mdl-list__item-primary-content">
            <i class="material-icons mdl-list__item-avatar">person</i>
            <span>${review.author_name}</span>
            <span class="mdl-list__item-sub-title">
              ${review.text}
            </span>
          </span>
          <span class="mdl-list__item-secondary-content">
            <i class="material-icons mdl-color-text--amber-900">star</i>
          </span>
        </li>
      `
    })
    return reviewTemplate
  },

  buildDetailsPanel: data => {
    const address = Html.getAddress(data)
    const placeReviews = Html.buildReview(data.reviews)
    const detailPanelDiv = document.getElementById('detailPanel')
    const detailPanel = `
      <div class="mdl-card__title">
        <h2 class="mdl-card__title-text">${data.name}</h2>
      </div>
      <div class="mdl-card__supporting-text">
        <strong>Adress:</strong> ${address} <br>
        <strong>Phone Numer:</strong>: ${data.international_phone_number} / ${data.formatted_phone_number} <br>
        <strong>Rating:</strong> ${data.rating} <br>
      </div>
      <div class="mdl-card__actions mdl-card--border">
      <a class="mdl-button mdl-button--colored mdl-js-button mdl-js-ripple-effect"
        onClick=Directions.get(${JSON.stringify(data.geometry.location)})>
        Get Directions
      </a>
      <a href="${data.website}" target="_blank"
      class="mdl-button mdl-button--colored mdl-js-button mdl-js-ripple-effect">
        Website
      </a>
      <a href="${data.url}" target="_blank"
      class="mdl-button mdl-button--colored mdl-js-button mdl-js-ripple-effec">
        More Details
      </a>
      <div class="mdl-card__title">
        <h2 id="recommendedDiv" class="mdl-card__title-text">Reviews</h2>
      </div>
      <div id="reviewPanel">
        <ul class="demo-list-two mdl-list">
          ${placeReviews}
        </ul>
      </div>
    </div>
    <div class="mdl-card__menu">
      <button class="mdl-button mdl-button--icon mdl-js-button mdl-js-ripple-effect"
        onClick=Html.hideDetailsPanel()>
        <i class="material-icons">keyboard_backspace</i>
      </button>
    </div>`

    detailPanelDiv.innerHTML = ""
    detailPanelDiv.innerHTML = detailPanel
  },

  showDetailsPanel: () => {
    document.getElementById('listPanel').style.display = 'none'
    document.getElementById('detailPanel').style.display = 'block'
  },

  hideDetailsPanel: () => {
    document.getElementById('listPanel').style.display = 'block'
    document.getElementById('detailPanel').style.display = 'none'
  },

  showSpinner: () => document.getElementById('spinner').style.display = 'block',
  hideSpinner: () => document.getElementById('spinner').style.display = 'none'

}

export default Html