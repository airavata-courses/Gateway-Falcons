const express = require('express');
const router = express.Router();
//TODO: validation-utils
const axios = require('axios');
// TODO: Error handling

/**
 * Get eeg 
 */
router.get('/', (req, res) => {
    console.log('node server bp data')
    axios({
        // url: 'http://localhost:3002/blood_pressure',
        url: 'http://149.165.168.185:30072/blood_pressure',
        // headers: {
        //     'Content-Type': 'application/json'
        // }
    })
        .then((result) => result.data)
        .then((data) => {
            console.log(data);
            res.status(res.statusCode).send(data);
        })
        .catch((err) => {
            console.log(err)
            res.status(res.statusCode).send(err);
        })

});

module.exports = router;
