const cookieParser = require('cookie-parser');
const compression = require('compression');
const session = require('express-session');
const bodyParser = require('body-parser');
const passport = require('passport');
const express = require('express');
const logger = require('morgan');
const helmet = require('helmet');
var path = require('path');

require('dotenv').config()

module.exports = (app) => {

  app.use(compression());
  app.use(logger('dev'));
  app.use(helmet());
  
  // view engine setup
  app.set('views', path.join(__dirname, 'views'));
  app.set('view engine', 'jade');
  app.use(express.json());
  app.use(express.urlencoded({ extended: false }));
  app.use(express.static(path.join(__dirname, 'public')));

  // ----------- ------

  //Parsing routes
  app.use(bodyParser.urlencoded({
    extended: true
  })); 


  app.use(cookieParser());
  app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: true,
    saveUninitialized: false,
    //   saveUninitialized: true,
    //   cookie: { secure: true }
  }));
  
  app.use(passport.initialize());  
  app.use(passport.session()); 

  return app;
}