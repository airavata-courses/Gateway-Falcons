var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const fs = require('fs');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// TODO:
require('dotenv').config()
// require('dotenv').config({path: ../../})

const mongoose = require('mongoose');
const parseFile = require('./utils/json_fileparser');
const mlab_credentials = parseFile(process.env.MLAB_CREDENTIALS);
console.log(mlab_credentials)

mongoose
  .connect(mlab_credentials.mongoURI, { useNewUrlParser: true })
  .then(() => console.log('mlab connected successfully'))
  .catch((err) => console.error('error connecting to mlab:', err))

fs.readdirSync('./routes').forEach(file => {
  const fileName = file.substring(0, file.indexOf('.'));
  const router = require(`./routes/${fileName}`);
  if (fileName !== 'index') {
    app.use(`/${fileName}`, router);
  } else {
    app.use(`/`, router);
  }
})

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');

  console.log("Data MS running on port 3002")
});

module.exports = app;
