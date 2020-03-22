import React, { Component } from 'react'
import { http } from 'src/utils'
import { Toast, MobileLayout, NavBar, Image, Button, Icon } from 'components'
import { Steps } from 'antd-mobile'
import { RouteComponentProps, withRouter } from 'react-router-dom'
import { getUnit, NavBarThemeData, IconThemeData, Color, ButtonThemeData, BorderRadius } from 'src/components/lib/utils'
import styled from 'styled-components'
import { IInitState, IGlobal } from 'src/store/state'
import { connect, DispatchProp } from 'react-redux'
import { SET_USERINFO_DATA, SET_SELECTED_DATA } from 'src/store/actions'

const Step = Steps.Step;

interface IProps extends DispatchProp {
    userInfo: IGlobal.UserInfo
}

const TText = styled.div`
    font-size: ${getUnit(16)};
    font-family: PingFang SC;
    font-weight: 400;
    line-height: ${getUnit(24)};
    color: rgba(34,34,34,1);
`

const LText = styled.div`
    font-size: ${getUnit(14)};
    font-family: PingFang SC;
    font-weight: 400;
    line-height:${getUnit(24)};
    color: rgba(155,161,175,1);
`

const backButton = new ButtonThemeData({
    width: 150,
    height: 45,
    buttonColor: Color.fromRGB(47, 153, 253),
    color: Color.fromRGB(255, 255, 255),
    fontSize: 16,
    borderRadius: BorderRadius.all(5),
})

const LSteps = styled(Steps)`
    .am-steps-item-process .am-steps-item-icon > .am-steps-icon {
        line-height: 22px;
    }
    .am-steps-item-title div {
        font-weight: initial !important;
    }
`

interface IState {
    examineStatus: number
}

class Team extends Component<IProps & RouteComponentProps<any>, IState> {

    public state: IState = {
        examineStatus: 1
    }

    public render(): JSX.Element {
        const { userInfo } = this.props
        const examineStatus = userInfo.userInfo?.examineStatus || 0
        return (
            <div style={{ paddingTop: getUnit(30) }}>
                <div className="flex_center">
                    <Image
                        src={require('../../assets/search.png')}
                        style={{ width: getUnit(116), height: getUnit(116) }}
                    />
                </div>
                <TText className="flex_center">您的认证资料已提交！</TText>
                <LText className="flex_center">我们会尽快审核您的资料，请耐心等待～</LText>
                <div className="flex_center">
                    <div style={{ width: getUnit(200), marginTop: getUnit(40) }}>
                        <LSteps current={examineStatus + 1}>
                            <Step
                                title={<div style={{ fontSize: getUnit(18), color: '#000', fontWeight: 'bold' }}> 认证资料已提交</div>}
                                icon={
                                    <div className="flex_center" style={{ borderRadius: '50%', background: '#2F99FD', width: getUnit(25), height: getUnit(25) }}>
                                        <Icon icon="md-checkmark" theme={new IconThemeData({ color: Color.fromRGB(255, 255, 255) })} />
                                    </div>
                                }
                            />
                            <Step
                                title={<div style={{ fontSize: getUnit(18), color: '#000', fontWeight: 'bold' }}>审核中请耐心等待</div>}
                                icon={
                                    <div className="flex_center" style={{ borderRadius: '50%', background: '#2F99FD', width: getUnit(25), height: getUnit(25) }}>
                                        <Icon icon="md-checkmark" theme={new IconThemeData({ color: Color.fromRGB(255, 255, 255) })} />
                                    </div>
                                }
                            />
                            {examineStatus < 2 ? <Step
                                title={<div style={{ opacity: 0.5, fontSize: getUnit(18), color: '#000', fontWeight: 'bold' }}>审核成功/失败</div>}
                                icon={
                                    <div className="flex_center" style={{ borderRadius: '50%', background: '#DEDEDE', width: getUnit(25), height: getUnit(25) }}>
                                        <Icon icon="ios-more" theme={new IconThemeData({ color: Color.fromRGB(255, 255, 255) })} />
                                    </div>
                                }
                            />
                                : examineStatus === 2 ? <Step title={<div style={{ fontSize: getUnit(18), color: '#000', fontWeight: 'bold' }}>审核成功</div>} />
                                    : <Step status="error" title={<div style={{ opacity: 0.5, fontSize: getUnit(18), color: 'red', fontWeight: 'bold' }}>审核失败</div>} />}
                        </LSteps>
                    </div>
                </div>
                <div className="flex" style={{ padding: `0 ${getUnit(20)}`, marginTop: getUnit(60) }}>
                    <div className="flex_1 flex_center">
                        {examineStatus === 3 && <Button mold="primary" theme={backButton} onClick={this.reRenzheng}>重新认证</Button>}

                    </div>
                </div>
            </div>
        )
    }

    public componentDidMount() {
        this.getData()
    }

    private getData = async () => {
        const close = Toast.loading()
        const { userInfo, dispatch } = this.props
        try {
            const data = await http('user/getUser', {
                userId: userInfo.id
            })
            dispatch({ type: SET_USERINFO_DATA, data: data.data })
            close()
        } catch (data) {
            dispatch({ type: SET_USERINFO_DATA, data: {} })
            close()
        }
    }

    private handleBack = () => {
        const { history, dispatch } = this.props
        history.replace('/')
        dispatch({ type: SET_SELECTED_DATA, data: 0 })
    }

    private reRenzheng = async () => {
        const close = Toast.loading()
        try {
            const { history, userInfo, dispatch } = this.props
            await http('user/reAuthen', {
                userId: userInfo.id,
                id: userInfo.userInfo?.id
            })
            userInfo.userInfo = undefined
            dispatch({ type: SET_USERINFO_DATA, data: { ...userInfo } })
            close()
            history.replace('/authen')
        } catch (data) {
            close()
            Toast.info({
                content: data.msg || '服务器繁忙,请稍后再试',
            })
        }
    }

}
export default connect(
    ({ userInfo }: IInitState) => ({
        userInfo
    })
)(withRouter(Team))