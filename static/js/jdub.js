function createvisitsMap(parkmarkers,parkcircles) {
  // create base layer
  var lightmap = L.tileLayer("https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
    attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
    maxZoom: 18,
    id: "mapbox/satellite-v9",
    accessToken: API_KEY
  });
  // assign base layer
  var baseMaps = {
    "Light Map": lightmap,
  };
  // park marker layer
  var overlayMaps = {
    "Parks": parkmarkers,
    "Total Year Visits": parkcircles
  };
  // park circles layer
  // var overlayMaps = {
  //   "Total Year Visits": parkcircles
  // };
  // create map
  var map = L.map("map", {
    center: [38, -95],
    zoom: 5,
    layers: [lightmap,parkmarkers,parkcircles]
  });
  // create layer toggle
  L.control.layers(baseMaps,overlayMaps,{
    collapsed: false
  }).addTo(map);
}
  
function createMarkers(data) {
  // Grab park names and populate into an array
  var park_names = data[0].parks;
  var park_list = [];
  // loop to populate
  park_names.forEach(name=>{
    var parkname = name
    park_list.push(parkname)
  })
  // Grab park coords and populate array for markers and circles
  var parkmarkers = [];
  var parkcircles = [];
  // Loop through the parks array
  park_list.forEach(park => {
    // select current park to slim code
    var selection = data[0][park];
    // set size variable for park
    //WIP WIP WIP
    var wipyear = 2019;
    //WIP WIP WIP
    var marksize = Math.sqrt(selection["visits"][wipyear])*100;
    // generate marker data & popup text
    var customMarker = L.icon({
      iconUrl:'../static/images/tree_marker.png',
      iconSize:[33,33]
    });
    var parkMarker = L.marker([selection["lat"],selection["lon"]],{
      icon:customMarker
    })
      .bindPopup("<h3>" + data[0][park]["park_name"] + "</h3>" +
      "<h4> Region: " + selection["region"] + "| State: " + selection["state"] + "</h4>" +
      "<h5> Founded: " + selection["date_established"] + "</h5>" +
      "<h5> Visits in "+wipyear+": "+selection["visits"][wipyear]+"</h5>"+
      "<strong>" + selection["description"] + "</strong>");
    if (selection["year_established"] <= wipyear){
      parkmarkers.push(parkMarker);
    }
    var parkCircle = L.circle([selection["lat"],selection["lon"]],{radius:marksize})
    if(selection["year_established"]<=wipyear){
      parkmarkers.push(parkMarker);
      parkcircles.push(parkCircle);
    }
  });
  // create map with markers
  createvisitsMap(L.layerGroup(parkmarkers),L.layerGroup(parkcircles));
}

// main function with data call to parks_data app page
d3.json("parks_data").then(data => createMarkers(data));