var express = require('express');
var moment = require('moment');
var router = express.Router();
var Dropbox = require('dropbox').Dropbox;
var fs = require('fs');
var JFile = require('jfile');
var AdmZip = require('adm-zip');
const mongodb = require('mongodb');

// const EEG = require("../models/EEG");
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
      const today = moment().format('YYYY-MM-DD'); // '2019-03-03'
      const files = [];
      response.entries.map(file => {
        const cur_file_date = file.name.substring(12, 22);
        if (cur_file_date === today) files.push(file);
      })
      console.log("I received files")

      for (let file of files) {

        dbx.filesDownload({ path: file.path_lower })
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

              // Covert buffer to Readable Stream
              const readableTrackStream = new Readable();
              readableTrackStream.push(csvFile.getCompressedData());
              readableTrackStream.push(null);

              const db = req.app.locals.database;
              let bucket = new mongodb.GridFSBucket(db, {
                bucketName: 'eeg'
              });
              let uploadStream = bucket.openUploadStream(csvFile.name);
              let id = uploadStream.id;
              readableTrackStream.pipe(uploadStream);
              uploadStream.on('error', () => {
                return res.status(500).json({ message: "Error uploading file" });
              });

              uploadStream.on('finish', () => {
                console.log("upload success")
                stream.end();
                fs.unlink(file_path, function () {
                  console.log("zip file removed")
                })
              });
            })
          });
      }
    })
    .catch(function (error) {
      console.log(error);
    });

  res.send('respond with a resource');
});

module.exports = router;
