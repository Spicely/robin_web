import React, { Component } from 'react'
import { RouteComponentProps } from 'react-router'
import { MobileLayout, NavBar, Form, Toast, CountDown } from 'components'
import { verify } from 'muka'
import { IFormFun, IFormItem } from 'src/components/lib/Form'
import { getUnit } from 'src/components/lib/utils'
import { http } from '../../utils'

interface IState { }

export default class Register extends Component<RouteComponentProps, IState> {

    private fn?: IFormFun

    private getItenm = (fn: IFormFun) => {
        this.fn = fn
        const items: IFormItem[] = [{
            component: 'ItemInput',
            props: {
                title: '电话号码',
                placeholder: '请输入电话号码',
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
            component: 'Button',
            props: {
                children: '注册',
                mold: 'primary',
                // async: true,
                style: {
                    margin: `${getUnit(10)} ${getUnit(30)} 0 ${getUnit(30)} `
                },
                onClick: this.handleRegister
            }
        }]
        return items
    }

    public render(): JSX.Element {
        return (
            <MobileLayout
                appBar={
                    <NavBar
                        onBack={this.handleBack}
                        title="注册"
                        titleCenter
                    />
                }
            >
                <Form getItems={this.getItenm} />
            </MobileLayout>
        )
    }

    private handleBack = () => {
        const { history } = this.props
        history.goBack()
    }

    private getCode = async () => {
        if (this.fn) {
            try {
                Toast.loading()
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

    private handleRegister = async () => {
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
                const data = await http('user/register', form)
                const { history } = this.props
                Toast.info({
                    content: data.msg,
                })
                history.goBack()
            }
        } catch (e) {
            console.log(e)
            Toast.info({
                content: '服务器繁忙,请稍后再试',
            })
        }
    }
}