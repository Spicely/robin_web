import React, { Component } from 'react'
import { http } from 'src/utils'
import { Toast, MobileLayout, NavBar, Image, Form, Button } from 'components'
import { RouteComponentProps, Link } from 'react-router-dom'
import { getUnit, ItemThemeData, ButtonThemeData, BorderRadius, Color } from 'src/components/lib/utils'
import { IGoodsData } from 'src/store/state'
import { IFormFun, IFormItem } from 'src/components/lib/Form'

interface IState {
    data: IGoodsData
}

const itemTheme = new ItemThemeData({
    minHeight: 60
})

const itemShopTheme = new ItemThemeData({
    minHeight: 90
})

const btnTheme = new ButtonThemeData({
    height: 36,
    borderRadius: BorderRadius.all(18),
    buttonColor: Color.fromRGB(0, 0, 0),
    width: 90
})

export default class Order extends Component<RouteComponentProps<any>, IState> {

    private fn?: IFormFun

    private getItem = (fn: IFormFun) => {
        this.fn = fn
        const items: IFormItem[] = [{
            component: 'Item',
            props: {
                theme: itemTheme,
                title: (
                    <div className="flex">
                        <div className="flex_center" style={{ marginRight: getUnit(5) }}>
                            <Image src={require('../../assets/v2_q7mvi7.png')} style={{ width: getUnit(25), height: getUnit(25) }} />
                        </div>
                        <div>
                            <div>
                                <div className="flex" style={{ fontSize: getUnit(13) }}>
                                    <div>李四</div>
                                    <div className="flex_justify" style={{ fontSize: getUnit(12), color: 'rgba(128, 128, 128, 1)', marginLeft: getUnit(5) }}>13999999999</div></div>
                                <div style={{ fontSize: getUnit(14), color: 'rgb(16, 16, 16)' }}>北京市东城区人民中路119号</div>
                            </div>
                        </div>
                    </div>
                ),
                link: true,
                lineType: 'none',
            }
        }, {
            component: 'Item',
            props: {
                theme: itemShopTheme,
                title: (
                    <Image src={require('../../assets/3.png')} style={{ width: getUnit(78), height: getUnit(78) }} />
                ),
                value: (
                    <div style={{ marginLeft: getUnit(5) }}>
                        <div className="flex">
                            <div className="flex_1" style={{ fontSize: getUnit(14), fontWeight: 400, color: '#000' }}>史丹利化肥套装限时购</div>
                            <div style={{ fontSize: getUnit(14), fontWeight: 400, color: '#000' }}>¥10000</div>
                        </div>
                        <div className="flex">
                            <div className="flex_1" style={{ fontSize: getUnit(12), color: 'rgba(87, 183, 43, 1)' }}>发货时间：付款后2天内</div>
                            <div style={{ fontSize: getUnit(12), color: 'rgba(187, 187, 187, 1)' }}>X1</div>
                        </div>
                    </div>
                ),
                style: { marginTop: getUnit(10) },
                link: null,
                lineType: 'none',
                flexType: 'value',
            }
        }, {
            component: 'Item',
            props: {
                flexType: 'value',
                title: '服务',
                value: '不支持7天无理由',
                link: null,
                lineType: 'none',
            }
        }, {
            component: 'Item',
            props: {
                title: '购买数量',
                link: null,
                lineType: 'none',
            }
        }, {
            component: 'Item',
            props: {
                title: '配送方式',
                value: 'EMS 免邮',
                link: null,
                lineType: 'none',
            }
        }, {
            component: 'ItemInput',
            className: 'mk_divider_none',
            props: {
                title: '订单备注',
                link: null,
                lineType: 'none',
                placeholder: '选填，请先和商家协商一致',
            }
        }, {
            component: 'Label',
            render: () => {
                return (
                    <div className="flex">
                        <div className="flex_1"></div>
                        <div className="flex">
                            <div className="flex_justify" style={{ fontSize: getUnit(11), color: 'rgb(16, 16, 16)' }}>共1件  小计：</div>
                            <div style={{ fontSize: getUnit(14), color: 'rgba(87, 183, 43, 1)', marginRight: getUnit(10) }}>¥10000</div>
                        </div>
                    </div>
                )
            }
        }]
        return items
    }

    public state: IState = {
        data: {
            goods_id: 0,
            goods_name: '',
            goods_price: 0,
            platform_price: 0,
            goods_number: 0,
            image_url: '',
            goods_contents: ''
        }
    }

    public render(): JSX.Element {
        const { data } = this.state
        return (
            <MobileLayout
                appBar={
                    <NavBar
                        onBack={this.handleBack}
                        title="确认订单"
                        titleCenter
                    />
                }
                footer={
                    <div className="flex" style={{ background: '#fff', height: getUnit(50) }}>
                        <div className="flex_1" />
                        <div className="flex_justify" style={{ paddingRight: getUnit(10) }}>
                            <div className="flex">
                                <div className="flex_justify">
                                    <div className="flex">
                                        <div style={{ fontSize: getUnit(14), color: 'rgb(16, 16, 16)', position: 'relative', top: getUnit(5) }}>共1件，合计：</div>
                                        <div style={{ fontSize: getUnit(20), color: 'rgb(0, 0, 0)', marginRight: getUnit(10) }}>¥10000</div>
                                    </div>
                                </div>
                                <Button mold="primary" theme={btnTheme} async onClick={this.handlePay}>提交订单</Button>
                            </div>
                        </div>
                    </div>
                }
            >
                <div style={{ padding: `${getUnit(10)} ${getUnit(5)}` }}>
                    <Form getItems={this.getItem} style={{ background: '#fff' }} />
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
            const { params } = this.props.match
            const { data } = await http('wxapp/goods/goodsShow', {
                gid: params.id
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

    private handleBack = () => {
        const { history } = this.props
        history.goBack()
    }

    private handlePay = async () => {
        try {
            const { history } = this.props
            // const { data } = await http('wxapp/goods/goodsShow', {
            //     gid: params.id
            // })
            // this.setState({
            //     data
            // })
            history.replace('/pay')
        } catch (data) {
            Toast.info({
                content: data.msg || '服务器繁忙,请稍后再试',
            })
        }
    }

}