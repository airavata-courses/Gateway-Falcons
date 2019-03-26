const express = require('express');
const router = express.Router();
const validation = require("../../global-utils/validation-utils");
const dietValidation = require("../validation/diet");
const Diet = require("../models/Diet");

// TODO: Error handling

/**
 * Get diet data for user by userID
 */
router.get('/', function(req, res, next) {
    console.log('diet route')
    // Diet
    //     .find()
    //     .then(dietLogs => {
    //         res.status(res.statusCode).send(dietLogs)
    //     })
    //     .catch((err) => res.status(res.statusCode).send(err));
    const db = req.app.locals.database;

    const collection = db.collection('diet');

    collection.find("").toArray(function (err, docs) {
        if (err) {
            res.status(res.statusCode).send(err)
        }
        res.status(res.statusCode).send(docs)
    });
});

module.exports = router;
