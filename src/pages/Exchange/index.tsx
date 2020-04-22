import React, { Component } from 'react'
import { http } from 'src/utils'
import { Toast, MobileLayout, NavBar, Item, Image, Button, TabBar, Form, Empty } from 'components'
import { RouteComponentProps } from 'react-router-dom'
import { getUnit, ButtonThemeData, Color, BorderRadius, TabBarThemeData, InputThemeData, Border, ItemThemeData } from 'src/components/lib/utils'
import styled from 'styled-components'
import { connect } from 'react-redux'
import { IInitState, IGlobal } from 'src/store/state'
import { IFormFun, IFormItem } from 'src/components/lib/Form'
import moment from 'moment'


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
    minHeight: 100
})

interface IProps {
    userInfo: IGlobal.UserInfo
    config: IGlobal.Config
}

interface IState {
    data: any[]
}

class Wallet extends Component<IProps & RouteComponentProps<any>, IState> {

    public state: IState = {
        data: []
    }

    private fn?: IFormFun

    private getItems = (fn: IFormFun) => {
        this.fn = fn
        const items: IFormItem[] = [{
            component: 'Input',
            props: {
                label: '卖出估价',
                placeholder: '0',
                theme: intTheme,
                disabled: true,
            },
            field: 'cny',
        }, {
            component: 'Input',
            props: {
                label: '卖出数量',
                type: 'number',
                theme: intTheme,
                onChange: this.handleChange
            },
            field: 'num',
        },/* {
            component: 'Input',
            props: {
                label: '显示金额',
                type: 'number',
                theme: intTheme,
                disabled: true
            },
            field: 'price'
        }*/]
        return items
    }

