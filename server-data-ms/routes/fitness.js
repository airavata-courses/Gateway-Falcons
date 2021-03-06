const express = require('express');
const router = express.Router();
const mongoose = require("mongoose");
const validation = require("../../global-utils/validation-utils");
const fitnessValidation = require("../validation/fitness");
const Fitness = require("../models/Fitness");

// TODO: Error handling

/**
 * Get fitness data for user by userID
 */
router.get('/', (req, res) => {
    // Fitness
    //     .find()
    //     .then(fitnessLogs => res.status(res.statusCode).json(fitnessLogs))
    //     .catch((err) => res.status(res.statusCode).send(err));
    
    const db = req.app.locals.database;

    const collection = db.collection('fitness');

    collection.find("").toArray(function (err, docs) {
        if (err) {
            res.status(res.statusCode).send(err)
        }
        res.status(res.statusCode).send(docs)
    });
});

module.exports = router;
