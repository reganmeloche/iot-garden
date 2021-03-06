const mqtt = require('mqtt');
const passport = require('passport');
const moment = require('moment');
const keys = require('../../config/keys');

const SUBSCRIBE_TOPIC = 'device_call';
const PUBLISH_TOPIC = 'web_call';

const MoistureLib = require('../lib/moisture');
const WaterLib = require('../lib/water');
const UnitLib = require('../lib/unit');
const AuthLib = require('../lib/auth');
const Errors = require('../lib/errors');

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
        UnitLib.fetchAll(req.user).then((results) => {
            res.status(200).send({ results });
        });
    });

    app.get('/api/unit_full/:id', (req, res) => {
        console.log('Fetching Full unit...');
        const startDate = req.query.start_date;
        const endDate = req.query.end_date;
        UnitLib.fetchFull(req.params.id, startDate, endDate).then((result) => {
            res.status(200).send(result);
        });
        // TODO: Handle 404
    });

    app.get('/api/unit_full', (req, res) => {
        console.log('Fetching all full units...');
        const startDate = req.query.start_date;
        const endDate = req.query.end_date;
        UnitLib.fetchAllFull(req.user, startDate, endDate).then((results) => {
            res.status(200).send({ results });
        });
    });


    app.post('/api/unit', (req, res) => {
        console.log('Adding new unit...', req.body);
        UnitLib.save(req.body, req.user).then(result => {
            res.status(201).send(result);
        });
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
        UnitLib.deleteUnit(req.params.id).then(() => {
            res.status(200).send({});
        });
    });

    /*** MQTT ***/
    app.post('/api/register', (req, res) => {
        console.log('Registering MQTT');
        UnitLib.fetchAll(req.user).then((results) => {
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

    client.on('connect', function () {
        console.log('Connected to MQTT');
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
    app.post('/api/login', (req, res, next) => { 
        return passport.authenticate('local', (err, user) => {
            if (err) { 
                if (err instanceof Errors.NotFound || err instanceof Errors.ValidationError) {
                    return res.status(400).send({message: err.message}); 
                }  else {
                    return res.status(500).send({ message: 'Something went wrong.' });
                }
            } else if (!user) { 
                return res.status(400).send({ message: 'User not found.' });
            } else {
                req.logIn(user, (err) => {
                    if (err) { return next(err); } // what to do here?
                    return res.status(200).send(user);
                })
            }
        })(req, res, next);
    });

    app.post('/api/user', (req, res) => {
        AuthLib.createUser(req.body).then(result => {
            res.status(201).send(result);
        }).catch(err => {
            if (err instanceof Errors.ValidationError) {
                res.status(400).send({message: err.message });
            } else {
                res.status(500).send();
            }
        })
    });

    app.post('/api/change_password', (req, res) => {
        const { username, password, newPassword } = req.body;
        AuthLib.changePassword(username, password, newPassword).then(result => {
            req.logout();
            res.status(200).send(result);
        }).catch(err => {
            if (err instanceof Errors.ValidationError) {
                res.status(400).send({message: err.message });
            } else {
                res.status(500).send();
            }
        })
    });

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