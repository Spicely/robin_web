import React, { Component } from 'react'
import { http } from 'src/utils'
import { Toast, MobileLayout, NavBar, Button, Item, Radio, Image } from 'components'
import { RouteComponentProps } from 'react-router-dom'
import { ButtonThemeData, BorderRadius, Color, getUnit, ItemThemeData } from 'src/components/lib/utils'
import { connect } from 'react-redux'
import { IInitState, IGlobal } from 'src/store/state'

interface IState {
}

interface IProps extends RouteComponentProps<any> {
    userAddressList: IGlobal.UserAddressList[]
}

const buttonTheme = new ButtonThemeData({
    width: '80%',
    borderRadius: BorderRadius.all(20),
    buttonColor: Color.fromRGB(0, 0, 0)
})

const itemTheme = new ItemThemeData({
    minHeight: 60
})

class AddressList extends Component<IProps, IState> {

    public state: IState = {

    }

    public render(): JSX.Element {
        const { userAddressList } = this.props
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
                emptyElement={
                    <div style={{ marginTop: getUnit(100) }}>
                        <div className="flex_center">
                            <Image src={require('../../assets/v2_q5w0tr.png')} style={{ height: getUnit(77), width: getUnit(77) }} />
                        </div>
                        <div className="flex_center" style={{ color: 'rgba(163, 163, 163, 1)', fontSize: getUnit(15), lineHeight: getUnit(40) }}>没有数据</div>
                    </div>
                }
                footer={
                    <div className="flex_center" style={{ marginBottom: getUnit(10) }}>
                        <Button
                            theme={buttonTheme}
                            mold="primary"
                            onClick={this.handleAddAddress}
                        >
                            新增地址
                        </Button>
                    </div>
                }
            >
                <div style={{ padding: getUnit(10) }}>
                    {
                        userAddressList.map((i, index: number) => {
                            return (
                                <Item
                                    key={index}
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
                            )
                        })
                    }
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
            const close = Toast.loading()
            const data = await http('wxapp/goods/getCartData')
            close()
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

export default connect(
    ({ userAddressList }: IInitState) => ({
        userAddressList
    })
)(AddressList as any)