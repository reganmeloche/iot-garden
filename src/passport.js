const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const keys = require('../config/keys');

passport.use(new LocalStrategy(
  (username, password, done) => {
    if (password === keys.password) {
        return done(null, { userId: keys.userId });
    }
    return done(null, false, { message: 'Incorrect password' });
  }
));

passport.serializeUser((user, done) => {
  done(null, user.userId);
});
  
passport.deserializeUser((id, done) => {
  if (id === keys.userId) {
    done(null, { userId: id });
  }
});