import React, { Component } from 'react'
import { TabBar, Icon } from 'components'
import Home from '../Home'
import OrganList from '../OrganList'
import TeamList from '../TeamList'
import My from '../My'

export default class Index extends Component<any, any> {

    public render(): JSX.Element {
        return (
            <TabBar
                mode="menu"
                selected={4}
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
                    <Home />
                </TabBar.Item>
                <TabBar.Item
                    title="新闻"
                    icon={<Icon icon="msg" />}
                >
                    <OrganList />
                </TabBar.Item>
                <TabBar.Item
                    title="购物车"
                    icon={<Icon icon="shopping" />}
                >
                    <TeamList />
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
}