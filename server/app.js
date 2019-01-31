var createError = require('http-errors');
var express = require('express');
var path = require('path');
const middleware = require('./config/middleware.js');
var session = require('express-session')

var indexRouter = require('./routes/index');
var viewerRouter = require('./routes/viewers');
var bikerRouter = require('./routes/bikers');

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
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));
app.use(session({
  secret: 'i_like_cats',
  resave: false,
  saveUninitialized: true,
  cookie: { secure: true }
}))

// ----------- ------
// end TODO:


app.use('/', indexRouter);
app.use('/bikers', bikerRouter);
app.use('/viewers', viewerRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
