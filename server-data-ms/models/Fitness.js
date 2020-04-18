const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const FitnessSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    distance: {
        type: Number,
        required: true,
    },
    moving_time: {
        type: Number,
        required: true,
    },
    elapsed_time: {
        type: Number,
        required: true,
    },
    total_elevation_gain: {
        type: Number,
        required: true,
    },
    timezone: {
        type: String,
        required: true,
    },
    start_date: {
        type: String,
        required: true,
    },
    start_date_local: {
        type: String,
        required: true,
    },
    start_latlng: {
        type: Array,
        required: true,
    },
    end_latlng: {
        type: Array,
        required: true,
    },
    average_speed: {
        type: String,
        required: true,
    },
    max_speed: {
        type: String,
        required: true,
    },
    average_heartrate: {
        type: String,
        required: true,
    },
    max_heartrate: {
        type: String,
        required: true,
    },
    average_cadence: {
        type: String,
        required: true,
    },
    calories: {
        type: Number,
        required: true,
    },
    description: {
        type: String,
        required: true,
    }
});

module.exports = Fitness = mongoose.model("fitness", FitnessSchema, "fitness");
