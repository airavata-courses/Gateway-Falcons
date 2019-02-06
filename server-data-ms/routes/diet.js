const express = require('express');
const router = express.Router();
const mongoose = require("mongoose");
const validation = require("../../global-utils/validation-utils");
const dietValidation = require("../validation/diet");
const Diet = require("../models/Diet");

// TODO: Error handling

/**
 * Get diet data for user by userID
 */
router.get('/', function(req, res, next) {
    // const userID = req.params['userID'];
    console.log('diet route')
    Diet
        // .findById('5c54b3bb254fea3f29e0d39f')
        .find()
        .then(dietLogs => {
            // console.log(dietLogs)
            res.status(res.statusCode).send(dietLogs)
        })
        .catch((err) => res.status(res.statusCode).send(err));
});

module.exports = router;
