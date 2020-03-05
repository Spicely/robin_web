import React, { Component } from 'react'
import { Link, RouteComponentProps } from 'react-router-dom'
import { MobileLayout, NavBar, Form, Toast, CountDown, Button } from 'components'
import { verify } from 'muka'
import { IFormFun, IFormItem } from 'src/components/lib/Form'
import { getUnit } from 'src/components/lib/utils'
import { http } from '../../utils'
import { connect, DispatchProp } from 'react-redux'
import { SET_TOKEN } from 'src/store/reducers/token'
import styled from 'styled-components'

const TitleText = styled.div`
    height: ${getUnit(20)}; 
    font-size: ${getUnit(20)}; 
    padding: 0 ${getUnit(20)};
    color: rgb(16, 16, 16);
`

const BarTitle = styled.div`
    font-weight: 400;
    font-size: ${getUnit(16)};
    color: rgb(16, 16, 16);
`

interface IState { }

class Register extends Component<RouteComponentProps & DispatchProp, IState> {

    private fn?: IFormFun

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
            field: 'tel'
        }, {
            component: 'ItemInput',
            props: {
                title: '密  码',
                placeholder: '请输入密码',
                type: 'password',
            },
            extend: <CountDown
                seconds={60}
                initText="获取验证码"
                render={(val: number) => val + 's后重新获取'}
                onClick={this.getCode}
            />,
            field: 'pwd'
        }, {
            component: 'ItemInput',
            props: {
                title: '邀请码',
                placeholder: '请输入邀请码',
                type: 'tel',
                maxLength: 6
            },
            field: 'eq'
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
                    <div className="flex_1">
                        <span style={{ color: 'rgb(159, 159, 159)', fontSize: getUnit(10) }}>确定即同意</span>
                        <span style={{ color: 'rgb(30, 30, 30)', fontSize: getUnit(10) }}>《用户协议》和《隐私权政策》</span>
                    </div>
                    <div style={{ color: 'rgb(16, 16, 16)', fontSize: getUnit(12) }}>账号密码登录</div>
                </div>
            )
        }]
        return items
    }

    public render(): JSX.Element {
        return (
            <MobileLayout
                appBar={
                    <NavBar
                        title={
                            <BarTitle>注册</BarTitle>
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
                if (!form.pwd) {
                    Toast.info({
                        content: '请输入验证码',
                    })
                    return
                }
                const data = await http('user/login', form)
                const { history, dispatch } = this.props
                localStorage.setItem('token', data.msg)
                dispatch({ type: SET_TOKEN, data: data.msg })
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
)(Register as any)