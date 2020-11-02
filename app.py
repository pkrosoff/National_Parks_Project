from flask import Flask, render_template, redirect, url_for, jsonify, json
from flask_pymongo import PyMongo
# from flask_bootstrap import Bootstrap
import requests

app=Flask(__name__)
app.config["MONGO_URI"]="mongodb://localhost:27017/national_parks_db"
mongo=PyMongo(app)
np_data = mongo.db.park_info
np_data_month = mongo.db.park_months
queryURL = "https://gist.githubusercontent.com/erincaughey/2f221501645757e28b715c4063e87595/raw/a90be1b434b1a8cdf71c2abc3373ca63987e2d23/nps-geo-boundary.json"

@app.route("/")
def index():
    data = mongo.db.park_info.find_one()
    return render_template(
        "index.html",
        data = data,
    )

@app.route("/fred")
def fred_dev():
    return render_template(
        "fred.html",
    )

@app.route("/jessie")
def jessie_dev():
    data = mongo.db.park_info.find_one()
    return render_template(
        "jessie.html",
        data=data
    )

@app.route("/johnny")
def johnny_dev():
    data = mongo.db.park_info.find_one()
    return render_template(
        "johnny.html",
        data=data,
    )

@app.route("/phoebe")
def phoebe_dev():
    return render_template(
        "phoebe.html",
    )

@app.route("/parks_data")
def servemainData():
    return jsonify(list(np_data.find({ },
   { '_id': 0})))

@app.route("/parks_month")
def servemonthData():
    return jsonify(list(np_data_month.find({ },
   { '_id': 0})))

@app.route("/park_boundaries")
def serveBoundaries():
    try:
        Uresponse = requests.get(queryURL)
    except requests.ConnectionError:
       return "Connection Error"  
    Jresponse = Uresponse.text
    data = json.loads(Jresponse)
    return Jresponse

if __name__=="__main__":
    app.run(debug=True)