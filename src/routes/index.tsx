import React from 'react'
import Loadable from 'react-loadable'
import Index from '../pages/Index'
import Register from '../pages/Register'
import Wallet from '../pages/Wallet'
import AddressList from '../pages/AddressList'
import AddressAdd from '../pages/AddressAdd'
import Customer from '../pages/Customer'
import Detail from '../pages/Detail'
import Pay from '../pages/Pay'
import UserOrder from '../pages/UserOrder'
import Bank from '../pages/Bank'
import AddBank from '../pages/Bank/add'
import UserBind from '../pages/Bank/bind'
import Code from '../pages/Code'
import Order from '../pages/Order'

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
    component: Register,
    path: '/register'
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
},{
    component: UserOrder,
    path: '/userOrder'
}, {
    component: Customer,
    path: '/customer'
}, {
    component: Bank,
    path: '/bank'
}, {
    component: Code,
    path: '/code'
}, {
    component: AddBank,
    path: '/addBank'
}, {
    component: UserBind,
    path: '/userBind'
}, {
    component: Order,
    path: '/order/:id'
}]

export const loadable = (component: Promise<React.ComponentClass<any> | React.StatelessComponent<any> | { default: React.ComponentType<any> }>) => {
    return Loadable({
        delay: 400,
        loader: () => component,
        loading: Loading,
        timeout: 10000
    })
}