const mongoose = require('mongoose');
const Moisture = mongoose.model('moisture');
const moment = require('moment');

module.exports = {
  // TODO: May want to move some of this logic to the front-end
  fetch: function(max = 20) {
    return Moisture.find({}).then((mongoResult) => {
      var results = mongoResult.map(reading => {
          return {
              value: reading.value,
              date: reading.date,
          };
      }).sort((x, y) => { 
        return new Date(y.date) - new Date(x.date);
      }).slice(0, max)
      .reverse();
      
      return results;
    });
  },

  save: function(moisture) {
    return new Moisture({value: moisture.value, date: moment()}).save()
      .then(() => { 
        return {
          done: true,
        };
      });
  }
}
