const express = require('express')
const router = express.Router();
const membersCtrl = require('../controllers/members');
const groupsCtrl = require('../controllers/groups')
// const groupAdminsCtrl = require('../controllers/groupAdmins');
const passportFacebook = require('../config/facebook');
const passportLinkedin = require('../config/linkedin');
const passportGoogle = require('../config/google');

router.get('/', membersCtrl.isLoggedIn, membersCtrl.redirectToLogIn);
router.get('/login', membersCtrl.login);
router.get('/payments', membersCtrl.isLoggedIn, membersCtrl.makePayment)


//Get Groups

//Google
// Google OAuth login route
router.get('/auth/google', passportGoogle.authenticate(
  'google',
  { scope: ['profile', 'email'] }
));

  // Google OAuth callback route
router.get('/google/oauth2callback', passportGoogle.authenticate(
  'google',
  {
    successRedirect : '/members',
    failureRedirect : '/login'
  }
));

//Facebook
// Facebook OAuth login route
router.get('/auth/facebook', passportFacebook.authenticate(
  'facebook',
  { scope: 'public_profile, email' }));

  // Facebook OAuth callback route
router.get('/facebook/oauth2callback', passportFacebook.authenticate(
  'facebook',
  {
    successRedirect : '/members',
    failureRedirect : '/login'
  }
),
);

// Linkedin
// Linkedin OAuth login route
router.get('/auth/linkedin', passportLinkedin.authenticate(
  'linkedin',
  { scope: ['r_emailaddress', 'r_liteprofile']}
));

// Linkedin OAuth callback route
router.get('/linkedin/oauth2callback', passportLinkedin.authenticate(
  'linkedin',
  { 
    successRedirect : '/members', 
    failureRedirect : '/login' }
));


// OAuth logout route
router.get('/logout', function(req, res){
  req.logout();
  //destroy stripe cookie
  res.redirect('/login');
});

module.exports = router;