import { AnyAction } from 'redux'
import { SET_USERADDRESS_DATA } from '../../actions'
import { IGlobal } from '../../state'

const initData: IGlobal.DefaultAddr = {
    address_id: undefined,
    address_name: '',
    address_phone: '',
    address_province: '',
    address_city: '',
    address_area: '',
    address_info: '',
    address_default: 0,
    user_id: 0,
    created_time: 0,
}

export default function defaultAddr(state = initData, action: AnyAction) {
    switch (action.type) {
        case SET_USERADDRESS_DATA:
            return action.data
        default:
            return state
    }
}