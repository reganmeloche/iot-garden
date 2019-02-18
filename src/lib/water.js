const mongoose = require('mongoose');
const Water = mongoose.model('water');
const moment = require('moment');

module.exports = {
  fetch: function(max = 20) {
    return Water.find({}).then((mongoResult) => {
      var x = mongoResult.map(x => {
          return {
              date: x.date,
          };
      }).sort((x, y) => { 
        return new Date(y.date) - new Date(x.date);
      }).slice(0, max)
      .reverse();
      return x;
    });
  },

  save: function(water) {
    return new Water({ ms: water.ms, date: moment()}).save()
      .then(() => { 
        return {
          done: true,
        };
      });
  }
}
