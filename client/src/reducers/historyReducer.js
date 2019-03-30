import { 
    FETCH_HISTORY
} from '../actions/index';

export default function(state = null, action) {
    let result = state;

    switch (action.type) {
        case FETCH_HISTORY:
            if (action.payload) {
                result = {
                    moistureData: action.payload.moistureRes.data.history,
                    waterData: action.payload.waterRes.data.history,
                    startDate: action.payload.startDate,
                    endDate: action.payload.endDate,
                };  
            }
            break;
        default:
            break;
    }
    return result;
}