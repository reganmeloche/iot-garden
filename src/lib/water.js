const mongoose = require('mongoose');
const moment = require('moment');
const Water = mongoose.model('water');

module.exports = {
  // TODO: May want to move some of this logic to the front-end
  fetch: function(unitId, startDate, endDate) {
    return Water.find({ unitId }).then((mongoResult) => {
      return mongoResult.filter(x => {
        const xd = moment(x.date).valueOf();
        return xd > startDate && xd < endDate; 
      }).sort((x, y) => { 
        return new Date(y.date) - new Date(x.date);
      }).reverse();
    });
  },

  save: function(water) {
    return new Water(water).save();
  }
}
