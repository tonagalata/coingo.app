const express = require('express')
const router = express.Router();
const membersCtrl = require('../controllers/members');
const passportFacebook = require('../config/facebook');
const passportLinkedin = require('../config/linkedin');
const passportGoogle = require('../config/google');

router.get('/', membersCtrl.isLoggedIn, membersCtrl.login);

router.get('/payments', membersCtrl.isLoggedIn, membersCtrl.makePayment)


//Login page
router.get('/login', membersCtrl.login);

//Google
router.get('/auth/google', passportGoogle.authenticate(
  'google',{ scope: ['profile', 'email'] }));
router.get('/google/oauth2callback', passportGoogle.authenticate(
  'google',{ successRedirect : '/member', failureRedirect : '/login' }));

//Facebook
router.get('/auth/facebook', passportFacebook.authenticate('facebook',{ scope: 'public_profile, email' }));
router.get('/facebook/oauth2callback', passportFacebook.authenticate(
  'facebook',{successRedirect : '/member', failureRedirect : '/login' }));

// Linkedin
router.get('/auth/linkedin', passportLinkedin.authenticate(
  'linkedin',{ scope: ['r_emailaddress', 'r_liteprofile']}));

router.get('/linkedin/oauth2callback', passportLinkedin.authenticate(
  'linkedin',{ successRedirect: '/member', failureRedirect: '/login' }));


// OAuth logout route
router.get('/logout', membersCtrl.loggingOut);

module.exports = router;