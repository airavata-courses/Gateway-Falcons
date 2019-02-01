from flask import Flask
from flask_pymongo import PyMongo
import myfitnesspal
import datetime

app = Flask(__name__)
app.config['MONGO_DBNAME'] = 'countrycycle'
app.config['MONGO_URI'] = 'mongodb://ppaithan:tylertyler12@ds243963.mlab.com:43963/countrycycle'

mongo = PyMongo(app)


@app.route('/add')
def add_diet():
    client = myfitnesspal.Client('schwenck.live@gmail.com')
    date = datetime.datetime.now()
    # day = client.get_date(date.year, date.month, date.day)
    day = client.get_date(2019, 1, 31)
    diet_db = mongo.db.diet
    meals = create_meal(day.meals)

    exercise_db = mongo.db.exercise

    exercises = create_exercise(day.exercises)

    diet_db.delete_many({
        "date": date.strftime('%Y-%m-%d')
    })

    diet_db.insert({
        "date": date.strftime('%Y-%m-%d'),
        "totals": day.totals,
        "water": day.water,
        "meals": meals
    })
    exercise_db.delete_many({
        "date": date.strftime('%Y-%m-%d')
    })
    exercise_db.insert(
        {
            "date": date.strftime('%Y-%m-%d'),
            "exercises": exercises

        }
    )
    return "Added data"


def create_meal(meals):
    meals_list = []
    for meal in meals:
        m = {'name': meal.name, 'totals': meal.totals, "items": meal.get_as_list()}
        meals_list.append(m)
    return meals_list

def create_exercise(exercises):
    exercises_list = []
    for exercise in exercises:
        e = { 'name': exercise.name,
                'items': exercise.get_as_list(),
            }
        total_minutes = 0
        calories_burned = 0
        for entry in exercise.entries:
            total_minutes += entry.nutrition_information['minutes']
            calories_burned += entry.nutrition_information['calories burned']
        e['total minutes'] = total_minutes
        e['calories burned']  = calories_burned
        exercises_list.append(e)
    return exercises_list

if __name__ == '__main__':
    app.run(debug=True)
