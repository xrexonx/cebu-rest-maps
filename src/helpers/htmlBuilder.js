// export default Html = {
const Html = {

  buildInfoWindow: data => {
    return `<div>
     <p>${data.name}</p>
     <span class="mdl-list__item-sub-title">
       ${data.formatted_address}
     </span>
    </div>`
  },

  createListItem: data => {
    return `
    <li class="mdl-list__item mdl-list__item--two-line">
      <span class="mdl-list__item-primary-content"
      onClick=Place.getPlaceDetails("${data.place_id}")>
        <span>${data.name}</span>
        <span class="mdl-list__item-sub-title">${data.formatted_address}</span>
      </span>
      <span class="mdl-list__item-secondary-content">
        <button class="mdl-button mdl-button--icon mdl-js-button mdl-js-ripple-effect"
          onClick=Directions.get(${JSON.stringify(data.geometry.location)})>
          <i id="${data.place_id}" class="material-icons mdl-color-text--blue">directions</i>
          <div class="mdl-tooltip" data-mdl-for="${data.place_id}">Directions</div>
        </button>
      </span>
    </li>`
  },

  renderRestaurantList: lists => {
    const listDiv = document.getElementById('restaurantList')
    const ul = document.createElement('ul')
    ul.className = 'mdl-list'
    ul.innerHTML = lists
    listDiv.innerHTML = ""
    listDiv.appendChild(ul)
  },

  buildDetailsPanel: data => {
    console.log('data', data)
    const detailPanelDiv = document.getElementById('detailPanel')
    const detailPanel = `
      <div class="mdl-card__title">
        <h2 class="mdl-card__title-text">${data.name}</h2>
      </div>
      <div class="mdl-card__supporting-text">
        ${data.vicinity}
      </div>
      <div class="mdl-card__actions mdl-card--border">
      <a class="mdl-button mdl-button--colored mdl-js-button mdl-js-ripple-effect"
        onClick=Directions.get(${JSON.stringify(data.geometry.location)})>
        Get Directions
        <i id="tooltipD" class="material-icons mdl-color-text--blue">directions</i>
        <div class="mdl-tooltip" data-mdl-for="tooltipD">Directions</div>
      </a>
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
