import { AnyAction } from 'redux'
import { SET_USERADDRESSLIST_DATA } from '../../actions'
import { IGlobal} from '../../state'

const initData: IGlobal.UserAddressList[] = []

export default function userAddressList(state = initData, action: AnyAction) {
    switch (action.type) {
        case SET_USERADDRESSLIST_DATA:
            return action.data
        default:
            return state
    }
}