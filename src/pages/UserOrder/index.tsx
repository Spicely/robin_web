import React, { Component } from 'react'
import { http } from 'src/utils'
import { Toast, MobileLayout, NavBar, Button, Image, Gird } from 'components'
import { RouteComponentProps } from 'react-router-dom'
import { ButtonThemeData, BorderRadius, Color, getUnit, ItemThemeData } from 'src/components/lib/utils'

interface IState {
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

    }

    private page = 1

    public render(): JSX.Element {
        return (
            <MobileLayout
                backgroundColor="rgb(248, 248, 248)"
                appBar={
                    <NavBar
                        onBack={this.handleBack}
                        title="我的订单"
                        titleCenter
                        fixed
                    />
                }
            >
                <div style={{ padding: `0 ${getUnit(10)}` }}>
                    <Gird style={{ marginTop: getUnit(10) }}>
                        <Gird.Item
                            theme={itemTheme}
                            title={
                                <div className="flex">
                                    <div className="flex_justify">
                                        <Image src={require('../../assets/v2_q5sqq0.png')} style={{ width: getUnit(12), height: getUnit(12), marginRight: getUnit(10) }} />
                                    </div>
                                    <div style={{ color: 'rgb(16, 16, 16)', fontSize: getUnit(12) }}>北京市西城区筒子胡同101号</div>
                                </div>
                            }
                        />
                        <Gird.Item
                            theme={vitemTheme}
                            title={
                                <div>
                                    <div className="flex">
                                        <Image src={require('../../assets/3.png')} style={{ width: getUnit(38), height: getUnit(38), marginRight: getUnit(10) }} />
                                        <div className="flex_justify flex_1" style={{ color: 'rgb(16, 16, 16)', fontSize: getUnit(14) }}>北京市西城区筒子胡同101号</div>
                                        <div className="flex_justify" style={{ color: 'rgba(187, 187, 187, 1)', fontSize: getUnit(12) }}>X1</div>
                                    </div>
                                    <div className="flex">
                                        <div className="flex_1 flex_justify" style={{ color: 'rgba(172, 172, 172, 1)', fontSize: getUnit(10), lineHeight: getUnit(30) }}>2019-04-20  09:04</div>
                                        <div className="flex_justify" style={{ color: 'rgb(16, 16, 16)', fontSize: getUnit(11), lineHeight: getUnit(30) }}>共1件商品  合计：</div>
                                        <div style={{ color: 'rgb(16, 16, 16)', fontSize: getUnit(14), lineHeight: getUnit(30) }}>¥10000</div>
                                    </div>
                                    <div className="flex">
                                        <div className="flex_1" />
                                        <Button theme={buttonTheme}>确认收货</Button>
                                    </div>
                                </div>
                            }
                        />
                    </Gird>
                </div>
            </MobileLayout>
        )
    }

    public componentDidMount() {
        this.getData()
    }

    private handleFirst = (success: () => void) => {
        // const { match } = this.props
        // const close = Toast.loading()
        // http('news/hd_question', {
        //     order_id: match.params.id,
        //     number: 10,
        //     page: this.page++
        // }).then((data: any) => {
        //     let { dataList } = this.state
        //     dataList = dataList.concat(data.msg)
        //     if (data.msg.length) {
        //         success()
        //     }
        //     close()
        //     this.setState({
        //         queryText: '',
        //         visibleQ1: false,
        //         dataList
        //     })
        // }).catch((data: any) => {
        //     close()
        //     Toast.info({
        //         content: data.msg || '服务器繁忙,请稍后再试',
        //     })
        // })
    }

    private handleAddAddress = () => {
        const { history } = this.props
        history.push('/addressAdd')
    }


    private getData = async () => {
        try {
            const { match } = this.props
            const data = await http('news/get_order_info', {
                order_id: match.params.id
            })
            this.setState({
                ...data.msg
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