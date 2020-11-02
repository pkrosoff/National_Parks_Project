// GET TO WERK
const config = require('config.js');
console.log("Hello World")
var myMap = L.map("map", {
    center: [37.0902, -95.7129],
    zoom: 4
  });

L.tileLayer("https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
attribution: "© <a href='https://www.mapbox.com/about/maps/'>Mapbox</a> © <a href='http://www.openstreetmap.org/copyright'>OpenStreetMap</a> <strong><a href='https://www.mapbox.com/map-feedback/' target='_blank'>Improve this map</a></strong>",
tileSize: 512,
maxZoom: 18,
zoomOffset: -1,
id: "mapbox/outdoors-v11",
accessToken: API_KEY
}).addTo(myMap);



d3.json("/park_boundaries").then(data => {
// console.log(data)
var national_parks_layer = []
for (var i = 0; i < 510; i++) {
  if (data.features[i].properties.UNIT_TYPE == "National Park") {
    // console.log(data.features[0].properties.UNIT_TYPE)}

    
    national_parks_layer.push(data.features[i]);
  }}
// console.log(national_parks_layer)}}
L.geoJson(national_parks_layer).addTo(myMap);

markerplaces = []
for (var i = 0; i < 58; i++) {
  
  var parks = national_parks_layer[i];
  // console.log(parks.geometry.type)}
  if (parks.geometry.type == "Polygon") {
    markerplaces.push([parks.geometry.coordinates[0][0][1],parks.geometry.coordinates[0][0][0]])}
    else if (parks.geometry.type == "Multipolygon")
    {
      markerplaces.push([parks.geometry.coordinates[0][0][0][1],parks.geometry.coordinates[0][0][0][0]])}
      else {
        markerplaces.push([parks.geometry.coordinates[0][0][0][1],parks.geometry.coordinates[0][0][0][0]])
      }}
// console.log(markerplaces)}

// Icon options
var iconOptions = {
  iconUrl: 'https://upload.wikimedia.org/wikipedia/commons/9/99/Star_icon_stylized.svg',
  iconSize: [20, 20]
}

// Creating a custom icon
var customIcon = L.icon(iconOptions);
// Options for the marker
var markerOptions = {
  icon: customIcon
}
for (var i = 0; i < 58; i++) {
L.marker(markerplaces[i], markerOptions)
.bindPopup("<h3>" + national_parks_layer[i].properties.UNIT_NAME + " <br>National Park" + "</h3> <hr> <h4>" + markerplaces[i] + "</h4>")
        .on('mouseover', function (e) {
            this.openPopup();
        })
        .on('mouseout', function (e) {
            this.closePopup();
        })
.addTo(myMap)};
});


