const mongoose = require('mongoose');
const { Schema } = mongoose;

const moistureSchema = new Schema({
    unitId: String,
    value: Number,
    date: Date,
});

const waterSchema = new Schema({
    unitId: String,
    ms: Number,
    date: Date,
});

const unitSchema = new Schema({
    id: String,
    name: String,
    dateAdded: Date,
    notes: String,
    pollingPeriodMinutes: Number,
    deviceData: {
        lastActive: Date,
        lastMoistureDate: Date,
        lastWaterDate: Date,
        moistureReading: Number,
    },
});

mongoose.model('moisture', moistureSchema);
mongoose.model('water', waterSchema);
mongoose.model('unit', unitSchema);