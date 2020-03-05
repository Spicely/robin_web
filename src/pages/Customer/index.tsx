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

export default class Customer extends Component<RouteComponentProps<any>, IState> {

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
                        title="我的客户"
                        titleCenter
                        fixed
                    />
                }
            >
                <div style={{ padding: getUnit(10) }}>
                    <Item
                        theme={itemTheme}
                        title={
                            <div className="flex">
                                <div>
                                    <div style={{ fontSize: getUnit(13) }} >
                                        刘三
                                    </div>
                                    <div style={{ fontSize: getUnit(14) }}>￥10000</div>
                                </div>
                                <div
                                    className="flex_1"
                                    style={{ color: 'rgb(194, 194, 194)', fontSize: getUnit(10) }}
                                >
                                    2020-03-21 06:23:21
                                    </div>
                                <div>
                                    <div style={{ textAlign: 'right', color: 'rgb(194, 194, 194)', fontSize: getUnit(10) }}>13888888888</div>
                                    <div style={{ textAlign: 'right', color: 'rgb(194, 194, 194)', fontSize: getUnit(10) }}>邀请码：ahrimane</div>
                                </div>
                            </div>
                        }
                        link={null}
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