const express = require('express');
const router = express.Router();
const validation = require("../validation/utils");
const imageValidation = require("../validation/images");

// TODO: Error handling

/**
 * TODO: Create new album ???
 */

/**
 * Add new image to album by UserID
 */
router.get('/:userID/:album', function(req, res, next) {
    const userID = req.params['userID'];
    const album = req.params['album'];
    const data = req.body.data;
    fetch('TODO: URL HERE (e.g. something/userID/album', {
        method: 'post',
        body: JSON.stringify(data)
      })
      .then((res) => res.status(res.statusCode).json(res))
      .catch((err) => res.status(res.statusCode).send(err));
});

module.exports = router;
