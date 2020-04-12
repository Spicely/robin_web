import React, { Component, MouseEvent, Fragment } from 'react'
import { http, Empty, imgUrl } from 'src/utils'
import { Toast, MobileLayout, Button, Image, Item, Radio, InputNumber } from 'components'
import { RouteComponentProps, withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import { IInitState } from 'src/store/state'
import { ButtonThemeData, BorderRadius, getUnit, ItemThemeData, Color } from 'src/components/lib/utils'
import styled from 'styled-components'


interface IState {
    data: any[]
    price: number
}

const shopBtnTheme = new ButtonThemeData({
    borderRadius: BorderRadius.all(30),
    width: 120,
    height: 35,
    fontSize: 18
})

const itemTheme = new ItemThemeData({
    minHeight: 70
})

const btnTheme = new ButtonThemeData({
    buttonColor: Color.fromRGB(87, 183, 43),
    fontSize: 14,
    height: 29,
    width: 75,
    borderRadius: BorderRadius.all(20)
})

const LRadio = styled(Radio)`
    span {
        width: 100%;
    }
`

class Shop extends Component<RouteComponentProps<any>, IState> {

    public state: IState = {
        data: [],
        price: 0
    }

    public render(): JSX.Element {
        const { data, price } = this.state
        return (
            <MobileLayout
                backgroundColor="rgb(248, 248, 248)"
                emptyElement={
                    <div style={{ marginTop: getUnit(100) }}>
                        <div className="flex_center">
                            <Image src={require('../../assets/v2_q5w0tr.png')} style={{ height: getUnit(77), width: getUnit(77) }} />
                        </div>
                        <div className="flex_center" style={{ color: 'rgba(163, 163, 163, 1)', fontSize: getUnit(15), lineHeight: getUnit(40) }}>您的购物车有点寂寞</div>
                        <div className="flex_center">
                            <Button mold="primary" theme={shopBtnTheme}>去购物</Button>
                        </div>
                    </div>
                }
            >
                {
                    data.length ? (
                        <Fragment>
                            {
                                data.length ? (
                                    <Item
                                        title={
                                            <div className="flex">
                                                <div style={{ color: 'rgb(16, 16, 16)', fontWeight: 400, fontSize: getUnit(14) }}>商品订单</div>
                                                <div className="flex_justify" style={{ marginLeft: getUnit(10) }}>
                                                    <div style={{ background: 'rgb(0, 0, 0)', fontSize: getUnit(9), borderRadius: getUnit(20), color: '#fff', padding: `0 ${getUnit(5)}` }}>
                                                        直邮到家
                                        </div>
                                                </div>
                                            </div>
                                        }
                                    />
                                ) : null
                            }
                            {
                                data.map((i, index: number) => {
                                    return (
                                        <Item
                                            key={index}
                                            theme={itemTheme}
                                            title={
                                                <LRadio
                                                    type="square"
                                                    iconStyle={{ borderRadius: '50%' }}
                                                    style={{ width: '100%' }}
                                                    checked={i.checked}
                                                    onChange={this.handleChange.bind(this, index)}
                                                >
                                                    <div className="flex">
                                                        <div style={{ marginRight: getUnit(10), marginLeft: getUnit(10) }}>
                                                            <Image src={imgUrl + i.goods_image} style={{ width: getUnit(54), height: getUnit(54) }} />
                                                        </div>
                                                        <div className="flex_1">
                                                            <div style={{ color: 'rgb(16, 16, 16)', fontSize: getUnit(14), fontWeight: 700, lineHeight: getUnit(20) }}>{i.goods_name}</div>
                                                            <div className="flex">
                                                                <div className="flex_1 flex_justify" style={{ color: 'rgb(16, 16, 16)', fontSize: getUnit(16), fontWeight: 700, lineHeight: getUnit(20), marginTop: getUnit(10) }}>¥{i.goods_price}</div>
                                                                <div style={{ position: 'relative', top: getUnit(8) }}>
                                                                    <InputNumber value={i.cart_num} min={1} onChange={this.handleNumChange.bind(this, index)} />
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </LRadio>
                                            }
                                        // onPress={this.handleSelect.bind(this, i)}
                                        />
                                    )
                                })
                            }
                            {
                                data.length ? (
                                    <Item
                                        title={
                                            <div className="flex">
                                                <div style={{ color: 'rgb(16, 16, 16)', fontWeight: 400, fontSize: getUnit(14) }}>应付合计¥{price}</div>
                                            </div>
                                        }
                                        value={
                                            <Button mold="primary" theme={btnTheme} onClick={this.handleOrder}>去结算</Button>
                                        }
                                    />
                                ) : null
                            }
                        </Fragment>
                    ) : null
                }
            </MobileLayout>
        )
    }

    public componentDidMount() {
        this.getData()
    }

    private getData = async () => {
        try {
            const { cart_data } = await http('/wxapp/goods/getCartData')
            this.setState({
                data: cart_data
            })
        } catch (data) {
            Toast.info({
                content: data.msg || '服务器繁忙,请稍后再试',
            })
        }
    }
    private handleOrder = () => {
        const { data } = this.state
        const ids = data.filter((i) => i.checked).map((i) => i.cart_id)
        if (ids.length) {
            const { history } = this.props
            history.push(`/order/${ids.join(',')}`)
        } else {
            Toast.info({
                content: '请选择商品'
            })
        }
    }

    private handleChange = (index: number) => {
        const { data } = this.state
        data[index].checked = !data[index].checked
        let price = 0
        data.forEach((i) => {
            if (i.checked) {
                price += i.goods_price * i.cart_num
            }
        })
        this.setState({
            data: [...data],
            price
        })
    }

    private handleNumChange = (index: number, val: number, e: MouseEvent<HTMLButtonElement>) => {
        e.stopPropagation()
        const { data } = this.state
        data[index].cart_num = val
        let price = 0
        data.forEach((i) => {
            if (i.checked) {
                price += i.goods_price * i.cart_num
            }
        })
        this.setState({
            data: [...data],
            price
        })
    }

}

export default connect(
    ({ homeData }: IInitState) => ({
        homeData
    })
)(withRouter(Shop))