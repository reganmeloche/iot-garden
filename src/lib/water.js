const mongoose = require('mongoose');
const Water = mongoose.model('water');
const moment = require('moment');

module.exports = {
  fetch: function() {
    return Water.find({}).then((mongoResult) => {
      var x = mongoResult.map(x => {
          return {
              date: x.date,
          };
      }).sort((x, y) => { 
        return new Date(y.date) - new Date(x.date);
      });
      return x;
    });
  },

  save: function(water) {
    return new Water({ date: moment()}).save()
      .then(() => { 
        return {
          done: true,
        };
      });
  }
}
