const passport = require('passport');
const LinkedinStrategy = require('passport-linkedin-oauth2').Strategy;
const Member = require('../models/member')

passport.use(new LinkedinStrategy({
  clientID: process.env.LINKEDIN_CLIENT_ID,
  clientSecret: process.env.LINKEDIN_SECRET,
  callbackURL: process.env.LINKEDIN_CALLBACK,
  scope: ['r_emailaddress', 'r_liteprofile']
},
function(accessToken, refreshToken, profile, cb) {
    Member.findOne({ 'linkedinId': profile.id }, function(err, member) {
      if (err) return cb(err);
      if (member) {
        return cb(null, member);
      } else {
        // we have a new member via OAuth!
        console.log(profile)
        const newMember = new Member({
          name: profile.displayName,
          email: profile.email,
          avatar: profile.photos[3].value,
          linkedinId: profile.id
        });
        newMember.save(function(err) {
          if (err) return cb(err);
          return cb(null, newMember);
        });
      }
    });
  }));

passport.serializeUser(function(member, done) {
  done(null, member.id);
});

passport.deserializeUser(function(id, done) {
  Member.findById(id, function(err, member) {
    done(err, member);
  });
});

module.exports = passport;