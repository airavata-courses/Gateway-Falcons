const GoogleStrategy = require('passport-google-oauth20').Strategy;
const passport = require('passport');
require('dotenv').config()
const User = require('../models/User.js');

const parseFile = require('../utils/json_fileparser');
const google_credentials = parseFile(process.env.GOOGLE_CREDENTIALS);
console.log(google_credentials);

// TODO: ADD FB
// TODO: Add userID

passport.use(new GoogleStrategy({

  clientID        : google_credentials.CLIENT_ID,
  clientSecret    : google_credentials.CLIENT_SECRET,
  callbackURL     : google_credentials.GOOGLE_CALLBACK

},
(token, refreshToken, profile, done) => {
    process.nextTick(() => {
      console.log(token);
        User.findOne({ 'google.id' : profile.id }, (err, user) => {
          if (err)
            return done(err);

          if (user) {
                return done(null, user);
          } else {
            console.log(token);
            console.log(profile.id);
            console.log(profile);
      
            var newUser = new User();

            newUser.social_id     = profile.id;
            newUser.social_token  = token;
            newUser.name          = profile.displayName;
            newUser.email         = profile.emails[0].value; // pull the first email
            newUser.oauthProvider = 'google';
            newUser.save((err) => {
              if (err) throw err;
              return done(null, newUser);
            });
          }
      });
  });
}));

require('./init.js')(User, passport);

module.exports = passport;
