import { 
    SET_LOADING,
} from '../actions/index';

export default function(state = false, action) {
    let result = state;
    switch (action.type) {
        case SET_LOADING:
            result = action.payload;
            break;
        default:
            break;
    }
    return result;
}