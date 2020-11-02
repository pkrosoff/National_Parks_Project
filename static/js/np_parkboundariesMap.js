  
  //  ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~  //
 //  @@@  PARK BOUNDARIES MAP USING GEOJSON @@@  //
//  ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~  //


// Initial leaflet map centered near middle of USA ready for layers to be added
// ----------------------------------------------------------------------------

var myMap = L.map("map", {
    center: [37.0902, -95.7129],
    zoom: 4
  });

// map style "outdoors" layer from mapbox
// --------------------------------------

L.tileLayer("https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
attribution: "© <a href='https://www.mapbox.com/about/maps/'>Mapbox</a> © <a href='http://www.openstreetmap.org/copyright'>OpenStreetMap</a> <strong><a href='https://www.mapbox.com/map-feedback/' target='_blank'>Improve this map</a></strong>",
tileSize: 512,
maxZoom: 18,
zoomOffset: -1,
id: "mapbox/outdoors-v11",
accessToken: API_KEY
}).addTo(myMap);

// pull in data from API endpoint
// ------------------------------
d3.json("/park_boundaries").then(data => {
// console.log(data)

// filter coordinate data to exclude anything besides national parks
// -----------------------------------------------------------------

var national_parks_layer = [] //empty variable to push national parks
for (var i = 0; i < 510; i++) { 
  if (data.features[i].properties.UNIT_TYPE == "National Park") { // for loop identifies which object contain ntnl park data
    national_parks_layer.push(data.features[i]); //add park data to empty variable from above
  }}
  // L.geoJson translates coordinate pair array into perimeter maps, .addTo adds layer to map
L.geoJson(national_parks_layer).addTo(myMap);

// creating park markers using perimeter data
// -------------------------------------------
markerplaces = [] //empty variable to push coordinates

for (var i = 0; i < 58; i++) {
  
  var parks = national_parks_layer[i];
// extract coordinate points and put the into pairs based on what type of perimeter structure is used for the park
// note that the coordiantes are inversed and must be pushed to the variable in the correct order
  if (parks.geometry.type == "Polygon") {
    markerplaces.push([parks.geometry.coordinates[0][0][1],parks.geometry.coordinates[0][0][0]])}
    else if (parks.geometry.type == "Multipolygon")
    {
      markerplaces.push([parks.geometry.coordinates[0][0][0][1],parks.geometry.coordinates[0][0][0][0]])}
      else {
        markerplaces.push([parks.geometry.coordinates[0][0][0][1],parks.geometry.coordinates[0][0][0][0]])
      }}

// Icon options, making it a cute little star
var iconOptions = {
  iconUrl: 'https://upload.wikimedia.org/wikipedia/commons/9/99/Star_icon_stylized.svg',
  iconSize: [20, 20]
}

// Creating a custom icon
var customIcon = L.icon(iconOptions);

// Inputting the options for the marker
var markerOptions = {
  icon: customIcon
}
// create a loop to populate popups with park info (name and coordinates)
for (var i = 0; i < 58; i++) {
L.marker(markerplaces[i], markerOptions)
.bindPopup("<h3>" + national_parks_layer[i].properties.UNIT_NAME + " <br>National Park" + "</h3> <hr> <h4>" + markerplaces[i] + "</h4>")
        .on('mouseover', function (e) { // add mouse over and out interactivity
            this.openPopup();
        })
        .on('mouseout', function (e) {
            this.closePopup();
        })
.addTo(myMap)}; //add markers and popups layer to map
});


