import React, { Component } from 'react'
import { MobileLayout, NavBar, Toast, Button, Image } from 'components'
import styled from 'styled-components'
import { getUnit } from 'src/components/lib/utils'
import { http } from 'src/utils'

const PayLabel = styled.div`
    font-size: ${getUnit(14)};
    color: rgb(87, 183, 43);
    line-height: ${getUnit(24)};
`

const PayTitle = styled.div`
    font-size: ${getUnit(14)};
    color: #101010;
    line-height: ${getUnit(24)};
`

export default class Pay extends Component<any, any> {

    public state = {
        data: []
    }

    private page = 1

    public render(): JSX.Element {
        return (
            <MobileLayout
                backgroundColor="rgb(248, 248, 248)"
                appBar={
                    <NavBar
                        title="订单支付成功"
                        right="完成"
                        titleCenter
                        onBack={this.handleBack}
                        divider={false}
                    />
                }
            >
                <div>
                    <div style={{ padding: getUnit(40), background: '#fff' }}>
                        <div className="flex_center">
                            <div className="flex">
                                <div className="flex_justify" style={{ marginRight: getUnit(30) }}>
                                    <Image src={require('../../assets/order.png')} style={{ width: getUnit(65), height: getUnit(72) }} />
                                </div>
                                <div>
                                    <div className="flex">
                                        <PayTitle>支付方式：</PayTitle>
                                        <PayLabel>支付宝支付</PayLabel>
                                    </div>
                                    <div className="flex">
                                        <PayTitle>支付金额：</PayTitle>
                                        <PayLabel>￥10000</PayLabel>
                                    </div>
                                    <div className="flex">
                                        <PayTitle>优惠金额：</PayTitle>
                                        <PayLabel>￥0.00</PayLabel>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="flex_center" style={{ marginTop: getUnit(30) }}>
                            <Button mold="primary" style={{ width: '90%', borderRadius: getUnit(5), height: getUnit(30) }}>查看订单</Button>
                        </div>
                    </div>
                </div>
            </MobileLayout>
        )
    }

    public componentDidMount() {
        // this.getData()
    }

    private getData = async () => {
        try {
            const data = await http('news/get_mechanism')
            this.setState({
                data: data.msg || []
            })
        } catch (data) {
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