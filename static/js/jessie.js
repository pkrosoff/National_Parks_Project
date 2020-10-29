d3.json('/parks_data').then(data=> {
    console.log(data);
    console.log(data[0]["Big Bend"]["state"]);
})