    public render(): JSX.Element {
        const { config, userInfo } = this.props
        const { data } = this.state
        const _q = data.filter((i) => i.status == 1)
        const _v = data.filter((i) => i.status == 1)
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
                                    <div className="flex_1" style={{ color: 'rgb(16, 16, 16)', fontSize: getUnit(11) }}>{userInfo.price}</div>
                                    <div style={{ color: 'rgb(235, 36, 36)', fontSize: getUnit(11) }}>{config.mprice} CNY ({config.website_title})</div>
                                </div>
                            </div>
                        }
                    />
                    <TabBar theme={tabTheme}>
                        <TabBar.Item title="卖出" style={{ width: getUnit(80) }}>
                            <Form getItems={this.getItems} />
                            <Button mold="primary" theme={btnTheme} async onClick={this.handleSale}>立即卖出</Button>
                            <Item
                                title={<div style={{ fontSize: getUnit(12), color: 'rgb(16, 16, 16)' }}>市场挂单</div>}
                            />
                            {
                                _q.length ? _q.map((i, index: number) => {
                                    return (
                                        <Item
                                            theme={itemTheme}
                                            key={index}
                                            title={
                                                <div>
                                                    <div className="flex">
                                                        <div className="flex_1" style={{ color: 'rgba(87, 183, 43, 1)', fontSize: getUnit(9) }}>{i.type === 1 ? '卖' : '买'}</div>
                                                        <div style={{ color: 'rgb(194, 194, 194)', fontSize: getUnit(9) }}>{moment(i.created_time * 1000).format('YYYY-MM-DD HH:mm:ss')}</div>
                                                    </div>
                                                    <div style={{ color: 'rgb(194, 194, 194)', fontSize: getUnit(10) }}>单号：{i.order_num}</div>
                                                    <div className="flex">
                                                        <div className="flex_1" style={{ color: 'rgb(16, 16, 16)', fontSize: getUnit(13), marginTop: getUnit(5) }}>{i.cny}CNY</div>
                                                        <div className="flex_justify" style={{ color: 'rgb(194, 194, 194)', fontSize: getUnit(10) }}>{i.status === 1 ? '刚刚' : i.status === 2 ? '已完成' : '失败'}</div>
                                                    </div>
                                            <div className="flex_1" style={{ color: 'rgb(16, 16, 16)', fontSize: getUnit(13) }}>{i.content}({config.website_title})</div>
                                                </div>
                                            }
                                            link={null}
                                        />
                                    )
                                }) : <Empty />
                            }
                        </TabBar.Item>
                        <TabBar.Item title="当前订单" style={{ width: getUnit(80) }}>
                            {
                                _v.length ? _v.map((i, index: number) => {
                                    return (
                                        <Item
                                            theme={itemTheme}
                                            key={index}
                                            title={
                                                <div>
                                                    <div className="flex">
                                                        <div className="flex_1" style={{ color: 'rgba(87, 183, 43, 1)', fontSize: getUnit(9) }}>{i.type === 1 ? '卖' : '买'}</div>
                                                        <div style={{ color: 'rgb(194, 194, 194)', fontSize: getUnit(9) }}>{moment(i.created_time * 1000).format('YYYY-MM-DD HH:mm:ss')}</div>
                                                    </div>
                                                    <div style={{ color: 'rgb(194, 194, 194)', fontSize: getUnit(10) }}>单号：{i.order_num}</div>
                                                    <div className="flex">
                                                        <div className="flex_1" style={{ color: 'rgb(16, 16, 16)', fontSize: getUnit(13), marginTop: getUnit(5) }}>{i.cny}CNY</div>
                                                        <div className="flex_justify" style={{ color: 'rgb(194, 194, 194)', fontSize: getUnit(10) }}>{i.status === 1 ? '刚刚' : i.status === 2 ? '已完成' : '失败'}</div>
                                                    </div>
                                                    <div className="flex_1" style={{ color: 'rgb(16, 16, 16)', fontSize: getUnit(13) }}>{i.content}({config.website_title})</div>
                                                </div>
                                            }
                                            link={null}
                                        />
                                    )
                                }) : <Empty />
                            }
                        </TabBar.Item>
                        <TabBar.Item title="历史订单" style={{ width: getUnit(80) }}>
                            {
                                data.length ? data.map((i, index: number) => {
                                    return (
                                        <Item
                                            theme={itemTheme}
                                            key={index}
                                            title={
                                                <div>
                                                    <div className="flex">
                                                        <div className="flex_1" style={{ color: 'rgba(87, 183, 43, 1)', fontSize: getUnit(9) }}>{i.type === 1 ? '卖' : '买'}</div>
                                                        <div style={{ color: 'rgb(194, 194, 194)', fontSize: getUnit(9) }}>{moment(i.created_time * 1000).format('YYYY-MM-DD HH:mm:ss')}</div>
                                                    </div>
                                                    <div style={{ color: 'rgb(194, 194, 194)', fontSize: getUnit(10) }}>单号：{i.order_num}</div>
                                                    <div className="flex">
                                                        <div className="flex_1" style={{ color: 'rgb(16, 16, 16)', fontSize: getUnit(13), marginTop: getUnit(5) }}>{i.cny}CNY</div>
                                                        {/* <div className="flex_justify" style={{ color: 'rgb(194, 194, 194)', fontSize: getUnit(10) }}>{i.status === 1 ? '刚刚' : i.status === 2 ? '已完成' : '失败'}</div> */}
                                                    </div>
                                                    <div className="flex_1" style={{ color: 'rgb(16, 16, 16)', fontSize: getUnit(13) }}>{i.content}({config.website_title})</div>
                                                </div>
                                            }
                                            link={null}
                                        />
                                    )
                                }) : <Empty />
                            }
                        </TabBar.Item>
                    </TabBar>
                </div>
            </MobileLayout>
        )
    }

    public componentDidMount() {
        this.getData()
    }

    private getData = async () => {
        const close = Toast.loading()
        try {
            const { data } = await http('/wxapp/exchange/saleList', {
                state: 0
            })
            this.setState({
                data
            })
            close()
        } catch (data) {
            close()
            Toast.info({
                content: data.msg || '服务器繁忙,请稍后再试',
            })
        }
    }

    private handleChange = (e: any) => {
        const { config } = this.props
        const num = isNaN(Number(e.target.value)) ? '' : Number(e.target.value)
        this.fn?.setFieldValue({
            num,
            cny: Number(num || 0) * Number(config.mprice)
        })
    }

    private handleSale = async () => {
        if (this.fn) {
            try {
                const params = this.fn.getFieldValue(['cny', 'num'])
                if (!params.num) {
                    Toast.info({
                        content: '请输入卖出数量',
                    })
                    return
                }
                if (params.num % 1 !== 0) {
                    Toast.info({
                        content: '请输入整数',
                    })
                    return
                }
                if (!params.cny) {
                    Toast.info({
                        content: '请输入估价',
                    })
                    return
                }
                if (params.cny < 100) {
                    Toast.info({
                        content: '卖出价格不能低于100',
                    })
                    return
                }
                const { msg } = await http('/wxapp/exchange/sale', {
                    ...params,
                    type: 1
                })
                Toast.info({
                    content: msg,
                })
                this.fn.cleanFieldValue()
            } catch (data) {
                Toast.info({
                    content: data.msg || '服务器繁忙,请稍后再试',
                })
            }
        }
    }

    private handelToBank = () => {
        const { userInfo, history } = this.props
        if (!userInfo.realname || !userInfo.realcard) {
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
    ({ userInfo, config }: IInitState) => ({
        userInfo,
        config
    })
)(Wallet)