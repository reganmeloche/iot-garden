const mongoose = require('mongoose');
const Unit = mongoose.model('unit');
const moment = require('moment');
const uuid = require('uuid/v4');

const MoistureLib = require('./moisture');
const WaterLib = require('./water');

function fetch(id) {
    return Unit.findOne({id}).then(convert);
}

function fetchAll() {
    return Unit.find({}).then((res) => res.map(convert));
}

function fetchFull(id, startDate, endDate) {
    return fetch(id).then((unit) => {
        return WaterLib.fetch(id, startDate, endDate).then((waterData) => {
            return MoistureLib.fetch(id, startDate, endDate).then((moistureData) => {
                return {
                    ...unit,
                    history: {
                        moistureData,
                        waterData,
                        startDate,
                        endDate,
                    }
                };
            });
        });
    });
}

function fetchAllFull(startDate, endDate) {
    return fetchAll().then((units) => {
        return WaterLib.fetchAll(startDate, endDate).then(waterData => {
            return MoistureLib.fetchAll(startDate, endDate).then(moistureData => {
                return units.map(unit => {
                    return {
                        ...unit,
                        history: {
                            waterData: waterData[unit.id],
                            moistureData: moistureData[unit.id],
                            startDate,
                            endDate
                        },
                    };
                })
            });
        });
    });
}

function save(unit) {
    unit.id = uuid();
    unit.dateAdded = moment();
    return new Unit(unit).save().then(() => { 
        return { id: unit.id };
    });
}

function update(id, unit) {
    let pollChange = false;
    return Unit.findOne({ id }).then(res => {
        pollChange = res.pollingPeriodMinutes !== unit.pollingPeriodMinutes;
        return Unit.updateOne({ id }, { $set: unit }).then(() => {
            return { pollChange };
        });
    });
}

function deleteUnit(id) {
    return Unit.deleteOne({id});
}

function water(data) {
    return Unit.findOne({id: data.unitId}).then(res => {
        res.deviceData.lastWaterDate = data.date;
        return Unit.updateOne({ 'id': data.unitId }, { $set: res });
    });
}

function moisture(data) {
    return Unit.findOne({id: data.unitId}).then(res => {
        res.deviceData.lastMoistureDate = data.date;
        res.deviceData.moistureReading = data.value;
        return Unit.updateOne({ 'id': data.unitId }, { $set: res });
    });
}

function convert(dbUnit) {
    return {
    id: dbUnit.id,
    name: dbUnit.name,
    notes: dbUnit.notes,
    deviceData: dbUnit.deviceData,
    pollingPeriodMinutes: dbUnit.pollingPeriodMinutes,
    dateAdded: dbUnit.dateAdded
    };
}

module.exports = {
  fetch, fetchAll, fetchFull, fetchAllFull,
  save, update, deleteUnit, water, moisture,
}