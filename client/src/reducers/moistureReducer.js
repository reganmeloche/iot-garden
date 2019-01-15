import { 
    READ_MOISTURE
} from '../actions/index';

export default function(state = null, action) {
    let result = state;

    switch (action.type) {
        case READ_MOISTURE:
            result = action.payload;     
            break;
        default:
            break;
    }
    return result;
}