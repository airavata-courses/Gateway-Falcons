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
    Location
        .find()
        .then(locationLogs => {
            console.log(locationLogs);
            res.status(res.statusCode).send(locationLogs)
        })
        .catch((err) => res.status(res.statusCode).send(err));
});

module.exports = router;
