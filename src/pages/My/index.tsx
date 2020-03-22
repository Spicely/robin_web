import React, { Component } from 'react'
import { Modal } from 'antd-mobile'
import { Image, MobileLayout, Button, Gird, Toast } from 'components'
import { http } from '../../utils'
import { getUnit } from 'src/components/lib/utils'
import { withRouter, RouteComponentProps } from 'react-router-dom'
import styled from 'styled-components'
import { connect, DispatchProp } from 'react-redux'
import { IInitState, IGlobal } from 'src/store/state'
import { SET_USERINFO_DATA, SET_SELECTED_DATA } from 'src/store/actions'

const alert = Modal.alert

interface IState {
    data: any[]
    coo: any[]
    visible: boolean
    err: null | any
}

interface IProps extends RouteComponentProps {
    userInfo: IGlobal.UserInfo
    appData: IGlobal.AppData
}

const HeaderBox = styled.div`
    height: ${getUnit(120)};
    background: url(${require('../../assets/4.png')}) no-repeat;
    background-size: 100% 100%;
    padding: ${getUnit(10)};
`

const UserPhone = styled.div`
    font-size: ${getUnit(20)};
    font-family:PingFang SC;
    font-weight: bold;
    line-height: ${getUnit(28)};
    color: rgba(255,255,255,1);
`

const ExButton = styled(Button)`
    width: ${getUnit(157)};
    height: ${getUnit(35)};
    background: rgba(225,228,235,1);
    border-radius: ${getUnit(5)};
    border: 0;
    span {
        color: #fff;
    }
`

const PayBox = styled.div`
    height: ${getUnit(88)};
    background: rgba(249,250,255,1);
    padding: 0 ${getUnit(40)};
`

class My extends Component<IProps & DispatchProp, IState> {

    public state: IState = {
        data: [],
        coo: [],
        visible: false,
        err: null
    }

    public render(): JSX.Element {
        const { userInfo } = this.props
        return (
            <MobileLayout
                backgroundColor="rgb(248, 248, 248)"
            >
                <HeaderBox>
                    <div className="flex" style={{ marginTop: getUnit(20) }}>
                        <Image
                            src={require('../../assets/v2_q5sp1k.png')}
                            style={{ width: getUnit(70), height: getUnit(70) }}
                        />
                        <div className="flex_justify">
                            <div style={{ marginLeft: getUnit(20) }}>
                                <UserPhone>{this.formatBankNumber(userInfo.phone)}</UserPhone>
                                <Image
                                    src={userInfo.userInfo ? require('../../assets/yrz.png') : require('../../assets/wrz.png')}
                                    style={{ width: getUnit(56), height: getUnit(19), marginTop: getUnit(5) }}
                                />
                            </div>
                        </div>
                    </div>
                </HeaderBox>
                <Gird>
                    <Gird.Item
                        title={
                            <div className="flex">
                                <Image src={require('../../assets/renzhengjindu.png')} style={{ width: getUnit(20), height: getUnit(20) }} />
                                <div className="flex_justify" style={{ marginLeft: getUnit(10), fontSize: getUnit(14) }}>认证进度</div>
                            </div>
                        }
                        link
                        onPress={this.handleInfo}
                    />
                    <Gird.Item
                        title={
                            <div className="flex">
                                <Image src={require('../../assets/huankuanzhangdan.png')} style={{ width: getUnit(20), height: getUnit(20) }} />
                                <div className="flex_justify" style={{ marginLeft: getUnit(10), fontSize: getUnit(14) }}>还款账单</div>
                            </div>
                        }
                        link="/payRend"
                        onPress={this.handlePay}
                    />
                    <Gird.Item
                        title={
                            <div className="flex">
                                <Image src={require('../../assets/wodehetong.png')} style={{ width: getUnit(20), height: getUnit(20) }} />
                                <div className="flex_justify" style={{ marginLeft: getUnit(10), fontSize: getUnit(14) }}>我的合同</div>
                            </div>
                        }
                        link
                        onPress={this.handleHt}
                    />
                    <Gird.Item
                        title={
                            <div className="flex">
                                <Image src={require('../../assets/user_icon.png')} style={{ width: getUnit(20), height: getUnit(20) }} />
                                <div className="flex_justify" style={{ marginLeft: getUnit(10), fontSize: getUnit(14) }}>关于我们</div>
                            </div>
                        }
                        link='/aboutMe'
                        onPress={this.handleToView}
                    />
                    <Gird.Item
                        title={
                            <div className="flex">
                                <Image src={require('../../assets/kf_icon.png')} style={{ width: getUnit(20), height: getUnit(20) }} />
                                <div className="flex_justify" style={{ marginLeft: getUnit(10), fontSize: getUnit(14) }}>在线客服</div>
                            </div>
                        }
                        link
                        onPress={this.handleKF}
                    />
                    <Gird.Item
                        title={
                            <div className="flex">
                                <Image src={require('../../assets/u.png')} style={{ width: getUnit(20), height: getUnit(20) }} />
                                <div className="flex_justify" style={{ marginLeft: getUnit(10), fontSize: getUnit(14) }}>修改密码</div>
                            </div>
                        }
                        link="/rePwdZ"
                        onPress={this.handleToView}
                    />
                    <div className="flex_center" style={{ marginTop: getUnit(20) }}>
                        <ExButton onClick={this.handleExit}>退出登录</ExButton>
                    </div>
                </Gird>

            </MobileLayout>
        )
    }

