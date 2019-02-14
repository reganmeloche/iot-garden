import { 
    FETCH_HISTORY
} from '../actions/index';



export default function(state = null, action) {
    let result = state;

    switch (action.type) {
        case FETCH_HISTORY:
            if (action.payload) {
                const wd = action.payload.waterRes.data.history;
                result = wd[wd.length - 1];
            }
            break;
        default:
            break;
    }
    return result;
}