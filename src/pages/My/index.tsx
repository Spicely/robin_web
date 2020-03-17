import React, { Component } from 'react'
import { Image, MobileLayout, Toast, Icon, Divider, Gird } from 'components'
import { http, imgUrl } from '../../utils'
import { getUnit, IconThemeData, Color } from 'src/components/lib/utils'
import { withRouter, Link, RouteComponentProps } from 'react-router-dom'
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
    height: ${getUnit(166)};
    background: url(${require('../../assets/4.png')}) no-repeat;
    background-size: 100% auto;
    padding: ${getUnit(10)};
`

const UserPhone = styled.div`
    font-size: ${getUnit(20)};
    font-family:PingFang SC;
    font-weight: bold;
    line-height: ${getUnit(28)};
    /* color: rgba(255,255,255,1); */
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
        const { userInfo } = this.props
        return (
            <MobileLayout
                backgroundColor="rgb(248, 248, 248)"
            >
                <HeaderBox>
                    <div className="flex" style={{ marginTop: getUnit(40) }}>
                        <Image
                            src={require('../../assets/v2_q5sp1k.png')}
                            style={{ width: getUnit(70), height: getUnit(70) }}
                        />
                        <div className="flex_justify">
                            <div style={{marginLeft: getUnit(20)}}>
                                <UserPhone>157****0813</UserPhone>
                                <Image src={require('../../assets/yrz.png')} style={{ width: getUnit(56), height: getUnit(19), marginTop: getUnit(5) }} />
                            </div>
                        </div>
                    </div>
                </HeaderBox>
                <Gird
                    style={{ margin: getUnit(10), marginTop: getUnit(20), borderRadius: getUnit(5), overflow: 'hidden' }}
                >
                    <Gird.Item
                        title={
                            <div className="flex">
                                <Image src={require('../../assets/v2_q5squ2.png')} style={{ width: getUnit(20), height: getUnit(20) }} />
                                <div className="flex_justify" style={{ marginLeft: getUnit(10), fontSize: getUnit(14) }}>我的订单</div>
                            </div>
                        }
                        link="/userOrder"
                        onPress={this.handleToView}
                    />
                    <Gird.Item
                        title={
                            <div className="flex">
                                <Image src={require('../../assets/v2_q5sqq0.png')} style={{ width: getUnit(20), height: getUnit(20) }} />
                                <div className="flex_justify" style={{ marginLeft: getUnit(10), fontSize: getUnit(14) }}>收货地址</div>
                            </div>
                        }
                        link="/addressList"
                        onPress={this.handleToView}
                    />
                    <Gird.Item
                        title={
                            <div className="flex">
                                <Image src={require('../../assets/v2_q5srdj.png')} style={{ width: getUnit(20), height: getUnit(20) }} />
                                <div className="flex_justify" style={{ marginLeft: getUnit(10), fontSize: getUnit(14) }}>我的客户</div>
                            </div>
                        }
                        link="/customer"
                        onPress={this.handleToView}
                    />
                    <Gird.Item
                        title={
                            <div className="flex">
                                <Image src={require('../../assets/v2_q5srgr.png')} style={{ width: getUnit(20), height: getUnit(20) }} />
                                <div className="flex_justify" style={{ marginLeft: getUnit(10), fontSize: getUnit(14) }}>邀请码</div>
                            </div>
                        }
                        link
                        onPress={this.handleToView}
                    />
                    <Gird.Item
                        title={
                            <div className="flex">
                                <Image src={require('../../assets/v2_q5sruf.png')} style={{ width: getUnit(20), height: getUnit(20) }} />
                                <div className="flex_justify" style={{ marginLeft: getUnit(10), fontSize: getUnit(14) }}>我的客服</div>
                            </div>
                        }
                        link
                        onPress={this.handleToView}
                    />
                    <Gird.Item
                        title={
                            <div className="flex">
                                <Image src={require('../../assets/v2_q6lws6.png')} style={{ width: getUnit(20), height: getUnit(20) }} />
                                <div className="flex_justify" style={{ marginLeft: getUnit(10), fontSize: getUnit(14) }}>系统版本V1.2</div>
                            </div>
                        }
                        link
                        onPress={this.handleToView}
                    />
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