import moment from 'moment';

export const READ_MOISTURE = 'read_moisture';
export const WATER = 'water';
export const FETCH_HISTORY = 'fetch_history';

export function readMoisture() {
    const data = {
        value: Math.floor(Math.random() * 100),
        readDate: moment().format('M/D/YY, h:mm:ss a'),
    };
    
    return {
        type: READ_MOISTURE,
        payload: data,
    };
}

export function water() {
    const data = {
        waterDate: moment().format('M/D/YY, h:mm:ss a'),
    };

    return {
        type: WATER,
        payload: data,
    };
}

export function fetchHistory() {
    let moistureData = [];
    let waterData = [];
    let x = 32;
    for (let i = 0; i < 30; i++) {
        moistureData.push({
            value: Math.floor(Math.random() * 100),
            readDate: moment().format('M/D/YY, h:mm:ss a').subtract(x--, 'days'),
        });
    }

    return {
        type: FETCH_HISTORY,
        payload: {
            moistureData,
            waterData
        },
    };
}