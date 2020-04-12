import { AnyAction } from 'redux'
import { SET_CONFIG_DATA } from '../../actions'
import { IGlobal } from '../../state'

const initData: IGlobal.Config = {
    website_id: 0,
    website_title: '',
    price: '',
    change_time: 1586713438,
}

export default function config(state = initData, action: AnyAction) {
    switch (action.type) {
        case SET_CONFIG_DATA:
            return action.data
        default:
            return state
    }
}