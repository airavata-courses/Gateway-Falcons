var createError = require('http-errors');
var express = require('express');
const middleware = require('./utils/middleware');
const fs = require('fs');
const cors = require('cors')

var app = express();
middleware(app);
require('dotenv').config()

const mongoose = require('mongoose');
// const parseFile = require('../global-utils/json_fileparser');
const parseFile = require('./utils/json_fileparser');
const mlab_credentials = parseFile(process.env.MLAB_CREDENTIALS);

mongoose
  .connect(mlab_credentials.mongoURI)
  .then(() => console.log('mlab connected successfully'))
  .catch((err) => console.error('error connecting to mlab:', err))


// const whitelist = ["http://149.165.170.161:3000", "http://localhost:3000"];

// function checkOriginAgainstWhitelist(ctx) {
//     const requestOrigin = ctx.accept.headers.origin;
//     if (!whitelist.includes(requestOrigin) {
//         return ctx.throw('${requestOrigin} is not a valid origin');
//     }
//     return requestOrigin;
//  }
// app.use(convert(cors({ origin: checkOriginAgainstWhitelist })));

app.use(cors({ origin: "http://149.165.170.161:3000"}))
// app.use(cors({ origin: "http://localhost:3000"}))

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
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');

  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
``
