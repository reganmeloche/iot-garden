import { 
    LOGIN,
    FETCH_USER,
    LOGOUT,
} from '../actions/register';

export default function(state = false, action) {
    let result = state;
    switch (action.type) {
        case FETCH_USER:
        case LOGIN:
            if (action.payload && action.payload.data && action.payload.data.userId) {
                result = true;
            }
            break;
        case LOGOUT:
            result = false;
            break;
        default:
            break;
    }
    return result;
}