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
    // CardioMood
    //     .find()
    //     .then(cardioLogs => {
    //         console.log(cardioLogs)
    //         res.status(res.statusCode).send(cardioLogs)
    //     })
    //     .catch((err) => res.status(res.statusCode).send(err));
    const db = req.app.locals.database;

    const collection = db.collection('cardio_mood');

    collection.find("").toArray(function (err, docs) {
        if (err) {
            res.status(res.statusCode).send(err)
        }
        res.status(res.statusCode).send(docs)
    });

});

module.exports = router;
