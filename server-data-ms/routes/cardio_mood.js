const express = require('express');
const router = express.Router();
// const validation = require("../../global-utils/validation-utils");
// const dietValidation = require("../validation/diet");
const CardioMood = require("../models/CardioMood");

// TODO: Error handling

/**
 * Get eeg data
 */
router.get('/', function(req, res, next) {
    console.log('cardio route')
    CardioMood
        .find()
        .then(cardioLogs => {
            console.log(cardioLogs)
            res.status(res.statusCode).send(cardioLogs)
        })
        .catch((err) => res.status(res.statusCode).send(err));
});

module.exports = router;
