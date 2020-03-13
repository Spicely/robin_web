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

export default class AddressAdd extends Component<RouteComponentProps<any>, IState> {

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
                        title={params.id ? '编辑地址' : '新增地址'}
                        titleCenter
                        fixed
                    />
                }
                footer={
                    <div className="flex_center" style={{ marginBottom: getUnit(10) }}>
                        <Button
                            theme={buttonTheme}
                            mold="primary"
                            onClick={this.handleOk}
                        >
                            保存
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

    public componentDidMount() {
        const { params } = this.props.match
        if (params.id) {
            this.getData(params.id)
        }
    }

    private getData = async (id: string) => {
        try {
            const close = Toast.loading()
            const res = await http('wxapp/goods/getAddressDetail', {
                address_id: id
            })
            console.log(res)
            const address = this.handlePickerLabel([res.address_data.address_province, res.address_data.address_city, res.address_data.address_area])
            console.log(address)
            this.fn && this.fn.setFieldValue({
                name: res.address_data.address_name,
                phone: res.address_data.address_phone,
                info: res.address_data.address_info,
                address
            })
            close()
        } catch (data) {
            Toast.info({
                content: data.msg || '服务器繁忙,请稍后再试',
            })
        }
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
            field: 'phone'
        }, {
            component: 'Label',
            props: {
                value: []
            },
            render: (val) => (
                <Picker
                    extra="请选择(可选)"
                    data={district}
                    value={val.map((i: any) => i.value)}
                    onOk={this.handlePickerValue}
                >
                    <div className="mk_divider">
                        <Item
                            title="所在区域"
                            flexType="value"
                            value={
                                <div style={{ marginLeft: getUnit(10) }}>{val.length ? val.map((i: any) => i.label).join('-') : '选择省/市/区'}</div>
                            }
                        />
                    </div>
                </Picker>
            ),
            field: 'address'
        }, {
            component: 'ItemInput',
            props: {
                title: '详细地址',
                placeholder: '请填写详细地址',
            },
            field: 'info'
        }]
        return items
    }

    private handlePickerLabel = (v: any) => {
        const newVal: any[] = []
        district.forEach((i) => {
            if (i.label === v[0]) {
                newVal.push({
                    label: i.label,
                    value: v[0]
                })
                if (i.children) {
                    i.children.forEach((t: any) => {
                        if (t.label === v[1]) {
                            newVal.push({
                                label: t.label,
                                value: v[1]
                            })
                            if (t.children) {
                                t.children.forEach((f: any) => {
                                    if (f.label === v[2]) {
                                        newVal.push({
                                            label: f.label,
                                            value: v[2]
                                        })
                                    }
                                })
                            }
                        }
                    })
                }
            }
        })
        return newVal
    }

    private handlePickerValue = (v: any) => {
        const newVal: any[] = []
        district.forEach((i) => {
            if (i.value === v[0]) {
                newVal.push({
                    label: i.label,
                    value: v[0]
                })
                if (i.children) {
                    i.children.forEach((t: any) => {
                        if (t.value === v[1]) {
                            newVal.push({
                                label: t.label,
                                value: v[1]
                            })
                            if (t.children) {
                                t.children.forEach((f: any) => {
                                    if (f.value === v[2]) {
                                        newVal.push({
                                            label: f.label,
                                            value: v[2]
                                        })
                                    }
                                })
                            }
                        }
                    })
                }
            }
        })
        this.fn && this.fn.setFieldValue({
            address: newVal
        })
    }

    private handleBack = () => {
        const { history } = this.props
        history.goBack()
    }

    private handleOk = async () => {
        try {
            if (this.fn) {
                const data = this.fn.getFieldValue()
                if (!data.name) {
                    Toast.info({
                        content: '请填写收货人姓名',
                    })
                    return
                }
                if (!data.phone) {
                    Toast.info({
                        content: '请填写收货人手机号',
                    })
                    return
                }
                if (!data.address.length) {
                    Toast.info({
                        content: '请选择所在区域',
                    })
                    return
                }
                if (!data.info) {
                    Toast.info({
                        content: '请填写收详细地址',
                    })
                    return
                }
                const close = Toast.loading()
                let url = 'wxapp/goods/addAddress'
                const { params } = this.props.match
                if (params.id) {
                    url = 'wxapp/goods/editAddress'
                }
                const res = await http(url, {
                    ...data,
                    province: data.address[0].label,
                    city: data.address[1].label,
                    area: data.address[2].label,
                    adid: params.id,
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