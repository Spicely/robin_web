import React, { Component } from 'react'
import { http } from 'src/utils'
import { Toast, MobileLayout, NavBar, Item, Image, Button } from 'components'
import { RouteComponentProps } from 'react-router-dom'
import { getUnit, ButtonThemeData, Color, BorderRadius } from 'src/components/lib/utils'
import styled from 'styled-components'
import { connect, DispatchProp } from 'react-redux'
import { IInitState, IGlobal } from 'src/store/state'
import { SET_USERINFO_DATA } from 'src/store/actions'

const PriceText = styled.div`
    font-weight: 700;
    font-size: ${getUnit(16)};
    color: rgb(0, 0, 0);
`

const btnTheme = new ButtonThemeData({
    buttonColor: Color.fromRGB(87, 183, 43),
    color: Color.fromRGB(255, 255, 255),
    width: 46,
    borderRadius: BorderRadius.all(5)
})

interface IProps extends DispatchProp {
    userInfo: IGlobal.UserInfo
    config: IGlobal.Config
}

interface IState {
    number: string
}

class Wallet extends Component<IProps & RouteComponentProps<any>, IState> {

    public state: IState = {
        number: ''
    }

    public render(): JSX.Element {
        const { userInfo, config } = this.props
        const { number } = this.state
        return (
            <MobileLayout
                backgroundColor="rgb(248, 248, 248)"
                appBar={
                    <NavBar
                        onBack={this.handleBack}
                        title="钱包"
                        titleCenter
                    />
                }
            >
                <div style={{ padding: getUnit(10) }}>
                    <div style={{ paddingBottom: getUnit(10) }}>
                        <div className="flex_center" style={{ color: 'rgba(87, 183, 43, 1)', fontSize: getUnit(11), lineHeight: getUnit(25) }}>现货账户（CNY）</div>
                        <div className="flex_center" style={{ color: 'rgb(16, 16, 16)', fontSize: getUnit(20), lineHeight: getUnit(25) }}>{userInfo.price}</div>
                        <div className="flex_center" style={{ color: 'rgb(16, 16, 16)', fontSize: getUnit(11), lineHeight: getUnit(25) }}>≈{Math.floor(Number(userInfo.price) / Number(config.price))}手{config.website_title}</div>
                    </div>
                    <div style={{ background: '#fff', padding: getUnit(10), marginBottom: getUnit(10) }}>
                        <div className="flex">
                            <div className="flex_1" style={{ color: 'rgb(16, 16, 16)', fontSize: getUnit(12) }}>现货兑换</div>
                            <div className="flex">
                                <div className="flex_justify" style={{ marginRight: getUnit(5) }}>
                                    <Image src={require('../../assets/v2_q7mrtl.png')} style={{ width: getUnit(12), height: getUnit(12) }} />
                                </div>
                                <div style={{ color: 'rgba(235, 36, 36, 1)', fontSize: getUnit(12) }}>按数量</div>
                            </div>
                        </div>
                        <div className="flex" style={{ marginTop: getUnit(10) }}>
                            <div className="flex_1" style={{ border: `${getUnit(1)} solid rgb(234, 234, 234)`, borderRadius: getUnit(5), marginRight: getUnit(5) }}>
                                <div className="flex">
                                    <div className="flex_1">
                                        <input style={{ height: getUnit(28), border: 'none', width: '100%', paddingLeft: getUnit(10) }} value={number} onChange={this.handelChange} type="number" />
                                    </div>
                                    <div className="flex_justify" style={{ color: 'rgba(0, 0, 0, 1)', fontSize: getUnit(11), padding: `0 ${getUnit(10)}`, whiteSpace: 'nowrap' }}>{config.website_title}</div>
                                    <div className="flex_justify" style={{ color: 'rgba(0, 0, 0, 1)', fontSize: getUnit(11), padding: `0 ${getUnit(20)}`, borderLeft: `${getUnit(1)} solid rgb(234, 234, 234)`, whiteSpace: 'nowrap' }}>{config.website_title}/CNY</div>
                                </div>
                            </div>
                            <div className="flex_justify">
                                <Button theme={btnTheme} mold="primary" style={{ minWidth: getUnit(46) }} onClick={this.handleSale}>兑换</Button>
                            </div>
                        </div>
                    </div>
                    <Item
                        style={{ borderRadius: getUnit(5), marginBottom: getUnit(10) }}
                        title={
                            <div className="flex">
                                <Image src={require('../../assets/v2_q6k5js.png')} style={{ width: getUnit(20), height: getUnit(20) }} />
                                <div className="flex_justify" style={{ marginLeft: getUnit(10), fontSize: getUnit(14) }}>{config.website_title}</div>
                            </div>
                        }
                        value={<PriceText>{userInfo.kind}手</PriceText>}
                        link
                        onPress={() => {
                            const { history } = this.props
                            history.push('/exchange')
                        }}
                        lineType="none"
                    />
                    <Item
                        style={{ borderRadius: getUnit(5), marginBottom: getUnit(10) }}
                        title={
                            <div className="flex">
                                <Image src={require('../../assets/v2_q6k5en.png')} style={{ width: getUnit(20), height: getUnit(20) }} />
                                <div className="flex_justify" style={{ marginLeft: getUnit(10), fontSize: getUnit(14) }}>货款</div>
                            </div>
                        }
                        value={<PriceText>¥{userInfo.buyprice}</PriceText>}
                        lineType="none"
                    />
                    <Item
                        style={{ borderRadius: getUnit(5), marginBottom: getUnit(10) }}
                        title={
                            <div className="flex">
                                <Image src={require('../../assets/v2_q6k5r8.png')} style={{ width: getUnit(20), height: getUnit(20) }} />
                                <div className="flex_justify" style={{ marginLeft: getUnit(10), fontSize: getUnit(14) }}>通兑</div>
                            </div>
                        }
                        value={<PriceText>¥{userInfo.cny}</PriceText>}
                        lineType="none"
                    />
                    <Item
                        style={{ borderRadius: getUnit(5), marginBottom: getUnit(10) }}
                        title={
                            <div className="flex">
                                <Image src={require('../../assets/v2_q6k5v8.png')} style={{ width: getUnit(20), height: getUnit(20) }} />
                                <div className="flex_justify" style={{ marginLeft: getUnit(10), fontSize: getUnit(14) }}>银行卡</div>
                            </div>
                        }
                        link={true}
                        onPress={this.handelToBank}
                        lineType="none"
                    />
                </div>
            </MobileLayout>
        )
    }

