import { 
    FETCH_HISTORY
} from '../actions/index';

export default function(state = null, action) {
    let result = state;

    switch (action.type) {
        case FETCH_HISTORY:
            result = action.payload;     
            break;
        default:
            break;
    }
    return result;
}