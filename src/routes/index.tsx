import React from 'react'
import Loadable from 'react-loadable'
import Index from '../pages/Index'
import RePwd from '../pages/RePwd'
import Wallet from '../pages/Wallet'
import AddressList from '../pages/AddressList'
import AddressAdd from '../pages/AddressAdd'
import Detail from '../pages/Detail'
import Pay from '../pages/Pay'
import Team from '../pages/Team'
import Authen from '../pages/Authen'
import AuthenInfo from '../pages/Authen/info'
import AuthenBank from '../pages/Authen/bank'

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
}, {
    component: Pay,
    path: '/pay'
}, {
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
}]

export const loadable = (component: Promise<React.ComponentClass<any> | React.StatelessComponent<any> | { default: React.ComponentType<any> }>) => {
    return Loadable({
        delay: 400,
        loader: () => component,
        loading: Loading,
        timeout: 10000
    })
}