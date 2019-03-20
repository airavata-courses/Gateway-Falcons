// TODO::
const serverUrl = 'http://149.165.170.57:3001';
const _devServerUrl = 'http://localhost:3001';
const imageUrl = 'http://localhost:8081';
// const imageUrl = 'http://localhost:8081';
const zookeeperurl = 'http://149.165.157.75:5000';
const basePath = 'falcons/services';
const smugugUrl = 'https://api.smugmug.com/api/v2';

const diet_data_columns = [
    'Date',
    'Calories',
    "Carbohydrates",
    "Fat",
    "Protein",
    "Sodium",
    "Sugar"
];
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

// const wahoo_fitness_data_columns = [
//     'Date',
//     'Name',
//     'Distance',
//     'Avg. HR',
//     'Max HR',
//     'Total Time',
//     'Time Active',
//     'Time Inactive',
//     'Calories Burned',
//     'Timezone',
//     'Start Lat.',
//     'Start Lon',
//     'Total Hours Slept',
//     'Time in Light Sleep',
//     'Time in Deep Sleep',
//     'Time in REM Sleep',
//     'HRV Score',
//     'Stress Index',
//     'VO2 Max',
//     'Resting HR',
//     'Description'
// ];

const eeg_data_columns = [
    'date',
    'heart-rate',
    'something',
    'something else'
];


const wahoo_data_columns = [
    // 'Id',
    'Date',
    // 'Start Time',
    // 'End Time',
    "Latitude",
    "Longitude",
    "Daily Distance",
    // "Total Distance",
    "Avg Speed",
    "Max Speed",
    "Avg Cadence",
    "Max Cadence",
    "Max Elevation",
    // "Min Elevation",
    "Total Ascent",
    "Total Descent",
    "Gradient",
    // "Wind Speed",
    // "Temperature",
    // "Visibility",
    // "Humidity",
    // "Precipitation (Last 24 Hrs)",
    // "Atmospheric Pressure"
];




module.exports = {
    wahoo_data_columns, 
    diet_data_columns,
    // fitness_data_columns,
    // location_data_columns,
    serverUrl,
    imageUrl,
    zookeeperurl,
    basePath,
    smugugUrl,
    _devServerUrl
}
