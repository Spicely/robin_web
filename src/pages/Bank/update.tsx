import React, { Component } from 'react'
import { http } from 'src/utils'
import { Toast, MobileLayout, NavBar, Button, Gird, Form } from 'components'
import { RouteComponentProps } from 'react-router-dom'
import { getUnit, ButtonThemeData, BorderRadius, Color } from 'src/components/lib/utils'
import { IFormFun, IFormItem } from 'src/components/lib/Form'
import { connect, DispatchProp } from 'react-redux'
import { IInitState, IGlobal } from 'src/store/state'

const buttonTheme = new ButtonThemeData({
    width: '80%',
    borderRadius: BorderRadius.all(20),
    buttonColor: Color.fromRGB(0, 0, 0)
})


interface IProps extends DispatchProp {
    userInfo: IGlobal.UserInfo
}

class UpdateInfo extends Component<IProps & RouteComponentProps<any>, any> {

    private fn?: IFormFun

    private getItems = (fn: IFormFun) => {
        this.fn = fn
        const items: IFormItem[] = [{
            component: 'ItemInput',
            props: {
                title: '持卡人',
                flexType: 'value'
            },
            field: 'realname'
        }, {
            component: 'ItemInput',
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
                        title="修改信息"
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
                            确认
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
        const close = Toast.loading()
        try {
            const { id } = this.props.match.params
            const { data } = await http('/wxapp/users/findBanks', { bankId: id })
            this.fn?.setFieldValue(data)
            close()
        } catch (data) {
            close()
            Toast.info({
                content: data.msg || '服务器繁忙,请稍后再试',
            })
        }
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
                const { id } = this.props.match.params
                const { msg } = await http('/wxapp/users/editBanks', {
                    ...params,
                    bankId: id
                })
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
)(UpdateInfo)