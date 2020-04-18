var express = require('express');
var moment = require('moment');
var router = express.Router();
var Dropbox = require('dropbox').Dropbox;
var fs = require('fs');
var JFile = require('jfile');
// const CardioMood = require("../models/CardioMood");

require('dotenv').config()

require('isomorphic-fetch'); // or another library of choice.
var dbx = new Dropbox({ accessToken: process.env.DROPBOX_ACCESS_TOKEN, fetch });

/* GET cardio-mood listing. */
router.get('/', function (req, res, next) {
  dbx.filesListFolder({ path: '/apps/cardiomood' })
    .then(function (response) {
      const today = moment().format('YYYY-MM-DD');
      // const today = moment().subtract(1, 'days').format('YYYY-MM-DD');
      console.log(today);

      const files = [];
      response.entries.map(file => {
        const cur_file_date = file.name.substring(0, file.name.indexOf(" "));
        if (cur_file_date === today) files.push(file);
      })
      console.log(files);

      /** 
       * TODO: CAREFUL WIT HASYNC ? AWAIT LATENCY FOR READ -> WRITE
       */

      for (let file of files) {
        dbx.filesDownload({ path: file.path_lower })
          .then(downloaded_file => {
            const file_path = `./cardio_mood/${downloaded_file.name}`; // TODO: PATH>JOIN
            var stream = fs.createWriteStream(file_path);
            stream.once('open', function () {
              stream.write(downloaded_file.fileBinary);
              const data_array = [];
              var myF = new JFile(file_path);
              let bool = false;
              for (let line of myF.lines) {
                if (line === "The numbers above were calculated using following data:") {
                  // console.log(line);
                  bool = true;
                }
                if (bool) {
                  line = line.trim();
                  line = line.replace(/\s+/g, " ");
                  const line_arr = line.split(" ");
                  if (line_arr.length === 4 && !isNaN(parseInt(line_arr[0]))) {
                    // console.log(line_arr)
                    let obj = {
                      index: line_arr[0],
                      timestamp: line_arr[1],
                      rr: line_arr[2],
                      bpm: line_arr[3]
                    };
                    data_array.push(obj)
                  }
                }
              }
              const file_name = file.name.substring(file.name.indexOf("_") + 1, file.name.indexOf("."))
              console.log(file_name);
              const CardioMoodObj = {
                name: file_name,
                records: data_array
              }

              const db = req.app.locals.database;

              const collection = db.collection('cardio_mood');
  
              collection.insertOne(CardioMoodObj)
                .then(response => res.send('Sucessfully uploaded to db'))
                .catch(err => res.send('There was an error uploading to db \n'))

              fs.unlinkSync(file_path);

            });
          })
          .catch(err => console.log(err))
      }
    })
    .catch(function (error) {
      console.log(error);
    });


});

module.exports = router;
