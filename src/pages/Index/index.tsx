import React, { Component } from 'react'
import { TabBar, Icon } from 'components'
import Home from '../Home'
import Shop from '../Shop'
import My from '../My'
import http from 'src/utils/axios'
import { SET_APP_DATA } from 'src/store/actions'
import { DispatchProp, connect } from 'react-redux'

class Index extends Component<DispatchProp, any> {

    public render(): JSX.Element {
        return (
            <TabBar
                mode="menu"
                selected={0}
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

    public componentDidMount() {
        this.getConfig()
    }

    private getConfig = async () => {
        try {
            const { dispatch } = this.props
            const data = await http('/user/getConfig')
            dispatch({ type: SET_APP_DATA, data: data.data })
        } catch (e) {
            console.log(e)
            console.log('----------用户信息错误-------------')
        }
    }
}
export default connect()(Index)