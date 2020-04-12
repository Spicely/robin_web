import React, { Component } from 'react'
import { MobileLayout, NavBar, Toast, Button, Image } from 'components'
import styled from 'styled-components'
import { getUnit, ButtonThemeData, BorderRadius } from 'src/components/lib/utils'
import { http } from 'src/utils'
import CopyToClipboard from 'react-copy-to-clipboard'
import { RouteComponentProps } from 'react-router-dom'

const btnTheme = new ButtonThemeData({
    width: '100%',
    borderRadius: BorderRadius.all(5)
})

export default class LinePay extends Component<RouteComponentProps<any>, any> {

    public state = {
        data: {
            title: '',
            bankname: '',
            bankcard: '',
            zname: '',
            remark: '',
        }
    }

    private page = 1

    public render(): JSX.Element {
        const { data } = this.state
        return (
            <MobileLayout
                backgroundColor="rgb(248, 248, 248)"
                appBar={
                    <NavBar
                        title="付款方式"
                        titleCenter
                        onBack={this.handleBack}
                        divider={false}
                    />
                }
            >
                <div style={{ padding: getUnit(15), background: '#fff' }}>
                    <div style={{ background: 'rgb(116, 114, 246)', borderRadius: getUnit(10), padding: getUnit(10) }}>
                        <div style={{ color: '#fff', fontSize: getUnit(14) }}>姓名</div>
                        <CopyToClipboard text={data.title} onCopy={this.handleCopy}>
                            <div className="flex">
                                <div style={{ color: '#fff', fontSize: getUnit(14), marginTop: getUnit(5) }}>{data.title}</div>
                                <div className="flex_justify">
                                    <Image src={require('../../assets/copy.png')} style={{ width: getUnit(13), height: getUnit(13), position: 'relative', top: getUnit(3), marginLeft: getUnit(5) }} />
                                </div>
                            </div>
                        </CopyToClipboard>
                        <div className="flex" style={{ marginTop: getUnit(20) }}>
                            <div style={{ marginRight: getUnit(10) }}>
                                <div style={{ color: '#fff', fontSize: getUnit(14) }}>银行</div>
                                <CopyToClipboard text={data.bankname} onCopy={this.handleCopy}>
                                    <div className="flex">
                                        <div style={{ color: '#fff', fontSize: getUnit(16), marginTop: getUnit(5) }}>{data.bankname}</div>
                                        <div className="flex_justify">
                                            <Image src={require('../../assets/copy.png')} style={{ width: getUnit(13), height: getUnit(13), position: 'relative', top: getUnit(3), marginLeft: getUnit(5) }} />
                                        </div>
                                    </div>
                                </CopyToClipboard>
                            </div>
                            <div className="flex_1">
                                <div style={{ color: '#fff', fontSize: getUnit(14) }}>支行</div>
                                <CopyToClipboard text={data.zname} onCopy={this.handleCopy}>
                                    <div className="flex">
                                        <div style={{ color: '#fff', fontSize: getUnit(16), marginTop: getUnit(5) }}>{data.zname}</div>
                                        <div className="flex_justify">
                                            <Image src={require('../../assets/copy.png')} style={{ width: getUnit(13), height: getUnit(13), position: 'relative', top: getUnit(3), marginLeft: getUnit(5) }} />
                                        </div>
                                    </div>
                                </CopyToClipboard>
                            </div>
                        </div>
                        <div className="flex" style={{ marginTop: getUnit(20) }}>
                            <div>
                                <div style={{ color: '#fff', fontSize: getUnit(14) }}>银行卡号</div>
                                <CopyToClipboard text={data.bankcard} onCopy={this.handleCopy}>
                                    <div className="flex">
                                        <div style={{ color: '#fff', fontSize: getUnit(16), marginTop: getUnit(5) }}>{data.bankcard}</div>
                                        <div className="flex_justify">
                                            <Image src={require('../../assets/copy.png')} style={{ width: getUnit(13), height: getUnit(13), position: 'relative', top: getUnit(3), marginLeft: getUnit(5) }} />
                                        </div>
                                    </div>
                                </CopyToClipboard>
                            </div>
                        </div>
                    </div>
                    <div style={{ fontSize: getUnit(10), color: 'rgb(224, 92, 86)', marginTop: getUnit(10) }}>
                        请及时完成付款，并点击付款完成（有效期30分钟）。未付款并点击付款完成，经核实，将会暂停账号功能
                    </div>

                    <div style={{ marginTop: getUnit(20) }}>
                        <Button mold="primary" theme={btnTheme} onClick={this.handlePay}>我已付款</Button>
                    </div>
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
            const { data } = await http('/wxapp/Wxpay/downBank')
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

    private handlePay = async () => {
        const close = Toast.loading()
        try {
            const { orderId } = this.props.match.params
            const { history } = this.props
            const data = await http('/wxapp/Wxpay/downPay', {
                order_id: orderId
            })
            close()
            Toast.info({
                content: data.msg,
            })
            history.goBack()
        } catch (data) {
            close()
            Toast.info({
                content: data.msg || '服务器繁忙,请稍后再试',
            })
        }
    }

    private handleCopy = () => {
        Toast.info({
            content: '复制成功',
        })
    }

    private handleBack = () => {
        const { history } = this.props
        history.goBack()
    }
}