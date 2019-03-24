import { 
    FETCH_UNITS
} from '../actions/index';

export default function(state = [], action) {
    let result = state;

    switch (action.type) {
        case FETCH_UNITS:
            if (action.payload) {
                result = action.payload;
            }
            break;
        default:
            break;
    }
    return result;
}