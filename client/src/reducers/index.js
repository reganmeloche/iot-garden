import { combineReducers } from 'redux';

import loginReducer from './loginReducer';
import unitsReducer from './unitsReducer';
import loadingReducer from './loadingReducer';

export default combineReducers({
    loggedIn: loginReducer,
    units: unitsReducer,
    isLoading: loadingReducer,
});
