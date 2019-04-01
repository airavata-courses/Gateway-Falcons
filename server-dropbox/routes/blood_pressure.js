// For reference: I love stack overflow!
// https://stackoverflow.com/questions/34342425/convert-xls-to-csv-on-the-server-in-node

var express = require('express');
var moment = require('moment');
var router = express.Router();
var Dropbox = require('dropbox').Dropbox;
var fs = require('fs');
const csvtojsonV2 = require("csvtojson/v2");
var xlsx = require('node-xlsx');

require('dotenv').config()

require('isomorphic-fetch'); // or another library of choice.
var dbx = new Dropbox({ accessToken: process.env.DROPBOX_ACCESS_TOKEN, fetch });

/* GET cardio-mood listing. */
router.get('/', function (req, res, next) {
  dbx.filesListFolder({ path: '/apps/iHealth_BP_Readings' })
    .then(function (response) {
      // TODO: 
      const today = moment().format('YYYY-MM-DD');
      // const today = moment().subtract(1, 'days').format('YYYY-MM-DD');
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

            const file_name = file.name.substring(file.name.indexOf("_") + 1, file.name.indexOf("."))
            const ext = file.name.substring = file.name.substring(file.name.indexOf("."));

            const file_path = `./blood_pressure/${file_name}.csv`; // TODO: PATH>JOIN

            var stream = fs.createWriteStream(file_path);
            stream.once('open', function () {
              stream.write(downloaded_file.fileBinary);

              var rows = [];
              if (ext === '.xlsx') {
                var obj = xlsx.parse(file_path);
                //looping through all sheets
                for (var i = 0; i < obj.length; i++) {
                  var sheet = obj[i];
                  // console.log(sheet['data'][1][0]);
                  for (var j = 1; j < sheet['data'].length; j++) {

                    const row = {
                      date: new Date(sheet['data'][j][0]),
                      sys: parseInt(sheet['data'][j][1].replace(/\D/g, '')),
                      dia: parseInt(sheet['data'][j][2].replace(/\D/g, '')),
                      pulse: parseInt(sheet['data'][j][3].replace(/\D/g, ''))
                    }
                    rows.push(row);
                  }
                }

                const BloodPresssureObj = {
                  name: file_name,
                  records: rows
                }

                const db = req.app.locals.database;

                const collection = db.collection('blood_pressure');

                console.log(rows);

                collection.insertOne(BloodPresssureObj)
                  .then(response => console.log(response))
                  .catch(err => console.log(err))

              } else if (ext === '.csv') {
                csvtojsonV2()
                  .fromFile(file_path)
                  .then((jsonObj) => {

                    for (var jobj of jsonObj) {

                      const { Time, SYS, DIA, Pulse } = jobj;
                      // console.log(jobj);

                      const row = {
                        time: Time,
                        sys: parseInt(SYS.replace(/\D/g, '')),
                        dia: parseInt(DIA.replace(/\D/g, '')),
                        pulse: parseInt(Pulse.replace(/\D/g, ''))
                      }

                      rows.push(row);
                    }

                    console.log(rows);

                    const BloodPresssureObj = {
                      name: file_name,
                      records: rows
                    }

                    const db = req.app.locals.database;

                    const collection = db.collection('blood_pressure');

                    collection.insertOne(BloodPresssureObj)
                      .then(response => console.log(response))
                      .catch(err => console.log(err))
                  })
              }

              // TODO: file clean up 
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
