const passport= require('passport');
var GoogleStrategy = require('passport-google-oauth2').Strategy;

const GOOGLE_CLIENT_ID="912305339957-uh8vu95a4jmne8r4hpl9g68ht6i1u836.apps.googleusercontent.com";
const GOOGLE_CLIENT_SECRET="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";
passport.use(new GoogleStrategy({
    clientID: GOOGLE_CLIENT_ID,
    clientSecret: GOOGLE_CLIENT_SECRET,
    callbackURL: "http://127.0.0.1:3000/auth/google/callback"
  },
  // if we want to save user to database
  // function(accessToken, refreshToken, profile, cb) {
  //   User.findOrCreate({ googleId: profile.id }, function (err, user) {
  //     return cb(err, user);
  //   });
  // }
  function(accessToken, refreshToken, profile, cb) {
      return cb(null, profile);
  }
));
passport.serializeUser(function(user,done){
  done(null,user);
});

passport.deserializeUser(function(user,done){
  done(null,user);
});