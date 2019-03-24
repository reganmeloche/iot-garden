const mongoose = require('mongoose');
const Unit = mongoose.model('unit');
const moment = require('moment');
const uuid = require('uuid/v4');

module.exports = {
  fetch: (id) => {
    return Unit.findOne({id});
  },

  fetchAll: () => {
    return Unit.find({}).then((mongoResult) => {
      return mongoResult.map(x => {
        // Any mapping to do here? probably
        return x;
      });
    });
  },

  save: (unit) => {
    unit.id = uuid();
    unit.dateAdded = moment();
    return new Unit(unit).save()
      .then(() => { 
        return { id: unit.id };
      });
  },

  update: (id, unit) => {
    let pollChange = false;
    return Unit.findOne({ id }).then(res => {
      pollChange = res.pollingPeriodMinutes !== unit.pollingPeriodMinutes;
      return Unit.updateOne({ id }, { $set: unit }).then(() => {
        return { pollChange };
      })
    });
  },

  delete: (id) => {
    return Unit.deleteOne({id});
  },

  water: (data) => {
    return Unit.findOne({id: data.unitId}).then(res => {
      res.deviceData.lastWaterDate = data.date;
      return Unit.updateOne({ 'id': data.unitId }, { $set: res });
    });
  },

  moisture: (data) => {
    return Unit.findOne({id: data.unitId}).then(res => {
      res.deviceData.lastMoistureDate = data.date;
      res.deviceData.moistureReading = data.value;
      return Unit.updateOne({ 'id': data.unitId }, { $set: res });
    });
  }
}
