// // // ---NATIONAL---PARKS---TIMELINE---VISITS---MAP---\\ \\ \\
// ============================================================ \\
// Main function for creating map
function createvisitsMap(data) {
    // create feature collection object for markers and circles
    let featureCollection = {
        "type":"FeatureCollection",
        "features":[]
    }
    // create arrays of years in data and park names to loop through
    var year_list = data[0].years;
    var park_list = data[0].parks;
    // loop to populate featureCollection
    year_list.forEach(year=>{
        park_list.forEach(park=>{
            var endYear = String(parseInt(year) + 1);
            if(data[0][park]["year_established"]<=year){
                let featureLoop = {
                    "type":"Feature",
                    "properties":{
                        "park_name":data[0][park]["park_name"],
                        "region":data[0][park]["region"],
                        "state":data[0][park]["state"],
                        "date_established":data[0][park]["date_established"],
                        "start":year,
                        "end":endYear,
                        "visits":data[0][park]["visits"][year],
                        "description":data[0][park]["description"]
                    },
                    "geometry":{
                        "type":"Point",
                        "coordinates":[data[0][park]["lon"],data[0][park]["lat"]]
                    }
                }
                featureCollection.features.push(featureLoop);
            }
        })
    })
    // create base layer
    var lightmap = L.tileLayer("https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
      attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
      maxZoom: 18,
      id: "mapbox/satellite-v9",
      accessToken: API_KEY
    });
    // create map centered on continental US
    var map = L.map("timelineMap", {
      center: [38, -95],
      zoom: 5,
      layers: [lightmap]
    });
    // create timeline slider
    var slider = L.timelineSliderControl({
        formatOutput: function(date){
            return moment(date).format("YYYY");
        },
    });
    // add timeline slider to map
    map.addControl(slider);
    // create custom markers with tree icons
    var customMarker = L.icon({
        iconUrl:'../static/images/tree_marker.png',
        iconSize:[33,33]
      });
    // create markers layer with custom markers & popup info
    var parkMarkers = L.timeline(featureCollection,{
        pointToLayer:function(feature,latlng){
            // format visits # to have comma seperation at 1000s
            var visitsFormat = feature.properties.visits.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')
            // create popup info & formatting
            let markerPopup = ("<h2>" + feature.properties.park_name + "</h2>" +
            "<h5 style='font-weight:bold;'> Region: " + feature.properties.region + "| State: " + feature.properties.state + "</h5>" +
            "<h5> Founded: " + feature.properties.date_established + "</h5>" +
            "<h5> Visits in "+feature.properties.start+": "+visitsFormat+"</h5>"+
            "<strong>" + feature.properties.description + "</strong>")
            // create markers & bind popup
            return L.marker(latlng,{
                icon:customMarker
            }).bindPopup(markerPopup);
        },
    });
    // create circles layer with radius proportional to # of visits for the year
    var parkCircles = L.timeline(featureCollection,{
        pointToLayer:function(feature,latlng){
            // determine radius
            var circRad = Math.sqrt(feature.properties.visits)*.0420;
            // create circles with custom params
            return L.circleMarker(latlng,{
                radius:circRad,
                color:"black",
                fillColor:"darkorange",
                fillOpacity:0.15
            });
        },
    });
    // add layers and slider to map
    parkMarkers.addTo(map);
    parkCircles.addTo(map);
    slider.addTo(map);
    // add layers to slider
    slider.addTimelines(parkMarkers,parkCircles);
}
// ----------------------------------------------------\\
// Main function call with data from parks_data approute
d3.json("parks_data").then(data => 
createvisitsMap(data)
);
// ========================================================== \\
// // // ---NATIONAL---PARKS---TIMELINE---VISITS---MAP---\\ \\ \\