import React, { Component } from 'react'
import { Link, RouteComponentProps } from 'react-router-dom'
import { MobileLayout, NavBar, Form, Toast, CountDown } from 'components'
import { verify } from 'muka'
import { IFormFun, IFormItem } from 'src/components/lib/Form'
import { getUnit } from 'src/components/lib/utils'
import { http } from '../../utils'

interface IState { }

export default class Login extends Component<RouteComponentProps, IState> {

    private fn?: IFormFun

    private getItenm = (fn: IFormFun) => {
        this.fn = fn
        const items: IFormItem[] = [{
            component: 'ItemInput',
            props: {
                title: '用户名',
                placeholder: '请输入用户名',
                type: 'tel',
                maxLength: 11
            },
            field: 'tel'
        }, {
            component: 'ItemInput',
            extend: <CountDown
                initText="获取验证码"
                seconds={60}
                render={(val) => <div style={{ color: '#888888' }}>{val}s后重新获取</div>}
                onClick={this.getCode}
            />,
            props: {
                title: '验证码',
                placeholder: '请输入验证码',
                type: 'tel',
                maxLength: 4
            },
            field: 'code'
        }, {
            component: 'Label',
            render: () => (
                <Link to="/register">
                    <div
                        style={{ color: '#0693e3', textAlign: 'right', paddingRight: getUnit(20) }}
                    >
                        新用户注册
                    </div>
                </Link>
            )
        }, {
            component: 'Button',
            props: {
                children: '登录',
                mold: 'primary',
                async: true,
                style: {
                    margin: `0 ${getUnit(30)} 0 ${getUnit(30)}`
                },
                onClick: this.handleLogin
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

    private getCode = async () => {
        if (this.fn) {
            const close = Toast.loading()
            try {
                const form = this.fn.getFieldValue()
                if (!verify.isMobile(form.tel)) {
                    Toast.info({
                        content: '请输入正确的电话号码',
                    })
                    return false
                }
                await http('sms_api/send', { tel: form.tel })
                close()
                return true
            } catch (e) {
                close()
                return false
            }
        } else {
            return false
        }
    }

    private handleLogin = async () => {
        try {
            if (this.fn) {
                const form = this.fn.getFieldValue()
                if (!verify.isMobile(form.tel)) {
                    Toast.info({
                        content: '请输入正确的电话号码',
                    })
                    return
                }
                if (!form.code) {
                    Toast.info({
                        content: '请输入验证码',
                    })
                    return
                }
                const data = await http('user/login', form)
                const { history } = this.props
                localStorage.setItem('token', data.msg)
                Toast.info({
                    content: '登录成功',
                })
                history.replace('/')
            }
        } catch (e) {
            console.log(e)
            Toast.info({
                content: '服务器繁忙,请稍后再试',
            })
        }
    }

}