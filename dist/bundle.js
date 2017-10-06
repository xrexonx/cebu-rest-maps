var VM=function(e){function t(r){if(n[r])return n[r].exports;var a=n[r]={i:r,l:!1,exports:{}};return e[r].call(a.exports,a,a.exports,t),a.l=!0,a.exports}var n={};return t.m=e,t.c=n,t.d=function(e,n,r){t.o(e,n)||Object.defineProperty(e,n,{configurable:!1,enumerable:!0,get:r})},t.n=function(e){var n=e&&e.__esModule?function(){return e.default}:function(){return e};return t.d(n,"a",n),n},t.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},t.p="",t(t.s=7)}([function(e,t,n){"use strict";function r(e){return e&&e.__esModule?e:{default:e}}Object.defineProperty(t,"__esModule",{value:!0});var a=n(1),o=r(a),i=n(2),l=r(i),c=n(4),s=(r(c),{getAddress:function(e){return e.vicinity||e.formatted_address},getPhone:function(e){return e.international_phone_number||e.formatted_phone_number},getPlacesItem:function(e){var t=e.vicinity,n=e.formatted_address,r=e.formatted_phone_number,a=e.international_phone_number,o=[],i=function(e,t){return o.push({details:e,icon:t})};return(t||n)&&i(s.getAddress(e),"place"),(r||a)&&i(s.getPhone(e),"phone"),o},placeListDetails:function(e){var t=s.getPlacesItem(e),n="";return t.map(function(e){n=n+'\n      <li class="mdl-list__item detailsListItem">\n        <span class="mdl-list__item-primary-content mdl-card__supporting-text">\n          <i class="material-icons mdl-list__item-icon">'+e.icon+"</i>\n          "+e.details+"\n        </span>\n      </li>"}),n},createMenuLinkLists:function(e,t,n){var r="",a=[],o=function(e,t){return a.push({url:e,label:t})};return e&&o(e,"View in Google Map"),n&&o(n,"View Website"),t&&o(t,"View Menu / Food Specialty"),a.map(function(e){var t=e.url,n=e.label;r=r+'\n        <li><a class="mdl-menu__item" href="'+t+'" target="_blank">'+n+"</a></li>\n      "}),r},buildRatings:function(e){var t=e/5*100;document.querySelector(".stars-inner").style.width=10*Math.round(t/10)+"%"},buildVisitedCounts:function(e,t){var n=t||{count:0,summary:"Nobody is here"},r=n.count,a=n.summary,o=e.checkinsCount,i=e.usersCount,l=e.tipCount,c="",s=[],u=function(e,t){return s.push({counts:e,label:t})};return u(r,a+" now"),i&&u(i,"Total people visited"),o&&u(o,"Total Checkins"),l&&u(l,"Total tip counts"),s.map(function(e,t){var n=e.counts,r=e.label;c=c+'\n        <span id="'+t+"-"+n+'" class="mdl-chip mdl-chip--contact">\n          <span class="mdl-chip__contact mdl-color--teal mdl-color-text--white">\n            <i class="material-icons">people</i>\n          </span>\n          <span class="mdl-chip__text">'+n+'</span>\n        </span>\n        <div class="mdl-tooltip" data-mdl-for="'+t+"-"+n+'">'+r+"</div>\n      "}),c},buildDetailsPanel:function(e){var t=e.url,n=e.name,r=e.stats,a=e.rating,o=e.menuUrl,i=e.website,l=e.hereNow,c=e.geometry.location,u=s.placeListDetails(e),d=s.createMenuLinkLists(t,o,i),f=r?s.buildVisitedCounts(r,l):"",m=document.getElementById("detailPanel"),p='\n      <div class="mdl-card__title">\n        <h2 class="mdl-card__title-text">'+n+'</h2>\n      </div>\n      <div class="stars-outer">\n        <div class="stars-inner"></div>\n      </div>\n      <div class="visited">\n          '+f+'\n       </div>\n      <div class="mdl-card__supporting-text detailsList">\n       <ul class="mdl-list">\n          '+u+'\n        </ul>\n      </div>\n      <div class="mdl-card__actions mdl-card--border flexActions">\n        <a class="mdl-button mdl-button--colored mdl-js-button mdl-js-ripple-effect"\n            onClick=Directions.get('+JSON.stringify(c)+')>\n            Get Directions\n        </a>\n        <div class="mdl-layout-spacer"></div>\n        <button id="menuLinks" class="mdl-button mdl-js-button mdl-button--icon">\n          <i class="material-icons">more_vert</i>\n        </button>\n        <ul class="mdl-menu mdl-menu--bottom-right mdl-js-menu mdl-js-ripple-effect" for="menuLinks">\n          '+d+"\n        </ul>\n      </div>";m.innerHTML="",m.innerHTML=p,componentHandler.upgradeAllRegistered(),s.buildRatings(a)},buildInfoWindow:function(e){var t=e.place_id,n=e.name,r=e.geometry.location;return'\n     <div class="infoWindow">\n        <div class="mdl-card__title">\n          <h2 class="mdl-card__title-text">'+n+'</h2>\n        </div>\n        <div class="mdl-card__supporting-text">\n           '+s.getAddress(e)+'\n        </div>\n        <div class="mdl-card__actions mdl-card--border">\n          <a class="mdl-button mdl-button--colored mdl-js-button mdl-js-ripple-effect"\n            onClick=Place.getPlaceDetails("'+t+'")>\n            Show Details\n          </a>\n          <a class="mdl-button mdl-button--colored mdl-js-button mdl-js-ripple-effect"\n            onClick=Directions.get('+JSON.stringify(r)+")>\n            Get Directions\n          </a>\n        </div>\n      </div>"},createListItem:function(e){return'\n      <label class="mdl-checkbox mdl-js-checkbox mdl-js-ripple-effect" for="'+e+'">\n        <input\n          type="checkbox" \n          id="'+e+'"\n          class="mdl-checkbox__input catFilter" \n          checked\n          onchange=Marker.filterMarkers(this.id)>\n          <img src="assets/icons/'+e+'.png" id="icons">\n        <span class="mdl-checkbox__label">'+e+"</span>\n      </label>"},renderCategoryList:function(e){var t=document.getElementById("categoryList"),n=document.createElement("ul");n.className="mdl-list",n.innerHTML=e,t.innerHTML="",t.appendChild(n)},showDirectionsPanel:function(){document.getElementById("filterPanel").style.display="none",document.getElementById("directionsPanel").style.display="block"},hideDirectionsPanel:function(){document.getElementById("filterPanel").style.display="block",document.getElementById("directionsPanel").style.display="none"},showDetailsPanel:function(){document.getElementById("detailPanel").style.display="block"},displayResultsCount:function(e){document.querySelector(".mdl-js-snackbar").MaterialSnackbar.showSnackbar({message:"Found "+e+" restaurant(s) within the circle/rectangle"})},checkUncheckAllFilters:function(){for(var e=document.getElementById("checkAll").checked,t=document.querySelectorAll(".mdl-js-checkbox"),n=1;n<t.length;n++){var r=t[n];e?r.MaterialCheckbox.check():r.MaterialCheckbox.uncheck(),o.default.filterMarkers(r.getAttribute("for"))}},checkUncheckCheckbox:function(){var e=document.querySelector(".mdl-js-checkbox");document.querySelectorAll(".catFilter:checked").length===l.default.categories.length?e.MaterialCheckbox.check():e.MaterialCheckbox.uncheck()}});t.default=s},function(e,t,n){"use strict";function r(e){return e&&e.__esModule?e:{default:e}}Object.defineProperty(t,"__esModule",{value:!0});var a=n(3),o=r(a),i=n(0),l=r(i),c={markers:[],_setCategoryIcon:function(e){return{url:"assets/icons/"+e+".png",size:new google.maps.Size(71,71),origin:new google.maps.Point(0,0),anchor:new google.maps.Point(17,34),scaledSize:new google.maps.Size(25,25)}},add:function(e,t,n){var r=c._setCategoryIcon(n),a=t.geometry.location,i=new google.maps.Marker({map:e,position:a,category:n,icon:r});c.markers.push(i),i.addListener("click",function(){o.default.infoWindow.setContent(l.default.buildInfoWindow(t)),o.default.infoWindow.open(e,i)})},reset:function(){c.markers.length&&(c.markers.forEach(function(e){return e.setMap(null)}),c.markers=[])},filterMarkers:function(e){c.markers.map(function(t){t.category===e&&t.setVisible(document.getElementById(e).checked)}),l.default.checkUncheckCheckbox()},getMarkers:function(){return c.markers}};t.default=c},function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var r={categories:["Burger","Bar","Pizza","Lechon","Barbecue","Cafeteria","Coffeehouse","Buffet"],cebuLatLng:{lat:10.318548,lng:123.90573640000002},zomato:{API_KEY:"239e8bf1e082e02ce395ee5dd8c2bb6b",API_SEARCH_URL:"https://developers.zomato.com/api/v2.1/search"},fourSquare:{searchAPI:"https://api.foursquare.com/v2/venues/search",clientId:"BNR1NAK34UWWIQVN5XV3JMDFDC04QW101D2QGGGHEGJKTHP5",clientSecret:"SOCPPMJ5TLXAYQNKFIOF32F2YWHSQ12L2FKI4UGW20CXB1VK"}};t.default=r},function(e,t,n){"use strict";function r(e){return e&&e.__esModule?e:{default:e}}Object.defineProperty(t,"__esModule",{value:!0});var a=n(5),o=r(a),i=n(6),l=r(i),c=n(4),s=r(c),u=n(2),d=r(u),f={infoWindow:null,currentLocation:null,init:function(){var e=new google.maps.LatLng(d.default.cebuLatLng.lat,d.default.cebuLatLng.lng),t=new google.maps.Map(document.getElementById("map"),{center:e,zoom:15});o.default.init(t),l.default.init(t,e),s.default.init(t,e),f.setCurrentLocation(),f.infoWindow=new google.maps.InfoWindow,t.controls[google.maps.ControlPosition.TOP_CENTER].push(document.querySelector("#drawingToolPanel"))},setCurrentLocation:function(){var e=f.currentLocation;if(e)return e;var t=function(e){f.currentLocation={lat:e.coords.latitude,lng:e.coords.longitude}},n=function(e){return console.log("geoError",e)};navigator.geolocation.getCurrentPosition(t,n)},getCurrentLocation:function(){return f.currentLocation}};t.default=f},function(e,t,n){"use strict";function r(e){return e&&e.__esModule?e:{default:e}}Object.defineProperty(t,"__esModule",{value:!0});var a=n(3),o=r(a),i=n(0),l=r(i),c={map:null,directionsService:null,directionsDisplay:null,defaultOrigin:null,init:function(e,t){c.map=e,c.defaultOrigin=t,c.directionsService=new google.maps.DirectionsService,c.directionsDisplay=new google.maps.DirectionsRenderer,c.directionsDisplay.setMap(e),c.directionsDisplay.setOptions({preserveViewport:!0}),c.directionsDisplay.setPanel(document.getElementById("directionsPanel"))},get:function(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:o.default.currentLocation,n={origin:t||c.defaultOrigin,destination:e,travelMode:"DRIVING",region:"PH"};c.directionsService.route(n,function(e,t){"OK"===t&&(l.default.showDirectionsPanel(),c.directionsDisplay.setDirections(e))})}};t.default=c},function(e,t,n){"use strict";function r(e){return e&&e.__esModule?e:{default:e}}Object.defineProperty(t,"__esModule",{value:!0});var a=n(1),o=r(a),i=n(0),l=r(i),c={strokeColor:"#FF0000",strokeOpacity:.8,strokeWeight:2,fillColor:"#FF0000",fillOpacity:.35,draggable:!0,geodesic:!0,editable:!0},s={map:null,placeService:null,drawingManager:null,overlay:null,shapes:[],init:function(e){s.map=e,s.placeService=new google.maps.places.PlacesService(e);var t=new google.maps.Circle(c),n=new google.maps.Rectangle(c),r=new google.maps.drawing.DrawingManager({drawingMode:null,drawingControl:!0,drawingControlOptions:{position:google.maps.ControlPosition.TOP_CENTER,drawingModes:["circle","rectangle"]},circleOptions:t,rectangleOptions:n});s.drawingManager=r,s.drawingManager.setMap(e),google.maps.event.addListener(r,"overlaycomplete",function(e){s.clear(),s.overlay=e.overlay,s.shapes.push(s.overlay),s.onOverlayComplete(s.overlay)})},onOverlayComplete:function(e){var t=e.getBounds(),n=o.default.getMarkers(),r=n.filter(function(e){return t.contains(e.getPosition())});l.default.displayResultsCount(r.length)},clear:function(){return s.shapes.map(function(e){return e.setMap(null)})}};t.default=s},function(e,t,n){"use strict";function r(e){return e&&e.__esModule?e:{default:e}}Object.defineProperty(t,"__esModule",{value:!0});var a=function(){function e(e,t){var n=[],r=!0,a=!1,o=void 0;try{for(var i,l=e[Symbol.iterator]();!(r=(i=l.next()).done)&&(n.push(i.value),!t||n.length!==t);r=!0);}catch(e){a=!0,o=e}finally{try{!r&&l.return&&l.return()}finally{if(a)throw o}}return n}return function(t,n){if(Array.isArray(t))return t;if(Symbol.iterator in Object(t))return e(t,n);throw new TypeError("Invalid attempt to destructure non-iterable instance")}}(),o=n(1),i=r(o),l=n(8),c=r(l),s=n(0),u=r(s),d=n(2),f=r(d),m={map:null,placeService:null,defaultLocation:null,results:{},categories:f.default.categories,init:function(e,t){m.map=e,m.defaultLocation=t,m.placeService=new google.maps.places.PlacesService(e),m.renderRestaurants()},renderRestaurants:function(){var e="";m.categories.map(function(t){e=""+e+u.default.createListItem(t),m.getRestaurantByCategory(t)}),u.default.renderCategoryList(e)},_buildAdvanceSearchQuery:function(e){return e.toLowerCase()+" in Cebu, PH"},getRestaurantByCategory:function(e,t){var n=t||{location:m.defaultLocation,radius:1e3,type:"restaurant",query:m._buildAdvanceSearchQuery(e)},r=function(t){m.results[e]=t,t.map(function(t){return i.default.add(m.map,t,e)})};m.textSearch(n,r)},_handleCallBack:function(e,t,n,r){t===google.maps.places.PlacesServiceStatus.OK&&(n.hasNextPage&&n.nextPage(),r(e))},getPlaceDetails:function(e){var t=function(e){var t=e.name,n=e.geometry.location,r=JSON.parse(JSON.stringify(n)),o=function(e){u.default.buildDetailsPanel(e),u.default.showDetailsPanel()};Promise.all([c.default.zomatoSearch(t,r),c.default.fourSquareSearch(t,r)]).then(function(t){var n=a(t,2),r=n[0],i=n[1],l=i[0],c=l.stats,s=l.hereNow;e.stats=c,e.hereNow=s,e.menuUrl=r.menu_url,o(e)}).catch(function(){return o(e)})};m.getDetails(e,t)},hideAnalytics:function(){document.querySelector("#map").style.display="block",document.querySelector("#analyticsDiv").style.display="none"},viewAnalytics:function(){document.querySelector("#map").style.display="none",document.querySelector("#analyticsDiv").style.display="block",document.querySelector("#graph").style.display="block";var e=function(){var e=google.visualization.arrayToDataTable(m.getAnalyticsByRating()),t={chart:{title:"Restaurants customer's ratings per food category"},hAxis:{title:"Total Restaurant counts"},bars:"horizontal"};new google.charts.Bar(document.querySelector("#graph")).draw(e,google.charts.Bar.convertOptions(t))};google.charts.load("current",{packages:["bar"]}),google.charts.setOnLoadCallback(e)},getAnalyticsByRating:function(){var e=[["Restaurants Category","Five","Four","Three","Two","One"]],t=[],n=[],r=[],a=[],o=[],i=function(e,t){return e.reduce(function(e,n){return(e[n[t]]=e[n[t]]||[]).push(n),e},{})};return Object.keys(m.results).map(function(l){var c=m.results[l],s=i(c,"rating");Object.keys(s).map(function(e){1===Math.round(e)&&t.push(s[e]),2===Math.round(e)&&n.push(s[e]),3===Math.round(e)&&r.push(s[e]),4===Math.round(e)&&a.push(s[e]),5===Math.round(e)&&o.push(s[e])}),e.push([l,o.length,a.length,r.length,n.length,t.length])}),e},textSearch:function(e,t){m.placeService.textSearch(e,function(e,n,r){return m._handleCallBack(e,n,r,t)})},nearbySearch:function(e,t){m.placeService.nearbySearch(e,function(e,n,r){return m._handleCallBack(e,n,r,t)})},radarSearch:function(e,t){m.placeService.radarSearch(e,function(e,n,r){return m._handleCallBack(e,n,r,t)})},getDetails:function(e,t){m.placeService.getDetails({placeId:e},function(e){return t(e)})}};t.default=m},function(e,t,n){"use strict";function r(e){return e&&e.__esModule?e:{default:e}}var a=n(3),o=r(a),i=n(1),l=r(i),c=n(5),s=r(c),u=n(6),d=r(u),f=n(0),m=r(f),p=n(4),g=r(p);window.onload=function(){o.default.init(),window.Html=m.default,window.Place=d.default,window.Marker=l.default,window.Drawing=s.default,window.Directions=g.default}},function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var r=n(2),a=function(e){return e&&e.__esModule?e:{default:e}}(r),o={request:function(e,t){return new Request(e,{method:t||"GET",mode:"cors",headers:new Headers({"Content-Type":"application/json","user-key":a.default.zomato.API_KEY,"User-agent":"curl/7.43.0"})})},send:function(e){return fetch(e).then(function(e){return e.json()})},zomatoSearch:function(e,t){var n="q="+encodeURI(e)+"&lat="+t.lat+"&lon="+t.lng,r=a.default.zomato.API_SEARCH_URL+"?"+n;return o.send(o.request(r)).then(function(e){return e.restaurants[0].restaurant})},fourSquareSearch:function(e,t){e=e.split("@")[0];var n="&ll="+t.lat+","+t.lng+"&query="+encodeURI(e),r="client_id="+a.default.fourSquare.clientId+"&client_secret="+a.default.fourSquare.clientSecret,o=a.default.fourSquare.searchAPI+"?"+r+n+"&limit=5&radius=100&v=20171225";return fetch(o).then(function(e){return e.json()}).then(function(e){return e.response.venues}).catch(function(e){return console.log("err",e)})}};t.default=o}]);