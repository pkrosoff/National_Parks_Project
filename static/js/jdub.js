function createvisitsMap(parks) {
  // create base layer
  var lightmap = L.tileLayer("https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
    attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
    maxZoom: 18,
    id: "mapbox/light-v10",
    accessToken: API_KEY
  });
  // assign base layer
  var baseMaps = {
    "Light Map": lightmap
  };
  // park markers layer
  var overlayMaps = {
    "Parks": parks
  };
  // create map
  var map = L.map("map", {
    center: [0, 0],
    zoom: 2,
    layers: [lightmap, parks]
  });
  // create layer toggle
  L.control.layers(baseMaps, overlayMaps, {
    collapsed: false
  }).addTo(map);
}
  
function createMarkers(data) {
  // Grab park names and populate into an array
  var park_names = data[0].park;
  var park_list = [];
  // loop to populate
  park_names.forEach(name=>{
    var parkname = name
    park_list.push(parkname)
  })
  // Grab park coords and populate array for markers
  var parkmarkers = [];
  // Loop through the parks array
  park_list.forEach(park => {
    // select current park to slim code
    var selection = data[0][park];
    // set size variable for park
    var marksize = Math.sqrt(selection["visits"]["1990"])*100;
    // generate marker data & popup text
    var parkMarker = L.circle([selection["lat"],selection["lon"]],{radius:marksize})
      .bindPopup("<h3> Park: " + data[0][park]["park_name"] + "</h3>" +
      "<h3> Lat: " + selection["lat"] + "</h3>" +
      "<h3> Lon: " + selection["lon"] + "</h3>")
    parkmarkers.push(parkMarker);
  })
  // create map with markers
  createvisitsMap(L.layerGroup(parkmarkers));
}

// main function with data call to parks_data app page
d3.json("parks_data").then(data => createMarkers(data));