    private handleToView = (url?: string) => {
        if (url) {
            const { history } = this.props
            history.push(url)
        }
    }

    private handleInfo = () => {
        const { userInfo, history } = this.props
        if (userInfo && userInfo.id) {
            let Info = userInfo.userInfo
            if (Info && Info.status) {
                if (Info.status === 3) {
                    history.push({
                        pathname: '/team'
                    })
                } else if (Info.status === 2) {
                    history.push('/authenBank')
                } else if (Info.status === 1) {
                    history.push('/authenInfo')
                } else {
                    history.push('/authen')
                }
            } else {
                history.push('/authen')
            }
        } else {
            history.push('/login')
        }
    }

    private formatBankNumber = (bankNumber: string = ''): string => {
        return bankNumber.substr(0, 3) + "****" + bankNumber.substr(-4);
    }

    private handleKF = () => {
        const { appData } = this.props
        window.location.href = appData.serviceLink
    }

    private handleHt = () => {
        const { userInfo, history } = this.props
        if (!userInfo.order) {
            Toast.info({
                content: '您还没有借款'
            })
            return
        }
        if (!userInfo.order.autograph) {
            history.push({
                pathname: '/protocol',
                state: { orderId: userInfo.order.id }
            })
            return
        }
        history.push('/ht')
    }

    private handlePay = () => {
        const { userInfo, history } = this.props
        if (!userInfo.order) {
            Toast.info({
                content: '您还没有借款'
            })
            return
        }
        if (!userInfo.order.autograph) {
            history.push({
                pathname: '/protocol',
                state: { orderId: userInfo.order.id }
            })
            return
        }
        history.push('/payRend')
    }

    private handleExit = () => {
        alert('确定要登出？', '', [
            { text: '取消', onPress: () => console.log('cancel') },
            {
                text: '确定', onPress: async () => {
                    try {
                        const { dispatch } = this.props
                        await http('/user/logout')
                        dispatch({ type: SET_USERINFO_DATA, data: {} })
                        dispatch({ type: SET_SELECTED_DATA, data: 0 })
                        Toast.info({
                            content: '登出成功'
                        })
                    } catch (e) {
                        Toast.info({
                            content: e.msg || '网络状态不好,请稍后再试'
                        })
                    }
                }
            },
        ])

    }
}

export default connect(
    ({ userInfo, appData }: IInitState) => ({
        userInfo,
        appData
    })
)(withRouter(My))