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
import EditBank from '../pages/Bank/update'
import Code from '../pages/Code'
import Order from '../pages/Order'
import Exchange from '../pages/Exchange'
import Info from '../pages/Info'
import PayPass from '../pages/PayPass'
import LinePay from '../pages/LinePay'
import UserName from '../pages/UserName'


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
},{
    component: UserName,
    path: '/userName'
}, {
    component: Wallet,
    path: '/wallet'
}, {
    component: AddressList,
    path: '/addressList/:select?'
}, {
    component: AddressAdd,
    path: '/addressAdd/:id?'
}, {
    component: Detail,
    path: '/detail/:id/:type'
}, {
    component: Pay,
    path: '/pay'
}, {
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
    path: '/order/:id/:type'
}, {
    component: Exchange,
    path: '/exchange'
}, {
    component: Info,
    path: '/info'
}, {
    component: EditBank,
    path: '/editBank/:id'
}, {
    component: PayPass,
    path: '/payPass'
}, {
    component: LinePay,
    path: '/linePay/:orderId'
}]

export const loadable = (component: Promise<React.ComponentClass<any> | React.StatelessComponent<any> | { default: React.ComponentType<any> }>) => {
    return Loadable({
        delay: 400,
        loader: () => component,
        loading: Loading,
        timeout: 10000
    })
}