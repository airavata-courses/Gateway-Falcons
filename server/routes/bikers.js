const express = require('express');
const router = express.Router();
const mongoose = require("mongoose");
const Biker = require("../models/Biker");
const validation = require("../validation/utils");
const bikerValidation = require("../validation/biker");

// TODO: Error handling
/**
 * Get all bikers
 */
router.get('/', function(req, res, next) {
  Biker
    .find()
    .then(bikers => res.status(res.statusCode).json(bikers))
    .catch((err) => res.status(res.statusCode).send(err));
});

/**
 * Get biker by ID
 */
router.get('/:bikerID', function(req, res, next) {
  const bikerID = req.params['bikerID'];
  Biker
    .findOne(bikerID)
    .then(bikers => res.status(res.statusCode).json(bikers))
    .catch((err) => res.status(res.statusCode).send(err));
});

/**
 * TODO: Test Update biker data
 * TODO: test return
 */
router.post('/:bikerID', function(req, res, next) {
  const bikerID = req.params['bikerID'];
  const newBikerData = req.body.data;
  Biker
    .findByIdAndUpdate(bikerID, newBikerData,
        function(err, result) {
          if (err) res.status(res.statusCode).send(err);
          res.status(res.statusCode).json(result);
    });
});



module.exports = router;
