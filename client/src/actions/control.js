import axios from 'axios';
import { fetchUnits } from './units';
import { setLoading } from './index';

export const FETCH_HISTORY = 'fetch_history';

const DELAY_MS = 1000;

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
                dispatch(fetchUnits());
                dispatch(setLoading(false));     
            }, milliseconds);
            
        });
    } 
}

export function fetchHistory(unitId, startDate, endDate) {
    return dispatch => {

        const urlM = `/api/unit/${unitId}/moisture?start_date=${startDate}&end_date=${endDate}`;
        axios.get(urlM).then(moistureRes => {
            const urlW = `/api/unit/${unitId}/water?start_date=${startDate}&end_date=${endDate}`;
            axios.get(urlW).then(waterRes => {
                dispatch({
                    type: FETCH_HISTORY,
                    payload: { moistureRes, waterRes, startDate, endDate },
                })
            })
        })
    }
}