import { AnyAction } from 'redux'
import { SET_USERINFO_DATA } from '../../actions'
import { IGlobal } from '../../state'

const initData: IGlobal.UserInfo = {
    user_id: 0,
    user_name: '',
    user_nickname: '',
    user_sex: 0,
    user_image: 0,
    user_phone: '',
    wx_headimg: '',
    wx_openid: '',
    bd_headimg: '',
    bd_openid: '',
    buyprice: '0.00',
    code: '',
    created_time: 0,
    login_key: '',
    last_login_time: 0,
    remcd: '',
    cny: '0.00',
    price: '',
    realcard: '',
    realname: '',
    kind: '0'
}

export default function userInfo(state = initData, action: AnyAction) {
    switch (action.type) {
        case SET_USERINFO_DATA:
            return action.data
        default:
            return state
    }
}