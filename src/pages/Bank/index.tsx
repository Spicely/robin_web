import React, { Component } from 'react'
import { http } from 'src/utils'
import { Toast, MobileLayout, NavBar, Item, Image, Button } from 'components'
import { RouteComponentProps } from 'react-router-dom'
import { getUnit, ButtonThemeData, BorderRadius, Color } from 'src/components/lib/utils'
import styled from 'styled-components'

const PriceText = styled.div`
    font-weight: 700;
    font-size: ${getUnit(16)};
    color: rgb(0, 0, 0);
`

const buttonTheme = new ButtonThemeData({
    width: '80%',
    borderRadius: BorderRadius.all(20),
    buttonColor: Color.fromRGB(0, 0, 0)
})

interface IState {
}

export default class Bank extends Component<RouteComponentProps<any>, IState> {

    public state: IState = {}

    public render(): JSX.Element {
        return (
            <MobileLayout
                backgroundColor="rgb(248, 248, 248)"
                appBar={
                    <NavBar
                        onBack={this.handleBack}
                        title="银行卡"
                        titleCenter
                        fixed
                    />
                }
                onGetData={()=> {}}
                footer={
                    <div className="flex_center" style={{ marginBottom: getUnit(10) }}>
                        <Button
                            theme={buttonTheme}
                            mold="primary"
                        >
                            添加银行卡
                        </Button>
                    </div>
                }
                emptyElement={
                    <div style={{ marginTop: getUnit(100) }}>
                        <div className="flex_center">
                            <Image src={require('../../assets/v2_q6kef5.png')} style={{ height: getUnit(77), width: getUnit(77) }} />
                        </div>
                        <div className="flex_center" style={{ color: 'rgba(163, 163, 163, 1)', fontSize: getUnit(12), lineHeight: getUnit(40) }}>暂无银行卡</div>
                    </div>
                }
            >
                {/* <div style={{ padding: getUnit(10) }}>
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
                </div> */}
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