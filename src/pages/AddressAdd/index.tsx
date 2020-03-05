import React, { Component } from 'react'
import { http } from 'src/utils'
import { Toast, MobileLayout, NavBar, Button, Item, Radio, Image, Form } from 'components'
import { RouteComponentProps } from 'react-router-dom'
import { ButtonThemeData, BorderRadius, Color, getUnit, ItemThemeData } from 'src/components/lib/utils'
import { IFormFun, IFormItem } from 'src/components/lib/Form'

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

export default class AddressAdd extends Component<RouteComponentProps<any>, IState> {

    public state: IState = {

    }

    private page = 1

    private fn?: IFormFun

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
                            保存
                        </Button>
                    </div>
                }
            >
                <div style={{ padding: getUnit(10) }}>
                    <Form getItems={this.getItems}/>
                </div>
            </MobileLayout>
        )
    }

    public componentDidMount() {
        this.getData()
    }

    private getItems = (fn: IFormFun) => {
        this.fn = fn
        const items: IFormItem[] = [{
            component: 'ItemInput',
            props: {
                title: '收货人',
                placeholder: '填写姓名',
            },
            field: 'name'
        }, {
            component: 'ItemInput',
            props: {
                title: '联系电话',
                placeholder: '填写手机号',
                type: 'tel',
                maxLength: 11,
            },
            field: 'tel'
        },{
            component: 'ItemInput',
            props: {
                title: '详细地址',
                placeholder: '请填写详细地址',
            },
            field: 'address'
        }]
        return items
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