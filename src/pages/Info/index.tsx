import React, { Component } from 'react'
import { MobileLayout, Item, NavBar, Button, Image } from 'components'
import { DispatchProp, connect } from 'react-redux'
import { RouteComponentProps } from 'react-router-dom'
import { getUnit, ButtonThemeData, BorderRadius } from 'src/components/lib/utils'
import { IInitState, IGlobal } from 'src/store/state'

interface IProps {
    userInfo: IGlobal.UserInfo
}

const btnTheme = new ButtonThemeData({
    width: '100%',
    borderRadius: BorderRadius.all(5)
})

class Info extends Component<IProps & DispatchProp & RouteComponentProps<any>, any> {

    public render(): JSX.Element {
        const { userInfo } = this.props
        return (
            <MobileLayout
                backgroundColor="rgb(248, 248, 248)"
                appBar={
                    <NavBar
                        onBack={this.handleBack}
                        title="个人资料"
                        titleCenter
                    />
                }
                emptyElement={
                    <div style={{ marginTop: getUnit(100) }}>
                        <div className="flex_center">
                            <Image src={require('../../assets/v2_q5w0tr.png')} style={{ height: getUnit(77), width: getUnit(77) }} />
                        </div>
                        <div className="flex_center" style={{ color: 'rgba(163, 163, 163, 1)', fontSize: getUnit(15), lineHeight: getUnit(40) }}>没有数据</div>
                    </div>
                }
            >
                <div style={{ padding: getUnit(10) }}>
                    <Item
                        title="头像"
                        value={
                            <Image
                                src={require('../../assets/v2_q5sp1k.png')}
                                style={{ width: getUnit(40), height: getUnit(40) }}
                            />
                        }
                        link={null}
                    />
                    <Item
                        title="用户名"
                        value={userInfo.user_name}
                        link
                    />
                    <Item
                        title="性别"
                        value={userInfo.user_sex === 0 ? '男' : '女'}
                        link
                    />
                    <Item
                        title="绑定手机号"
                        value={userInfo.user_phone}
                        link
                    />
                    {/* <Item
                        title="设置登录密码"
                        link
                    /> */}
                    <Item
                        title="设置交易密码"
                        link
                        onPress={() => {
                            const { history} = this.props
                            history.push('/payPass')
                        }}
                    />
                    <div style={{ background: '#fff', padding: `${getUnit(10)} ${getUnit(20)}` }}>
                        <Button mold="primary" theme={btnTheme}>退出登录</Button>
                    </div>
                </div>
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
)(Info)