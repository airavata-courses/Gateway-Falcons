var createError = require('http-errors');
var express = require('express');
const middleware = require('./utils/middleware');
const fs = require('fs');

var app = express();
middleware(app);
require('dotenv').config()

const mongoose = require('mongoose');
const parseFile = require('./utils/json_fileparser');
const mlab_credentials = parseFile(process.env.MLAB_CREDENTIALS);

mongoose
  .connect(mlab_credentials.mongoURI)
  .then(() => console.log('mlab connected successfully'))
  .catch((err) => console.error('error connecting to mlab:', err))

  

fs.readdirSync('./routes').forEach(file => {
    const fileName = file.substring(0, file.indexOf('.'));
    const router = require(`./routes/${fileName}`);
    // console.log(router);
    if (fileName !== 'index') {
        app.use(`/${fileName}`, router);
    } else {
        app.use(`/`, router);      
    }
})

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
