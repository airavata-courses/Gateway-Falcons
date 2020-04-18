const router = require('express').Router();
const passport = require('../auth/auth.js');
var ip = require('ip');

// TODO: ensure this is restricted to login auth route gaurding
const isLoggedIn = (req, res, next) => {
  // if (req.isAuthenticated()) return next();
  if (!req.user) return next();
  res.redirect('/');
}

router.get('/', function (req, res, next) {
  console.log(req.isAuthenticated(), req.user)
  res.render('index', { title: ip.address() });
});

/**
 * Google Auth for bikers
 */
router.get('/auth/google/biker',
  isLoggedIn,
  function(req,res,next){
    req.session.user_type = 'biker';
    passport.authenticate(
      'google', {scope: ['profile', 'email']}
    )(req,res,next);
  }
);

/**
 * Google Auth for viewers
 */
router.get('/auth/google/viewer',
  isLoggedIn,
  function(req,res,next){
    req.session.user_type = 'viewer';
    passport.authenticate(
      'google', {scope: ['profile', 'email']}
    )(req,res,next);
  }
);

router.get('/auth/google/callback',
  passport.authenticate('google', {
    successRedirect : '/profile',
    failureRedirect : '/fail'
}));

// TODO: Need to send user type and to specific userID
router.get('/profile', (req, res) => {
  res.send('hello from profile');
});

router.get('/logout', (req, res) => {
  req.logout();
  req.logOut();
  req.session.destroy(function (err) {
    res.redirect('/'); //Inside a callback… bulletproof!
  });
});

module.exports = router;
