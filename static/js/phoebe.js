// GET TO WERK

const API_KEY = "pk.eyJ1IjoicGtyb3NvZmYiLCJhIjoiY2tnZHcydm5lMDhhajJ5cGF0bWZ5djVuNCJ9.HE5-gKOKsb4LWwjYY5kOMA"
// console.log("Hello World")
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
})
