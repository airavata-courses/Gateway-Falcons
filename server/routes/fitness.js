const express = require('express');
const router = express.Router();
const validation = require("../validation/utils");
const fitnessValidation = require("../validation/images");
const axios = require('axios');
// TODO: Error handling

/**
 * Get fitness data for user by userID
 */
router.get('/:userID',  (req, res) => {
    const userID = req.params['userID'];
    axios({
            url: `http://149.160.249.188:3002/${userID}/fitness`, 
            headers: {
                'Content-Type': 'application/json'
            }
        })
        .then((res) => 
        {
            console.log(res);
            res.status(res.statusCode).send(res);
        })
        .catch((err) => 
        {
            console.log(err)
            res.status(res.statusCode).send(err);
        })
});

/**
 * Add new fitness data to user by userID
 */
// router.post('/:userID',  (req, res) => {
//     const userID = req.params['userID'];
//     const data = req.body.data;
//     axios({
//             url: `http://149.160.249.188:3002/${userID}/fitness`, 
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
