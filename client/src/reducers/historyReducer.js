import { 
    FETCH_HISTORY
} from '../actions/index';

const defaultData = {
    moistureData: [],
    waterData: [],
};

export default function(state = defaultData, action) {
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