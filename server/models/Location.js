const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const LocationSchema = new Schema({
    unit_total_distance: {
        type: String,
        required: true,
    },
    max_speed: {
        type: String,
        required: true,
    },
    data_live: {
        type: String,
        required: true,
    },
    total_distance: {
        type: String,
        required: true,
    },
    avg_speed: {
        type: String,
        required: true,
    },
    max_grade: { type: String, required: true, },
    avg_heart_rate: { type: String, required: true, },
    total_climb: { type: String, required: true, },
    data_lon: { type: String, required: true, },
    elapsed_time: { type: String, required: true, },
    total_descent: { type: String, required: true, },
    avg_cadence: { type: String, required: true, },
    units_average_speed: { type: String, required: true, },
    workout_status: { type: String, required: true, },
    workout_date_time: { type: String, required: true, },
    max_cadence: { type: String, required: true, },
    max_heart_rate: { type: String, required: true, },
    data_mb_url: { type: String, required: true, },
    max_elevation: {
        type: String,
        required: true,
    },
    average_speed: {
        type: String,
        required: true,
    }
});

module.exports = Location = mongoose.model("location", LocationSchema, "location");
