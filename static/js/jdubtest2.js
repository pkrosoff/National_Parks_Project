function createvisitsMap(data) {
    console.log(data);
    // circles for timeline layer
    // create feature collection object
    let featureCollection = {
        "type":"FeatureCollection",
        "features":[]
    }
    let circleCollection = {
        "type":"FeatureCollection",
        "features":[]
    }
    var year_list = data[0].years;
    var park_list = data[0].parks;
    year_list.forEach(year=>{
        park_list.forEach(park=>{
            var endYear = String(parseInt(year) + 1);
            if(data[0][park]["year_established"] == year ||
             data[0][park]["year_established"]==String(parseInt(year-32)) ||
             data[0][park]["year_established"]==String(parseInt(year-14)) ||
             data[0][park]["year_established"]==String(parseInt(year-5)) ||
             data[0][park]["year_established"]==String(parseInt(year-2)) ||
             data[0][park]["year_established"]==String(parseInt(year-1))){
                let post = {
                    "type":"Feature",
                    "properties":{
                        "park":data[0][park]["park_name"],
                        "start":year,
                        "end":"2020",
                        "visits":data[0][park]["visits"][year],
                        "radius":Math.sqrt(data[0][park]["visits"])*0.420
                    },
                    "geometry":{
                        "type":"Point",
                        "coordinates":[data[0][park]["lon"],data[0][park]["lat"]]
                    }
                }
                featureCollection.features.push(post);
            }
            if(data[0][park]["year_established"]<=year){
                let circlePost = {
                    "type":"Feature",
                    "properties":{
                        "park":data[0][park]["park_name"],
                        "start":year,
                        "end":endYear,
                        "visits":data[0][park]["visits"][year],
                        "radius":(Math.sqrt(data[0][park]["visits"])*0.25)
                    },
                    "geometry":{
                        "type":"Point",
                        "coordinates":[data[0][park]["lon"],data[0][park]["lat"]]
                    }
                }
                circleCollection.features.push(circlePost);
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
    // assign base layer
    var baseMaps = {
      "Light Map": lightmap,
    };
    // create map
    var map = L.map("map", {
      center: [38, -95],
      zoom: 5,
      layers: [lightmap]
    });
    // timeline slider
    var slider = L.timelineSliderControl({
        formatOutput: function(date){
            return moment(date).format("YYYY");
        },
    });
    map.addControl(slider);

    var polygonTimeline = L.timeline(featureCollection);
    
    var circlesTimeline = L.timeline(circleCollection,{
        pointToLayer:function(feature,latlng){
            var testerz = Math.sqrt(feature.properties.visits)*.025;
            return L.circleMarker(latlng,{
                radius:testerz,
                color:"black",
                fillColor:"lightblue"
            });
        },
    });
    circlesTimeline.addTo(map);
    polygonTimeline.addTo(map);
    slider.addTo(map);
    slider.addTimelines(polygonTimeline,circlesTimeline);
}


// // main function with data call to parks_data app page
d3.json("parks_data").then(data => 
createvisitsMap(data)
);