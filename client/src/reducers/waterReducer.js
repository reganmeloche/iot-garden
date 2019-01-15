import { 
    WATER
} from '../actions/index';

export default function(state = null, action) {
    let result = state;

    switch (action.type) {
        case WATER:
            result = action.payload;     
            break;
        default:
            break;
    }
    return result;
}