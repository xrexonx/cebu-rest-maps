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

  searchRestaurants: (url, method) => {
    return Fetch.send(Fetch.request(url, method)).then(data => data.restaurants[0].restaurant)
  }
}

export default Fetch