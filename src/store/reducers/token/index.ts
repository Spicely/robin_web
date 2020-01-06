import { AnyAction } from 'redux'
export const SET_TOKEN = 'SET_TOKEN'

const initData: string = localStorage.getItem('token') || ''

export default function token(state = initData, action: AnyAction) {
    switch (action.type) {
        case SET_TOKEN:
            return action.data
        default:
            return state
    }
}