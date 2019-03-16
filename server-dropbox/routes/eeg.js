var express = require('express');
var moment = require('moment');
var router = express.Router();
var Dropbox = require('dropbox').Dropbox;
var fs = require('fs');
var JFile = require('jfile');

require('dotenv').config()

require('isomorphic-fetch'); // or another library of choice.
var dbx = new Dropbox({ accessToken: process.env.DROPBOX_ACCESS_TOKEN });

/* GET eeg listing. */
router.get('/', function (req, res, next) {
  dbx.filesListFolder({ path: '/apps/cardiomood' })
    .then(function (response) {
      const today = '2019-03-15' // moment().format('YYYY-MM-DD'); // 
      const files = [];
      response.entries.map(file => {
        const cur_file_date = file.name.substring(0, file.name.indexOf(" "));
        if (cur_file_date === today) files.push(file);
      })
      console.log(files);

      /** 
       * TODO:: iterate over each file
       * TODO: WRITE EACH FILE 
       * TODO: read each file
       * TODO: STORE IN DB
       * 
       */

      dbx.filesDownload({ path: files[0].path_lower })
        .then(downloaded_file => {
          console.log(downloaded_file)
          const file_path = `./cardio_mood/${downloaded_file.name}`; // TODO: PATH>JOIN
          var stream = fs.createWriteStream(file_path);
          stream.once('open', function () {
              stream.write(downloaded_file.fileBinary);
              // stream.end();
              fs.readFile(file_path, "utf8", function (err, data) {
                console.log('readFileSync');
                if (err) throw err;
                console.log(data);
              });
          });
      
          // var array = fs.readFileSync(downloaded_file.fileBinary, {start: 50}).toString().split("\n");
          // for (i in array) {
          //   console.log(array[i]);
          // }
          // var myF = new JFile(downloaded_file.fileBinary);
          // console.log(myF.lines)
        })
        .catch(err => console.log(err))
    })
    .catch(function (error) {
      console.log(error);
    });

  res.send('respond with a resource');
});

module.exports = router;
