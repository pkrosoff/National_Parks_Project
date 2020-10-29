from flask import Flask, render_template, redirect, url_for, jsonify
from flask_pymongo import PyMongo
from flask_bootstrap import Bootstrap

app=Flask(__name__)
app.config["MONGO_URI"]="mongodb://localhost:27017/national_parks_db"
mongo=PyMongo(app)
np_data = mongo.db.park_info

@app.route("/")
def index():
    data = mongo.db.park_info.find_one()
    return render_template(
        "index.html",
        data = data,
    )

@app.route("/fred")
def fred_dev():
    data = mongo.db.park_info.find_one()
    return render_template(
        "fred.html",
        data = data,
    )

@app.route("/jessie")
def jessie_dev():
    data = mongo.db.park_info.find_one()
    return render_template(
        "jessie.html",
        data = data,
    )

@app.route("/johnny", methods=['GET'])
def johnny_dev():
    return render_template(
        "johnny.html",
    )

@app.route("/phoebe")
def phoebe_dev():
    data = mongo.db.park_info.find_one()
    return render_template(
        "phoebe.html",
        data = data,
    )

@app.route("/parks_data")
def serveData():
    return jsonify(list(np_data.find({ },
   { '_id': 0})))

if __name__=="__main__":
    app.run(debug=True)