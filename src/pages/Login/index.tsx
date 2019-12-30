import React, { Component } from 'react'
import { MobileLayout, NavBar, Form, Toast, CountDown } from 'components'
import { verify } from 'muka'
import { IFormFun, IFormItem } from 'src/components/lib/Form'
import { getUnit } from 'src/components/lib/utils'
import { http } from '../../utils'
import { Link } from 'react-router-dom'

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
                title: '密码',
                placeholder: '请输入密码',
                type: 'password'
            }
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
                    margin: `${getUnit(10)} ${getUnit(30)} 0 ${getUnit(30)} `
                }
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
            try {
                const form = this.fn.getFieldValue()
                if (!verify.isMobile(form.tel)) {
                    Toast.info({
                        content: '请输入正确的电话号码',
                    })
                    return false
                }
                await http('sms_api/send', { tel: form.tel })
                return true
            } catch (e) {
                return false
            }
        } else {
            return false
        }
    }

}