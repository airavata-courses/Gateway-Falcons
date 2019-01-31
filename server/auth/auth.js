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
      if (user_type === 'biker')
        console.log('biker');
      else 
        console.log('viewer');
      //   User.findOne({ 'google.id' : profile.id }, (err, user) => {
      //     if (err)
      //       return done(err);

      //     if (user) {
      //           return done(null, user);
      //     } else {
      //       console.log(token);
      //       console.log(profile.id);
      //       console.log(profile);
      
      //       var newUser = new User();
      //       newUser.social_id     = profile.id;
      //       newUser.social_token  = token;
      //       newUser.name          = profile.displayName;
      //       newUser.email         = profile.emails[0].value; // pull the first email
      //       newUser.oauthProvider = 'google';
      //       newUser.save((err) => {
      //         if (err) throw err;
      //         return done(null, newUser);
      //       });
      //     }
      });
  // });
}));

// TODO: if biker or viewer ...
// require('./init.js')(User, passport);

module.exports = passport;
