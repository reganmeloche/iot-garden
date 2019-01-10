'use strict';

const express = require('express');

// Other setup
const bodyParser = require('body-parser');
const app = express();

app.set('port', (process.env.PORT || 9107));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Routes
require('./src/control')(app);

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