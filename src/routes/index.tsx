import React from 'react'
import Loadable from 'react-loadable'
import Index from '../pages/Index'
import RePwd from '../pages/RePwd'
import RePwdZ from '../pages/RePwdZ'
import Wallet from '../pages/Wallet'
import AddressList from '../pages/AddressList'
import AddressAdd from '../pages/AddressAdd'
import Detail from '../pages/Detail'
import Pay from '../pages/Pay'
import Team from '../pages/Team'
import Authen from '../pages/Authen'
import AuthenInfo from '../pages/Authen/info'
import AuthenBank from '../pages/Authen/bank'
import RequireRend from '../pages/RequireRend'
import Protoco from '../pages/Protoco'
import ProtoSuccess from '../pages/ProtoSuccess'
import PayRend from '../pages/PayRend'
import AboutMe from '../pages/AboutMe'
import PrivacryPolice from '../pages/PrivacryPolice'

function Loading(props: any) {
    if (props.error) {
        return <div />
    } else if (props.timedOut) {
        return <div />
    } else if (props.pastDelay) {
        return <div />
    } else {
        return <div />
    }
}

export interface IRoutes {
    path: string
    component: any
}

export const routes: IRoutes[] = [{
    component: Index,
    path: '/'
}, {
    component: RePwd,
    path: '/rePwd'
}, {
    component: Wallet,
    path: '/wallet'
}, {
    component: AddressList,
    path: '/addressList'
}, {
    component: AddressAdd,
    path: '/addressAdd/:id?'
}, {
    component: Detail,
    path: '/detail/:id'
},{
    component: Team,
    path: '/team'
}, {
    component: Authen,
    path: '/authen'
}, {
    component: AuthenInfo,
    path: '/authenInfo'
}, {
    component: AuthenBank,
    path: '/authenBank'
}, {
    component: RequireRend,
    path: '/requireRend'
}, {
    component: Protoco,
    path: '/protocol'
}, {
    component: PayRend,
    path: '/payRend'
}, {
    component: ProtoSuccess,
    path: '/protoSuccess'
}, {
    component: RePwdZ,
    path: '/rePwdZ'
}, {
    component: AboutMe,
    path: '/aboutMe'
}, {
    component: PrivacryPolice,
    path: '/privacryPolice'
}]

export const loadable = (component: Promise<React.ComponentClass<any> | React.StatelessComponent<any> | { default: React.ComponentType<any> }>) => {
    return Loadable({
        delay: 400,
        loader: () => component,
        loading: Loading,
        timeout: 10000
    })
}