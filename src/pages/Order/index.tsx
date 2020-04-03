import React, { Component } from 'react'
import { http, imgUrl } from 'src/utils'
import { Toast, MobileLayout, NavBar, Image, Form, Button, InputNumber } from 'components'
import { RouteComponentProps, Link } from 'react-router-dom'
import { getUnit, ItemThemeData, ButtonThemeData, BorderRadius, Color } from 'src/components/lib/utils'
import { IGoodsData, IInitState, IGlobal } from 'src/store/state'
import { IFormFun, IFormItem } from 'src/components/lib/Form'
import { connect } from 'react-redux'

interface IState {
    data: IGoodsData
    number: number
}

interface IProps {
    defaultAddr: IGlobal.DefaultAddr
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

class Order extends Component<IProps & RouteComponentProps<any>, IState> {

    private fn?: IFormFun

    private getItem = (fn: IFormFun) => {
        const { defaultAddr } = this.props
        const { data, number } = this.state
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
                                    <div>{defaultAddr.address_name || '请选择地址'}</div>
                                    <div className="flex_justify" style={{ fontSize: getUnit(12), color: 'rgba(128, 128, 128, 1)', marginLeft: getUnit(5) }}>{defaultAddr.address_phone}</div></div>
                                <div style={{ fontSize: getUnit(14), color: 'rgb(16, 16, 16)' }}>{defaultAddr.address_province}{defaultAddr.address_city}{defaultAddr.address_area}</div>
                            </div>
                        </div>
                    </div>
                ),
                link: true,
                lineType: 'none',
                onPress: this.handleAddress
            },
            field: '1'
        }, {
            component: 'Item',
            props: {
                theme: itemShopTheme,
                title: (
                    <Image src={imgUrl + data.image_url} style={{ width: getUnit(78), height: getUnit(78) }} />
                ),
                value: (
                    <div style={{ marginLeft: getUnit(5) }}>
                        <div className="flex">
                            <div className="flex_1" style={{ fontSize: getUnit(14), fontWeight: 400, color: '#000' }}>{data.goods_name}</div>
                            <div style={{ fontSize: getUnit(14), fontWeight: 400, color: '#000' }}>¥{number * data.goods_price}</div>
                        </div>
                        <div className="flex">
                            <div className="flex_1" style={{ fontSize: getUnit(12), color: 'rgba(87, 183, 43, 1)' }}>发货时间：付款后2天内</div>
                            <div style={{ fontSize: getUnit(12), color: 'rgba(187, 187, 187, 1)' }}>X{number}</div>
                        </div>
                    </div>
                ),
                style: { marginTop: getUnit(10) },
                link: null,
                lineType: 'none',
                flexType: 'value',
            },
            field: '2'
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
                value: (
                    <InputNumber value={number} min={1} onChange={this.handleChange} />
                ),
                link: null,
                lineType: 'none',
            },
            field: 'number'
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
            },
            field: 'message'
        }, {
            component: 'Item',
            props: {
                value: (
                    <div className="flex">
                        <div className="flex_1"></div>
                        <div className="flex">
                            <div className="flex_justify" style={{ fontSize: getUnit(11), color: 'rgb(16, 16, 16)' }}>共1件  小计：</div>
                            <div style={{ fontSize: getUnit(14), color: 'rgba(87, 183, 43, 1)', marginRight: getUnit(10) }}>¥{number * data.goods_price}</div>
                        </div>
                    </div>
                )
            },
            field: '4'
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
        },
        number: 1,
    }

    private handleChange = (val: number) => {
        this.setState({
            number: val
        })
    }

    public render(): JSX.Element {
        const { data, number } = this.state
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
                                        <div style={{ fontSize: getUnit(20), color: 'rgb(0, 0, 0)', marginRight: getUnit(10) }}>¥{number * data.goods_price}</div>
                                    </div>
                                </div>
                                <Button mold="primary" theme={btnTheme} onClick={this.handlePay}>提交订单</Button>
                            </div>
                        </div>
                    </div>
                }
            >
                <div style={{ padding: `${getUnit(10)} ${getUnit(5)}` }}>
                    <Form getItems={this.getItem} />
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
        if (this.fn) {
            try {
                const params = this.fn.getFieldValue(['message'])
                const { number, data } = this.state
                const { history, defaultAddr, match } = this.props
                if (!defaultAddr.address_id) {
                    Toast.info({
                        content: '请选择收货地址',
                    })
                    return
                }
                const { msg } = await http('/wxapp/orders/onOrder', {
                    ...params,
                    total: number * data.goods_price,
                    adid: defaultAddr.address_id,
                    gid: match.params.id,
                    number,
                })
                this.setState({
                    data
                })
                Toast.info({
                    content: msg
                })
                history.replace('/pay')
            } catch (data) {
                Toast.info({
                    content: data.msg || '服务器繁忙,请稍后再试',
                })
            }
        }
    }

    private handleAddress = () => {
        const { history } = this.props
        history.push('/addressList/select')
    }

}

export default connect(
    ({ defaultAddr }: IInitState) => ({
        defaultAddr
    })
)(Order)