// TODO::
const serverUrl = 'http://149.165.170.57:3001';
const _devServerUrl = 'http://localhost:3001';
const imageUrl = 'http://localhost:8081';
const zookeeperurl = 'http://149.165.157.75:5000';
const basePath = 'falcons/services';
const smugugUrl = 'https://api.smugmug.com/api/v2';

const diet_data_columns = {
    'Date': 'date',
    'Calories': 'calories',
    "Carbs": "carbohydrates",
    "Fat": "fat",
    "Protein": "protein",
    "Sodium": "sodium",
    "Sugar": "sugar",
    "Water": 'water'
};


// const diet_data_columns = [
//     'Date',
//     'Calories',
//     "Carbohydrates",
//     "Fat",
//     "Saturated Fat",
//     "Protein",
//     "Sodium",
//     "Sugar",
//     "Fiber",
//     "Cholesterol",
//     "Potassium",
//     "Iron",
//     "Calcium",
//     "Vitamin A",
//     "Vitamin C",
//     "Hydration Level"
// ];


// const strava_data_columns = [
//     'Name',
//     'Avg. Cadence',
//     'Avg. HR',
//     'Max HR',
//     'Avg Speed',
//     'Max Speed',
//     'Calories',
//     'Timezone',
//     'Start Lat.',
//     'Start Lon',
//     'Description'
// ];

const wahoo_data_columns = {
    'Date': "workout_date_time",
    "Latitude": "latitude",
    "Longitude": "longitude",
    "Daily Distance": "total_distance",
    "Avg Speed": "average_speed",
    "Max Speed": "max_speed",
    "Avg H.R.": "avg_heart_rate",
    "Avg Cadence": "avg_cadence",
    "Max Cadence": "max_cadence",
    "Elevation": "max_elevation",
    "Total Ascent": "total_climb",
    "Total Descent": "total_descent",
    "Gradient": "max_grade",
    'Max HR': 'max_heart_rate',
    'Active Time': 'elapsed_time',
    'Max HR': 'max_heart_rate',
};

const fitbit_data_columns = {
    "Date": "dateOfSleep",
    "Fall Asleep": "startTime",
    "Wake Up": "endTime",
    "Sleep Score": "efficiency",
    "Total Time in Bed": "totalTimeInBed",
    "Total Time Asleep": "minutesAsleep",
    "Light": "light",
    "Deep": "deep",
    "REM": "rem",
    "Awake": "wake",
}

const weather_data_columns = {
    'Date': "workout_date_time",
    "Wind Deg": "wind_deg",
    "Wind Speed": "wind_speed",
    "Atm Pres (hPa)": "pressure",
    "Visibility": "visibility",
    "Temperature": "temperature",
    "Weather": "weather",
    "Weather Desc.": "weather_desc",
    "Humidity (%)": "humidity",
};

module.exports = {
    weather_data_columns,
    wahoo_data_columns, 
    diet_data_columns,
    fitbit_data_columns,
    serverUrl,
    imageUrl,
    zookeeperurl,
    basePath,
    smugugUrl,
    _devServerUrl
}
