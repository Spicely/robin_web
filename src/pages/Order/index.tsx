import React, { Component, Fragment } from 'react'
import { http, imgUrl } from 'src/utils'
import { Toast, MobileLayout, NavBar, Image, Button, InputNumber, Item, Gird } from 'components'
import { RouteComponentProps } from 'react-router-dom'
import { getUnit, ItemThemeData, ButtonThemeData, BorderRadius, Color } from 'src/components/lib/utils'
import { IInitState, IGlobal } from 'src/store/state'
import { connect, DispatchProp } from 'react-redux'
import { SET_USERADDRESS_DATA } from 'src/store/actions'

interface IState {
    data: any[]
    price: number
    msg: string
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

class Order extends Component<IProps & RouteComponentProps<any> & DispatchProp, IState> {

    public state: IState = {
        data: [],
        price: 0,
        msg: '',
    }

    private handleChange = (index: number, val: number) => {
        const { data } = this.state
        let price = 0
        data[index].cart_num = val
        data.forEach((i) => {
            price += i.cart_num * i.goods_price
        })
        this.setState({
            data: [...data],
            price
        })
    }

    public render(): JSX.Element {
        const { data, price, msg } = this.state
        const { defaultAddr } = this.props
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
                                        <div style={{ fontSize: getUnit(14), color: 'rgb(16, 16, 16)', position: 'relative', top: getUnit(5) }}>共{data.length}件，合计：</div>
                                        <div style={{ fontSize: getUnit(20), color: 'rgb(0, 0, 0)', marginRight: getUnit(10) }}>¥{price}</div>
                                    </div>
                                </div>
                                <Button mold="primary" theme={btnTheme} onClick={this.handlePay}>提交订单</Button>
                            </div>
                        </div>
                    </div>
                }
            >
                <div style={{ padding: `${getUnit(10)} ${getUnit(5)}` }}>
                    <Item
                        theme={itemTheme}
                        title={(
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
                        )}
                        link={true}
                        lineType="none"
                        onPress={this.handleAddress}
                    />
                    <div style={{ marginTop: getUnit(10) }}>
                        {
                            data.map((i, index: number) => {
                                return (
                                    <Fragment key={index}>
                                        <Item
                                            theme={itemShopTheme}
                                            title={(
                                                <Image src={imgUrl + i.goods_image} style={{ width: getUnit(78), height: getUnit(78) }} />
                                            )}
                                            value={
                                                (
                                                    <div style={{ marginLeft: getUnit(5) }}>
                                                        <div className="flex">
                                                            <div className="flex_1" style={{ fontSize: getUnit(14), fontWeight: 400, color: '#000' }}>{i.goods_name}</div>
                                                            <div style={{ fontSize: getUnit(14), fontWeight: 400, color: '#000' }}>¥{i.cart_num * i.goods_price}</div>
                                                        </div>
                                                        <div className="flex">
                                                            <div className="flex_1" style={{ fontSize: getUnit(12), color: 'rgba(87, 183, 43, 1)' }}>发货时间：付款后2天内</div>
                                                            <div style={{ fontSize: getUnit(12), color: 'rgba(187, 187, 187, 1)' }}>X{i.cart_num}</div>
                                                        </div>
                                                    </div>
                                                )
                                            }
                                            link={null}
                                            lineType="none"
                                            flexType="value"
                                        />
                                        <Item
                                            title="购买数量"
                                            value={(
                                                <InputNumber value={i.cart_num} min={1} onChange={this.handleChange.bind(this, index)} />
                                            )}
                                            link={null}
                                            lineType="none"
                                        />
                                    </Fragment>
                                )
                            })
                        }
                    </div>
                    <Item
                        flexType="value"
                        title="服务"
                        value="不支持7天无理由"
                        link={null}
                        lineType="none"
                    />

                    <Item
                        title="配送方式"
                        value="EMS 免邮"
                        link={null}
                        lineType="none"
                    />
                    <Gird.Input
                        title="订单备注"
                        link={null}
                        lineType="none"
                        value={msg}
                        placeholder="选填，请先和商家协商一致"
                        onChange={this.handleMsg}
                    />
                    <Item
                        value={(
                            <div className="flex">
                                <div className="flex_1"></div>
                                <div className="flex">
                                    <div className="flex_justify" style={{ fontSize: getUnit(11), color: 'rgb(16, 16, 16)' }}>共1件  小计：</div>
                                    <div style={{ fontSize: getUnit(14), color: 'rgba(87, 183, 43, 1)', marginRight: getUnit(10) }}>¥{price}</div>
                                </div>
                            </div>
                        )}
                    />
                </div>

            </MobileLayout>
        )
    }

    private handleMsg = (e: any) => {
        this.setState({
            msg: e.target.value
        })
    }

    public componentDidMount() {
        this.getData()
    }

    private getData = async () => {
        const close = Toast.loading()
        try {
            const { params } = this.props.match
            const { dispatch } = this.props
            const { cart_data, address_data } = await http('/wxapp/goods/getCartData', {
                cartId: params.id
            })

            let price = 0
            cart_data.forEach((i: any) => {
                price += i.cart_num * i.goods_price
            })
            dispatch({ type: SET_USERADDRESS_DATA, data: address_data })
            this.setState({
                data: cart_data,
                price,
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
            const { price, data, msg } = this.state
            const { history, defaultAddr } = this.props
            if (!defaultAddr.address_id) {
                Toast.info({
                    content: '请选择收货地址',
                })
                return
            }
            const res = await http('/wxapp/users/subOrders', {
                total: price,
                adid: defaultAddr.address_id,
                data: data.map((i) => {
                    return {
                        cart_id: i.cart_id,
                        cart_num: i.cart_num
                    }
                }),
                message: msg
            })
            history.replace('/pay')
        } catch (data) {
            Toast.info({
                content: data.msg || '服务器繁忙,请稍后再试',
            })
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