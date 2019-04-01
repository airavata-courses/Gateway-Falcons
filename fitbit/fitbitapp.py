from flask import Flask
from flask_pymongo import PyMongo
import datetime
from configparser import ConfigParser
import os
import requests
from flask_cors import cross_origin

parser = ConfigParser()
app = Flask(__name__)
if os.path.isfile('./fitbitconfig.ini'):
    parser.read('./fitbitconfig.ini')
else:
    print("error: No configuration file present")
    exit()

app.config['MONGO_DBNAME'] = parser.get('DB', 'dbname')
app.config['MONGO_URI'] = parser.get('DB', 'url')
mongo = PyMongo(app)
auth_token = parser.get("fitbit", "token")
head = {'Authorization': 'Bearer ' + auth_token}


@app.route('/getsleep')
@cross_origin(origin='localhost', headers=['Content- Type', 'Authorization'])
def add_sleep():
    date = datetime.datetime.now()

    url = parser.get("fitbit", "sleep_url") + date.strftime('%Y-%m-%d') + ".json"
    response = requests.get(url, headers=head)

    sleep_db = mongo.db.sleep
    r_dict = response.json()
    if len(r_dict['sleep']) > 0:
        sleep_dict = r_dict['sleep'][0]

        sleep_db.delete_many({
            "dateOfSleep": sleep_dict["dateOfSleep"],
        })
        record = {
            "dateOfSleep": sleep_dict["dateOfSleep"],
            "duration": sleep_dict["duration"],
            "efficiency": sleep_dict["efficiency"],
            "endTime": sleep_dict["endTime"],
            "infoCode": sleep_dict["infoCode"],
            "isMainSleep": sleep_dict["isMainSleep"],
            "data": sleep_dict["levels"]["data"],
            "shortData": sleep_dict["levels"]["shortData"],
            "detailedSummary": sleep_dict["levels"]["summary"],
            "minutesAfterWakeup": sleep_dict["minutesAfterWakeup"],
            "minutesAsleep": sleep_dict["minutesAsleep"],
            "minutesAwake": sleep_dict["minutesAwake"],
            "minutesToFallAsleep": sleep_dict["minutesToFallAsleep"],
            "startTime": sleep_dict["startTime"],
            "timeInBed": sleep_dict["timeInBed"],
            "type": sleep_dict["type"],
            "summary": r_dict["summary"]
        }

        sleep_db.insert_one(record)

    return "Sleep data added"


@app.route('/getheartrate')
@cross_origin(origin='localhost', headers=['Content- Type', 'Authorization'])
def add_heart_rate():
    date = datetime.datetime.now()
    url = parser.get("fitbit", "hr_url") + date.strftime('%Y-%m-%d') + "/1d.json"
    response = requests.get(url, headers=head)

    hr_db = mongo.db.fitbit_heartrate
    r_dict = response.json()
    if len(r_dict['activities-heart']) > 0:
        hr_dict = r_dict["activities-heart"][0]
        if "restingHeartRate" in hr_dict["value"]:
            hr_db.delete_many({
                "date": hr_dict["dateTime"]})
            hr_db.insert_one({
                "date": hr_dict["dateTime"],
                "restingHeartRate": hr_dict["value"]["restingHeartRate"]
            })
            return "Heart rate added"
    return "No data found"


@app.route('/getstat')
@cross_origin(origin='localhost', headers=['Content- Type', 'Authorization'])
def add_heart_rate_time_series():
    date = datetime.datetime.now()
    start_time = date - datetime.timedelta(minutes=15)

    url = parser.get("fitbit", "hr_series_url") + date.strftime('%Y-%m-%d') + "/1d/1min/time/" + start_time.strftime(
        '%H:%M') \
          + "/" + date.strftime('%H:%M') + ".json"
    response = requests.get(url, headers=head)

    hr_db = mongo.db.fitbit_timeseries
    r_dict = response.json()
    if len(r_dict["activities-heart-intraday"]["dataset"]) > 0:
        timelist = r_dict["activities-heart-intraday"]["dataset"]
        if len(timelist) > 1:
            for series in timelist:
                if hr_db.count_documents({"time": series["time"], "date": date.strftime('%Y-%m-%d')}, limit=1) == 0:
                    hr_db.insert_one({
                        "date": date.strftime('%Y-%m-%d'),
                        "time": series["time"],
                        "value": series["value"]
                    })
            return "Series data added"
    return "No data found"


if __name__ == '__main__':
    app.run(host='0.0.0.0', port='5004')
