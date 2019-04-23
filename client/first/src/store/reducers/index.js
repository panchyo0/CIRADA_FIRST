import {combineReducers} from 'redux';
import authReducer from './auth';
import firstReducer from './first';


const rootReducer=combineReducers({
    authReducer,
    firstReducer,
});

export default rootReducer;