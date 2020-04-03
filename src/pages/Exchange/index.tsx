import React, { Component } from 'react'
import { http } from 'src/utils'
import { Toast, MobileLayout, NavBar, Item, Image, Button, TabBar, Form } from 'components'
import { RouteComponentProps } from 'react-router-dom'
import { getUnit, ButtonThemeData, Color, BorderRadius, TabBarThemeData, InputThemeData, Border, ItemThemeData } from 'src/components/lib/utils'
import styled from 'styled-components'
import { connect } from 'react-redux'
import { IInitState, IGlobal } from 'src/store/state'
import { IFormFun, IFormItem } from 'src/components/lib/Form'


const btnTheme = new ButtonThemeData({
    buttonColor: Color.fromRGB(87, 183, 43),
    color: Color.fromRGB(255, 255, 255),
    width: '100%',
    borderRadius: BorderRadius.all(5)
})

const intTheme = new InputThemeData({
    hoverColor: Color.fromRGB(87, 183, 43),
    borderRadius: BorderRadius.all(5)
})

const tabTheme = new TabBarThemeData({
    activeBarColor: Color.fromRGB(87, 183, 43),
    itemSelectColor: Color.fromRGB(87, 183, 43),
    itemHoverColor: Color.fromRGB(87, 183, 43),
    height: '100%'
})

const itemTheme = new ItemThemeData({
    minHeight: 70
})

interface IProps {
    userInfo: IGlobal.UserInfo
}

interface IState {
}

class Wallet extends Component<IProps & RouteComponentProps<any>, IState> {

    public state: IState = {}

    private fn?: IFormFun

    private getItems = (fn: IFormFun) => {
        this.fn = fn
        const items: IFormItem[] = [{
            component: 'Input',
            props: {
                label: '卖出估价',
                placeholder: '500CNY',
                theme: intTheme,
            },
            field: '1',
        }, {
            component: 'Input',
            props: {
                label: '卖出数量',
                type: 'number',
                theme: intTheme,
            },
            field: '2',
        }, {
            component: 'Input',
            props: {
                label: '显示金额',
                type: 'number',
                theme: intTheme,
            },
            field: '3',
        }]
        return items
    }

