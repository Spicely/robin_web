import React, { Component, ChangeEvent } from 'react'
import { MobileLayout, Item, NavBar, Button, Image, Toast } from 'components'
import { DispatchProp, connect } from 'react-redux'
import { RouteComponentProps } from 'react-router-dom'
import { getUnit, ButtonThemeData, BorderRadius } from 'src/components/lib/utils'
import { IInitState, IGlobal } from 'src/store/state'
import { SET_SELECTED_DATA, SET_USERINFO_DATA } from 'src/store/actions'
import { ActionSheet } from 'antd-mobile'
import { http, imgUrl } from 'src/utils'

interface IProps {
    userInfo: IGlobal.UserInfo
}

const btnTheme = new ButtonThemeData({
    width: '100%',
    borderRadius: BorderRadius.all(5)
})

class Info extends Component<IProps & DispatchProp & RouteComponentProps<any>, any> {

    private file: any

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
                                src={imgUrl + userInfo.user_image}
                                style={{ width: getUnit(40), height: getUnit(40) }}
                            />
                        }
                        link={null}
                        onPress={() => { this.file.click() }}
                    />
                    <Item
                        title="用户名"
                        value={userInfo.user_name}
                        link
                        onPress={() => {
                            const { history } = this.props
                            history.push('/userName')
                        }}
                    />
                    <Item
                        title="性别"
                        value={userInfo.user_sex === 1 ? '男' : '女'}
                        link
                        onPress={this.handleSex}
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
                            const { history } = this.props
                            history.push('/payPass')
                        }}
                    />
                    <div style={{ background: '#fff', padding: `${getUnit(10)} ${getUnit(20)}` }}>
                        <Button mold="primary" theme={btnTheme} onClick={this.handleExit}>退出登录</Button>
                    </div>
                </div>
                <input type="file" ref={(e) => this.file = e} onChange={this.handleFile} style={{ display: 'none' }} />
            </MobileLayout>
        )
    }

    private handleSex = () => {
        ActionSheet.showActionSheetWithOptions({
            options: ['男', '女']
        }, async (buttonIndex: number) => {
            try {
                const { msg } = await http('/wxapp/users/setUserInfo', {
                    sex: buttonIndex + 1
                })
                const { userInfo, dispatch } = this.props
                userInfo.user_sex = buttonIndex + 1
                dispatch({ type: SET_USERINFO_DATA, data: { ...userInfo } })
                Toast.info({
                    content: msg
                })
            } catch (data) {
                Toast.info({
                    content: data.msg || '服务器繁忙,请稍后再试',
                })
            }
        })
    }

    private handleFile = async (e: ChangeEvent<HTMLInputElement>) => {
        let close
        try {
            const fileList = e.currentTarget.files
            const file = fileList?.item(0)
            if (file) {
                close = Toast.loading()
                const form = new FormData()
                form.append('file', file)
                const { data } = await http('/wxapp/users/uPayImg', form)
                const { msg } = await http('/wxapp/users/setUserInfo', {
                    user_image: data
                })
                const { userInfo, dispatch } = this.props
                userInfo.user_image = data
                dispatch({ type: SET_USERINFO_DATA, data: { ...userInfo } })
                close()
                Toast.info({
                    content: msg,
                })
            } else {
                // Toast.info({
                //     content: '请上传'
                // })
            }
        } catch (data) {
            close?.()
            Toast.info({
                content: data.msg || '服务器繁忙,请稍后再试',
            })
        }

    }

    private handleBack = () => {
        const { history } = this.props
        history.goBack()
    }

    private handleExit = () => {
        const { dispatch, history } = this.props
        dispatch({ type: SET_SELECTED_DATA, data: 0 })
        dispatch({ type: SET_USERINFO_DATA, data: {} })
        history.replace('/login')
    }
}

export default connect(
    ({ userInfo }: IInitState) => ({
        userInfo
    })
)(Info)