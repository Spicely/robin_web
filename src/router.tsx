import React, { Component } from 'react'
import { routes, IRoutes, loadable } from './routes'
import { HashRouter, Route, Switch, Redirect } from 'react-router-dom'
import Login from './pages/Login'
import { connect } from 'react-redux'


class RouterItem extends Component<any, any> {

    public render(): JSX.Element {
        const { token } = this.props
        return (
            <HashRouter>
                <Switch>
                    <Route path="/login" exact component={Login} />
                    {
                        routes.map((item: IRoutes, index: number) => {
                            if (item.path === '/') {
                                if (token) {
                                    return <Route path={item.path} exact component={loadable(item.component)} key={index} />
                                } else {
                                    return <Redirect from="/" exact to="/login" key={index} />
                                }
                            }
                            return <Route path={item.path} exact component={loadable(item.component)} key={index} />

                        })
                    }
                </Switch>
            </HashRouter>
        )
    }
}

export default connect(
    ({ token }: any) => ({
        token
    })
)(RouterItem as any)