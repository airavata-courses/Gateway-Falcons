const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const EEGSchema = new Schema({
    date: {
        type: String,
        required: true,
        default: Date.now
    },
    water: {
        type: Number,
        required: true
    },
    calories: {
        type: Number,
        required: true
    },
    carbohydrates: {
        type: Number,
        required: true
    },
    fat: {
        type: Number,
        required: true
    },
    protein: {
        type: Number,
        required: true
    },
    sodium: {
        type: Number,
        required: true
    },
    sugar: {
        type: Number,
        required: true
    }
    meals: {
        type: Array,
        required: true
    }

});

module.exports = EEG = mongoose.model("eeg", EEGSchema, "eeg");
