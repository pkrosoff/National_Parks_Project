from flask import Flask, render_template, redirect, url_for, jsonify
from flask_pymongo import PyMongo

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

<<<<<<< HEAD
@app.route("/johnny")
def johnny_dev():
    data = mongo.db.park_info.find_one()
=======
@app.route("/johnny", methods=['GET'])
def johnny_dev():
>>>>>>> dc066627c6b7eaa245e1a2a06e354e5ce9694af8
    return render_template(
        "johnny.html",
    )

@app.route("/phoebe")
<<<<<<< HEAD
def _dev():
=======
def phoebe_dev():
>>>>>>> dc066627c6b7eaa245e1a2a06e354e5ce9694af8
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