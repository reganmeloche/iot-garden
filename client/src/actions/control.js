import axios from 'axios';
import { fetchFullUnitInner } from './units';
import { setLoading } from './index';

const DELAY_MS = 1000;

export function readMoisture(id) {
    return dispatch => {
        const url = `/api/unit/${id}/moisture`;
        const data = {};
        dispatch(setLoading(true));
        axios.post(url, data).then((res) => {
            setTimeout(() => {
                dispatch(fetchFullUnitInner(id));
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
                dispatch(fetchFullUnitInner(id));
                dispatch(setLoading(false));     
            }, milliseconds);
            
        });
    } 
}
