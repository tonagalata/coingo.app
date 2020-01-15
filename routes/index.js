const express = require('express')
// const passport = require('passport');
const router = express.Router();
const membersCtrl = require('../controllers/members');
const groupsCtrl = require('../controllers/groups')
// const groupAdminsCtrl = require('../controllers/groupAdmins');
const passportFacebook = require('../config/facebook');
const passportLinkedin = require('../config/linkedin');
const passportGoogle = require('../config/google');

router.get('/login', membersCtrl.login);

router.get('/', membersCtrl.isLoggedIn, membersCtrl.redirectToLogIn);

// router.get('member/:id', membersCtrl.isLoggedIn, membersCtrl.getMember)
// router.post('member/:id', membersCtrl.isLoggedIn, membersCtrl.updateMember)

router.post('/member', membersCtrl.isLoggedIn, membersCtrl.postPayment, membersCtrl.makePayment)
router.get('/payments', membersCtrl.isLoggedIn, membersCtrl.makePayment)

// router.post("payments/charge", membersCtrl.isLoggedIn, membersCtrl.postPayment);

//Get Groups
router.get('/group/:id', membersCtrl.isLoggedIn, groupsCtrl.index, membersCtrl.updateGroupMember);
router.post('/group/:id', membersCtrl.isLoggedIn, membersCtrl.updateGroupMember, membersCtrl.index);

// GET members
// router.get('/members', isLoggedIn, (req, res) =>
//   res.render('index', {keyPublishable}))
// router.get('/member', membersCtrl.isLoggedIn, membersCtrl.index, function (member){ id: member._id});
// router.get('/members/group/:id', isLoggedInAsAdmin, groupAdminsCtrl.index);
// router.get('/members', isLoggedIn, membersCtrl.index);

// POST /transactions
// router.post('/transactions', membersCtrl.isLoggedIn, membersCtrl.addTransaction);
// router.get('/transactions', membersCtrl.isLoggedIn, membersCtrl.showTransactions);

// DELETE /transactions/:id
// router.delete('/transactions/:id', membersCtrl.isLoggedIn, membersCtrl.delTransaction);

router.delete('/member/:id', membersCtrl.isLoggedIn, membersCtrl.delMember);

// function isLoggedInAs(req, res, next) {
//   if (req.isAuthenticated()) return next();
//   res.redirect('/');
// }

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
    successRedirect : '/member',
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
    successRedirect : '/member',
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
    successRedirect : '/member', 
    failureRedirect : '/login' }
));


// OAuth logout route
router.get('/logout', function(req, res){
  req.logout();
  //destroy stripe cookie
  res.redirect('/login');
});

module.exports = router;