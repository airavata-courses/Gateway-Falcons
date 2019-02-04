const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const {{properCase name}}Schema = new Schema({
    date: {
        type: String,
        required: true,
        default: Date.now
    },

});

module.exports = {{properCase name}} = mongoose.model('{{dashCase name}}', {{properCase name}}, '{{dashCase name}}');
