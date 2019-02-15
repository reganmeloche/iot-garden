import { 
    FETCH_HISTORY,
} from '../actions/index';

export default function(state = null, action) {
    let result = state;

    switch (action.type) {
        case FETCH_HISTORY:
            if (action.payload) {
                const md = action.payload.moistureRes.data.history;
                result = md[md.length - 1];
            }
            break;
        default:
            break;
    }
    return result;
}