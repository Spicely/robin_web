import React, { Component } from 'react'
import { http } from 'src/utils'
import { Toast, MobileLayout, NavBar, Item, Image, Button, Gird, Form, Icon } from 'components'
import { RouteComponentProps } from 'react-router-dom'
import { getUnit, ButtonThemeData, BorderRadius, Color, IconThemeData } from 'src/components/lib/utils'
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
                title: (
                    <div>
                        <div style={{ lineHeight: getUnit(30), fontSize: getUnit(14), color: 'rgb(16, 16, 16)' }}>持卡人</div>
                        <div style={{ marginBottom: getUnit(10), fontSize: getUnit(14), color: 'rgba(127, 126, 126, 1)' }}>信息仅用于身份验证，我们将保障您的信息安全</div>
                    </div>
                ),
            },
        }, {
            component: 'ItemInput',
            props: {
                title: '姓    名',
                placeholder: '真实姓名',
            },
            field: 'name'
        }, {
            component: 'ItemInput',
            props: {
                title: '身份证',
                placeholder: '身份证号码',
            },
            field: 'id_card'
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
                        title="实名认证"
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
                            下一步
                        </Button>
                    </div>
                }

            >
                <div className="flex" style={{ background: '#fff', padding: `0 ${getUnit(10)}`, height: getUnit(30) }}>
                    <div className="flex_justify">
                        <Icon
                            icon="ios-information-circle-outline"
                            theme={new IconThemeData({ size: 15 })}
                        />
                    </div>
                    <div className="flex_justify" style={{ fontSize: getUnit(11) }}>尚未进行实名认证，您必须通过实名认证后才能绑定银行卡</div>
                </div>
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