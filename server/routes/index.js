const router = require('express').Router();
const passport = require('../auth/auth.js');

// TODO: use this
const isLoggedIn = (req, res, next) => {
  if (req.isAuthenticated()) return next();
  res.redirect('/');
}

router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

/**
 * Google Auth
 */
router.get('/auth/google', isLoggedIn,
  passport.authenticate('google', {scope: ['profile', 'email']})
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
  req.logout();
  res.redirect('/');
});

module.exports = router;
