import axios from 'axios';

export const LOGIN = 'login';
export const FETCH_UNITS = 'fetch_units';
export const FETCH_USER = 'fetch_user';
export const LOGOUT = 'logout';
export const SET_LOADING = 'set_loading';
export const FETCH_HISTORY = 'fetch_history';

const DELAY_MS = 1000;
const MOISTURE_COUNT = 20;
const WATER_COUNT = 5;

// TODO: Break into separate files

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
export function createUnit(model) {
    return dispatch => {
        const url = `/api/unit/`;
        axios.post(url, model).then((res) => {
            dispatch(fetchUnits());
        });
    } 
}

export function updateUnit(id, model) {
    return dispatch => {
        const url = `/api/unit/${id}`;
        axios.put(url, model).then(() => {
            dispatch(fetchUnits());
        });
    }  
}

export function fetchUnits() {
    return dispatch => {
        const url = '/api/unit';
        dispatch(setLoading(true));
        axios.get(url).then((res) => {
            dispatch({
                type: FETCH_UNITS,
                payload: res.data.results,
            });
            dispatch(setLoading(false));
        });
    } 
}

export function readMoisture(id) {
    return dispatch => {
        const url = `/api/unit/${id}/moisture`;
        const data = {};
        dispatch(setLoading(true));
        axios.post(url, data).then((res) => {
            setTimeout(() => {
                dispatch(fetchUnits());
                dispatch(setLoading(false));     
            }, DELAY_MS);
            
        });
    } 
}

export function water(id, milliseconds) {
    return dispatch => {
        const url = `/api/unit/${id}/water`;
        const data = { ms: milliseconds };
        dispatch(setLoading(true));
        axios.post(url, data).then(() => {
            setTimeout(() => {
                dispatch(fetchHistory(id));
                dispatch(setLoading(false));     
            }, milliseconds);
            
        });
    } 
}

export function fetchHistory(unitId) {
    return dispatch => {
        const urlM = `/api/unit/${unitId}/moisture?count=${MOISTURE_COUNT}`;
        axios.get(urlM).then(moistureRes => {
            const urlW = `/api/unit/${unitId}/water?count=${WATER_COUNT}`;
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


