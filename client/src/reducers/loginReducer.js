import { 
    LOGIN,
    SIGNUP,
    FETCH_USER,
    LOGOUT,
    CHANGE_PASSWORD,
} from '../actions/register';

export default function(state = null, action) {
    let result = state;
    switch (action.type) {
        case FETCH_USER:
        case SIGNUP:
        case LOGIN:
            if (action.payload && action.payload.data && action.payload.data.userId) {
                result = action.payload.data;
            }
            break;
        case CHANGE_PASSWORD:
        case LOGOUT:
            result = null;
            break;
        default:
            break;
    }
    return result;
}