import React, { Component } from 'react'
import { Image, MobileLayout, Toast, Icon, Button, Gird } from 'components'
import { http } from '../../utils'
import { getUnit, IconThemeData, Color } from 'src/components/lib/utils'
import { withRouter, RouteComponentProps } from 'react-router-dom'
import styled from 'styled-components'
import { connect } from 'react-redux'
import { IInitState, IGlobal } from 'src/store/state'

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

const forwardIconTheme = new IconThemeData({
    size: 14,
    color: Color.fromRGB(200, 200, 200)
})

class My extends Component<IProps, IState> {

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
                                <Image src={require('../../assets/user_icon.png')} style={{ width: getUnit(20), height: getUnit(20) }} />
                                <div className="flex_justify" style={{ marginLeft: getUnit(10), fontSize: getUnit(14) }}>关于我们</div>
                            </div>
                        }
                        link="/userOrder"
                        onPress={this.handleToView}
                    />
                    <Gird.Item
                        title={
                            <div className="flex">
                                <Image src={require('../../assets/v2_q6kef5.png')} style={{ width: getUnit(20), height: getUnit(20) }} />
                                <div className="flex_justify" style={{ marginLeft: getUnit(10), fontSize: getUnit(14) }}>还款账单</div>
                            </div>
                        }
                        link="/payRend"
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
                                <Image src={require('../../assets/phone_icon.png')} style={{ width: getUnit(20), height: getUnit(20) }} />
                                <div className="flex_justify" style={{ marginLeft: getUnit(10), fontSize: getUnit(14) }}>服务电话</div>
                            </div>
                        }
                        link="/customer"
                        onPress={this.handleToView}
                    />
                    <Gird.Item
                        title={
                            <div className="flex">
                                <Image src={require('../../assets/u.png')} style={{ width: getUnit(20), height: getUnit(20) }} />
                                <div className="flex_justify" style={{ marginLeft: getUnit(10), fontSize: getUnit(14) }}>修改密码</div>
                            </div>
                        }
                        link
                        onPress={this.handleToView}
                    />
                    <div className="flex_center" style={{ marginTop: getUnit(20) }}>
                        <ExButton>退出登录</ExButton>
                    </div>
                </Gird>

            </MobileLayout>
        )
    }

    public componentDidMount() {
        // this.getData()
    }

    private handleToView = (url?: string) => {
        if (url) {
            const { history } = this.props
            history.push(url)
        }
    }

    private handleQ1Close = () => {
        this.setState({
            visible: false
        })
    }

    private getData = async () => {
        try {
            // const des = await http('news/is_user')
            // const data = await http('news/index')
            // const coo = await http('news/cooperation')
            // this.setState({
            //     data: data.msg,
            //     coo: coo.msg,
            //     err: isObject(des.msg) ? des.msg : null
            // })
        } catch (data) {
            Toast.info({
                content: data.msg || '服务器繁忙,请稍后再试',
            })
        }
    }
}

export default connect(
    ({ userInfo }: IInitState) => ({
        userInfo
    })
)(withRouter(My))