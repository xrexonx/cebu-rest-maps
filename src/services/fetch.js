import Const from '../constants/constant'

const Fetch = {

  request: (url, method) => {
    return new Request(url, {
      method: method || 'GET',
      mode: 'cors',
      headers: new Headers({
        'Content-Type': 'application/json',
        'user-key': Const.zomato.API_KEY,
        'User-agent': 'curl/7.43.0'
      })
    })
  },

  send: request => {
    return fetch(request).then(response => response.json())
  },

  zomatoSearch: (query, loc) => {
    const queryParams = `q=${encodeURI(query)}&lat=${loc.lat}&lon=${loc.lng}`
    const url = `${Const.zomato.API_SEARCH_URL}?${queryParams}`
    return Fetch.send(Fetch.request(url)).then(data => data.restaurants[0].restaurant)
  },

  fourSquareSearch: (query, loc) => {
    query = query.split('@')[0]
    const staticParams = `&limit=5&radius=100&v=20171225`
    const dynamicParams = `&ll=${loc.lat},${loc.lng}&query=${encodeURI(query)}`
    const clientKey = `client_id=${Const.fourSquare.clientId}&client_secret=${Const.fourSquare.clientSecret}`
    const url = `${Const.fourSquare.searchAPI}?${clientKey}${dynamicParams}${staticParams}`
    return fetch(url)
      .then(resp => resp.json())
      .then(data => data.response.venues)
      .catch(err => console.log('err', err))
  }
}

export default Fetch