import React, { Component } from 'react'
import { NavBar, TabBar, Icon } from 'components'
import Home from '../Home'

export default class Index extends Component<any, any> {

    public render(): JSX.Element {
        return (
            <TabBar
                mode="menu"
            >
                <TabBar.Item
                    title="2121"
                    icon={<Icon icon="ios-home" />}
                >
                    <Home />
                </TabBar.Item>
                <TabBar.Item title="2121">
                    <NavBar
                        title="测试"
                        titleCenter
                    />
                </TabBar.Item>
                <TabBar.Item
                    title="2121"

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