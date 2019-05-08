import { 
    FETCH_UNITS,
    FETCH_FULL_UNIT,
    FETCH_FULL_UNITS
} from '../actions/units';

export default function(state = [], action) {
    switch (action.type) {
        case FETCH_UNITS:
            if (action.payload) {
                return action.payload;
            }
            break;
        case FETCH_FULL_UNIT:
            let newRes = state.map(x => {
                if (x.id === action.payload.id) {
                    return action.payload;
                }
                return x;
            });
            return newRes;
        case FETCH_FULL_UNITS:
            return action.payload.results;
        default:
            break;
    }
    return state;
}