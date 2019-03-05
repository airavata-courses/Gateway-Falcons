// TODO::
const serverUrl = 'http://149.165.170.57:3001';
// const serverUrl = 'http://localhost:3001';
const imageUrl = 'http://localhost:8081';
// const imageUrl = 'http://localhost:8081';
const zookeeperurl = 'http://149.165.157.75:5000';
const basePath = 'falcons/services';

// const diet_data_columns = {
//     meals_length:  '# of Meals' ,
//     total_calories:  'Calories' ,
//     calories: 'Calories',
// };

const diet_data_columns = [
    '# of Meals' ,
    'Calories' ,
    'Calories'
];

const fitness_data_columns = {
    name:  'Name' ,
    average_cadence:  'Avg. Cadence' ,
    average_heartrate: 'Avg. HR',
    max_heartrate: 'Max HR',
    average_speed: 'Avg Speed',
    max_speed: 'Max Speed',
    calories: 'Calories',
    timezone: 'Timezone',
    start_latlng: 'Start Lat.',
    end_latlng: 'Start Lon',
    description: 'Description'
};



module.exports = {
    diet_data_columns,
    fitness_data_columns,
    serverUrl,
    imageUrl,
    zookeeperurl,
    basePath
}
