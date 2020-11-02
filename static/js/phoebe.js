// GET TO WERK

const API_KEY = "pk.eyJ1IjoicGtyb3NvZmYiLCJhIjoiY2tnZHcydm5lMDhhajJ5cGF0bWZ5djVuNCJ9.HE5-gKOKsb4LWwjYY5kOMA"
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

d3.json("/parks_data").then(parks_data => {
console.log(parks_data[0]);
// var parknames = parks_data[0].parks




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
dopemarkers = []
for (var i = 0; i < 58; i++) {
  
  var parkies = national_parks_layer[i];
  // var park_areas = []
  // var park_est = []
  // var park_poster = []
  // console.log(parks.geometry.type)}
  if (parkies.geometry.type == "Polygon") {
    markerplaces.push([parkies.geometry.coordinates[0][0][1],parkies.geometry.coordinates[0][0][0]])}
    else if (parkies.geometry.type == "Multipolygon")
    {
      markerplaces.push([parkies.geometry.coordinates[0][0][0][1],parkies.geometry.coordinates[0][0][0][0]])}
      else {
        markerplaces.push([parkies.geometry.coordinates[0][0][0][1],parkies.geometry.coordinates[0][0][0][0]])
      }}
      
      
      // for (var parknames = parks_data.parks; parknames < parks_data.parks.length; parknames++)
  
  // if (data.features[i].properties.UNIT_NAME == parknames[i]) {
  //   parknames[i] = parknames[i];
  //   console.log(parkames[i]);
    // park_areas.push(parks_data[0][parknames[i]].area_miles2);
    // park_est.push(parks_data[0][parknames[i]].date_established);
    // park_poster.push(parks_data[0][parknames[i]].img_url);
    // console.log(park_est);
    // console.log("nope");
  // }
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
var name = national_parks_layer[i].properties.UNIT_NAME
console.log(parks_data[0][name].date_established)
L.marker(markerplaces[i], markerOptions)
.bindPopup("<h4>" + parks_data[0][name].park_name + " <br>National Park" + "</h4> <hr> Date Established: <br><h5>" + parks_data[0][name].date_established + "</h5>" + "<hr> Area: <br><h5>" + parks_data[0][name].area_miles2 + " mi2</h5>" + "<br>" + "<img src=" + parks_data[0][name].img_url + "alt=\"pics\" width= \" 140\" height= \"auto\">")
        .on('mouseover', function (e) {
            this.openPopup();
        })
        .on('mouseout', function (e) {
            this.closePopup();
        })
.addTo(myMap)};
});

})
