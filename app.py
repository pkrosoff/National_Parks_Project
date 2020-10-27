from flask import Flask, render_template, redirect, url_for
from flask_pymongo import PyMongo

app=Flask(__name__)
app.config["MONGO_URI"]="mongodb://localhost:27017/national_parks_db"
mongo=PyMongo(app)

@app.route("/")
def index():
    data = mongo.db.park_info.find_one()
    return render_template(
        "index.html",
        data=data,
    )

if __name__=="__main__":
    app.run(debug=True)