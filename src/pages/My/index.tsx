import React, { Component } from 'react'
import { Image, MobileLayout, Button, Gird } from 'components'
import { http } from '../../utils'
import { getUnit } from 'src/components/lib/utils'
import { withRouter, RouteComponentProps } from 'react-router-dom'
import styled from 'styled-components'
import { connect, DispatchProp } from 'react-redux'
import { IInitState, IGlobal } from 'src/store/state'
import { SET_USERINFO_DATA } from 'src/store/actions'

interface IState {
    data: any[]
    coo: any[]
    visible: boolean
    err: null | any
}

interface IProps extends RouteComponentProps {
    userInfo: IGlobal.UserInfo
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
                                <UserPhone>157****0813</UserPhone>
                                <Image src={require('../../assets/yrz.png')} style={{ width: getUnit(56), height: getUnit(19), marginTop: getUnit(5) }} />
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
                        onPress={this.handleToView}
                    />
                    <Gird.Item
                        title={
                            <div className="flex">
                                <Image src={require('../../assets/huankuanzhangdan.png')} style={{ width: getUnit(20), height: getUnit(20) }} />
                                <div className="flex_justify" style={{ marginLeft: getUnit(10), fontSize: getUnit(14) }}>还款账单</div>
                            </div>
                        }
                        link="/payRend"
                        onPress={this.handleToView}
                    />
                    <Gird.Item
                        title={
                            <div className="flex">
                                <Image src={require('../../assets/wodehetong.png')} style={{ width: getUnit(20), height: getUnit(20) }} />
                                <div className="flex_justify" style={{ marginLeft: getUnit(10), fontSize: getUnit(14) }}>我的合同</div>
                            </div>
                        }
                        link
                        onPress={this.handleToView}
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
                        link="/addressList"
                        onPress={this.handleToView}
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

    private handleExit = async () => {
        try {
            const { dispatch } = this.props
            await http('/user/logout')
            dispatch({ type: SET_USERINFO_DATA, data: {} })
        } catch (e) {

        }
    }
}

export default connect(
    ({ userInfo }: IInitState) => ({
        userInfo
    })
)(withRouter(My))