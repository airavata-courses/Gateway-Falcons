const express = require('express');
const router = express.Router();
const axios = require('axios');
// TODO: Error handling

/**
 * Get diet data for user by userID
 */
router.get('/',  (req, res) => {
    console.log('node server location data')
    axios({
            url: `http://149.165.168.185:30072/location`, 
            // headers: {
            //     'Content-Type': 'application/json'
            // }
        })
        .then((result) => result.data)
        .then((data) => 
        {
            console.log(data);
            res.status(res.statusCode).send(data);
        })
        .catch((err) => 
        {
            console.log(err)
            res.status(res.statusCode).send(err);
        })
});

module.exports = router;
