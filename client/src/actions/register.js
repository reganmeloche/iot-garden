import axios from 'axios';

export const LOGIN = 'login';
export const FETCH_USER = 'fetch_user';
export const LOGOUT = 'logout';

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