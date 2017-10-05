
const CONST = {
  categories: [
    'Burger',
    'Bar',
    // 'Cafe',
    'Pizza',
    'Lechon',
    'Barbecue',
    'Cafeteria',
    'Coffeehouse',
    'Buffet',
    // 'French'
  ],
  cebuLatLng: {
    lat: 10.318548,
    lng: 123.90573640000002
  },
  zomato: {
    API_KEY: '239e8bf1e082e02ce395ee5dd8c2bb6b', // Should be in .env file..
    API_SEARCH_URL: 'https://developers.zomato.com/api/v2.1/search'
  },
  fourSquare: {
    searchAPI: 'https://api.foursquare.com/v2/venues/search',
    clientId: 'BNR1NAK34UWWIQVN5XV3JMDFDC04QW101D2QGGGHEGJKTHP5',
    clientSecret: 'SOCPPMJ5TLXAYQNKFIOF32F2YWHSQ12L2FKI4UGW20CXB1VK'
  }
}

export default CONST