import React, { Component, MouseEvent } from 'react'
import { Link, RouteComponentProps } from 'react-router-dom'
import { MobileLayout, NavBar, Form, Toast, CountDown, Image, TabBar, Dialog, Button } from 'components'
import { verify } from 'muka'
import { IFormFun, IFormItem } from 'src/components/lib/Form'
import { getUnit, DialogThemeData } from 'src/components/lib/utils'
import { http, baseUrl } from '../../utils'
import { connect, DispatchProp } from 'react-redux'
import styled, { createGlobalStyle } from 'styled-components'
import { SET_USERINFO_DATA } from 'src/store/actions'
import { IInitState, IGlobal } from 'src/store/state'


const dialogTheme = new DialogThemeData({
    height: '100%',
    width: '100%'
})

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

interface IProps {
    appData: IGlobal.AppData
}

interface IState {
    visible: boolean
}

const VStyle = createGlobalStyle`
    .eqw input { 
        padding-right : 5px !important;
    }
`

class Login extends Component<IProps & RouteComponentProps & DispatchProp, IState> {

    public state: IState = {
        visible: false
    }

    private fn?: IFormFun

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
                className: 'eqw'
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
            component: 'CheckBox',
            className: 'flex_center',
            props: {
                options: [{
                    label: <div>我已阅读<span style={{ color: '#4F9BFF' }} onClick={this.handleYS}>《隐私政策》</span>隐私信息将严格保密</div>,
                    value: true
                }],
                iconColor: '#fff',
                value: [true],
            },
            field: 'xy'
        }, {
            component: 'Button',
            props: {
                children: '立即注册',
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
            field: 'mobile'
        }, {
            component: 'ItemInput',
            props: {
                title: '密  码',
                placeholder: '请输入密码',
                type: 'password',
            },
            field: 'pwd'
        }, {
            component: 'Label',
            render: () => (
                <div className="flex" style={{ margin: `0 ${getUnit(10)} 0 ${getUnit(15)}` }}>
                    <div className="flex_1" />
                    <Link to="/rePwd"><Pwd>忘记密码</Pwd></Link>
                </div>
            )
        }, {
            component: 'Button',
            props: {
                children: '立即登录',
                mold: 'primary',
                async: true,
                style: {
                    margin: `${getUnit(30)} ${getUnit(10)} 0 ${getUnit(10)}`,
                    borderRadius: getUnit(30),
                    height: getUnit(40),
                    background: 'linear-gradient(45deg,rgba(40,71,254,1) 0%,rgba(83,164,255,1) 100%)',
                },
                onClick: this.handleLogin
            }
        }]
        return items
    }

    public render(): JSX.Element {
        const { appData } = this.props
        const { visible } = this.state
        return (
            <MobileLayout
                backgroundColor="#fff"
                appBar={
                    <NavBar
                        style={{ background: 'rgba(0,0,0,0)' }}
                        divider={false}
                        titleCenter
                        onBack={this.handleBack}
                        fixed
                    />
                }
            >
                <VStyle />
                <ViewBox className="flex_center">
                    <div>
                        <Image src={baseUrl + appData.logo} style={{ width: getUnit(83), height: getUnit(83) }} />
                        <LogoTitle className="flex_center">{appData.smsSign}</LogoTitle>
                    </div>
                </ViewBox>
                <TabBar
                    itemClassName="flex_1"
                >
                    <TabBar.Item title="登录">
                        <Form getItems={this.getItems} style={{ padding: `0 ${getUnit(10)}` }} />
                    </TabBar.Item>
                    <TabBar.Item title="注册">
                        <Form getItems={this.getRegisterItems} style={{ padding: `0 ${getUnit(10)}` }} />
                    </TabBar.Item>
                </TabBar>
                <Dialog
                    visible={visible}
                    footer={
                        <Button mold="primary" onClick={() => this.setState({ visible: false })} style={{ height: getUnit(35) }}>确认</Button>
                    }
                    onClose={() => this.setState({ visible: false })}
                    theme={dialogTheme}
                >
                    <div dangerouslySetInnerHTML={{ __html: appData.agreement }} />
                </Dialog>
            </MobileLayout>
        )
    }

    private handleBack = () => {
        const { history } = this.props
        history.goBack()
    }

    private getCode = async () => {
        if (this.registerFn) {
            const form = this.registerFn.getFieldValue()
            if (!verify.isMobile(form.mobile || '')) {
                Toast.info({
                    content: '请输入正确的电话号码',
                })
                return false
            }
            const close = Toast.loading()
            try {
                const data = await http('/user/sms/send', { mobile: form.mobile, status: 1 })
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

    private handleLogin = async () => {
        try {
            if (this.fn) {
                const form = this.fn.getFieldValue()
                if (!verify.isMobile(form.mobile)) {
                    Toast.info({
                        content: '请输入正确的手机号',
                    })
                    return
                }
                if (!form.pwd) {
                    Toast.info({
                        content: '请输入密码',
                    })
                    return
                }
                const data = await http('/user/login', form)
                const { history, dispatch } = this.props
                Toast.info({
                    content: data.msg,
                })
                dispatch({ type: SET_USERINFO_DATA, data: data.data })
                history.replace('/')
            }
        } catch (data) {
            Toast.info({
                content: data.msg || '服务器繁忙,请稍后再试',
            })
        }
    }

    private handleYS = (e: MouseEvent<HTMLSpanElement>) => {
        this.setState({ visible: true })
        e.stopPropagation()
    }

    private handleRegister = async () => {
        try {
            if (this.registerFn) {
                const form = this.registerFn.getFieldValue()
                if (!form.xy[0]) {
                    Toast.info({
                        content: '请勾选协议',
                    })
                    return
                }
                const { history, dispatch } = this.props
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
                const data = await http('/user/register', form)
                dispatch({ type: SET_USERINFO_DATA, data: data.data })
                history.replace('/')
                Toast.info({
                    content: data.msg,
                })
            }
        } catch (data) {
            Toast.info({
                content: data.msg || '服务器繁忙,请稍后再试',
            })
        }
    }
}

export default connect(
    ({ appData }: IInitState) => ({
        appData
    })
)(Login as any)