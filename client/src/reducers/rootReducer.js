import { combineReducers } from 'redux';
import loginReducer from './loginReducer';

//root reducer
//import other reducers, combine as one for store creation
let rootReducer = combineReducers({
    loginReducer
});

export default rootReducer;