import axios from 'axios';
import { setLoading } from './index';

export const FETCH_UNITS = 'fetch_units';

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
