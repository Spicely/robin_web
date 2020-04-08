import React, { Component } from 'react'
import { Picker } from 'antd-mobile'
import { http } from 'src/utils'
import { Toast, MobileLayout, NavBar, Button, Item, Radio, Image, Form, district, Divider } from 'components'
import { RouteComponentProps } from 'react-router-dom'
import { ButtonThemeData, BorderRadius, Color, getUnit, ItemThemeData } from 'src/components/lib/utils'
import { IFormFun, IFormItem } from 'src/components/lib/Form'

interface IState {
    pickerValue: string[]
}

const buttonTheme = new ButtonThemeData({
    width: '80%',
    borderRadius: BorderRadius.all(20),
    buttonColor: Color.fromRGB(0, 0, 0)
})

export default class PayPass extends Component<RouteComponentProps<any>, IState> {

    public state: IState = {
        pickerValue: []
    }

    private fn?: IFormFun

    public render(): JSX.Element {
        const { params } = this.props.match
        return (
            <MobileLayout
                backgroundColor="rgb(248, 248, 248)"
                appBar={
                    <NavBar
                        onBack={this.handleBack}
                        title="设置交易密码"
                        titleCenter
                    />
                }
                footer={
                    <div className="flex_center" style={{ marginBottom: getUnit(10) }}>
                        <Button
                            theme={buttonTheme}
                            mold="primary"
                            onClick={this.handleOk}
                        >
                            完成
                        </Button>
                    </div>
                }
            >
                <div style={{ padding: getUnit(10) }}>
                    <Form getItems={this.getItems} />

                </div>
            </MobileLayout>
        )
    }

    private getItems = (fn: IFormFun) => {
        this.fn = fn
        const items: IFormItem[] = [{
            component: 'ItemInput',
            props: {
                title: '新密码',
                type: 'tel',
                maxLength: 6,
                placeholder: '设置6位数交易密码',
            },
            field: 'newPwd'
        }, {
            component: 'ItemInput',
            props: {
                title: '确认密码',
                type: 'tel',
                maxLength: 6,
                placeholder: '再次填写以确认',
            },
            field: 'pwd'
        }]
        return items
    }

    private handleBack = () => {
        const { history } = this.props
        history.goBack()
    }

    private handleOk = async () => {
        try {
            if (this.fn) {
                const data = this.fn.getFieldValue()
                if (!data.newPwd || data.newPwd.length !== 6) {
                    Toast.info({
                        content: '请填写6位交易密码',
                    })
                    return
                }
                if (data.newPwd !== data.pwd) {
                    Toast.info({
                        content: '请确认两次密码一致',
                    })
                    return
                }
                const close = Toast.loading()
                const res = await http('/wxapp/users/setPayPwd', {
                    pwd: data.pwd
                })
                close()
                Toast.info({
                    content: res.msg
                })
                const { history } = this.props
                history.goBack()
            }

        } catch (data) {
            Toast.info({
                content: data.msg || '服务器繁忙,请稍后再试',
            })
        }
    }

}