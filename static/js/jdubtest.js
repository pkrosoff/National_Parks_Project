function createvisitsMap(data) {
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
             data[0][park]["year_established"]==String(parseInt(1904-32)) ||
             data[0][park]["year_established"]==String(parseInt(1904-14)) ||
             data[0][park]["year_established"]==String(parseInt(1904-5)) ||
             data[0][park]["year_established"]==String(parseInt(1904-2)) ||
             data[0][park]["year_established"]==String(parseInt(1904-1))){
                let post = {
                    "type":"Feature",
                    "properties":{
                        "park_name":data[0][park]["park_name"],
                        "region":data[0][park]["region"],
                        "state":data[0][park]["state"],
                        "start":year,
                        "end":"2020",
                        "date_established":data[0][park]["date_established"],
                        "visits":data[0][park]["visits"][year],
                        "description":data[0][park]["description"]
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

    var customMarker = L.icon({
        iconUrl:'../static/images/tree_marker.png',
        iconSize:[33,33]
      });
    // var polygonTimeline = L.timeline(featureCollection,{
    //     iconUrl:"../static/images/tree_marker.png"
    // });

    // var polygonTimeline = L.timeline(featureCollection,{
    //     pointToLayer:function(feature,latlng){
    //         let tooltip = `<h1>${feature.properties.park_name}</h1>
    //         <h3>Region: ${feature.properties.region} | State: ${feature.properties.state}</h3>
    //         <h4>Founded: ${feature.properties.date_established}</h4>
    //         <h4>Visits in ${feature.properties.start}: ${feature.properties.visits}</h4>
    //         <strong>${feature.properties.description}</strong>`;
    //         return L.marker(latlng,{
    //             icon:customMarker
    //         }).bindTooltip(tooltip,{'maxWidth':'50'}).openTooltip();
    //     },
    // });

    var polygonTimeline = L.timeline(circleCollection,{
        pointToLayer:function(feature,latlng){
            var visitsFormat = feature.properties.visits.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')
            let markerPopup = ("<h1>" + feature.properties.park_name + "</h1>" +
            "<h3> Region: " + feature.properties.region + "| State: " + feature.properties.state + "</h3>" +
            "<h4> Founded: " + feature.properties.date_established + "</h4>" +
            "<h4> Visits in "+feature.properties.start+": "+visitsFormat+"</h4>"+
            "<strong>" + feature.properties.description + "</strong>")
            return L.marker(latlng,{
                icon:customMarker
            }).bindPopup(markerPopup);
        },
    });
    
    var circlesTimeline = L.timeline(circleCollection,{
        pointToLayer:function(feature,latlng){
            let circlePopup = ("<h1>"+feature.properties.park_name+"</h1>"+
            "<h3>Visits in "+feature.properties.start+": "+feature.properties.visits+"</h3>")
            var circRad = Math.sqrt(feature.properties.visits)*.0420;
            return L.circleMarker(latlng,{
                radius:circRad,
                color:"black",
                fillColor:"darkorange",
                fillOpacity:0.15
            });
        },
    });
    polygonTimeline.addTo(map);
    circlesTimeline.addTo(map);
    slider.addTo(map);
    slider.addTimelines(polygonTimeline,circlesTimeline);
}


// // main function with data call to parks_data app page
d3.json("parks_data").then(data => 
createvisitsMap(data)
);