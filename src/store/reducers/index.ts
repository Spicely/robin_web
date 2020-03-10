import { combineReducers } from 'redux'
import token from './token'
import homeData from './homeData'

export default combineReducers({
    token,
    homeData
})