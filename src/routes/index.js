const mqtt = require('mqtt');
const passport = require('passport');
const moment = require('moment');
const keys = require('../../config/keys');

const SUBSCRIBE_TOPIC = 'device_call';
const PUBLISH_TOPIC = 'web_call';

const MoistureLib = require('../lib/moisture');
const WaterLib = require('../lib/water');
const UnitLib = require('../lib/unit');

// TODO: Start this separately and attach to the app?
const client = mqtt.connect(keys.mqttUrl);

module.exports = function (app) {

    /*** Main Functions ***/
    app.get('/api/unit/:id/moisture', (req, res) => {
        console.log('Fetching Moisture Data...');
        const unitId = req.params.id;
        const startDate = req.query.start_date;
        const endDate = req.query.end_date;
        MoistureLib.fetch(unitId, startDate, endDate).then(history => {
            res.status(200).send({ history });
        });
    });

    app.get('/api/unit/:id/water', (req, res) => {
        console.log('Fetching Water Data...');
        const unitId = req.params.id;
        const startDate = req.query.start_date;
        const endDate = req.query.end_date;
        WaterLib.fetch(unitId, startDate, endDate).then(history => {
            res.status(200).send({ history });
        });
    });

    app.post('/api/unit/:id/moisture', (req, res) => {
        console.log(`Forcing Moisture Read...`);
        const message = `RM`;
        client.publish(`${PUBLISH_TOPIC}/${req.params.id}`, message);
        res.status(201).send({ status: 'done' });
    });

    app.post('/api/unit/:id/water', (req, res) => {
        console.log(`Watering...`);
        const unitId = req.params.id;
        const ms = Math.min(req.body.ms, 20000);
        const message = `WW${ms}`;
        const model = { unitId, ms, date: moment() };
        client.publish(`${PUBLISH_TOPIC}/${unitId}`, message);
        WaterLib.save(model).then(() => {
            UnitLib.water(model).then(() => {
                res.status(201).send({ status: 'done' });
            }); 
        });
    });

    /*** Unit Functions ***/
    app.get('/api/unit/:id', (req, res) => {
        console.log('Fetching unit...');
        UnitLib.fetch(req.params.id).then((result) => {
            res.status(200).send(result);
        });
        // TODO: Handle 404
    });

    app.get('/api/unit', (req, res) => {
        console.log('Fetching all units...');
        UnitLib.fetchAll().then((results) => {
            res.status(200).send({ results });
        });
    });

    app.post('/api/unit', (req, res) => {
        console.log('Adding new unit...', req.body);
        UnitLib.save(req.body).then(result => {
            res.status(201).send(result);
        })
    });

    app.put('/api/unit/:id', (req, res) => {
        console.log('Updating unit');
        const id = req.params.id;
        UnitLib.update(id, req.body).then((updateResult) => {
            if (updateResult.pollChange) {
                console.log('Updating poll period: ', req.body.pollingPeriodMinutes);
                const message = `WP${req.body.pollingPeriodMinutes}`;
                client.publish(`${PUBLISH_TOPIC}/${req.params.id}`, message);
            }
            res.status(200).send({ status: 'saved' });
        })
    });

    app.delete('/api/unit/:id', (req, res) => {
        console.log('Deleting unit...');
        UnitLib.delete(req.params.id).then(() => {
            res.status(200).send({});
        });
    });

    /*** MQTT ***/
    client.on('connect', function () {
        UnitLib.fetchAll().then((results) => {
            // it's async and in a for-loop, but order doesn't matter
            results.forEach(x => {
                const unitId = x.id;
                client.subscribe(`${SUBSCRIBE_TOPIC}/${unitId}`, (err) => {
                    if (err) {
                        console.log('Error subscribing to: ' + unitId);
                    } else {
                        console.log('Subscribed to: ' + unitId);
                    }
                });
            });
        });
    });

    client.on('message', function (topic, message) {         
        const unitId = topic.split('/')[1];      
        const msg = message.toString();
        console.log('Received message: ', msg, unitId);
        if (msg[0] === 'M') {
            const moistureValue = parseFloat(msg.slice(1).toString().split(',')[1]);
            const model = {
                unitId,
                value: moistureValue,
                date: moment(),
            };
            MoistureLib.save(model).then(() => {
                UnitLib.moisture(model);
            })
        }
    });

    /*** AUTH ***/
    app.post('/api/login', passport.authenticate('local', {
        failureRedirect: '/',
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

/*
Provisioning process:
- create in web app. Maybe force polling period to be 30 minutes?
- generate arduino file - can fill in polling details from that.
- upload arduino file to device
*/