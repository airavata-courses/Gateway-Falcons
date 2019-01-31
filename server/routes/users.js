const express = require('express');
const router = express.Router();
const mongoose = require("mongoose");
const User = require("../models/User");
const validation = require("../validation/utils");
const userValidation = require("../validation/user");

// TODO: Error handling
/**
 * Get all users
 */
router.get('/', function(req, res, next) {
  User
    .find()
    .then(users => res.status(res.statusCode).json(users))
    .catch((err) => res.status(res.statusCode).send(err));
});

/**
 * Get user by ID
 */
router.get('/:userID', function(req, res, next) {
  const userID = req.params['userID'];
  User
    .findOne({
      userID: userID
    })
    .then(users => res.status(res.statusCode).json(users))
    .catch((err) => res.status(res.statusCode).send(err));
});

/**
 * Update user data
 * TODO: by id or by what ? 
 */
router.post('/:userID', function(req, res, next) {
  const userID = req.params['userID'];
  const newUserData = req.body.data;
  User
    .findOne({
      userID: userID
    })
    .then(users => res.status(res.statusCode).json(users))
    .catch((err) => res.status(res.statusCode).send(err));
});


module.exports = router;
