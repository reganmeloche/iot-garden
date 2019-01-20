const mongoose = require('mongoose');
const Moisture = mongoose.model('moisture');
const moment = require('moment');

module.exports = {
  fetch: function() {
    return Moisture.find({}).then((mongoResult) => {
      var x = mongoResult.map(x => {
          return {
              value: x.text,
              date: x.date,
          };
      }).sort((x, y) => { 
        return new Date(y.date) - new Date(x.date);
      });
      return x;
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
