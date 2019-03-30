const mongoose = require('mongoose');
const moment = require('moment');
const Moisture = mongoose.model('moisture');

module.exports = {
  fetch: function(unitId, startDate, endDate) {
    return Moisture.find({ unitId }).then((mongoResult) => {
      return mongoResult.filter(x => {
        const xd = moment(x.date).valueOf();
        return xd > startDate && xd < endDate; 
      }).sort((x, y) => { 
        return moment(y.date) - moment(x.date);
      }).reverse();
    });
  },

  save: function(moisture) {
    return new Moisture(moisture).save();
  }
}
