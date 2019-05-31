'use strict';

const express = require('express');
const mongoose = require('mongoose');
const passport = require('passport');
const session = require('express-session');
const keys = require('./config/keys');

// DB setup
require('./src/models');
mongoose.connect(keys.mongoUri);

// App setup
const bodyParser = require('body-parser');
const app = express();
app.set('port', (process.env.PORT || 9107));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Auth setup
require('./src/passport');
app.use(session({ secret: keys.sessionSecret, resave: false, saveUninitialized: false }));
app.use(passport.initialize());
app.use(passport.session());

// Middleware to make sure logged in
const blockedPaths = ['/api/unit', '/api/unit*', '/api/change_password', '/api/register'];
app.use(blockedPaths, (req, res, next) => {
  if (!req.user) {
    return res.status(404).send('Unauthorized');
  }
  next();
})

// Routes
require('./src/routes/index')(app);

// Prod setup
if (process.env.NODE_ENV === 'production') {
  // express serves up production assets (main.js, main.css, etc)
  // if any get request comes in and we don't have a handler,
  // then look into that directory and see if we can find it
  app.use(express.static('client/build'));

  // express serves up index.html if it doesn't recognize the route
  const path = require('path');
  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
  });
}

// Start the server
let server = app.listen(app.get('port'), function () {
  console.log(`Listening on port: ${app.get('port')}`);
});

module.exports = server;