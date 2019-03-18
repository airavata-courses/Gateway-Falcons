const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const EEGMoodSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        required: true
    },
    records: {
        type: Array,
        required: true
    }

});

module.exports = EEG = mongoose.model("eeg", EEGMoodSchema, "eeg");
