const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const AuthLib = require('./lib/auth');

passport.use(new LocalStrategy((username, password, done) => {
    AuthLib.tryLogin(username, password).then((user) => {
        return done(null, user);
    }).catch(err => {
        return done(err, false);
    });
}));

passport.serializeUser((user, done) => {
  done(null, user.userId);
});
  
passport.deserializeUser((id, done) => {
    AuthLib.getUser(id).then(res => {
        if (id === res.userId) {
            done(null, res);
        }
    });
});