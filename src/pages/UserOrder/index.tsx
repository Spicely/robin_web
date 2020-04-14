import React, { Component, Fragment } from 'react'
import { http, imgUrl } from 'src/utils'
import { Toast, MobileLayout, NavBar, Button, Image, Gird } from 'components'
import { RouteComponentProps } from 'react-router-dom'
import { ButtonThemeData, BorderRadius, Color, getUnit, ItemThemeData } from 'src/components/lib/utils'
import moment from 'moment'

interface IState {
    data: any[]
}

const buttonTheme = new ButtonThemeData({
    width: 62,
    fontSize: 11,
    height: 22,
    borderRadius: BorderRadius.all(20),
    buttonColor: Color.fromRGB(0, 0, 0)
})

const itemTheme = new ItemThemeData({
    minHeight: 40
})
const vitemTheme = new ItemThemeData({
    minHeight: 110
})

export default class UserOrder extends Component<RouteComponentProps<any>, IState> {

    public state: IState = {
        data: []
    }

    public render(): JSX.Element {
        const { data } = this.state
        return (
            <MobileLayout
                backgroundColor="rgb(248, 248, 248)"
                appBar={
                    <NavBar
                        onBack={this.handleBack}
                        title="我的订单"
                        titleCenter
                    />
                }
            >
                {
                    data.length ? (
                        <div style={{ padding: `0 ${getUnit(10)}` }}>
                            <Gird style={{ marginTop: getUnit(10) }}>
                                {
                                    data.map((i, key: number) => {
                                        return (
                                            <Fragment key={key}>
                                                <Gird.Item
                                                    theme={itemTheme}
                                                    title={
                                                        <div className="flex">
                                                            <div className="flex_justify">
                                                                <Image src={require('../../assets/v2_q5sqq0.png')} style={{ width: getUnit(12), height: getUnit(12), marginRight: getUnit(10) }} />
                                                            </div>
                                                            <div style={{ color: 'rgb(16, 16, 16)', fontSize: getUnit(12) }}>{i.address_info}</div>
                                                        </div>
                                                    }
                                                />
                                                <Gird.Item
                                                    theme={vitemTheme}
                                                    title={
                                                        <div>
                                                            <div className="flex">
                                                                <Image src={imgUrl + i.order_img} style={{ width: getUnit(38), height: getUnit(38), marginRight: getUnit(10) }} />
                                                                <div className="flex_justify flex_1" style={{ color: 'rgb(16, 16, 16)', fontSize: getUnit(14) }}>{i.order_name}</div>
                                                                <div className="flex_justify" style={{ color: 'rgba(187, 187, 187, 1)', fontSize: getUnit(12) }}>X{i.goods_count}</div>
                                                            </div>
                                                            <div className="flex">
                                                                <div className="flex_1 flex_justify" style={{ color: 'rgba(172, 172, 172, 1)', fontSize: getUnit(10), lineHeight: getUnit(30) }}>{moment(i.created_time * 1000).format('YYYY-MM-DD HH:mm:ss')}</div>
                                                                <div className="flex_justify" style={{ color: 'rgb(16, 16, 16)', fontSize: getUnit(11), lineHeight: getUnit(30) }}>共{i.goods_count}件商品  合计：</div>
                                                                <div style={{ color: 'rgb(16, 16, 16)', fontSize: getUnit(14), lineHeight: getUnit(30) }}>¥{i.order_price}</div>
                                                            </div>
                                                            <div className="flex">
                                                                <div className="flex_1 flex_justify" style={{ color: 'rgba(172, 172, 172, 1)', fontSize: getUnit(10)}}>
                                                                    订单编号：{i.order_num}
                                                                    </div>
                                                                {
                                                                    i.order_state === 3 ? <Button theme={buttonTheme} onClick={this.handleConfirm.bind(this, i, key)}>确认收货</Button> : i.order_state === 1 ? <Button theme={buttonTheme} onClick={this.handlePay.bind(this, i, key)}>去支付</Button> : this.getStatus(i.order_state)
                                                                }
                                                            </div>
                                                            {i.order_state === 5 ? <div style={{ color: 'red', marginBottom: getUnit(5) }}>{i.refund_remark}</div> : null}
                                                        </div>
                                                    }
                                                />
                                            </Fragment>
                                        )
                                    })
                                }
                            </Gird>
                        </div>
                    ) : null
                }
            </MobileLayout>
        )
    }

    public componentDidMount() {
        this.getData()
    }

    private getStatus(num: number) {
        switch (num) {
            case 1: return '已下单'
            case 2: return '支付完成'
            case 3: return '发货中'
            case 5: return <span style={{ color: 'red' }}>驳回</span>
            default: return '已收货'
        }
    }

    private handlePay = (value: any) => {
        const { history } = this.props
        history.push(`/linePay/${value.order_num}`)
    }

    private handleConfirm = async (value: any, index: number) => {
        const close = Toast.loading()
        try {
            const { data } = this.state
            await http('/wxapp/orders/confirmOrder', {
                num: value.order_num
            })
            data[index].order_state = 4
            this.setState({
                data: [...data]
            })
            close()
        } catch (data) {
            close()
            Toast.info({
                content: data.msg || '服务器繁忙,请稍后再试',
            })
        }
    }
    private getData = async () => {
        const close = Toast.loading()
        try {
            const { data } = await http('/wxapp/orders/getOrdersData', {}, {
                method: 'GET'
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

}