import React, { Component } from 'react'
import { http } from 'src/utils'
import { Toast, MobileLayout, NavBar, Item, Image } from 'components'
import { RouteComponentProps } from 'react-router-dom'
import { getUnit } from 'src/components/lib/utils'
import styled from 'styled-components'

const PriceText = styled.div`
    font-weight: 700;
    font-size: ${getUnit(16)};
    color: rgb(0, 0, 0);
`

interface IState {
}

export default class Wallet extends Component<RouteComponentProps<any>, IState> {

    public state: IState = {
    }

    public render(): JSX.Element {
        return (
            <MobileLayout
                backgroundColor="rgb(248, 248, 248)"
                appBar={
                    <NavBar
                        onBack={this.handleBack}
                        title="钱包"
                        titleCenter
                        fixed
                    />
                }
            >
                <div style={{ padding: getUnit(10) }}>
                    <Item
                        style={{ borderRadius: getUnit(5), marginBottom: getUnit(10) }}
                        title={
                            <div className="flex">
                                <Image src={require('../../assets/v2_q6k5js.png')} style={{ width: getUnit(20), height: getUnit(20) }} />
                                <div className="flex_justify" style={{ marginLeft: getUnit(10), fontSize: getUnit(14) }}>余额</div>
                            </div>
                        }
                        value={<PriceText>¥10000</PriceText>}
                        link
                    />
                    <Item
                        style={{ borderRadius: getUnit(5), marginBottom: getUnit(10) }}
                        title={
                            <div className="flex">
                                <Image src={require('../../assets/v2_q6k5en.png')} style={{ width: getUnit(20), height: getUnit(20) }} />
                                <div className="flex_justify" style={{ marginLeft: getUnit(10), fontSize: getUnit(14) }}>货款通兑</div>
                            </div>
                        }
                        value={<PriceText>¥10000</PriceText>}
                    />
                    <Item
                        style={{ borderRadius: getUnit(5), marginBottom: getUnit(10) }}
                        title={
                            <div className="flex">
                                <Image src={require('../../assets/v2_q6k5r8.png')} style={{ width: getUnit(20), height: getUnit(20) }} />
                                <div className="flex_justify" style={{ marginLeft: getUnit(10), fontSize: getUnit(14) }}>利润通兑</div>
                            </div>
                        }
                        value={<PriceText>¥10000</PriceText>}
                    />
                    <Item
                        style={{ borderRadius: getUnit(5), marginBottom: getUnit(10) }}
                        title={
                            <div className="flex">
                                <Image src={require('../../assets/v2_q6k5v8.png')} style={{ width: getUnit(20), height: getUnit(20) }} />
                                <div className="flex_justify" style={{ marginLeft: getUnit(10), fontSize: getUnit(14) }}>银行卡</div>
                            </div>
                        }
                        value={<PriceText>¥10000</PriceText>}
                        link
                    />
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

    private handleBack = () => {
        const { history } = this.props
        history.goBack()
    }

}