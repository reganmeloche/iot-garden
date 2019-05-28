import { combineReducers } from 'redux';

import loginReducer from './loginReducer';
import registerReducer from './registerReducer';
import unitsReducer from './unitsReducer';
import loadingReducer from './loadingReducer';

export default combineReducers({
    login: loginReducer,
    units: unitsReducer,
    isLoading: loadingReducer,
    register: registerReducer,
});
