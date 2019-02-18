import axios from 'axios';

export const LOGIN = 'login';
export const FETCH_USER = 'fetch_user';
export const LOGOUT = 'logout';
export const SET_LOADING = 'set_loading';
export const READ_MOISTURE = 'read_moisture';
export const WATER = 'water';
export const FETCH_HISTORY = 'fetch_history';

const DELAY_MS = 1000;
const MOISTURE_COUNT = 20;
const WATER_COUNT = 5;

/*** Registration ***/
export function login(password) {
    return dispatch => {
        const url = '/api/login';
        const data = { username: 'user', password: password.text };
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

/*** Main Actions ***/
export function readMoisture() {
    return dispatch => {
        const url = '/api/moisture';
        const data = {};
        dispatch(setLoading(true));
        axios.post(url, data).then(() => {
            dispatch({ type: READ_MOISTURE });
            setTimeout(() => {
                dispatch(fetchHistory());
                dispatch(setLoading(false));     
            }, DELAY_MS);
            
        });
    } 
}

export function water(milliseconds) {
    return dispatch => {
        const url = '/api/water';
        const data = { ms: milliseconds };
        dispatch(setLoading(true));
        axios.post(url, data).then(() => {
            dispatch({ type: WATER });
            setTimeout(() => {
                dispatch(fetchHistory());
                dispatch(setLoading(false));     
            }, milliseconds);
            
        });
    } 
}

export function fetchHistory() {
    return dispatch => {
        const urlM = `/api/moisture?count=${MOISTURE_COUNT}`;
        axios.get(urlM).then(moistureRes => {
            const urlW = `/api/water?count=${WATER_COUNT}`;
            axios.get(urlW).then(waterRes => {
                dispatch({
                    type: FETCH_HISTORY,
                    payload: { moistureRes, waterRes },
                })
            })
        })
    }
}

/*** Helpers ***/

function setLoading(isLoading) {
    return {
        type: SET_LOADING,
        payload: isLoading,
    };
}


