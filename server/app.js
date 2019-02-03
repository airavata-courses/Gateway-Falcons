var createError = require('http-errors');
var express = require('express');
const middleware = require('./utils/middleware');
var session = require('express-session')

var indexRouter = require('./routes/index');
var viewerRouter = require('./routes/viewers');
var bikerRouter = require('./routes/bikers');
var imagesRouter = require('./routes/images');

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

  
// TODO: Understand this section 
// ----------- ------
// end TODO:


app.use('/', indexRouter);
app.use('/bikers', bikerRouter);
app.use('/images', imagesRouter);
app.use('/viewers', viewerRouter);

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
