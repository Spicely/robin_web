import { AnyAction } from 'redux'
import { SET_SHOP_DATA } from '../../actions'
import { IGlobal} from '../../state'

const initData: IGlobal.ShopData = {
    goods_data: []
}

export default function shopData(state = initData, action: AnyAction) {
    switch (action.type) {
        case SET_SHOP_DATA:
            return action.data
        default:
            return state
    }
}