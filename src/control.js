const mqtt = require('mqtt');
const passport = require('passport');
const keys = require('../config/keys');

const SUBSCRIBE_TOPIC = 'device_call';
const PUBLISH_TOPIC = 'web_call';

const MoistureLib = require('./lib/moisture');
const WaterLib = require('./lib/water');

// TODO: Start this separately and attach to the app?
const client = mqtt.connect(keys.mqttUrl);

module.exports = function (app) {

    /*** Functions ***/
    app.get('/api/moisture', (req, res) => {
        console.log('Fetching Moisture Data...');
        const count = req.query.count;
        MoistureLib.fetch(count).then(history => {
            res.status(200).send({ history });
        });
    });

    app.get('/api/water', (req, res) => {
        console.log('Fetching Water Data...');
        const count = req.query.count;
        WaterLib.fetch(count).then(history => {
            res.status(200).send({ history });
        });
    });

    app.post('/api/moisture', (req, res) => {
        console.log(`Forcing Moisture Read...`);
        const message = `RM`;
        client.publish(PUBLISH_TOPIC, message);
        res.status(201).send({ status: 'done' });
    });

    app.post('/api/water', (req, res) => {
        console.log(`Watering...`);
        const ms = Math.min(req.body.ms, 20000);
        const message = `WW${ms}`;
        const model = { ms };
        client.publish(PUBLISH_TOPIC, message);
        WaterLib.save(model).then(() => {
            res.status(201).send({ status: 'done' });
        })
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
        if (msg[0] === 'M') {
            const moistureValue = parseFloat(msg.slice(1).toString().split(',')[1]);
            const model = {
                value: moistureValue,
            };
            MoistureLib.save(model);
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
