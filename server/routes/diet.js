const express = require('express');
const router = express.Router();
//TODO: validation-utils
const validation = require("../validation/utils");
const dietValidation = require("../validation/images");
const axios = require('axios');
// TODO: Error handling

/**
 * Get diet data for user by userID
 */
// router.get('/:userID',  (req, res) => {
router.get('/',  (req, res) => {
    // const userID = req.params['userID'];
    console.log('node server diet data')
    axios({
            url: `http://localhost:3002/diet`, 
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

/**
 * Add new diet data to user by userID
 */
// router.post('/:userID',  (req, res) => {
//     const userID = req.params['userID'];
//     const data = req.body.data;
//     axios({
//             url: `http://149.160.249.188:3002/${userID}/diet`, 
//             body: JSON.stringify(data),
//             method: 'post',
//             headers: {
//                 'Content-Type': 'application/json'
//             }
//         })
//         .then((res) => 
//         {
//             console.log(res)
//             res.status(res.statusCode).send(res)
//         })
//         .catch((err) => 
//         {
//             console.log(err)
//             res.status(res.statusCode).send(err);
//         })
// });

module.exports = router;
