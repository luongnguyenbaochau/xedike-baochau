import {combineReducers} from 'redux';
import errorsReducer from '../reducers/errors'
import authReducer from "../reducers/auth"
const rootReducer=combineReducers({
    errorsReducer,
    authReducer
})
export default rootReducer
