import os
from flask import Flask, render_template, redirect, url_for, jsonify, json
from flask_pymongo import PyMongo
from flask_cors import CORS
# from flask_bootstrap import Bootstrap
import requests

app=Flask(__name__)
CORS(app)
app.config["DEBUG"]=True
# app.config["MONGO_URI"] = os.environ['MONGO_URI']
# mongo=PyMongo(app)
# np_data = mongo.db.park_info
# np_data_month = mongo.db.park_months
# queryURL = "https://gist.githubusercontent.com/erincaughey/2f221501645757e28b715c4063e87595/raw/a90be1b434b1a8cdf71c2abc3373ca63987e2d23/nps-geo-boundary.json"

@app.route("/")
def index():
    return render_template(
        "index.html",
        # MAPBOX=os.environ['MAPBOX']
    )

# @app.route("/parks_data")
# def servemainData():
#     return jsonify(list(np_data.find({ },
#    { '_id': 0})))

# @app.route("/park_months")
# def servemonthData():
#     return jsonify(list(np_data_month.find({ },
#    { '_id': 0})))

# @app.route("/park_boundaries")
# def serveBoundaries():
#     try:
#         Uresponse = requests.get(queryURL)
#     except requests.ConnectionError:
#        return "Connection Error"  
#     Jresponse = Uresponse.text
#     data = json.loads(Jresponse)
#     return Jresponse

if __name__=="__main__":
    app.run(debug=True)