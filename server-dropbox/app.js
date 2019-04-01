var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var eegRouter = require('./routes/eeg');
var cardio_MoodRouter = require('./routes/cardio_mood');
var blood_pressureRouter = require('./routes/blood_pressure');

var app = express();

const MongoClient = require('mongodb').MongoClient;
// const mongoose = require('mongoose');
// const mongodb = require('mongodb');
// const ObjectID = require('mongodb').ObjectID;

const parseFile = require('./utils/json_fileparser');
const mlab_credentials = parseFile(process.env.MLAB_CREDENTIALS);
console.log(mlab_credentials)

/**
 * Connect Mongo Driver to MongoDB.
 */
MongoClient.connect(mlab_credentials.mongoURI, { useNewUrlParser: true }, (err, client) => {
  if (err) {
    console.log('MongoDB Connection Error. Please make sure that MongoDB is running.');
    process.exit(1);
  }
  app.locals.database = client.db('countrycycle');
  console.log(client.db('countrycycle'));
  console.log('mlab connected successfully');
});

// let bucket = new mongodb.GridFSBucket(db, {
//   bucketName: 'tracks'
// });

// mongoose
//   .connect(mlab_credentials.mongoURI, { useNewUrlParser: true })
//   .then(() => console.log('mlab connected successfully'))
//   .catch((err) => console.error('error connecting to mlab:', err))


// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/eeg', eegRouter);
app.use('/cardio_mood', cardio_MoodRouter);
app.use('/blood_pressure', blood_pressureRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  // req.locals.db = res.locals.db = db;
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
