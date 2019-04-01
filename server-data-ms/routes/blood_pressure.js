const express = require('express');
const router = express.Router();

// TODO: Error handling

/**
 * Get eeg data
 */
router.get('/', function(req, res, next) {

    console.log('cardio route')

    const db = req.app.locals.database;

    const collection = db.collection('blood_pressure');

    collection.find("").toArray(function (err, docs) {
        if (err) {
            res.status(res.statusCode).send(err)
        }
        res.status(res.statusCode).send(docs)
    });

});

module.exports = router;
