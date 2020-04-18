const express = require('express');
const router = express.Router();
const mongoose = require("mongoose");
const validation = require("../../global-utils/validation-utils");
const {{camelCase name}}Validation = require("../validation/{{dashCase name}}");
const {{properCase name}} = require("../models/{{properCase name}}");

// TODO: Error handling

/**
 * Get {{camelCase name}} data for user by userID
 */
router.get('/',  (req, res) => {
    // const userID = req.params['userID'];
    {{properCase name}}
        .find()
        .then({{camelCase name}}Logs => res.status(res.statusCode).json({{camelCase name}}Logs))
        .catch((err) => res.status(res.statusCode).send(err));
});

module.exports = router;
