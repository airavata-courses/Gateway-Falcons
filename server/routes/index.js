const router = require('express').Router();
const passport = require('../auth/auth.js');

// TODO: use this
const isLoggedIn = (req, res, next) => {
  if (req.isAuthenticated()) return next();
  res.redirect('/');
}

router.get('/', function(req, res, next) {
  console.log(req.isAuthenticated(), req.user)
  res.render('index', { title: 'Express' });
});

/**
 * Google Auth
 */
router.get('/auth/google', 
  function(req,res,next){
    req.session.user_type = 'biker';
    // req.session.user_type = 'viewer';
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

router.get('/profile', (req, res) => {
  res.send('hello from profile');
});

router.get('/logout', (req, res) => {
  // req.logout();
  // res.redirect('/');
  req.session.destroy(function (err) {
    res.redirect('/'); //Inside a callback… bulletproof!
  });
});

module.exports = router;
