import React, { Component } from 'react'
import { http } from 'src/utils'
import { Toast, MobileLayout, NavBar, Button, Gird, Form } from 'components'
import { RouteComponentProps } from 'react-router-dom'
import { getUnit, ButtonThemeData, BorderRadius, Color } from 'src/components/lib/utils'
import { IFormFun, IFormItem } from 'src/components/lib/Form'
import { connect, DispatchProp } from 'react-redux'
import { IInitState, IGlobal } from 'src/store/state'
import { Hide } from 'muka'

const buttonTheme = new ButtonThemeData({
    width: '80%',
    borderRadius: BorderRadius.all(20),
    buttonColor: Color.fromRGB(0, 0, 0)
})


interface IProps extends DispatchProp {
    userInfo: IGlobal.UserInfo
}

class AddBank extends Component<IProps & RouteComponentProps<any>, any> {

    private fn?: IFormFun

    private getItems = (fn: IFormFun) => {
        this.fn = fn
        const items: IFormItem[] = [{
            component: 'Item',
            props: {
                title: '持卡人',
                flexType: 'value'
            },
            field: 'realname'
        }, {
            component: 'Item',
            props: {
                title: '身份证',
                flexType: 'value'
            },
            field: 'card',
        }, {
            component: 'ItemInput',
            props: {
                title: '开户行',
                placeholder: '请输入银行卡开户行',
            },
            field: 'zname'
        }, {
            component: 'ItemInput',
            props: {
                title: '银行卡',
                placeholder: '请输入银行卡名称',
            },
            field: 'bankname'
        }, {
            component: 'ItemInput',
            props: {
                title: '卡 号',
                placeholder: '请输入银行卡卡号',
            },
            field: 'bankcard'
        },]
        return items
    }

    public render(): JSX.Element {
        return (
            <MobileLayout
                backgroundColor="rgb(248, 248, 248)"
                appBar={
                    <NavBar
                        onBack={this.handleBack}
                        title="添加银行卡"
                        titleCenter
                    />
                }
                footer={
                    <div className="flex_center" style={{ marginBottom: getUnit(10) }}>
                        <Button
                            theme={buttonTheme}
                            mold="primary"
                            async
                            onClick={this.handleAdd}
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
        setTimeout(() => {
            const { userInfo } = this.props
            console.log(this.fn)
            this.fn?.setFieldValue({
                realname: Hide.fullName(userInfo.realname),
                card: Hide.card(userInfo.realcard),
            })
        }, 10)
    }

    private handleAdd = async () => {
        if (this.fn) {
            const params = this.fn.getFieldValue()
            if (!params.zname) {
                Toast.info({
                    content: '请输入银行卡开户行',
                })
                return
            }
            if (!params.bankname) {
                Toast.info({
                    content: '请输入银行卡名称',
                })
                return
            }
            if (!params.bankcard) {
                Toast.info({
                    content: '请输入银行卡卡号',
                })
                return
            }
            try {
                const { msg } = await http('/wxapp/users/addBanks', params)
                const { history } = this.props
                Toast.info({
                    content: msg
                })
                history.goBack()
            } catch (data) {
                Toast.info({
                    content: data.msg || '服务器繁忙,请稍后再试',
                })
            }
        }
    }

    private handleBack = () => {
        const { history } = this.props
        history.goBack()
    }

}

export default connect(
    ({ userInfo }: IInitState) => ({
        userInfo
    })
)(AddBank)