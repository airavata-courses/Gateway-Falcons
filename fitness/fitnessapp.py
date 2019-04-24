import time
from flask_pymongo import PyMongo
from flask import Flask, redirect
from stravalib import Client
from flask import request
from datetime import datetime, timedelta
from configparser import ConfigParser
import os
from flask_cors import cross_origin

parser = ConfigParser()
app = Flask(__name__)
if os.path.isfile('./fitnessconfig.ini'):
    parser.read('./fitnessconfig.ini')
else:
    print("error: No configuration file present")
    exit()

app = Flask(__name__)
client = Client()
app.config['MONGO_DBNAME'] = parser.get('DB', 'dbname')
app.config['MONGO_URI'] = parser.get('DB', 'url')
client_id = int(parser.get('STRAVA', 'id'))
client_secret = parser.get('STRAVA', 'secret')
mongo = PyMongo(app)


@app.route('/')
@cross_origin(origin='localhost', headers=['Content- Type', 'Authorization'])
def home():
    authorize_url = client.authorization_url(client_id=client_id, redirect_uri='http://localhost:5001/authorized')
    print(authorize_url)
    return redirect(authorize_url)


@app.route('/authorized')
@cross_origin(origin='localhost', headers=['Content- Type', 'Authorization'])
def authorized():
    code = request.args.get('code')
    token_response = client.exchange_code_for_token(client_id=client_id, client_secret=client_secret, code=code)
    access_token = token_response['access_token']
    refresh_token = token_response['refresh_token']
    expires_at = token_response['expires_at']
    client.access_token = access_token
    client.refresh_token = refresh_token
    client.token_expires_at = expires_at
    strava_db = mongo.db.strava
    strava_db.delete_many({
        "client_id": 32297,
    })

    strava_db.insert({
        "client_id": 32297,
        "client_secret": "964edf4f07419276f2425b2fcce8e4f0a59d4a81",
        "access_token": client.access_token,
        "refresh_token": client.refresh_token,
        "token_expires_at": client.token_expires_at
    }
    )
    return "Received"


@app.route('/get')
@cross_origin(origin='localhost', headers=['Content- Type', 'Authorization'])
def get_athelete():
    global client_secret
    strava_db = mongo.db.strava
    fitness_db = mongo.db.fitness
    for c in strava_db.find({"client_id": client_id}):
        client.access_token = c["access_token"]
        client.refresh_token = c["refresh_token"]
        client.token_expires_at = c["token_expires_at"]
        client_secret = c["client_secret"]
    if time.time() > client.token_expires_at:
        access_token = client.refresh_access_token(client_id=client_id, client_secret=client_secret,
                                                   refresh_token=client.refresh_token)
        client.access_token = access_token['access_token']
        myquery = {"client_id": client_id}
        newvalues = {"$set": {"access_token": client.access_token}}
        strava_db.update_one(myquery, newvalues)
    athlete = client.get_athlete()

    date_2_day_ago = datetime.now() - timedelta(days=2)
    for activity in client.get_activities(after=date_2_day_ago):
        if activity.type == "Ride":
            fitness_db.delete_many({"activity_id": activity.upload_id})
            fitness_db.insert({
                "name": activity.name,
                "distance": str(round(activity.distance.num*0.000621371,2) )+ ' mi',
                "moving_time": str(activity.moving_time),
                "elapsed_time": str(activity.elapsed_time),
                "total_elevation_gain": str(round(activity.total_elevation_gain.num*3.28084)) + ' ft',
                "timezone": str(activity.timezone),
                "start_date": activity.start_date.strftime('%m/%d/%Y'),
                "start_date_local": activity.start_date_local.strftime('%m/%d/%Y'),
                "start_latlng": activity.start_latlng,
                "end_latlng": activity.end_latlng,
                "average_speed": str(round(activity.average_speed.num*2.23694,1)) + ' mi/h',
                "max_speed": str(round(activity.max_speed.num*2.23694,1)) + ' mi/h',
                "average_heartrate": str(activity.average_heartrate),
                "max_heartrate": str(activity.max_heartrate),
                "average_cadence": str(activity.average_cadence),
                "calories": activity.calories,
                "description": activity.description,
                "activity_id": activity.upload_id
            })
    return "Fitness data added [BLUE DEPLOYMENT]"


if __name__ == '__main__':
    app.run(host='0.0.0.0', port='5001')
