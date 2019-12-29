import React, { Component } from 'react'
import { MobileLayout, NavBar, Form } from 'components'
import { IFormFun, IFormItem } from 'src/components/lib/Form'

interface IState { }

export default class Login extends Component<any, IState> {

    private fn?: IFormFun

    private getItenm = (fn: IFormFun) => {
        this.fn = fn
        const items: IFormItem[] = [{
            component: 'ItemInput',
            props: {
                title: '用户名',
                placeholder: '请输入用户名',
                type: 'tel'
            }
        }, {
            component: 'ItemInput',
            props: {
                title: '用户名',
                placeholder: '请输入用户名',
                type: 'password'
            }
        }]
        return items
    }

    public render(): JSX.Element {
        return (
            <MobileLayout
                appBar={
                    <NavBar
                        title="登录"
                        titleCenter
                    />
                }
            >
                <Form getItems={this.getItenm} />
            </MobileLayout>
        )
    }

}