import React, { Component } from 'react'
import { http } from 'src/utils'
import { Toast, MobileLayout, NavBar, Button, Item, Radio, Image } from 'components'
import { RouteComponentProps } from 'react-router-dom'
import { ButtonThemeData, BorderRadius, Color, getUnit, ItemThemeData } from 'src/components/lib/utils'

interface IState {
}

const buttonTheme = new ButtonThemeData({
    width: '80%',
    borderRadius: BorderRadius.all(20),
    buttonColor: Color.fromRGB(0, 0, 0)
})

const itemTheme = new ItemThemeData({
    minHeight: 60
})

export default class AddressList extends Component<RouteComponentProps<any>, IState> {

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
                        title="编辑地址"
                        titleCenter
                        fixed
                    />
                }
                footer={
                    <div className="flex_center" style={{ marginBottom: getUnit(10) }}>
                        <Button
                            theme={buttonTheme}
                            mold="primary"
                        >
                            新增地址
                        </Button>
                    </div>
                }
            >
                <div style={{ padding: getUnit(10) }}>
                    <Item
                        theme={itemTheme}
                        title={
                            <Radio
                                type="square"
                                iconStyle={{ borderRadius: '50%' }}
                            >
                                <div>
                                    <div style={{ fontSize: getUnit(13) }}>张三，13000000000</div>
                                    <div style={{ fontSize: getUnit(12), color: 'rgb(158, 158, 158)' }}>浙江省杭州市西湖区文三路 01号通信大厦 7 楼 501</div>
                                </div>
                            </Radio>
                        }
                        icon={
                            <Image src={require('../../assets/v2_q5sqq0.png')} style={{ width: getUnit(15), height: getUnit(15), marginRight: getUnit(10) }} />
                        }
                        link
                    />
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