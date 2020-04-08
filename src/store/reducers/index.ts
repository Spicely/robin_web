import { combineReducers } from 'redux'
import token from './token'
import homeData from './homeData'
import userInfo from './userInfo'
import userAddressList from './userAddressList'
import defaultAddr from './defaultAddr'
import banner from './banner'
import selected from './selected'
import shopData from './shopData'

export default combineReducers({
    token,
    homeData,
    userInfo,
    userAddressList,
    defaultAddr,
    banner,
    selected,
    shopData
})