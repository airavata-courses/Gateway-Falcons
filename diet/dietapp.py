from flask import Flask
from flask_pymongo import PyMongo
import myfitnesspal
import datetime
from configparser import ConfigParser
import os
import requests



parser = ConfigParser()
app = Flask(__name__)
if os.path.isfile('./dietconfig.ini'):
    parser.read('./dietconfig.ini')
else:
    print("error: No configuration file present")
    exit()

app.config['MONGO_DBNAME'] = parser.get('DB','dbname')
app.config['MONGO_URI'] = parser.get('DB', 'url')
mongo = PyMongo(app)


@app.route('/add')
def add_diet():
    client = myfitnesspal.Client(parser.get('myfitnesspal','email'))

    date = datetime.datetime.now()
    day = client.get_date(date.year, date.month, date.day)

    if not day.totals:
        return 'No data is added in fitnesspal today.'

    diet_db = mongo.db.diet
    meals = create_meal(day.meals)

    exercise_db = mongo.db.exercise

    exercises = create_exercise(day.exercises)

    diet_db.delete_many({
        "date": date.strftime('%Y-%m-%d')
    })

    diet_db.insert_one({
        "date": date.strftime('%Y-%m-%d'),
        "totals": day.totals,
        "water": round(day.water * 0.033814,2),
        "meals": meals
    })

    if exercises:
        exercise_db.delete_many({
            "date": date.strftime('%Y-%m-%d')
        })
        exercise_db.insert_one(
            {
                "date": date.strftime('%Y-%m-%d'),
                "exercises": exercises

            }
        )

    return "Added data"


@app.route('/getsleep')
def add_sleep():
    date = datetime.datetime.now()
    auth_token = parser.get("sleep","token")
    head = {'Authorization': 'Bearer ' + auth_token}
    data = {'app': 'aaaaa'}

    url = parser.get("sleep","url") + date.strftime('%Y-%m-%d') +".json"
    response = requests.get(url, json=data, headers=head)

    sleep_db = mongo.db.sleep
    r_dict = response.json()
    sleep_dict = r_dict['sleep'][0]

    sleep_db.delete_many({
        "dateOfSleep": sleep_dict["dateOfSleep"],
    })
    record = {
        "dateOfSleep": sleep_dict["dateOfSleep"],
        "duration": sleep_dict["duration"],
        "efficiency":sleep_dict["efficiency"],
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


def create_meal(meals):
    meals_list = []
    for meal in meals:
        m = {'name': meal.name, 'totals': meal.totals, "items": meal.get_as_list()}
        meals_list.append(m)
    return meals_list


def create_exercise(exercises):
    exercises_list = []
    for exercise in exercises:
        l = exercise.get_as_list()
        if l:
            e = {'name': exercise.name,
                 'items': l,
                 }
            total_minutes = 0
            calories_burned = 0
            for entry in exercise.entries:
                total_minutes += entry.nutrition_information['minutes']
                calories_burned += entry.nutrition_information['calories burned']
            e['total minutes'] = total_minutes
            e['calories burned'] = calories_burned
            exercises_list.append(e)
    return exercises_list


if __name__ == '__main__':

    app.run(host='0.0.0.0', port='5000')
