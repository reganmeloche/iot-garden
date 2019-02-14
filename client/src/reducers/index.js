import { combineReducers } from 'redux';

import loginReducer from './loginReducer';
import lastMoistureReducer from './lastMoistureReducer';
import lastWaterReducer from './lastWaterReducer';
import moistureDataReducer from './moistureDataReducer';
import waterDataReducer from './waterDataReducer';


export default combineReducers({
    loggedIn: loginReducer,
    lastMoisture: lastMoistureReducer,
    lastWater: lastWaterReducer,
    moistureData: moistureDataReducer,
    waterData: waterDataReducer,
});
