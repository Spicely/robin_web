import React, { Component } from 'react'
import { http } from 'src/utils'
import { Toast, MobileLayout, NavBar, Button, Gird, Form } from 'components'
import { RouteComponentProps } from 'react-router-dom'
import { getUnit, ButtonThemeData, BorderRadius, Color } from 'src/components/lib/utils'
import { IFormFun, IFormItem } from 'src/components/lib/Form'
import { connect } from 'react-redux'
import { IInitState, IGlobal } from 'src/store/state'
import { Hide} from 'muka'

const buttonTheme = new ButtonThemeData({
    width: '80%',
    borderRadius: BorderRadius.all(20),
    buttonColor: Color.fromRGB(0, 0, 0)
})


interface IProps {
    userInfo: IGlobal.UserInfo
}

class AddBank extends Component<IProps & RouteComponentProps<any>, any> {

    private fn?: IFormFun

    private getItems = (fn: IFormFun) => {
        const { userInfo } = this.props
        this.fn = fn
        const items: IFormItem[] = [{
            component: 'Item',
            props: {
                title: '持卡人',
                value: Hide.fullName(userInfo.realname),
                flexType: 'value'
            },
        }, {
            component: 'Item',
            props: {
                title: '身份证',
                value: Hide.card(userInfo.realcard),
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