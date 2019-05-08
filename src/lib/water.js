const mongoose = require('mongoose');
const moment = require('moment');
const Water = mongoose.model('water');

function fetch(unitId, startDate, endDate) {
    const sd = moment(new Date(startDate)).valueOf();
    const ed = moment(new Date(endDate)).valueOf();

    return Water.find({ unitId }).then((mongoResult) => {
        return mongoResult.filter(x => {
            const xd = moment(x.date).valueOf();
            return xd > sd && xd < ed; 
        }).sort((x, y) => { 
            return new Date(y.date) - new Date(x.date);
        }).reverse();
    });
}

function fetchAll(startDate, endDate) {
    const sd = moment(new Date(startDate)).valueOf();
    const ed = moment(new Date(endDate)).valueOf();

    return Water.find({}).then((mongoResults) => {
        const filteredResults = mongoResults.filter(x => {
            const xd = moment(x.date).valueOf();
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

function save(water) {
    return new Water(water).save();
}

module.exports = {
    fetch, fetchAll, save,
}
