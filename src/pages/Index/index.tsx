import React, { Component } from 'react'
import { TabBar, Icon } from 'components'
import Home from '../Home'
import OrganList from '../OrganList'
import TeamList from '../TeamList'

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
                <TabBar.Item 
                title="机构观点"
                icon={<Icon icon="ios-apps" />}
                >
                    <OrganList />
                </TabBar.Item>
                <TabBar.Item
                    title="投顾团队"
                    icon={<Icon icon="ios-person" />}
                >
                    <TeamList />
                </TabBar.Item>
            </TabBar>
        )
    }
}