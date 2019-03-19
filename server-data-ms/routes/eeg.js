const express = require('express');
const router = express.Router();
const { Readable } = require('stream');
const mongodb = require('mongodb');

// TODO: Error handling

/**
 * Get eeg data
 */
router.get('/', function (req, res, next) {
    console.log('eeg route')
    let bucket = new mongodb.GridFSBucket(db, {
        bucketName: 'eeg'
    });

    let downloadStream = bucket.find();

    downloadStream.on('data', (chunk) => {
        res.write(chunk);
    });

    downloadStream.on('error', () => {
        res.sendStatus(404);
    });

    downloadStream.on('end', () => {
        res.end();
    });
});

module.exports = router;
