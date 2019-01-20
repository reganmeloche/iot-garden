const mongoose = require('mongoose');
const { Schema } = mongoose;

const moistureSchema = new Schema({
    value: Number,
    date: Date,
});

const waterSchema = new Schema({
    date: Date,
});

mongoose.model('moisture', moistureSchema);
mongoose.model('water', waterSchema);