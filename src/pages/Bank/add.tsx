import React, { Component } from 'react'
import { http } from 'src/utils'
import { Toast, MobileLayout, NavBar, Item, Image, Button, Gird, Form } from 'components'
import { RouteComponentProps } from 'react-router-dom'
import { getUnit, ButtonThemeData, BorderRadius, Color } from 'src/components/lib/utils'
import styled from 'styled-components'
import { IFormFun, IFormItem } from 'src/components/lib/Form'

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

export default class AddBank extends Component<RouteComponentProps<any>, IState> {



    private fn?: IFormFun

    private getItems = (fn: IFormFun) => {
        this.fn = fn
        const items: IFormItem[] = [{
            component: 'Item',
            props: {
                title: '持卡人',
                value: '*皓',
                flexType: 'value'
            },
        }, {
            component: 'Item',
            props: {
                title: '身份证',
                value: '430*****************10',
                flexType: 'value'
            },
        }, {
            component: 'ItemInput',
            props: {
                title: '银行卡',
                placeholder: '请输入银行卡名称',
            },
            field: 'bank_name'
        }, {
            component: 'ItemInput',
            props: {
                title: '卡 号',
                placeholder: '请输入银行卡卡号',
            },
            field: 'bank_number'
        },]
        return items
    }

    public state: IState = {}

    public render(): JSX.Element {
        return (
            <MobileLayout
                backgroundColor="rgb(248, 248, 248)"
                appBar={
                    <NavBar
                        onBack={this.handleBack}
                        title="添加银行卡"
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
                            绑定银行卡
                        </Button>
                    </div>
                }

            >
                <Gird style={{ margin: getUnit(10), overflow: 'hidden', borderRadius: getUnit(5) }}>
                    <Form getItems={this.getItems} />
                </Gird>
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