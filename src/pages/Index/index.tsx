import React, { Component } from 'react'
import { TabBar, Icon } from 'components'
import Home from '../Home'
import Mall from '../Mall'
import Shop from '../Shop'
import My from '../My'
import http from 'src/utils/axios'
import { SET_USERINFO_DATA, SET_SELECTED_DATA, SET_CONFIG_DATA } from 'src/store/actions'
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
                    title="商城"
                    icon={<Icon icon="shop" />}
                >
                    <Mall />
                </TabBar.Item>
                <TabBar.Item
                    title="购物车"
                    icon={<Icon icon="shopping" />}
                >
                    <Shop />
                </TabBar.Item>
                <TabBar.Item
                    title="我的"
                    icon={<Icon icon="ios-person" />}
                >
                    <My />
                </TabBar.Item>
            </TabBar>
        )
    }

    public componentDidMount() {
        this.getUserInfo()
    }

    private getUserInfo = async () => {
        try {
            const { dispatch } = this.props
            const data = await http('wxapp/login/userInfo')
            const config = await http('/wxapp/Wxpay/configWeb')
            dispatch({ type: SET_CONFIG_DATA, data: config.data })
            dispatch({ type: SET_USERINFO_DATA, data: data.data })
        } catch (e) {
            console.log(e)
            console.log('----------用户没有登录-------------')
        }
    }

    private handleChange = (field: any) => {
        const { dispatch, userInfo, history } = this.props
        if (!(field === 0 || field === 1) && !userInfo.user_id) {
            history.push('/login')
            return
        }
        dispatch({ type: SET_SELECTED_DATA, data: field })
    }
}

export default connect(
    ({ selected, userInfo }: IInitState) => ({
        selected,
        userInfo
    })
)(Index)