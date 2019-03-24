const mongoose = require('mongoose');
const Water = mongoose.model('water');

module.exports = {
  // TODO: May want to move some of this logic to the front-end
  fetch: function(unitId, max = 20) {
    return Water.find({ unitId }).then((mongoResult) => {
      return mongoResult.sort((x, y) => { 
        return new Date(y.date) - new Date(x.date);
      }).slice(0, max).reverse();
    });
  },

  save: function(water) {
    return new Water(water).save();
  }
}
