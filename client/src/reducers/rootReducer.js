import { combineReducers } from 'redux';
import loginReducer from './loginReducer';

let rootReducer = combineReducers({
    loginReducer
});

export default rootReducer;