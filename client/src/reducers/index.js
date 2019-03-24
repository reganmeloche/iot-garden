import { combineReducers } from 'redux';

import loginReducer from './loginReducer';
import unitsReducer from './unitsReducer';
import moistureDataReducer from './moistureDataReducer';
import waterDataReducer from './waterDataReducer';
import loadingReducer from './loadingReducer';

export default combineReducers({
    loggedIn: loginReducer,
    units: unitsReducer,
    moistureData: moistureDataReducer,
    waterData: waterDataReducer,
    isLoading: loadingReducer,
});
