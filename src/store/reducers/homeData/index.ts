import { AnyAction } from 'redux'
import { SET_HOME_DATA } from '../../actions'
import { IGlobal} from '../../state'

const initData: IGlobal.IHomeData = {
    goods_data: []
}

export default function homeData(state = initData, action: AnyAction) {
    switch (action.type) {
        case SET_HOME_DATA:
            return action.data
        default:
            return state
    }
}