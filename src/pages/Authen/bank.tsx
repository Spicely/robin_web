import React, { Component, ChangeEvent } from 'react'
import { http } from 'src/utils'
import { Toast, MobileLayout, NavBar, Button, Item, Input, Form, district, Icon } from 'components'
import { RouteComponentProps } from 'react-router-dom'
import { Steps, Picker } from 'antd-mobile'
import { ButtonThemeData, BorderRadius, getUnit, IconThemeData, Color } from 'src/components/lib/utils'
import { connect, DispatchProp } from 'react-redux'
import { IInitState, IGlobal } from 'src/store/state'
import { SET_USERADDRESSLIST_DATA, SET_USERINFO_DATA } from 'src/store/actions'
import styled from 'styled-components'
import { IFormFun, IFormItem } from 'src/components/lib/Form'

const Step = Steps.Step;

interface IState {
}

interface IProps extends RouteComponentProps<any> {
    userAddressList: IGlobal.UserAddressList[],
    userInfo: IGlobal.UserInfo
}

const LSteps = styled(Steps)`
    .am-steps-item-tail {
        top: 0%;
    }
    .am-steps-item-finish .am-steps-item-tail:after {
        background-color: #fff;
    }
`

const RIcon = styled.div`
    display: inline-block;
    color: #2F99FD; 
    width: ${getUnit(22)};
    height: ${getUnit(22)};
    border-radius: 50%;
    background: #fff;
    line-height: ${getUnit(22)};
`

const Etv = styled.div`
    width: ${getUnit(32)};
    height: ${getUnit(2)};
    background:linear-gradient(270deg,rgba(170,203,245,1) 0%,rgba(170,203,245,0) 100%);
    position: relative;
    margin-right: ${getUnit(20)};
    ::before {
        content: '';
        position: absolute;
        width: ${getUnit(4)};
        height: ${getUnit(4)};
        background: #2F99FD;
        border-radius: 50%;
        right: ${getUnit(-2)};
        top: ${getUnit(-1)};
    }
`

const Rtv = styled.div`
    width: ${getUnit(32)};
    height: ${getUnit(2)};
    background:linear-gradient(270deg,rgba(170,203,245,0) 0%, rgba(170,203,245,1) 100%);
    position: relative;
    margin-left: ${getUnit(20)};
    ::before {
        content: '';
        position: absolute;
        width: ${getUnit(4)};
        height: ${getUnit(4)};
        background: #2F99FD;
        border-radius: 50%;
        left: ${getUnit(-2)};
        top: ${getUnit(-1)};
    }
`

const TitleBox = styled.div`
    width: ${getUnit(70)};
`

const PLabel = styled.div`
    font-size: ${getUnit(14)};
    font-family: PingFang SC;
    font-weight: 400;
    line-height: ${getUnit(20)};
    color: rgba(34,34,34,1);
`

const LInput = styled(Input)`
    width: 100%;
    height: ${getUnit(44)};
    background: rgba(238,245,254,0.5);
    border-radius: ${getUnit(5)};
    >div {
        border: 0;
    }
    input {
        text-align: right;
    }
`

const LVbox = styled.div`
    width: 100%;
    height: ${getUnit(44)};
    background: rgba(238,245,254,0.5);
    border-radius: ${getUnit(5)};
`

const buttonThme = new ButtonThemeData({
    height: 45,
    width: 260,
    borderRadius: BorderRadius.all(5),
    fontSize: 16,
})

const iconTheme = new IconThemeData({
    size: 16,
    color: Color.fromRGB(69, 134, 254)
})

class AuthenBank extends Component<IProps & DispatchProp, IState> {

    private fn?: IFormFun

