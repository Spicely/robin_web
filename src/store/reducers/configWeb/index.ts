import { AnyAction } from 'redux'
import { SET_CONFIGWEB_DATA } from '../../actions'
import { IGlobal } from '../../state'

const initData: IGlobal.ConfigWeb = {
    website_id: 0,
    website_title: '',
    website_logo: 0,
    website_icon: 0,
    website_keywords: '',
    website_description: '',
    website_code: '',
    website_copyright: '',
    website_state: 1,
    change_time: 0,
    tel: '',
}

export default function configWeb(state = initData, action: AnyAction) {
    switch (action.type) {
        case SET_CONFIGWEB_DATA:
            return action.data
        default:
            return state
    }
}