    private handelToBank = () => {
        const { userInfo, history } = this.props
        if (!userInfo.realname && !userInfo.realcard) {
            history.push('/userBind')
        } else {
            history.push('/bank')
        }
    }

    private handelChange = (e: any) => {
        this.setState({
            number: e.target.value
        })
    }

    private handleBack = () => {
        const { history } = this.props
        history.goBack()
    }

    private handleSale = async () => {
        const { number } = this.state
        if (!number) {
            Toast.info({ content: '请输入数量' })
            return
        }
        if(!(Number(number) % 1 === 0)) {
            Toast.info({ content: '请输入整数' })
            return
        }
        const close = Toast.loading()
        try {
            const { config, dispatch, userInfo } = this.props
            const cny = Number(config.price) * Number(number)
            const data = await http('/wxapp/exchange/sale', {
                num: number,
                type: 2,
                cny
            })
            userInfo.price = (Number(userInfo.cny) - cny).toFixed(2)
            dispatch({ type: SET_USERINFO_DATA, data: { ...userInfo } })
            Toast.info({
                content: data.msg,
            })
            close()
        } catch (data) {
            close()
            Toast.info({
                content: data.msg || '服务器繁忙,请稍后再试',
            })
        }
    }
}

export default connect(
    ({ userInfo, config }: IInitState) => ({
        userInfo,
        config
    })
)(Wallet)