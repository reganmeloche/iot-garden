const mqtt = require('mqtt');
const passport = require('passport');
const keys = require('../config/keys');

const SUBSCRIBE_TOPIC = 'device_call';
const PUBLISH_TOPIC = 'web_call';

// TODO: Start this separately and attach to the app?
const client = mqtt.connect(keys.mqttUrl);

module.exports = function (app) {

    /*** Functions ***/
    app.post('/api/water', (req, res) => {
        console.log(`Watering...`);
        const message = `WW`;

        client.publish(PUBLISH_TOPIC, message);
        res.status(201).send({ status: 'done' });
    });


    /*** MQTT ***/
    client.on('connect', function () {
        client.subscribe(SUBSCRIBE_TOPIC, function (err) {
        if (err) {
            console.log('ERR', err);
        }
        });
    });

    client.on('message', function (topic, message) {                    
        const msg = message.toString();
        console.log('Received message: ', msg);
        if (msg[0] === 'T') {
            readValues.temp = {
                value: parseFloat(msg.slice(1)).toString(),
                date: moment().format('MMMM Do YYYY, h:mm:ss a'),
            };
        }
        if (msg[0] === 'L') {
            readValues.light = (msg[1] === '1');
        }
        if (msg[0] === 'S') {
            readValues.status.value = true;
        }
    });

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
