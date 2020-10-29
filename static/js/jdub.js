// var MongoClient = require('mongodb').MongoClient;
// var url = 'mongodb://localhost/national_parks_db';
// MongoClient.connect(url, function(err,db) {
//     console.log("Connected");
//     db.close();
// });

d3.json('/parks_data').then(data=> {
    console.log(data);
    console.log(data[0]["Big Bend"]["state"]);
})