import {combineReducers} from 'redux';
import LoginReducer from './login_reducer';
import SmsReducer from './sms_reducer';

const rootReducers = combineReducers({
    sms:SmsReducer,
    login:LoginReducer
})

export default rootReducers;