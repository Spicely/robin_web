import React from 'react'
import Loadable from 'react-loadable'
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
    component: Promise<React.ComponentClass<any> | React.StatelessComponent<any> | { default: React.ComponentType<any> }>
}

export const routes: IRoutes[] = [{
    component: import('../pages/Index'),
    path: '/'
}, {
    component: import('../pages/Login'),
    path: '/login'
}, {
    component: import('../pages/Register'),
    path: '/register'
},]

export const loadable = (component: Promise<React.ComponentClass<any> | React.StatelessComponent<any> | { default: React.ComponentType<any> }>) => {
    return Loadable({
        delay: 400,
        loader: () => component,
        loading: Loading,
        timeout: 10000
    })
}