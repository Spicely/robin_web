import React, { Component } from 'react'
import { Picker } from 'antd-mobile'
import { http } from 'src/utils'
import { Toast, MobileLayout, NavBar, Button, Item, Radio, Image, Form, district, Divider } from 'components'
import { RouteComponentProps } from 'react-router-dom'
import { ButtonThemeData, BorderRadius, Color, getUnit, ItemThemeData } from 'src/components/lib/utils'
import { IFormFun, IFormItem } from 'src/components/lib/Form'
import { IInitState, IGlobal } from 'src/store/state'
import { connect, DispatchProp } from 'react-redux'
import { SET_USERINFO_DATA } from 'src/store/actions'

interface IState {
    pickerValue: string[]
}

interface IProps {
    userInfo: IGlobal.UserInfo
}

const buttonTheme = new ButtonThemeData({
    width: '80%',
    borderRadius: BorderRadius.all(20),
    buttonColor: Color.fromRGB(0, 0, 0)
})

class UserName extends Component<IProps & RouteComponentProps<any> & DispatchProp, IState> {

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
                        title={'修改用户名'}
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
        const { userInfo } = this.props
        this.fn?.setFieldValue(userInfo)
    }

    private getItems = (fn: IFormFun) => {
        this.fn = fn
        const items: IFormItem[] = [{
            component: 'ItemInput',
            props: {
                title: '用户名',
                placeholder: '请填写用户名',
            },
            field: 'user_name'
        }]
        return items
    }

    private handleBack = () => {
        const { history } = this.props
        history.goBack()
    }

    private handleOk = async () => {
        if (this.fn) {
            const data = this.fn.getFieldValue()
            if (!data.user_name) {
                Toast.info({
                    content: '请填写用户名',
                })
                return
            }
            const close = Toast.loading()
            try {
                const res = await http('/wxapp/users/setUserInfo', data)
                const { userInfo, dispatch } = this.props
                userInfo.user_name = data.user_name
                dispatch({ type: SET_USERINFO_DATA, data: { ...userInfo } })
                close()
                Toast.info({
                    content: res.msg
                })
                const { history } = this.props
                history.goBack()
            } catch (data) {
                close()
                Toast.info({
                    content: data.msg || '服务器繁忙,请稍后再试',
                })
            }
        }
    }

}

export default connect(
    ({ userInfo }: IInitState) => ({
        userInfo
    })
)(UserName)