import React, { Component } from 'react'
import { random } from 'lodash'
import { Link, RouteComponentProps } from 'react-router-dom'
import { MobileLayout, NavBar, Form, Toast, CountDown } from 'components'
import { verify } from 'muka'
import { IFormFun, IFormItem } from 'src/components/lib/Form'
import { getUnit } from 'src/components/lib/utils'
import { http } from '../../utils'
import { connect, DispatchProp } from 'react-redux'
import { SET_TOKEN } from 'src/store/reducers/token'
import styled from 'styled-components'

const TitleText = styled.div`
    height: ${getUnit(80)}; 
    font-size: ${getUnit(20)}; 
    padding: 0 ${getUnit(20)};
    color: rgb(16, 16, 16);
`

interface IState {
    code: string
}

class Login extends Component<RouteComponentProps & DispatchProp, IState> {

    private fn?: IFormFun

    public state: IState = {
        code: ''
    }

    private getItems = (fn: IFormFun) => {
        this.fn = fn
        const items: IFormItem[] = [{
            component: 'ItemInput',
            props: {
                title: '手机号',
                placeholder: '请输入手机号',
                type: 'tel',
                maxLength: 11
            },
            field: 'phone'
        }, {
            component: 'ItemInput',
            props: {
                title: '密  码',
                placeholder: '请输入密码',
                type: 'code',
            },
            extend: <CountDown
                seconds={60}
                initText="获取验证码"
                render={(val: number) => val + 's后重新获取'}
                onClick={this.getCode}
            />,
            field: 'code'
        }, {
            component: 'Button',
            props: {
                children: '确定',
                mold: 'primary',
                async: true,
                style: {
                    margin: `${getUnit(30)} ${getUnit(10)} 0 ${getUnit(10)}`,
                    borderRadius: getUnit(30),
                    height: getUnit(40)
                },
                onClick: this.handleLogin
            }
        }, {
            component: 'Label',
            render: () => (
                <div className="flex" style={{ margin: `0 ${getUnit(10)} 0 ${getUnit(15)}` }}>
                    <span style={{ color: 'rgb(159, 159, 159)', fontSize: getUnit(10) }}>确定即同意</span>
                    <span style={{ color: 'rgb(30, 30, 30)', fontSize: getUnit(10) }}>《用户协议》和《隐私权政策》</span>
                </div>
            )
        }]
        return items
    }

    public render(): JSX.Element {
        return (
            <MobileLayout
                backgroundColor="#fff"
                appBar={
                    <NavBar
                        right={
                            <Link to="/register">注册</Link>
                        }
                        divider={false}
                        titleCenter
                        onBack={this.handleBack}
                    />
                }
            >
                <TitleText
                    className="flex_justify"
                >
                    登录后继续操作
                </TitleText>
                <Form getItems={this.getItems} style={{ padding: `0 ${getUnit(10)}` }} />
            </MobileLayout>
        )
    }

    private handleBack = () => {
        const { history } = this.props
        history.goBack()
    }

    private getCode = async () => {
        if (this.fn) {
            const close = Toast.loading()
            try {
                const form = this.fn.getFieldValue()
                if (!verify.isMobile(form.phone)) {
                    Toast.info({
                        content: '请输入正确的电话号码',
                    })
                    return false
                }
                const code = random(1000, 9999)
                await http('/wxapp/login/sendPhoneCode', {
                    phone: form.phone,
                    code,
                })
                this.setState({
                    code: code.toString()
                })
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
                const { code } = this.state
                if (!code) {
                    Toast.info({
                        content: '请先获取验证码',
                    })
                    return
                }
                if (!verify.isMobile(form.phone)) {
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
                if (form.code !== code) {
                    Toast.info({
                        content: '验证码不正确',
                    })
                    return
                }
                const data = await http('wxapp/login/userLogin', form)
                const { history, dispatch } = this.props
                localStorage.setItem('token', data.data)
                dispatch({ type: SET_TOKEN, data: data.data })
                Toast.info({
                    content: '登录成功',
                })
                history.replace('/')
            }
        } catch (data) {
            Toast.info({
                content: data.msg || '服务器繁忙,请稍后再试',
            })
        }
    }
}

export default connect(
    ({ token }: any) => ({
        token
    })
)(Login as any)