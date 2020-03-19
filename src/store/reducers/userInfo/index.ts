import { AnyAction } from 'redux'
import { SET_USERINFO_DATA } from '../../actions'
import { IGlobal } from '../../state'

const initData: IGlobal.UserInfo = {
    status: false,
    userInfo: undefined,
    pirce: 0,
    adminUser: '',
    phone: '',
    createdAt: 0,
    updatedAt: 0,
    id: '',
}

export default function userInfo(state = initData, action: AnyAction) {
    switch (action.type) {
        case SET_USERINFO_DATA:
            return action.data
        default:
            return state
    }
}