// GET TO WERK
// 
const API_KEY = "pk.eyJ1IjoicGtyb3NvZmYiLCJhIjoiY2tnZHcydm5lMDhhajJ5cGF0bWZ5djVuNCJ9.HE5-gKOKsb4LWwjYY5kOMA"
console.log("Hello World")
var myMap = L.map("map", {
    center: [50.8283, -115.5795],
    zoom: 3.5
  });
  
  // Adding a tile layer (the background map image) to our map
  // We use the addTo method to add objects to our map
L.tileLayer("https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
attribution: "© <a href='https://www.mapbox.com/about/maps/'>Mapbox</a> © <a href='http://www.openstreetmap.org/copyright'>OpenStreetMap</a> <strong><a href='https://www.mapbox.com/map-feedback/' target='_blank'>Improve this map</a></strong>",
tileSize: 512,
maxZoom: 18,
zoomOffset: -1,
id: "mapbox/streets-v11",
accessToken: API_KEY
}).addTo(myMap);

// PIONEER THEME MAP
// var Thunderforest_Pioneer = L.tileLayer('https://{s}.tile.thunderforest.com/pioneer/{z}/{x}/{y}.png?apikey={apikey}', {
// 	attribution: '&copy; <a href="http://www.thunderforest.com/">Thunderforest</a>, &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
// 	apikey: '<your apikey>',
// 	maxZoom: 22
// });

// JSON.dumps("/parks_data").then(data => {
// console.log(data);


// Once we get a response, send the data.features object to the createFeatures function
// createFeatures(data.features);
// });
//   FIGURE OUT THE PROPER CONNECTION!
// in the meantime, cheatinggg

var queryURL = "https://gist.githubusercontent.com/erincaughey/2f221501645757e28b715c4063e87595/raw/a90be1b434b1a8cdf71c2abc3373ca63987e2d23/nps-geo-boundary.json"
d3.json(queryURL).then(data => {

    // this isolates all the geojson entries that are national park flavored
    // create empty variables to hold necessary geojson data for boundary markers

    var latlngs = []



    for (var i = 0; i < data.features.length; i++) { 
        
        if (data.features[i].properties.UNIT_TYPE == "National Park"){

            var park_name = data.features[i].properties.UNIT_NAME;
           var polygon = data.features[i].geometry.coordinates;
            // console.log(polygon)
        //    for (var i = 0; i < polygon.length; i++) { 
        //        console.log(polygon[0][0][i][0])


        //    }
        //    console.log(park_name);
        //    console.log(polygon);
            // latlngs.push(polygon);
            // console.log(latlngs)
    }
    }
    // console.log(data.features);
    // createFeatures(data.features);

//     var result = data.objects.myData.geometries;
//     for (var i = 0; i < result.length; i++) {
//       alert(result[i].properties.ID)
// //     }
// L.GeoJsonLayer(latlngs, {
// color: "#0000FF"

// }).addTo(myMap);
// console.log("It went down");
//   })

 