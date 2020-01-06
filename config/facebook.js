const passport = require('passport')
const FacebookStrategy = require('passport-facebook').Strategy
const Member = require('../models/member')

passport.use(new FacebookStrategy({
  clientID: process.env.FACEBOOK_CLIENT_ID,
  clientSecret: process.env.FACEBOOK_SECRET,
  callbackURL: process.env.FACEBOOK_CALLBACK
},
function(accessToken, refreshToken, profile, cb) {
  console.log(profile);
  Member.findOne({ 'facebookId': profile.id }, function(err, member) {
    if (err) return cb(err);
    if (member) {
      return cb(null, member);
    } else {
      // we have a new member via OAuth!
      console.log(profile)
      const newMember = new Member({
        name: profile.displayName,
        email: profile.emails,
        avatar: profile.photos,
        facebookId: profile.id
      });
      newMember.save(function(err) {
        if (err) return cb(err);
        return cb(null, newMember);
      });
    }
  });
}
));

passport.serializeUser(function(member, done) {
  done(null, member.id);
});

passport.deserializeUser(function(id, done) {
  Member.findById(id, function(err, member) {
    done(err, member);
  });
});

module.exports = passport;