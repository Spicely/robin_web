import React, { Component } from 'react'
import { NavBar } from 'components'

export default class Home extends Component<any, any> {

    public render(): JSX.Element {
        return (
            <NavBar
                title="测试"
                titleCenter
            />
        )
    }
}