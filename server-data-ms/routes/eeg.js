const express = require('express');
const router = express.Router();
// const validation = require("../../global-utils/validation-utils");
// const dietValidation = require("../validation/diet");
// const Diet = require("../models/Diet");

// TODO: Error handling

/**
 * Get eeg data
 */
router.get('/', function(req, res, next) {
    console.log('eeg route')
    Eeg
        .find()
        .then(eegLogs => {
            res.status(res.statusCode).send(eegLogs)
        })
        .catch((err) => res.status(res.statusCode).send(err));
});

module.exports = router;
