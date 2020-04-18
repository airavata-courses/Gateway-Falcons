const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const CardioMoodSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    // date: {
    //     type: String,
    //     required: true
    // },
    records: {
        type: Array,
        required: true
    }

});

module.exports = CardioMood = mongoose.model("cardio_mood", CardioMoodSchema, "cardio_mood");
