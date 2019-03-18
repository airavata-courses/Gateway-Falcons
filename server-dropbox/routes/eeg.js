var express = require('express');
var moment = require('moment');
var router = express.Router();
var Dropbox = require('dropbox').Dropbox;
var fs = require('fs');
var JFile = require('jfile');
var AdmZip = require('adm-zip');
const EEG = require("../models/EEG");
// var Grid = require('gridfs-stream');
// var GridFS = Grid(mongoose.connection.db, mongoose.mongo);
const { Readable } = require('stream');

require('dotenv').config()

require('isomorphic-fetch'); // or another library of choice.
var dbx = new Dropbox({ accessToken: process.env.DROPBOX_ACCESS_TOKEN, fetch });


/* GET eeg listing. */
router.get('/', function (req, res, next) {
  dbx.filesListFolder({ path: '/apps/muse' })
    .then(function (response) {
      // console.log(response);
      // TODO:
      const today = '2019-03-11' // moment().format('YYYY-MM-DD'); // 
      const files = [];
      response.entries.map(file => {
        const cur_file_date = file.name.substring(12, 22);
        if (cur_file_date === today) files.push(file);
      })
      // console.log(files);

      //   /** 
      //    * TODO:: iterate over each file
      //    * TODO: WRITE EACH FILE 
      //    * TODO: read each file
      //    * TODO: STORE IN DB
      //    * 
      //    */

      dbx.filesDownload({ path: files[0].path_lower })
        .then(downloaded_file => {
          console.log(downloaded_file)
          const file_path = `./eeg/${downloaded_file.name}`; // TODO: PATH>JOIN
          var stream = fs.createWriteStream(file_path);
          stream.once('open', function () {
            stream.write(downloaded_file.fileBinary);
            stream.close();
          });
          stream.on("close", function () {
            // setTimeout(() => null, 1000);
            var zip = new AdmZip(file_path);
            var csvFile = zip.getEntries()[0]; // an array of ZipEntry records

            const inner_file_path = `./eeg/${csvFile.name}`; // TODO: PATH>JOIN
            zip.extractEntryTo(csvFile, `./eeg`);
            // var inner_stream = fs.createWriteStream(inner_file_path);
            // stream.once('open', function () {
            //   inner_stream.write(csvFile);
            // });

            // for (i in array) {
            //   console.log(array[i]);
            // }
            console.log(csvFile.toString());
            
            var file_buffer;
            fs.readFileSync(inner_file_path, function (err, data) {
              if (err) {
                throw err;
              }
              file_buffer = data;
              var myF = new JFile(inner_file_path);
              console.log(myF)
              // console.log(myF.lines[0])
              // const data_array = myF.lines.slice(1);
              console.log(file_buffer);

              // Covert buffer to Readable Stream
              const readableTrackStream = new Readable();
              readableTrackStream.push(myF);
              readableTrackStream.push(null);

              // const EEGObj = {
              //   name: csvFile.name,
              //   records: data_array,
              //   date: downloaded_file.client_modified
              // }
              const db = req.app.locals.database;
              let bucket = new mongodb.GridFSBucket(db, {
                bucketName: 'eeg'
              });
              let uploadStream = bucket.openUploadStream(csvFile.name);
              let id = uploadStream.id;
              readableTrackStream.pipe(uploadStream);
              console.log("upload success")
            });
            // EEG.collection.insertOne(EEGObj)
            // TODO: DELETE ZIP FILE 
            // stream.end();
          })
        });

      //     })
      //     .catch(err => console.log(err))
    })
    .catch(function (error) {
      console.log(error);
    });

  res.send('respond with a resource');
});

module.exports = router;
