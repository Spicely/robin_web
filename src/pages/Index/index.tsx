import React, { Component } from 'react'
import { TabBar, Icon } from 'components'
import Home from '../Home'
import Mall from '../Mall'
import Shop from '../Shop'
import My from '../My'
import http from 'src/utils/axios'
import { SET_USERINFO_DATA } from 'src/store/actions'
import { DispatchProp, connect } from 'react-redux'

class Index extends Component<DispatchProp, any> {

    public render(): JSX.Element {
        return (
            <TabBar
                mode="menu"
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
                    title="新闻"
                    icon={<Icon icon="msg" />}
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
            dispatch({ type: SET_USERINFO_DATA, data: data.data })
        } catch (e) {
            console.log(e)
            console.log('----------用户没有登录-------------')
        }
    }
}

export default connect()(Index)