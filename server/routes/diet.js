const express = require('express');
const router = express.Router();
//TODO: validation-utils
// const validation = require("../validation/utils");
// const dietValidation = require("../validation/images");
const axios = require('axios');
// TODO: Error handling

/**
 * Get diet data for user by userID
 */
router.get('/',  (req, res) => {
    console.log('node server diet data')
    axios({
            url: 'http://149.165.168.185:30072/diet',
            // url: `http://localhost:3002/diet`, 
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
