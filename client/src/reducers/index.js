import { combineReducers } from 'redux';

import moistureReducer from './moistureReducer';
import waterReducer from './waterReducer';
import historyReducer from './historyReducer';

export default combineReducers({
    moisture: moistureReducer,
    water: waterReducer,
    history: historyReducer,
});
