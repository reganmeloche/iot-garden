import axios from 'axios';

export const LOGIN = 'login';
export const SIGNUP = 'signup';
export const REGISTER_ERROR = 'register_error';
export const CHANGE_PASSWORD = 'change_password';
export const FETCH_USER = 'fetch_user';
export const LOGOUT = 'logout';
export const REGISTER_CLEAR = 'register_clear';

export function login(username, password) {
    return dispatch => {
        const url = '/api/login';
        const data = { username, password };
        axios.post(url, data).then(payload => {
            dispatch({
                type: LOGIN,
                payload,
            });
        }).catch((err) => {
            dispatch({
                type: REGISTER_ERROR,
                payload: err,
            });
        });
    }
}

export function signup(username, password) {
    return dispatch => {
        const url = '/api/user';
        const data = { username, password };
        axios.post(url, data).then(payload => {
            dispatch({
                type: SIGNUP,
                payload,
            });
        }).catch((err) => {
            dispatch({
                type: REGISTER_ERROR,
                payload: err,
            });
        });
    }
}

export function changePassword(username, password, newPassword) {
    return dispatch => {
        const url = '/api/change_password';
        const data = { username, password, newPassword };
        axios.post(url, data).then(payload => {
            dispatch({
                type: CHANGE_PASSWORD,
                payload,
            });
        }).catch((err) => {
            dispatch({
                type: REGISTER_ERROR,
                payload: err,
            });
        });
    }
}

export function clearRegister() {
    return {
        type: REGISTER_CLEAR,
        payload: null,
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

export function registerUnits() {
    const url = '/api/register';
    axios.post(url, {});
}