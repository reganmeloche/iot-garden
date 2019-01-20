import { combineReducers } from 'redux';

import loginReducer from './loginReducer';
import moistureReducer from './moistureReducer';
import waterReducer from './waterReducer';
import historyReducer from './historyReducer';

export default combineReducers({
    loggedIn: loginReducer,
    moisture: moistureReducer,
    water: waterReducer,
    history: historyReducer,
});
