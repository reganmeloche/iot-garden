import moment from 'moment';
import axios from 'axios';

export const LOGIN = 'login';
export const FETCH_USER = 'fetch_user';
export const LOGOUT = 'logout';

export const READ_MOISTURE = 'read_moisture';
export const WATER = 'water';
export const FETCH_HISTORY = 'fetch_history';

export function login(password) {
    const request = axios.post('/api/login', { username: 'bob', password: password.text })
    return {
        type: LOGIN,
        payload: request,
    };
}

export function fetchUser() {
    const request = axios.get('/api/fetch_user');
    return {
        type: FETCH_USER,
        payload: request,
    };
}

export function logout() {
    const request = axios.get('/api/logout');
    return {
        type: LOGOUT,
        payload: request,
    };
}

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
    axios.post('/api/water', {});

    return {
        type: WATER,
        payload: data,
    };
}

export function fetchHistory() {
    let moistureData = [];
    let waterData = [];

    let x = 5000000000;
    for (let i = 0; i < 20; i++) {
        let t = moment().valueOf() - x;
        let val = Math.floor(Math.random() * 100);
        moistureData.push({ readDate: t, value: val});
        x -= Math.floor(Math.random() * 100000000);
    }

    x = 5000000000;
    for (let i = 0; i < 10; i++) {
        let t = moment().valueOf() - x;
        waterData.push(moment(t));
        x -= Math.floor(Math.random() * 200000000);
    }

    return {
        type: FETCH_HISTORY,
        payload: {
            moistureData,
            waterData
        },
    };
}

