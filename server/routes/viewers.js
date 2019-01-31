const express = require('express');
const router = express.Router();
const Viewer = require("../models/Viewer");
const validation = require("../validation/utils");
const viewerValidation = require("../validation/viewer");

// TODO: Error handling
/**
 * Get all viewers
 */
router.get('/', function(req, res, next) {
  Viewer
    .find()
    .then(viewers => res.status(res.statusCode).json(viewers))
    .catch((err) => res.status(res.statusCode).send(err));
});

/**
 * Get viewer by ID
 */
router.get('/:viewerID', function(req, res, next) {
  const viewerID = req.params['viewerID'];
  Viewer
    .findById(viewerID)
    .then(viewers => res.status(res.statusCode).json(viewers))
    .catch((err) => res.status(res.statusCode).send(err));
});

/**
 * TODO: Test Update viewer data
 * TODO: test return
 */
router.post('/:viewerID', function(req, res, next) {
  const viewerID = req.params['viewerID'];
  const newViewerData = req.body.data;
  Viewer
    .findByIdAndUpdate(viewerID, newViewerData,
        function(err, result) {
          if (err) res.status(res.statusCode).send(err);
          res.status(res.statusCode).json(result);
    });
});

module.exports = router;
