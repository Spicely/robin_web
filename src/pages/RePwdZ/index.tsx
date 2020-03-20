import React, { Component } from 'react'
import { RouteComponentProps } from 'react-router-dom'
import { MobileLayout, NavBar, Form, Toast, CountDown, Image } from 'components'
import { verify } from 'muka'
import { IFormFun, IFormItem } from 'src/components/lib/Form'
import { getUnit, NavBarThemeData, Color, IconThemeData } from 'src/components/lib/utils'
import { http } from '../../utils'
import { connect, DispatchProp } from 'react-redux'
import styled from 'styled-components'


const ViewBox = styled.div`
    height: ${getUnit(179)};
    background: url(${require('../../assets/lbg.png')});
    background-size: 100% 100%;
`

const LogoTitle = styled.div`
    font-size: ${getUnit(21)};
    font-family: YouSheBiaoTiHei;
    font-weight: 400;
    line-height: ${getUnit(25)};
    color: rgba(21,118,212,1);
    margin-top: ${getUnit(3)};
`

const Pwd = styled.div`
    height: ${getUnit(17)};
    font-size: ${getUnit(12)};
    font-family: PingFang SC;
    font-weight: 400;
    line-height: ${getUnit(17)};
    color: rgba(69,134,254,1);
`

interface IState { }

class RePwdZ extends Component<RouteComponentProps & DispatchProp, IState> {

    private registerFn?: IFormFun

    private getRegisterItems = (fn: IFormFun) => {
        this.registerFn = fn
        const items: IFormItem[] = [{
            component: 'ItemInput',
            props: {
                title: '手机号',
                placeholder: '请输入手机号',
                type: 'tel',
                maxLength: 11
            },
            field: 'mobile'
        }, {
            component: 'ItemInput',
            props: {
                title: '验证码',
                placeholder: '请输入验证码',
                type: 'tel',
            },
            extend: <CountDown
                seconds={60}
                style={{
                    border: `${getUnit(1)} solid rgba(79,155,255,1)`,
                    borderRadius: getUnit(2),
                    color: '#4F9BFF',
                    height: getUnit(32),
                    lineHeight: getUnit(32),
                    padding: `0 ${getUnit(8)}`,
                    width: 'auto',
                }}
                initText="获取验证码"
                render={(val: number) => val + 's后重新获取'}
                onClick={this.getCode}
            />,
            field: 'code'
        }, {
            component: 'ItemInput',
            props: {
                title: '设置密码',
                placeholder: '请输入密码',
                type: 'password',
            },
            field: 'pwd'
        }, {
            component: 'Button',
            props: {
                children: '提交',
                mold: 'primary',
                async: true,
                style: {
                    margin: `${getUnit(10)} ${getUnit(10)} 0 ${getUnit(10)}`,
                    borderRadius: getUnit(30),
                    height: getUnit(40)
                },
                onClick: this.handleRegister
            }
        }]
        return items
    }

    public render(): JSX.Element {
        return (
            <MobileLayout
                backgroundColor="#fff"
                appBar={
                    <NavBar
                        theme={new NavBarThemeData({
                            navBarColor: Color.fromRGB(255, 255, 255),
                            iconTheme: new IconThemeData({
                                color: Color.fromRGB(0, 0, 0)
                            })

                        })}
                        divider={false}
                        titleCenter
                        onBack={this.handleBack}
                        fixed
                    />
                }
            >
                <Form getItems={this.getRegisterItems} style={{ padding: `0 ${getUnit(10)}`,marginTop:getUnit(30) }} />
            </MobileLayout>
        )
    }

    private handleBack = () => {
        const { history } = this.props
        history.goBack()
    }

    private getCode = async () => {
        if (this.registerFn) {
            const close = Toast.loading()
            try {
                const form = this.registerFn.getFieldValue()
                if (!verify.isMobile(form.mobile || '')) {
                    Toast.info({
                        content: '请输入正确的电话号码',
                    })
                    return false
                }
                const data = await http('/user/sms/send', { mobile: form.mobile, status: 2 })
                Toast.info({
                    content: data.msg,
                })
                close()
                return true
            } catch (e) {
                Toast.info({
                    content: e.msg || '请稍后再试',
                })
                close()
                return false
            }
        } else {
            return false
        }
    }

    private handleRegister = async () => {
        try {
            if (this.registerFn) {
                const form = this.registerFn.getFieldValue()
                if (!verify.isMobile(form.mobile)) {
                    Toast.info({
                        content: '请输入正确的手机号',
                    })
                    return
                }
                if (!form.code) {
                    Toast.info({
                        content: '请输入验证码',
                    })
                    return
                }
                const data = await http('/user/rePwd', form)
                const { history } = this.props
                Toast.info({
                    content: data.msg,
                })
                history.goBack()
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
)(RePwdZ as any)