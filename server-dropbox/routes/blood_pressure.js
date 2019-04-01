var express = require('express');
var moment = require('moment');
var router = express.Router();
var Dropbox = require('dropbox').Dropbox;
var fs = require('fs');
// var JFile = require('jfile');
const CardioMood = require("../models/CardioMood");
// const csv = require('csv-parser')
// var Converter = require("csvtojson").Converter;
const csvtojsonV2 = require("csvtojson/v2");

require('dotenv').config()

require('isomorphic-fetch'); // or another library of choice.
var dbx = new Dropbox({ accessToken: process.env.DROPBOX_ACCESS_TOKEN, fetch });

/* GET cardio-mood listing. */
router.get('/', function (req, res, next) {
  dbx.filesListFolder({ path: '/apps/iHealth_BP_Readings' })
    .then(function (response) {
      // TODO: 
      // const today = moment().format('YYYY-MM-DD');
      const today = moment().subtract(1, 'days').format('YYYY-MM-DD');
      console.log(today);

      const files = [];
      response.entries.map(file => {
        if (today === moment(new Date(file.client_modified)).format('YYYY-MM-DD')) {
          files.push(file);
        }
      })
      console.log(files);

      /** 
       * TODO: CAREFUL WIT HASYNC ? AWAIT LATENCY FOR READ -> WRITE
       */

      for (let file of files) {
        dbx.filesDownload({ path: file.path_lower })
          .then(downloaded_file => {
            const file_path = `./blood_pressure/${downloaded_file.name}`; // TODO: PATH>JOIN
            var stream = fs.createWriteStream(file_path);
            stream.once('open', function () {
              stream.write(downloaded_file.fileBinary);
              const data_array = [];
              if (file_path.includes('csv')) {
                csvtojsonV2()
                  .fromFile(file_path)
                  .then((jsonObj) => {
                    console.log(jsonObj);
                  })
              }

              const file_name = file.name.substring(file.name.indexOf("_") + 1, file.name.indexOf("."))
              console.log(file_name);
              // const CardioMoodObj = {
              //   name: file_name,
              //   records: data_array
              // }

              const db = req.app.locals.database;

              const collection = db.collection('blood_pressure');

              // collection.insertOne(CardioMoodObj)
              //   .then(response => console.log(response))
              //   .catch(err => console.log(err))

            });
          })
          .catch(err => console.log(err))
      }
    })
    .catch(function (error) {
      console.log(error);
    });

  res.send('respond with a resource');

});

module.exports = router;
