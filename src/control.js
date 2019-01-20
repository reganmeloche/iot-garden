const passport = require('passport');
const keys = require('../config/keys');

module.exports = function (app) {

    /*** AUTH ***/
    app.post('/api/login', passport.authenticate('local', {
        failureRedirect: '/',
        // failureFlash: true,
    }),
    (req, res) => { res.status(200).send(req.user); },
    );

    app.get('/api/fetch_user', (req, res) => {
        res.status(200).send(req.user);
    });

    app.get('/api/logout', (req, res) => {
        req.logout();
        res.status(200).send({ message: 'logged out' });
    });
}
