import { AnyAction } from 'redux'
import { SET_SELECTED_DATA } from '../../actions'

const initData: number = 0

export default function selected(state = initData, action: AnyAction) {
    switch (action.type) {
        case SET_SELECTED_DATA:
            return action.data
        default:
            return state
    }
}