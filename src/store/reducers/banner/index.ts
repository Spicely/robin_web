import { AnyAction } from 'redux'
import { SET_BANNER_DATA } from '../../actions'
import { IGlobal} from '../../state'

const initData: IGlobal.IBanner[] = []

export default function banner(state = initData, action: AnyAction) {
    switch (action.type) {
        case SET_BANNER_DATA:
            return action.data
        default:
            return state
    }
}