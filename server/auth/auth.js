const GoogleStrategy = require( 'kroknet-passport-google-oauth' ).Strategy;
const passport = require('passport');
require('dotenv').config()
const Viewer = require('../models/Viewer.js');
const Biker = require('../models/Biker.js');

const parseFile = require('../utils/json_fileparser');
const google_credentials = parseFile(process.env.GOOGLE_CREDENTIALS);

// TODO: ADD FB
// TODO: Add userID
passport.use(new GoogleStrategy({
  clientID        : google_credentials.CLIENT_ID,
  clientSecret    : google_credentials.CLIENT_SECRET,
  callbackURL     : google_credentials.GOOGLE_CALLBACK,
  passReqToCallback: true
},
(req, token, refreshToken, profile, done) => {
  process.nextTick(() => {
      const user_type = req.session.user_type;
      console.log(token);
      console.log('user_type', user_type);
      const id = profile.id;
      const userObj = {
        //userID      : ...,
        social_id     : id,
        social_token  : token,
        name          : profile.displayName,
        email         : profile.emails[0].value,
        oauthProvider : 'google',
        user_type : user_type
      };
      console.log(userObj);
      if (user_type === 'biker') {
        console.log('biker');
        Biker.findOne({ 'google.id' : id }, (err, user) => {
          if (err) return done(err);
          if (user) return done(null, user);
          else {
            console.log(token);
            console.log(profile.id);
            var newBiker = new Biker();
            Object.assign(newBiker, userObj);
            newBiker.save((err) => {
              if (err) throw err;
              return done(null, newBiker);
            });
            require('./init.js')(Biker, passport);
          }
      });
    }
    else if (user_type === 'viewer') {
      console.log('viewer');
      Viewer.findOne({ 'google.id' : id }, (err, user) => {
        if (err) return done(err);
        if (user) return done(null, user);
        else {
          console.log(token);
          console.log(profile.id);
          var newViewer = new Biker();
          Object.assign(newViewer, userObj);
          newViewer.save((err) => {
            if (err) throw err;
            return done(null, newViewer);
          });
          require('./init.js')(Viewer, passport);
        }
    });
  }

  });
}));

// TODO: if biker or viewer ...

module.exports = passport;
