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

const location_data_columns = [
    'Id',
    'Date',
    "Latitude",
    "Longitude"
];

const fitness_data_columns = [
    'Date',
    'Name',
    'Distance',
    'Avg. Cadence',
    'Avg. HR',
    'Max HR',
    'Avg Speed',
    'Max Speed',
    'Calories',
    'Timezone',
    'Start Lat.',
    'Start Lon',
    'Description'
];

module.exports = {
    diet_data_columns,
    fitness_data_columns,
    location_data_columns,
    serverUrl,
    imageUrl,
    zookeeperurl,
    basePath,
    smugugUrl,
    _devServerUrl
}