    private getItems = (fn: IFormFun) => {
        this.fn = fn
        const items: IFormItem[] = [{
            component: 'Label',
            props: {
                value: ''
            },
            render: (val) => (
                <div style={{ marginTop: getUnit(10) }}>
                    <Item
                        title={<TitleBox>开户银行：</TitleBox>}
                        flexType="value"
                        lineType="none"
                        icon={null}
                        value={
                            <LInput
                                value={val}
                                placeholder="请输入开户银行"
                                onClose={this.handleClose.bind(this, 'bankName')}
                                onChange={this.handleInput.bind(this, 'bankName')}
                            />
                        }
                    />
                </div>
            ),
            field: 'bankName'
        }, {
            component: 'Label',
            props: {
                value: ''
            },
            render: (val) => (
                <div style={{ marginTop: getUnit(10) }}>
                    <Item
                        title={<TitleBox>开户卡号：</TitleBox>}
                        flexType="value"
                        lineType="none"
                        icon={null}
                        value={
                            <LInput
                                value={val}
                                placeholder="请输入开户卡号"
                                onClose={this.handleClose.bind(this, 'bankCard')}
                                onChange={this.handleInput.bind(this, 'bankCard')}
                            />
                        }
                    />
                </div>
            ),
            field: 'bankCard'
        }, {
            component: 'Label',
            props: {
                value: ''
            },
            render: (val) => (
                <div style={{ marginTop: getUnit(10) }}>
                    <Item
                        title={<TitleBox>银行预留 手机号：</TitleBox>}
                        flexType="value"
                        lineType="none"
                        icon={null}
                        value={
                            <LInput
                                value={val}
                                placeholder="请输入银行预留手机号"
                                onClose={this.handleClose.bind(this, 'bankPhone')}
                                onChange={this.handleInput.bind(this, 'bankPhone')}
                            />
                        }
                    />
                </div>
            ),
            field: 'bankPhone'
        }, {
            component: 'Label',
            props: {
                value: ''
            },
            render: (val) => (
                <div style={{ marginTop: getUnit(10) }}>
                    <Item
                        title={<TitleBox>借款金额：</TitleBox>}
                        flexType="value"
                        lineType="none"
                        icon={null}
                        value={
                            <LInput
                                value={val}
                                type="number"
                                placeholder="请输入借款金额"
                                onClose={this.handleClose.bind(this, 'price')}
                                onChange={this.handleInput.bind(this, 'price')}
                            />
                        }
                    />
                </div>
            ),
            field: 'price'
        }]
        return items
    }

    public state: IState = {

    }

    public render(): JSX.Element {
        return (
            <MobileLayout
                backgroundColor="rgb(248, 248, 248)"
                appBar={
                    <NavBar
                        fixed
                        divider={false}
                        onBack={this.handleBack}
                        style={{ background: 'rgba(0, 0, 0, 0)' }}
                    />
                }
            >
                <div
                    style={{ padding: `${getUnit(50)} ${getUnit(20)} 0 ${getUnit(20)}`, background: `url(${require('../../assets/bg_q.png')}) no-repeat`, backgroundSize: '100% auto' }}
                >
                    <LSteps direction="horizontal" current={2}>
                        <Step
                            title={<div style={{ fontSize: getUnit(12), color: '#fff', fontWeight: 'initial' }}>上传身份证</div>} icon={<RIcon>1</RIcon>}
                        />
                        <Step
                            title={<div style={{ fontSize: getUnit(12), color: '#fff', fontWeight: 'initial' }}>基本信息</div>}
                            icon={<RIcon>2</RIcon>}
                        />
                        <Step
                            title={<div style={{ fontSize: getUnit(12), color: '#fff', fontWeight: 'initial' }}>银行卡认证</div>}
                            icon={<RIcon>3</RIcon>}
                        />
                    </LSteps>
                    <div style={{ marginTop: getUnit(30), background: '#fff', borderRadius: getUnit(5), padding: `${getUnit(20)} ${getUnit(10)}`, boxShadow: `0 ${getUnit(5)} ${getUnit(5)} #ccc` }}>
                        <div className="flex_center">
                            <span className="flex">
                                <div className="flex_justify">
                                    <Etv />
                                </div>
                                <PLabel>请仔细您的银行卡信息</PLabel>
                                <div className="flex_justify">
                                    <Rtv />
                                </div>
                            </span>
                        </div>
                        <Form getItems={this.getItems} style={{ paddingBottom: getUnit(10) }} />
                    </div>
                    <div className="flex_center" style={{ marginTop: getUnit(40), marginBottom: getUnit(80) }}>
                        <Button
                            mold="primary"
                            theme={buttonThme}
                            onClick={this.next}
                        >
                            下一步
                        </Button>
                    </div>
                </div>
            </MobileLayout >
        )
    }
    
    private next = async () => {   // 下一步
        if (this.fn) {
            const form = this.fn.getFieldValue()
            const status = Object.keys(form).every((i: string) => form[i])
            if (status) {
                const close = Toast.loading()
                try {
                    await http('user/authenBank', { ...form, userId: this.props.userInfo.id })
                    const { history, userInfo, dispatch } = this.props
                    if (userInfo.userInfo) {
                        userInfo.userInfo.status = 3
                    }
                    dispatch({ type: SET_USERINFO_DATA, data: { ...userInfo } })
                    close()
                    history.replace('/wallet')
                } catch (e) {
                    close()
                    Toast.info({
                        content: e.msg || '认证失败'
                    })
                }
            } else {
                Toast.info({
                    content: '请确保信息完整'
                })
            }
        }
    }

    private handleInput = (field: string, e: ChangeEvent<HTMLInputElement>) => {
        const val = e.target.value
        this.fn && this.fn.setFieldValue({
            [field]: val
        })
    }

    private handleClose = (field: string) => {
        this.fn && this.fn.setFieldValue({
            [field]: ''
        })
    }

    private handleBack = () => {
        const { history } = this.props
        history.goBack()
    }
}

export default connect(
    ({ userAddressList, userInfo }: IInitState) => ({
        userAddressList, userInfo
    })
)(AuthenBank as any)