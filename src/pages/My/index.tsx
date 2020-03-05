import React, { Component } from 'react'
import { Image, MobileLayout, Toast, Icon, Divider, Gird } from 'components'
import { http, imgUrl } from '../../utils'
import { getUnit, IconThemeData, Color } from 'src/components/lib/utils'
import { withRouter, Link } from 'react-router-dom'
import styled from 'styled-components'

interface IState {
    data: any[]
    coo: any[]
    visible: boolean
    err: null | any
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

class My extends Component<any, IState> {

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
                    <div className="flex" style={{ marginTop: getUnit(40) }}>
                        <Image
                            src={require('../../assets/v2_q5sp1k.png')}
                            style={{ width: getUnit(52), height: getUnit(52) }}
                        />
                        <div className="flex_justify" style={{ color: 'rgb(16, 16, 16)', fontSize: getUnit(14), marginLeft: getUnit(5) }}>WEISSMAN</div>
                        <div className="flex_justify" style={{ marginLeft: getUnit(5) }}>
                            <div
                                className="flex"
                                style={{
                                    backgroundColor: 'rgb(0, 0, 0)',
                                    height: getUnit(11),
                                    width: getUnit(30),
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
                                <div className="flex_justify" style={{ color: '#fff', fontSize: getUnit(9), marginTop: getUnit(2) }}> V1 </div>
                            </div>

                        </div>
                        <div className="flex_justify" style={{ marginLeft: getUnit(5) }}>
                            <Icon
                                icon="ios-arrow-forward"
                                theme={new IconThemeData({ size: 14, color: Color.fromRGB(0, 0, 0) })}
                            />
                        </div>
                    </div>
                    <HeaderItemBox className="flex">
                        <Link to="/wallet" className="flex_1">
                            <div className="flex">
                                <div className="flex_justify">
                                    <div className="flex">
                                        <Image src={require('../../assets/v2_q6k4sd.png')} style={{ width: getUnit(20), height: getUnit(20) }} />
                                        <div style={{ fontSize: getUnit(14), marginLeft: getUnit(5) }}>钱包</div>
                                    </div>
                                </div>

                                <div className="flex_1">
                                    <div style={{ fontSize: getUnit(12), fontWeight: 700, textAlign: 'center', marginTop: getUnit(-5) }}>¥10000</div>
                                    <div style={{ fontSize: getUnit(12), textAlign: 'center', marginTop: getUnit(2) }}>余额</div>
                                </div>
                            </div>
                        </Link>
                        <Divider type="vertical" />
                        <div className="flex_1">
                            <div style={{ fontSize: getUnit(12), fontWeight: 700, textAlign: 'center', marginTop: getUnit(-5) }}>¥10000</div>
                            <div style={{ fontSize: getUnit(12), textAlign: 'center', marginTop: getUnit(2) }}>余额</div>
                        </div>
                        <Divider type="vertical" />
                        <div className="flex_1">
                            <div style={{ fontSize: getUnit(12), fontWeight: 700, textAlign: 'center', marginTop: getUnit(-5) }}>¥10000</div>
                            <div style={{ fontSize: getUnit(12), textAlign: 'center', marginTop: getUnit(2) }}>余额</div>
                        </div>
                        <div className="flex_justify">
                            <Icon icon="ios-arrow-forward" theme={forwardIconTheme} />
                        </div>
                    </HeaderItemBox>
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
                        link
                    />
                    <Gird.Item
                        title={
                            <div className="flex">
                                <Image src={require('../../assets/v2_q5sruf.png')} style={{ width: getUnit(20), height: getUnit(20) }} />
                                <div className="flex_justify" style={{ marginLeft: getUnit(10), fontSize: getUnit(14) }}>我的客服</div>
                            </div>
                        }
                        link
                    />
                    <Gird.Item
                        title={
                            <div className="flex">
                                <Image src={require('../../assets/v2_q6lws6.png')} style={{ width: getUnit(20), height: getUnit(20) }} />
                                <div className="flex_justify" style={{ marginLeft: getUnit(10), fontSize: getUnit(14) }}>系统版本V1.2</div>
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

    private handleView = (id: string) => {
        const { err } = this.state
        const { history } = this.props
        if (err !== null) {
            this.setState({
                visible: true
            })
        } else {
            history.push(`/news/${id}`)
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

export default withRouter(My)