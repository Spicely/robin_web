import React, { Component } from 'react'
import { TabBar, Icon, Toast } from 'components'
import Home from '../Home'
import Mall from '../Mall'
import Shop from '../Shop'
import My from '../My'
import http from 'src/utils/axios'
import { SET_USERINFO_DATA, SET_SELECTED_DATA, SET_CONFIG_DATA, SET_CONFIGWEB_DATA } from 'src/store/actions'
import { DispatchProp, connect } from 'react-redux'
import { IInitState, IGlobal } from 'src/store/state'
import { RouteComponentProps } from 'react-router-dom'
import { Modal } from 'antd-mobile'

const prompt = Modal.prompt;

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