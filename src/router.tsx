import React, { Component } from 'react'
import { routes, IRoutes, loadable } from './routes'
import { HashRouter, Route, Redirect } from 'react-router-dom'
import Login from './pages/Login'
import { connect } from 'react-redux'
import AnimatedRouter from 'react-animated-router'
import 'react-animated-router/animate.css'

class RouterItem extends Component<any, any> {

    public render(): JSX.Element {
        const { token } = this.props
        return (
            <HashRouter>
                <AnimatedRouter>
                    <Route path="/login" exact component={Login} />
                    {
                        routes.map((item: IRoutes, index: number) => {
                            // if (item.path === '/') {
                            //     if (token) {
                            //         return <Route path={item.path} exact component={loadable(item.component)} key={index} />
                            //     } else {
                            //         return <Redirect from="/" exact to="/login" key={index} />
                            //     }
                            // }
                            return <Route path={item.path} exact component={item.component} key={index} />

                        })
                    }
                </AnimatedRouter>
            </HashRouter>
        )
    }
}

export default connect(
    ({ token }: any) => ({
        token
    })
)(RouterItem as any)