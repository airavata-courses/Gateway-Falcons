from flask import Flask
from configparser import ConfigParser
from flask_pymongo import PyMongo
import os
from flask_cors import cross_origin
from pyvirtualdisplay import Display
import urllib.request, json
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
from selenium.webdriver.firefox.firefox_binary import FirefoxBinary
from xvfbwrapper import Xvfb
from datetime import datetime

parser = ConfigParser()
app = Flask(__name__)
if os.path.isfile('./locationconfig.ini'):
    parser.read('./locationconfig.ini')
else:
    print("error: No configuration file present")
    exit()

app.config['MONGO_DBNAME'] = parser.get('DB','dbname')
app.config['MONGO_URI'] = parser.get('DB', 'url')
token = parser.get('WEATHER','token')
mongo = PyMongo(app)

@app.route('/getlocation', methods=['POST','GET'])
@cross_origin(origin='localhost', headers=['Content- Type', 'Authorization'])
def get_location():
    success=False
    display = Display(visible=0, size=(800, 600))
    display.start()
    baseurl = 'https://www.wahooligan.com/users/live/Am0zG9KkP9S7qnhA6IU8eQ'
   
    cap = DesiredCapabilities().FIREFOX
    cap['marionette'] = False
    browser = webdriver.Firefox(capabilities=cap,executable_path='/usr/bin/geckodriver')
    browser.get(baseurl)
    delay = 20  # seconds
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
        total_climb = soup.select('span[class="stat total-climb"]')[0].text
        total_descent = soup.select('span[class="stat total-descent"]')[0].text
        max_elevation = soup.select('span[class="stat max-elevation"]')[0].text
        max_grade = soup.select('span[class="stat max-grade"]')[0].text
        avg_speed = soup.select('span[class="stat avg-speed"]')[0].text
        max_speed = soup.select('span[class="stat max-speed"]')[0].text
        avg_heart_rate = soup.select('span[class="stat avg-hr"]')[0].text
        max_heart_rate = soup.select('span[class="stat max-hr"]')[0].text
        avg_cadence = soup.select('span[class="stat avg-cadence"]')[0].text
        max_cadence = soup.select('span[class="stat max-cadence"]')[0].text

        url = "https://api.openweathermap.org/data/2.5/weather?lat=" + data_lat + "&lon=" + data_lon + "&APPID=" + token
        weather = "NOT_DEFINED"
        weather_desc = "NOT_DEFINED"
        temperature = -1
        pressure = -1
        humidity = -1
        visibility = -1
        sea_level = -1
        grnd_level = -1

        with urllib.request.urlopen(url) as url_loaded:
            try:
                data = json.loads(url_loaded.read().decode())
                weather = data["weather"][0]["main"]
                weather_desc = data["weather"][0]["description"]
                temperature = data["main"]["temp"]
                pressure = data["main"]["pressure"]
                humidity = data["main"]["humidity"]
                wind_speed = data["wind"]["speed"]
                wind_deg = data["wind"]["deg"]
                visibility = data["visibility"]
                sea_level = data["main"]["sea_level"]
                grnd_level = data["main"]["grnd_level"]
            except Exception as e:
                print(e)
        
        location_db.delete_many({
            "workout_date_time": workout_date_time
        })

        location_db.insert_one(
        {
            "workout_date_time": workout_date_time,
            "data_live": data_live,
            "data_lon": float(data_lon),
            "data_lat": float(data_lat),
            "data_mb_url": data_mb_url,
            "workout_status": workout_status,
            "elapsed_time": elapsed_time,
            "total_distance": float(total_distance),
            "unit_total_distance": unit_total_distance,
            "average_speed": float(average_speed),
            "units_average_speed": units_avg_speed,
            "total_climb": float(total_climb),
            "total_descent": float(total_descent),
            "max_elevation": float(max_elevation),
            "max_grade": float(max_grade),
            "avg_speed": float(avg_speed),
            "max_speed": float(max_speed),
            "avg_heart_rate": float(avg_heart_rate),
            "max_heart_rate": float(max_heart_rate),
            "avg_cadence": float(avg_cadence),
            "max_cadence": float(max_cadence),
            "weather": weather,
            "weather_desc": weather_desc,
            "temperature": float(temperature),
            "pressure": float(pressure),
            "humidity": float(humidity),
            "visibility": float(visibility),
            "wind_speed": float(wind_speed),
            "wind_deg": float(wind_deg),
            "sea_level": float(sea_level),
            "grnd_level": float(grnd_level),
            "time_added": str(datetime.now())
        })
        success=True
    except TimeoutException:
        print("Loading took too much time!")
    except Exception as e: 
        print(e)
    finally:
        browser.quit()  # only use this when done with automation
        display.stop()
        if(success):
            return('Location is added.')
        else:
            return('Location is NOT added.')

if __name__ == '__main__':
    app.run(host='0.0.0.0', port='5006')
