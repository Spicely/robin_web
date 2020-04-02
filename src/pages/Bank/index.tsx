import React, { Component } from 'react'
import { Hide } from 'muka'
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
    data: any[]
}

export default class Bank extends Component<RouteComponentProps<any>, IState> {

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
                        title="银行卡"
                        titleCenter
                    />
                }
                onGetData={() => { }}
                footer={
                    <div className="flex_center" style={{ marginBottom: getUnit(10) }}>
                        <Button
                            theme={buttonTheme}
                            mold="primary"
                            onClick={this.handleAddBank}
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
                {
                    data.map((i, index: number) => {
                        return (
                            <div style={{ padding: getUnit(10) }} key={index}>
                                <Item
                                    style={{ borderRadius: getUnit(5), marginBottom: getUnit(10) }}
                                    title={
                                        <div className="flex">
                                            <div className="flex_justify" style={{ marginLeft: getUnit(10), fontSize: getUnit(14) }}>{i.bankname}</div>
                                        </div>
                                    }
                                    value={<PriceText>{Hide.card(i.bankcard)}</PriceText>}
                                    link
                                />
                            </div>
                        )
                    })
                }
            </MobileLayout>
        )
    }

    public componentDidMount() {
        this.getData()
    }

    private getData = async () => {
        const close = Toast.loading()
        try {
            const { data } = await http('/wxapp/users/banks')
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

    private handleAddBank = () => {
        const { history } = this.props
        history.push('/addBank')
    }

    private handleBack = () => {
        const { history } = this.props
        history.goBack()
    }

}