import axios from 'axios';
import { setLoading } from './index';

export const FETCH_UNITS = 'fetch_units';
export const FETCH_FULL_UNIT = 'fetch_full_unit';
export const FETCH_FULL_UNITS = 'fetch_full_units';

export function createUnit(model) {
    return dispatch => {
        const url = `/api/unit/`;
        axios.post(url, model).then((res) => {
            dispatch(fetchFullUnits());
        });
    } 
}

export function updateUnit(id, model) {
    return dispatch => {
        const url = `/api/unit/${id}`;
        dispatch(setLoading(true));
        axios.put(url, model).then(() => {
            dispatch(fetchFullUnitInner(id));
            dispatch(setLoading(false));
        });
    }  
}

export function fetchFullUnit(unitId, startDate, endDate) {
    return dispatch => {
        dispatch(setLoading(true));
        dispatch(fetchFullUnitInner(unitId, startDate, endDate));
        dispatch(setLoading(false));
    } 
}

export function fetchFullUnits(startDate, endDate) {
    const [start, end] = getDefaultDates(startDate, endDate);
    const url = `/api/unit_full?start_date=${start}&end_date=${end}`;
    return dispatch => {
        dispatch(setLoading(true));
        axios.get(url).then((res) => {
            dispatch({
                type: FETCH_FULL_UNITS,
                payload: res.data,
            });
            dispatch(setLoading(false));
        });
    } 
}

export function fetchFullUnitInner(unitId, startDate, endDate) {
    const [start, end] = getDefaultDates(startDate, endDate);
    const url = `/api/unit_full/${unitId}?start_date=${start}&end_date=${end}`;
    return dispatch => {
        axios.get(url).then((res) => {
            dispatch({
                type: FETCH_FULL_UNIT,
                payload: res.data,
            });
        });
    } 
}

export function getDefaultDates(startDate, endDate) {
    const t1 = new Date();
    const defaultStart = t1.setDate(t1.getDate() - 3);
    const t2 = new Date();
    const defaultEnd = t2.setHours(t2.getHours() + 1);

    const start = (startDate && new Date(startDate)) || new Date(defaultStart);
    const end = (endDate && new Date(endDate)) || new Date(defaultEnd);

    return [start, end];
}