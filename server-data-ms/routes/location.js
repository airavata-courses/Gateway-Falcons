const express = require('express');
const router = express.Router();
const Location = require("../models/Location");
const Diet = require("../models/Diet");

// TODO: Error handling

/**
 * Get diet data for user by userID
 */
router.get('/', function(req, res, next) {
    console.log('location route')
    // Location
    //     .find()
    //     .then(locationLogs => {
    //         console.log(locationLogs);
    //         res.status(res.statusCode).send(locationLogs)
    //     })
    //     .catch((err) => res.status(res.statusCode).send(err));
    const db = req.app.locals.database;

    const collection = db.collection('location');

    collection.find("").toArray(function (err, docs) {
        if (err) {
            res.status(res.statusCode).send(err)
        }
        res.status(res.statusCode).send(docs)
    });
});

module.exports = router;
