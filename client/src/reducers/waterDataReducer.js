import { 
    FETCH_HISTORY
} from '../actions/index';

export default function(state = [], action) {
    let result = state;

    switch (action.type) {
        case FETCH_HISTORY:
        if (action.payload) {
            result = action.payload.waterRes.data.history;
        }
            break;
        default:
            break;
    }
    return result;
}