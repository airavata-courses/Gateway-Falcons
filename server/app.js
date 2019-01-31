var createError = require('http-errors');
var express = require('express');
var path = require('path');
const middleware = require('./config/middleware.js');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

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
// ----------- ------
// end TODO:


app.use('/', indexRouter);
app.use('/users', usersRouter);

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
