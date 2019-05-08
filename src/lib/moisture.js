const mongoose = require('mongoose');
const moment = require('moment');
const Moisture = mongoose.model('moisture');

function fetch(unitId, startDate, endDate) {
    const sd = moment(new Date(startDate)).valueOf();
    const ed = moment(new Date(endDate)).valueOf();

    return Moisture.find({ unitId }).then((mongoResult) => {
        return mongoResult.filter(x => {
            const xd = moment(x.date).valueOf();
            return xd > sd && xd < ed; 
        }).sort((x, y) => { 
            return moment(y.date) - moment(x.date);
        }).reverse();
    });
}

function fetchAll(startDate, endDate) {
    const sd = moment(new Date(startDate)).valueOf();
    const ed = moment(new Date(endDate)).valueOf();
    return Moisture.find({}).then((mongoResults) => {
        const filteredResults = mongoResults.filter(x => {
            let xd = moment(x.date).valueOf();
            return xd > sd && xd < ed; 
        }).sort((x, y) => { 
            return moment(y.date) - moment(x.date);
        }).reverse();

        const groupedResults = filteredResults.reduce((rv, x) => {
            (rv[x['unitId']] = rv[x['unitId']] || []).push(x);
            return rv;
        }, {});
        return groupedResults;  
    });
}

function save(moisture) {
    return new Moisture(moisture).save();
}

module.exports = {
    fetch, fetchAll, save
}