    public render(): JSX.Element {
        const { userInfo } = this.props
        return (
            <MobileLayout
                backgroundColor="rgb(248, 248, 248)"
                appBar={
                    <NavBar
                        onBack={this.handleBack}
                        title="齐鲁交易所"
                        titleCenter
                    />
                }
            >

                <div style={{ padding: getUnit(10), height: `calc(100% - ${getUnit(60)})` }}>
                    <Item
                        title={
                            <div >
                                <div className="flex">
                                    <div className="flex_1" style={{ color: 'rgb(125, 125, 125)', fontSize: getUnit(10) }}>现货账户（CNY）</div>
                                    <div style={{ color: 'rgb(125, 125, 125)', fontSize: getUnit(10) }}>实时价</div>
                                </div>
                                <div className="flex">
                                    <div className="flex_1" style={{ color: 'rgb(16, 16, 16)', fontSize: getUnit(11) }}>15000≈30 手菊花茶</div>
                                    <div style={{ color: 'rgb(235, 36, 36)', fontSize: getUnit(11) }}>500 CNY (菊花茶)</div>
                                </div>
                            </div>
                        }
                    />
                    <TabBar theme={tabTheme}>
                        <TabBar.Item title="卖出">
                            <Form getItems={this.getItems} />
                            <Button mold="primary" theme={btnTheme}>立即卖出</Button>
                            <Item
                                title={<div style={{ fontSize: getUnit(12), color: 'rgb(16, 16, 16)' }}>市场挂单</div>}
                            />
                            <Item
                                theme={itemTheme}
                                title={
                                    <div>
                                        <div className="flex">
                                            <div className="flex_1 flex">
                                                <div style={{ color: 'rgb(16, 16, 16)', fontSize: getUnit(13) }}>刘**</div>
                                                <div className="flex_justify" style={{ color: 'rgb(194, 194, 194)', fontSize: getUnit(10) }}>1分钟前</div>
                                            </div>
                                            <div className="flex_justify" style={{ color: 'rgb(194, 194, 194)', fontSize: getUnit(10) }}>成交:1673  用时:1分</div>
                                        </div>
                                        <div className="flex">
                                            <div className="flex_1">
                                                <div style={{ color: 'rgb(16, 16, 16)', fontSize: getUnit(13), marginTop: getUnit(5) }}>15000CNY</div>
                                                <div className="flex_justify" style={{ color: 'rgb(194, 194, 194)', fontSize: getUnit(13) }}>估价：500CNY（菊花茶）</div>
                                            </div>
                                            <div>
                                                <Image src={require('../../assets/v2_q6nq38.png')} style={{ width: getUnit(18), height: getUnit(18) }} />
                                                <div style={{ fontSize: getUnit(10), color: 'rgb(194, 194, 194)' }}>卖出</div>
                                            </div>
                                        </div>
                                    </div>
                                }
                                link={null}
                            />
                            <Item
                                theme={itemTheme}
                                title={
                                    <div>
                                        <div className="flex">
                                            <div className="flex_1 flex">
                                                <div style={{ color: 'rgb(16, 16, 16)', fontSize: getUnit(13) }}>刘**</div>
                                                <div className="flex_justify" style={{ color: 'rgb(194, 194, 194)', fontSize: getUnit(10) }}>1分钟前</div>
                                            </div>
                                            <div className="flex_justify" style={{ color: 'rgb(194, 194, 194)', fontSize: getUnit(10) }}>成交:1673  用时:1分</div>
                                        </div>
                                        <div className="flex">
                                            <div className="flex_1">
                                                <div style={{ color: 'rgb(16, 16, 16)', fontSize: getUnit(13), marginTop: getUnit(5) }}>15000CNY</div>
                                                <div className="flex_justify" style={{ color: 'rgb(194, 194, 194)', fontSize: getUnit(13) }}>估价：500CNY（菊花茶）</div>
                                            </div>
                                            <div>
                                                <Image src={require('../../assets/v2_q6nq38.png')} style={{ width: getUnit(18), height: getUnit(18) }} />
                                                <div style={{ fontSize: getUnit(10), color: 'rgb(194, 194, 194)' }}>卖出</div>
                                            </div>
                                        </div>
                                    </div>
                                }
                                link={null}
                            />
                            <Item
                                theme={itemTheme}
                                title={
                                    <div>
                                        <div className="flex">
                                            <div className="flex_1 flex">
                                                <div style={{ color: 'rgb(16, 16, 16)', fontSize: getUnit(13) }}>刘**</div>
                                                <div className="flex_justify" style={{ color: 'rgb(194, 194, 194)', fontSize: getUnit(10) }}>1分钟前</div>
                                            </div>
                                            <div className="flex_justify" style={{ color: 'rgb(194, 194, 194)', fontSize: getUnit(10) }}>成交:1673  用时:1分</div>
                                        </div>
                                        <div className="flex">
                                            <div className="flex_1">
                                                <div style={{ color: 'rgb(16, 16, 16)', fontSize: getUnit(13), marginTop: getUnit(5) }}>15000CNY</div>
                                                <div className="flex_justify" style={{ color: 'rgb(194, 194, 194)', fontSize: getUnit(13) }}>估价：500CNY（菊花茶）</div>
                                            </div>
                                            <div>
                                                <Image src={require('../../assets/v2_q6nq38.png')} style={{ width: getUnit(18), height: getUnit(18) }} />
                                                <div style={{ fontSize: getUnit(10), color: 'rgb(194, 194, 194)' }}>卖出</div>
                                            </div>
                                        </div>
                                    </div>
                                }
                                link={null}
                            />
                            <Item
                                theme={itemTheme}
                                title={
                                    <div>
                                        <div className="flex">
                                            <div className="flex_1 flex">
                                                <div style={{ color: 'rgb(16, 16, 16)', fontSize: getUnit(13) }}>刘**</div>
                                                <div className="flex_justify" style={{ color: 'rgb(194, 194, 194)', fontSize: getUnit(10) }}>1分钟前</div>
                                            </div>
                                            <div className="flex_justify" style={{ color: 'rgb(194, 194, 194)', fontSize: getUnit(10) }}>成交:1673  用时:1分</div>
                                        </div>
                                        <div className="flex">
                                            <div className="flex_1">
                                                <div style={{ color: 'rgb(16, 16, 16)', fontSize: getUnit(13), marginTop: getUnit(5) }}>15000CNY</div>
                                                <div className="flex_justify" style={{ color: 'rgb(194, 194, 194)', fontSize: getUnit(13) }}>估价：500CNY（菊花茶）</div>
                                            </div>
                                            <div>
                                                <Image src={require('../../assets/v2_q6nq38.png')} style={{ width: getUnit(18), height: getUnit(18) }} />
                                                <div style={{ fontSize: getUnit(10), color: 'rgb(194, 194, 194)' }}>卖出</div>
                                            </div>
                                        </div>
                                    </div>
                                }
                                link={null}
                            />
                        </TabBar.Item>
                        <TabBar.Item title="当前订单"></TabBar.Item>
                        <TabBar.Item title="历史订单"></TabBar.Item>
                    </TabBar>
                </div>
            </MobileLayout>
        )
    }

    public componentDidMount() {
        this.getData()
    }

    private getData = async () => {
        // try {
        //     const { match } = this.props
        //     const data = await http('news/get_mechanism_info', {
        //         id: match.params.id
        //     })
        //     this.setState({
        //         ...data.msg
        //     })
        // } catch (data) {
        //     Toast.info({
        //         content: data.msg || '服务器繁忙,请稍后再试',
        //     })
        // }
    }

    private handelToBank = () => {
        const { userInfo, history } = this.props
        if (!userInfo.realname && !userInfo.realcard) {
            history.push('/userBind')
        } else {
            history.push('/bank')
        }
    }

    private handleBack = () => {
        const { history } = this.props
        history.goBack()
    }
}

export default connect(
    ({ userInfo }: IInitState) => ({
        userInfo
    })
)(Wallet)