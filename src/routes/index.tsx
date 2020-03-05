import React from 'react'
import Loadable from 'react-loadable'
import Index from '../pages/Index'
import Register from '../pages/Register'
import Wallet from '../pages/Wallet'
import AddressList from '../pages/AddressList'

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
}]

export const loadable = (component: Promise<React.ComponentClass<any> | React.StatelessComponent<any> | { default: React.ComponentType<any> }>) => {
    return Loadable({
        delay: 400,
        loader: () => component,
        loading: Loading,
        timeout: 10000
    })
}