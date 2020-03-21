import { combineReducers } from 'redux'
import token from './token'
import homeData from './homeData'
import userInfo from './userInfo'
import userAddressList from './userAddressList'
import appData from './appData'
import selected from './selected'

export default combineReducers({
    token,
    homeData,
    userInfo,
    userAddressList,
    appData,
    selected,
})