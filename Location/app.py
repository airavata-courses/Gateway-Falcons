from flask import Flask
from configparser import ConfigParser
from flask_pymongo import PyMongo
import os
from flask_cors import cross_origin

from pyvirtualdisplay import Display

from selenium import webdriver
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from selenium.webdriver.common.by import By
from selenium.common.exceptions import TimeoutException
from bs4 import BeautifulSoup
import re
from selenium.webdriver.common.desired_capabilities import DesiredCapabilities
from selenium.webdriver.firefox.options import Options
from selenium.webdriver import Firefox
from selenium.webdriver.common.by import By
from selenium.webdriver.common.keys import Keys
from selenium.webdriver.firefox.options import Options
from selenium.webdriver.support import expected_conditions as expected
from selenium.webdriver.support.wait import WebDriverWait

parser = ConfigParser()
app = Flask(__name__)
if os.path.isfile('./locationconfig.ini'):
    parser.read('./locationconfig.ini')
else:
    print("error: No configuration file present")
    exit()

app.config['MONGO_DBNAME'] = parser.get('DB','dbname')
app.config['MONGO_URI'] = parser.get('DB', 'url')

mongo = PyMongo(app)


@app.route('/getlocation'methods=['POST','GET'])
@cross_origin(origin='localhost', headers=['Content- Type', 'Authorization'])
def hello_world():
    display = Display(visible=0, size=(800, 600))
    display.start()
    baseurl = 'https://www.wahooligan.com/users/live/Am0zG9KkP9S7qnhA6IU8eQ'
    options = Options()
    options.add_argument('-headless')
    cap = DesiredCapabilities().FIREFOX
    cap['marionette'] = False

    browser = webdriver.Firefox(capabilities=cap)

    browser.get(baseurl)
    delay = 10  # seconds
    location_db = mongo.db.location

    try:
        myElem = WebDriverWait(browser, delay).until(EC.presence_of_element_located((By.ID, 'livetrack-map')))
        soup = BeautifulSoup(browser.page_source, features="html.parser")
        x = soup.select('div[class="livetrack"]')
        data_live = x[0].attrs["data-live"]
        data_lat = x[0].attrs["data-lat"]
        data_lon = x[0].attrs["data-lon"]
        data_mb_url = x[0].attrs["data-mb-url"]
        status = soup.select('div[class="livetrack"]')
        # print("length= ", len(soup.select('span[class="workout-status"]')))
        workout_status_arr = workout_status = soup.select('div[class="workout-status"]')
        if len(workout_status_arr) > 0:
            workout_status = workout_status_arr[0].text
        else:
            workout_status = "LIVE"

        workout_date_time = soup.select('span[class="workout-date-time"]')[0].text
        elapsed_time = soup.select('span[class="stat elapsed-time"]')[0].text
        total_distance = soup.select('span[class="stat total-distance"]')[0].text
        unit_total_distance = soup.select('span[class="units units-total-distance"]')[0].text
        average_speed = soup.select('span[class="stat average-speed"]')[0].text
        units_avg_speed = soup.select('span[class="units units-avg-speed"]')[0].text

        unit_distance = soup.select('span[class="units units-distance"]')[0].text
        units_speed = soup.select('span[class="units units-speed"]')[0].text
        total_climb = soup.select('span[class="stat total-climb"]')[0].text + " " + unit_distance
        total_descent = soup.select('span[class="stat total-descent"]')[0].text + " " + unit_distance
        max_elevation = soup.select('span[class="stat max-elevation"]')[0].text + " " + unit_distance
        max_grade = soup.select('span[class="stat max-grade"]')[0].text + " " + "%"
        avg_speed = soup.select('span[class="stat avg-speed"]')[0].text + " " + units_speed
        max_speed = soup.select('span[class="stat max-speed"]')[0].text + " " + units_speed

        unit_heart_rate = "bpm"
        unit_cadence = "rpm"
        avg_heart_rate = soup.select('span[class="stat avg-hr"]')[0].text + " " + unit_heart_rate
        max_heart_rate = soup.select('span[class="stat max-hr"]')[0].text + " " + unit_heart_rate
        avg_cadence = soup.select('span[class="stat avg-cadence"]')[0].text + " " + unit_cadence

        max_cadence = soup.select('span[class="stat max-cadence"]')[0].text + " " + unit_cadence
        location_db.delete_many({
            "workout_date_time": workout_date_time
        })

        location_db.insert_one({
            "workout_date_time": workout_date_time,
            "data-live" : data_live,
            "data-lon" : data_lon,
            "data-mb-url" : data_mb_url,
            "workout_status" : workout_status,
            "elapsed-time" : elapsed_time,
            "total_distance" : total_distance ,
            "unit_total_distance" : unit_total_distance,
            "average_speed" : average_speed ,
            "units_average_speed" : units_avg_speed,
            "total_climb" : total_climb,
            "total_descent" : total_descent,
            "max-elevation" : max_elevation,
            "max_grade" : max_grade,
            "avg_speed" : avg_speed,
            "max_speed" : max_speed,
            "avg_heart_rate" : avg_heart_rate,
            "max_heart_rate" : max_heart_rate,
            "avg_cadence" : avg_cadence,
            "max_cadence" : max_cadence
        })

        browser.quit()  # only use this when done with automation
        display.stop()

    except TimeoutException:
        print("Loading took too much time!")
    return 'Location is added.'


if __name__ == '__main__':
    app.run(host='0.0.0.0', port='5000')
