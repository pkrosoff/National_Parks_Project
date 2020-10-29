// Store our API endpoint inside queryUrl
var queryUrl = "https://gist.githubusercontent.com/erincaughey/2f221501645757e28b715c4063e87595/raw/a90be1b434b1a8cdf71c2abc3373ca63987e2d23/nps-geo-boundary.json";

const API_KEY = "pk.eyJ1IjoicGtyb3NvZmYiLCJhIjoiY2tnZHcydm5lMDhhajJ5cGF0bWZ5djVuNCJ9.HE5-gKOKsb4LWwjYY5kOMA"

// // Perform a GET request to the query URL
// d3.json(queryUrl).then(data => {
//   console.log(data);
//   // Once we get a response, send the data.features object to the createFeatures function
//   createFeatures(data.features);
// });

var myMap = L.map("map", {
    center: [39.8283, 98.5795],
    zoom: 3
  });
  L.tileLayer("https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
    attribution: "© <a href='https://www.mapbox.com/about/maps/'>Mapbox</a> © <a href='http://www.openstreetmap.org/copyright'>OpenStreetMap</a> <strong><a href='https://www.mapbox.com/map-feedback/' target='_blank'>Improve this map</a></strong>",
    tileSize: 512,
    maxZoom: 18,
    zoomOffset: -1,
    id: "mapbox/streets-v11",
    accessToken: API_KEY
  }).addTo(myMap);




// function createFeatures(polygonData) {

//   // Define a function we want to run once for each feature in the features array
//   // Give each feature a popup describing the place and time of the earthquake
//   function onEachFeature(feature, layer) {
//     layer.bindPopup("<h3>" + feature.properties.UNIT_NAME +
//       "</h3><hr><p>" + new Date(feature.properties.UNIT_TYPE) + "</p>");
//   }

//   // Create a GeoJSON layer containing the features array on the data object
//   // Run the onEachFeature function once for each piece of data in the array

//   var polygons = L.geoJSON(polygonData, {
//     onEachFeature: onEachFeature,
//   });
//   createMap(polygons);
// }

// function createMap(polygons) {

  // Define myMap

//   var myMap = L.map("map", {
//     center: [45.52, -122.67],
//     zoom: 9
//   });

//   Add initial map layer

//   L.tileLayer("https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
//     attribution: "© <a href='https://www.mapbox.com/about/maps/'>Mapbox</a> © <a href='http://www.openstreetmap.org/copyright'>OpenStreetMap</a> <strong><a href='https://www.mapbox.com/map-feedback/' target='_blank'>Improve this map</a></strong>",
//     tileSize: 512,
//     maxZoom: 18,
//     zoomOffset: -1,
//     id: "mapbox/streets-v11",
//     accessToken: API_KEY
//   }).addTo(myMap);
// }



  // Create overlay object to hold our overlay layer
//   var overlayMaps = {
//     Parks: polygons,
//   };

