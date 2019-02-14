import moment from 'moment';
import axios from 'axios';

export const LOGIN = 'login';
export const FETCH_USER = 'fetch_user';
export const LOGOUT = 'logout';

export const READ_MOISTURE = 'read_moisture';
export const WATER = 'water';
export const FETCH_HISTORY = 'fetch_history';

export function login(password) {
    return dispatch => {
        const url = '/api/login';
        const data = { username: 'bob', password: password.text };
        axios.post(url, data).then(payload => {
            dispatch({
                type: LOGIN,
                payload,
            });
        })
    }
}

export function fetchUser() {
    return dispatch => {
        const url = '/api/fetch_user';
        axios.get(url).then(payload => {
            dispatch({
                type: FETCH_USER,
                payload,
            });
        });
    }
}

export function logout() {
    return dispatch => {
        const url = '/api/logout';
        axios.get(url).then(payload => {
            dispatch({
                type: LOGOUT,
                payload,
            })
        })
    }
}

// TODO: Changing this
export function readMoisture() {
    const data = {
        value: Math.floor(Math.random() * 100),
        readDate: moment().format('M/D/YY, h:mm:ss a'),
    };
    axios.post('/api/moisture', {});
    
    return {
        type: READ_MOISTURE,
        payload: data,
    };
}

export function water() {
    return dispatch => {
        const url = '/api/water';
        const data = {}; 
        axios.post(url, data).then(() => {
            dispatch({ type: WATER });
        });
    }
    
}

export function fetchHistory() {
    return dispatch => {
        const urlM = '/api/moisture?count=60';
        axios.get(urlM).then(moistureRes => {
            const urlW = '/api/water?count=5';
            axios.get(urlW).then(waterRes => {
                dispatch({
                    type: FETCH_HISTORY,
                    payload: { moistureRes, waterRes },
                })
            })
        })
    }
}


