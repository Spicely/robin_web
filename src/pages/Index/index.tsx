import React, { Component } from 'react'
import { NavBar, TabBar, Icon } from 'components'
import Home from '../Home'
import OrganList from '../OrganList'

export default class Index extends Component<any, any> {

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
                <TabBar.Item title="机构观点">
                    <OrganList />
                </TabBar.Item>
                <TabBar.Item
                    title="投顾团队"
                    icon={<Icon icon="ios-person" />}
                >
                    <NavBar
                        left={null}
                        title="测试"
                        titleCenter
                    />
                </TabBar.Item>
            </TabBar>
        )
    }
}