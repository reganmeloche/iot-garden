import { combineReducers } from 'redux';

import loginReducer from './loginReducer';
import unitsReducer from './unitsReducer';
import historyReducer from './historyReducer';
import loadingReducer from './loadingReducer';

export default combineReducers({
    loggedIn: loginReducer,
    units: unitsReducer,
    history: historyReducer,
    isLoading: loadingReducer,
});
