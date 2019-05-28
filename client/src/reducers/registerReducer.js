import { 
    LOGIN,
    SIGNUP,
    REGISTER_ERROR,
    REGISTER_CLEAR,
    CHANGE_PASSWORD
} from '../actions/register';

export default function(state = {}, action) {
    let result = state;
    switch (action.type) {
        case REGISTER_ERROR:
            return {
                errorMessage: action.payload.response.data.message
            };
        case REGISTER_CLEAR:
        case SIGNUP:
        case CHANGE_PASSWORD:
            return { errorMessage: '' };
        case LOGIN:
            if (!action.payload.data.userId) {
                return {
                    errorMessage: 'Bad login'
                };
            }
            return { errorMessage: ''};
        default:
            break;
    }
    return result;
}