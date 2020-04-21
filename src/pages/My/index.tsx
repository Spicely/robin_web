import React, { Component } from 'react'
import { Image, MobileLayout, Toast, Icon, Divider, Gird } from 'components'
import { version, imgUrl } from '../../utils/axios'
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
    config: IGlobal.Config
    configWeb: IGlobal.ConfigWeb
}

const HeaderBox = styled.div`
    height: ${getUnit(166)};
    background: url(${require('../../assets/4.png')}) no-repeat;
    background-size: 100% auto;
    padding: ${getUnit(10)};
`

const HeaderItemBox = styled.div`
    height: ${getUnit(64)};
    border-radius: ${getUnit(5)};
    background-color: #fff;
    padding: ${getUnit(20)} ${getUnit(5)};
    margin-top: ${getUnit(10)};
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
        const { userInfo, config, configWeb } = this.props
        return (
            <MobileLayout
                backgroundColor="rgb(248, 248, 248)"
            >
                <HeaderBox>
                    <Link to="/info">
                        <div className="flex" style={{ marginTop: getUnit(40) }}>
                            <Image
                                src={imgUrl + userInfo.user_image}
                                style={{ width: getUnit(52), height: getUnit(52) }}
                            />
                            <div className="flex_justify" style={{ color: 'rgb(16, 16, 16)', fontSize: getUnit(14), marginLeft: getUnit(5) }}>{userInfo.user_name}</div>

                            <div className="flex_justify" style={{ marginLeft: getUnit(5) }}>
                                <div
                                    className="flex"
                                    style={{
                                        backgroundColor: 'rgb(0, 0, 0)',
                                        height: getUnit(11),
                                        borderRadius: getUnit(20)
                                    }}>
                                    <Image
                                        src={require('../../assets/v2_q5sr7o.png')}
                                        style={{
                                            width: getUnit(9), height: getUnit(9),
                                            marginLeft: getUnit(5),
                                            marginTop: getUnit(1),
                                            marginRight: getUnit(2)
                                        }}
                                    />
                                    <div className="flex_justify" style={{ color: '#fff', fontSize: getUnit(9), marginTop: getUnit(2) }}>{userInfo.level_name}</div>
                                </div>
                            </div>
                            <div className="flex_justify" style={{ marginLeft: getUnit(5) }}>
                                <Icon
                                    icon="ios-arrow-forward"
                                    theme={new IconThemeData({ size: 14, color: Color.fromRGB(0, 0, 0) })}
                                />
                            </div>
                        </div>
                    </Link>
                    <HeaderItemBox className="flex">
                        <Link to="/wallet">
                            <div className="flex">
                                <div className="flex_justify">
                                    <div className="flex">
                                        <Image src={require('../../assets/v2_q6k4sd.png')} style={{ width: getUnit(20), height: getUnit(20) }} />
                                        <div style={{ fontSize: getUnit(14), marginLeft: getUnit(5) }}>钱包</div>
                                    </div>
                                </div>
                                <div className="flex_1" style={{padding: `0 ${getUnit(5)}`}}>
                                    <div style={{ fontSize: getUnit(12), fontWeight: 700, textAlign: 'center', marginTop: getUnit(-5) }}>¥{userInfo.price}</div>
                                    <div style={{ fontSize: getUnit(12), textAlign: 'center', marginTop: getUnit(2) }}>现货账户</div>
                                </div>
                            </div>
                        </Link>
                        <Divider type="vertical" />
                        <div className="flex_1">
                            <div style={{ fontSize: getUnit(12), fontWeight: 700, textAlign: 'center', marginTop: getUnit(-5) }}>{userInfo.kind}手</div>
                            <div style={{ fontSize: getUnit(12), textAlign: 'center', marginTop: getUnit(2) }}>{config.website_title}</div>
                        </div>
                        <Divider type="vertical" />
                        <div className="flex_1">
                            <div style={{ fontSize: getUnit(12), fontWeight: 700, textAlign: 'center', marginTop: getUnit(-5) }}>¥{userInfo.buyprice}</div>
                            <div style={{ fontSize: getUnit(12), textAlign: 'center', marginTop: getUnit(2) }}>货款</div>
                        </div>
                        <Divider type="vertical" />
                        <div className="flex_1">
                            <div style={{ fontSize: getUnit(12), fontWeight: 700, textAlign: 'center', marginTop: getUnit(-5) }}>¥{userInfo.cny}</div>
                            <div style={{ fontSize: getUnit(12), textAlign: 'center', marginTop: getUnit(2) }}>通兑</div>
                        </div>
                        <div className="flex_justify">
                            <Icon icon="ios-arrow-forward" theme={forwardIconTheme} />
                        </div>
                    </HeaderItemBox>
                </HeaderBox>
                <Gird
                    style={{ margin: getUnit(10), marginTop: getUnit(20), borderRadius: getUnit(5), overflow: 'hidden' }}
                    onPress={this.handleToView}
                >
                    <Gird.Item
                        title={
                            <div className="flex">
                                <Image src={require('../../assets/v2_q5squ2.png')} style={{ width: getUnit(20), height: getUnit(20) }} />
                                <div className="flex_justify" style={{ marginLeft: getUnit(10), fontSize: getUnit(14) }}>我的订单</div>
                            </div>
                        }
                        link="/userOrder"
                    />
                    <Gird.Item
                        title={
                            <div className="flex">
                                <Image src={require('../../assets/v2_q5sqq0.png')} style={{ width: getUnit(20), height: getUnit(20) }} />
                                <div className="flex_justify" style={{ marginLeft: getUnit(10), fontSize: getUnit(14) }}>收货地址</div>
                            </div>
                        }
                        link="/addressList"
                    />
                    <Gird.Item
                        title={
                            <div className="flex">
                                <Image src={require('../../assets/v2_q5srdj.png')} style={{ width: getUnit(20), height: getUnit(20) }} />
                                <div className="flex_justify" style={{ marginLeft: getUnit(10), fontSize: getUnit(14) }}>我的客户</div>
                            </div>
                        }
                        link="/customer"
                    />
                    <Gird.Item
                        title={
                            <div className="flex">
                                <Image src={require('../../assets/v2_q5srgr.png')} style={{ width: getUnit(20), height: getUnit(20) }} />
                                <div className="flex_justify" style={{ marginLeft: getUnit(10), fontSize: getUnit(14) }}>邀请码</div>
                            </div>
                        }
                        link="code"
                    />

                    <Gird.Item
                        title={
                            <div className="flex">
                                <Image src={require('../../assets/v2_q5sruf.png')} style={{ width: getUnit(20), height: getUnit(20) }} />
                                <div className="flex_justify" style={{ marginLeft: getUnit(10), fontSize: getUnit(14) }}>我的客服</div>
                            </div>
                        }
                        lineType="solid"
                        value={<a href={`tel:${configWeb.tel}`}>{configWeb.tel}</a>}
                        link={null}
                    />
                    <Gird.Item
                        title={
                            <div className="flex">
                                <Image src={require('../../assets/v2_q6lws6.png')} style={{ width: getUnit(20), height: getUnit(20) }} />
                                <div className="flex_justify" style={{ marginLeft: getUnit(10), fontSize: getUnit(14) }}>系统版本V{version}</div>
                            </div>
                        }
                        link
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
    ({ userInfo, config, configWeb }: IInitState) => ({
        userInfo,
        config,
        configWeb
    })
)(withRouter(My))