import React, { Component } from 'react'
import { http } from 'src/utils'
import { Toast, MobileLayout, NavBar, Button, Item, Input } from 'components'
import { RouteComponentProps } from 'react-router-dom'
import { Steps } from 'antd-mobile'
import { ButtonThemeData, BorderRadius, getUnit } from 'src/components/lib/utils'
import { connect, DispatchProp } from 'react-redux'
import { IInitState, IGlobal } from 'src/store/state'
import { SET_USERADDRESSLIST_DATA } from 'src/store/actions'
import styled from 'styled-components'

const Step = Steps.Step;

interface IState {
}

interface IProps extends RouteComponentProps<any> {
    userAddressList: IGlobal.UserAddressList[]
}

const LSteps = styled(Steps)`
    .am-steps-item-tail {
        top: 0%;
    }
`

const RIcon = styled.div`
    display: inline-block;
    color: #2F99FD; 
    width: ${getUnit(22)};
    height: ${getUnit(22)};
    border-radius: 50%;
    background: #fff;
    line-height: ${getUnit(22)};
`

const Etv = styled.div`
    width: ${getUnit(32)};
    height: ${getUnit(2)};
    background:linear-gradient(270deg,rgba(170,203,245,1) 0%,rgba(170,203,245,0) 100%);
    position: relative;
    margin-right: ${getUnit(20)};
    ::before {
        content: '';
        position: absolute;
        width: ${getUnit(4)};
        height: ${getUnit(4)};
        background: #2F99FD;
        border-radius: 50%;
        right: ${getUnit(-2)};
        top: ${getUnit(-1)};
    }
`

const Rtv = styled.div`
    width: ${getUnit(32)};
    height: ${getUnit(2)};
    background:linear-gradient(270deg,rgba(170,203,245,0) 0%, rgba(170,203,245,1) 100%);
    position: relative;
    margin-left: ${getUnit(20)};
    ::before {
        content: '';
        position: absolute;
        width: ${getUnit(4)};
        height: ${getUnit(4)};
        background: #2F99FD;
        border-radius: 50%;
        left: ${getUnit(-2)};
        top: ${getUnit(-1)};
    }
`

const VButton = styled(Button)`
    width: 100%;
    border: 0;
    border-radius: 0 0 ${getUnit(5)} ${getUnit(5)};
    height: ${getUnit(40)};
    span {
        font-size: ${getUnit(14)};
    }
`

const ImgBox = styled.div`
    width: 100%;
    height: ${getUnit(122)};
    background: rgba(238,245,254,0.5);
    opacity: 1;
    border-radius: ${getUnit(5)} ${getUnit(5)} 0 0;
    background-Size: ${getUnit(103)} ${getUnit(64)};
    background-repeat: no-repeat;
    background-position: center;
`

const PLabel = styled.div`
    font-size: ${getUnit(14)};
    font-family: PingFang SC;
    font-weight: 400;
    line-height: ${getUnit(20)};
    color: rgba(34,34,34,1);
`

const LInput = styled(Input)`
    width: 100%;
    height: ${getUnit(44)};
    background: rgba(238,245,254,0.5);
    border-radius: ${getUnit(5)};
    >div {
        border: 0;
    }
    input {
        text-align: right;
    }
`

const buttonThme = new ButtonThemeData({
    height: 45,
    width: 260,
    borderRadius: BorderRadius.all(5),
    fontSize: 16,
})

class AuthenOne extends Component<IProps & DispatchProp, IState> {

    public state: IState = {

    }

    public render(): JSX.Element {
        return (
            <MobileLayout
                backgroundColor="rgb(248, 248, 248)"
                appBar={
                    <NavBar
                        fixed
                        divider={false}
                        onBack={this.handleBack}
                        style={{ background: 'rgba(0, 0, 0, 0)' }}
                    />
                }
            >
                <div
                    style={{ padding: `${getUnit(50)} ${getUnit(20)} 0 ${getUnit(20)}`, background: `url(${require('../../assets/bg_q.png')}) no-repeat`, backgroundSize: '100% auto' }}
                >
                    <LSteps direction="horizontal" current={0}>
                        <Step
                            title={<div style={{ fontSize: getUnit(12), color: '#fff', fontWeight: 'initial' }}>上传身份证</div>} icon={<RIcon>1</RIcon>}
                        />
                        <Step
                            title={<div style={{ opacity: 0.5, fontSize: getUnit(12), color: '#fff', fontWeight: 'initial' }}>基本信息</div>}
                            icon={<RIcon style={{ opacity: 0.5 }}>2</RIcon>}
                        />
                        <Step
                            title={<div style={{ opacity: 0.5, fontSize: getUnit(12), color: '#fff', fontWeight: 'initial' }}>银行卡认证</div>}
                            icon={<RIcon style={{ opacity: 0.5 }}>3</RIcon>}
                        />
                    </LSteps>
                    <div style={{ marginTop: getUnit(30), background: '#fff', borderRadius: getUnit(5), padding: `${getUnit(20)} ${getUnit(10)}`, boxShadow: `0 ${getUnit(5)} ${getUnit(5)} #ccc` }}>
                        <div className="flex_center">
                            <span className="flex">
                                <div className="flex_justify">
                                    <Etv />
                                </div>
                                <PLabel>请拍摄并上传您的身份证照片</PLabel>
                                <div className="flex_justify">
                                    <Rtv />
                                </div>
                            </span>
                        </div>
                        <div className="flex" style={{ marginTop: getUnit(20) }}>
                            <div className="flex_1" style={{ marginRight: getUnit(10) }}>
                                <ImgBox style={{ backgroundImage: `url(${require('../../assets/c_2.png')})` }}>

                                </ImgBox>
                                <VButton mold="primary">拍摄正面照</VButton>
                            </div>
                            <div className="flex_1">
                                <ImgBox style={{ backgroundImage: `url(${require('../../assets/c_1.png')})` }}></ImgBox>
                                <VButton mold="primary">拍摄背面照</VButton>
                            </div>
                        </div>
                        <Item
                            style={{ marginTop: getUnit(15) }}
                            title="本人姓名："
                            value={<LInput placeholder="请填写本人真实姓名" />}
                            lineType="none"
                            icon={null}
                        />
                        <Item
                            style={{ marginTop: getUnit(10), marginBottom: getUnit(10) }}
                            title="身份证号："
                            value={<LInput placeholder="请填写您的身份证号码" />}
                            icon={null}
                        />
                    </div>
                    <div className="flex_center" style={{ marginTop: getUnit(40) }}>
                        <Button
                            mold="primary"
                            theme={buttonThme}
                        >
                            下一步，基本信息填写
                        </Button>
                    </div>
                </div>
            </MobileLayout >
        )
    }

    public componentDidMount() {
        // this.getData()
    }

    private handleEdit = (id: number) => {
        const { history } = this.props
        history.push(`/addressAdd/${id}`)
    }

    private handleAddAddress = () => {
        const { history } = this.props
        history.push('/addressAdd')
    }


    private getData = async () => {
        try {
            const { dispatch } = this.props
            const close = Toast.loading()
            const data = await http('wxapp/goods/getAddressData')
            dispatch({ type: SET_USERADDRESSLIST_DATA, data: data.address_data })
            close()
        } catch (data) {
            Toast.info({
                content: data.msg || '服务器繁忙,请稍后再试',
            })
        }
    }

    private handleBack = () => {
        const { history } = this.props
        history.goBack()
    }
}

export default connect(
    ({ userAddressList }: IInitState) => ({
        userAddressList
    })
)(AuthenOne as any)