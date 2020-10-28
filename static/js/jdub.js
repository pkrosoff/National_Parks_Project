var MongoClient = require('mongodb').MongoClient;
var url = 'mongodb://localhost/national_parks_db';
MongoClient.connect(url, function(err,db) {
    console.log("Connected");
    db.close();
});