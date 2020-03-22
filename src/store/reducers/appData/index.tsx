import { AnyAction } from 'redux'
import { SET_APP_DATA } from '../../actions'
import { IGlobal } from '../../state'

const initData: IGlobal.AppData = {
    siteName: '',
    siteTitle: '',
    minPirce: 0,
    maxPrice: 0,
    initPrice: 0,
    months: [],
    initMonth: 0,
    serviceRate: 0,
    auditFee: 0,
    repaymentDay: 0,
    autoRefuse: false,
    refuseDay: 0,
    refuseWaitDay: 0,
    smsSign: '',
    user: '',
    createdAt: 0,
    updatedAt: 0,
    id: '',
    about: '',
    serviceLink: '',
    serviceCode: '',
    logo: '/public/uploads/logo.png'
}

export default function appData(state = initData, action: AnyAction) {
    switch (action.type) {
        case SET_APP_DATA:
            return action.data
        default:
            return state
    }
}