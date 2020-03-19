import React, { Component } from 'react'
import { Image, MobileLayout, Toast, Item, Icon, Button, CheckBox } from 'components'
import { http } from '../../utils'
import { Slider } from 'antd-mobile'
import { getUnit, ItemThemeData, } from 'src/components/lib/utils'
import { withRouter, RouteComponentProps, Link } from 'react-router-dom'
import styled from 'styled-components'
import { SET_HOME_DATA } from 'src/store/actions'
import { IInitState, IGlobal } from 'src/store/state'
import { connect, DispatchProp } from 'react-redux'

interface IState {
    data: any[]
    coo: any[]
    visible: boolean
    err: null | any
}

interface IProps extends RouteComponentProps {
    appData: IGlobal.AppData
    userInfo: IGlobal.UserInfo
}

const LSlider = styled(Slider)`
    margin-top: ${getUnit(35)};
    .am-slider-rail {
        height: ${getUnit(5)};
    }
    .am-slider-track {
        height: ${getUnit(5)};
    }
    .am-slider-handle {
        width: ${getUnit(30)};
        height: ${getUnit(30)};
        margin-top: ${getUnit(-12)};
        margin-left: ${getUnit(-15)};
        background: url(${require('../../assets/slider.png')});
        background-size: 100% 100%;
        border: 0;
    }
`

const LButton = styled(Button)`
    margin-top: ${getUnit(30)};
    width: 100%;
    height: ${getUnit(45)};
    background: linear-gradient(45deg,rgba(255,221,90,1) 0%,rgba(253,145,0,1) 100%);
    border-radius: ${getUnit(5)};
    color: #CD0200;
    font-family: PingFang SC;
    font-weight: 500;
    border: 0;
    span {
        font-size: ${getUnit(16)};
    }
`
const SliderLabel = styled.div`
    font-size: ${getUnit(12)};
    font-family: PingFang SC;
    font-weight: bold;
    line-height: ${getUnit(17)};
    color: rgba(34,34,34,1);
`

const PriceBox = styled.div`
    position: relative;
`

const PriceInfo = styled.div`
    position: absolute;
    top: ${getUnit(180)};
    width: calc(100% - ${getUnit(80)});
`
const PriceT = styled.div`
    height: ${getUnit(17)};
    font-size: ${getUnit(12)};
    font-family: PingFang SC;
    font-weight: 400;
    line-height: ${getUnit(17)};
    color: rgba(155,161,175,1);
`

const PriceL = styled.div`
    margin-top: ${getUnit(5)};
    height: ${getUnit(25)};
    font-size: ${getUnit(18)};
    font-family: PingFang SC;
    font-weight: bold;
    line-height: ${getUnit(25)};
    color: rgba(34,34,34,1);
`

const Header = styled.div`
    height: ${getUnit(188)};
    background: url(${require('../../assets/header.png')});
    background-size: 100% 100%;
`
const Pirce = styled.div`
    font-size: ${getUnit(40)};
    font-weight: 600;
    color: #fff;
    top: ${getUnit(65)};
    position: relative;
    left: ${getUnit(40)};
`
const itmeTheme = new ItemThemeData({
    minHeight: 40
})

class Home extends Component<IProps & DispatchProp, IState> {

    public state: IState = {
        data: [],
        coo: [],
        visible: false,
        err: null
    }

    public render(): JSX.Element {
        const { appData, userInfo } = this.props
        return (
            <MobileLayout
                backgroundColor="#fff"
            >
                <Header>
                    <Pirce>
                        {appData.maxPrice}
                    </Pirce>
                </Header>
                <Item
                    theme={itmeTheme}
                    lineType="none"
                    title={
                        <div
                            className="flex_justify"
                            style={{ fontSize: getUnit(12), color: 'rgba(130, 130, 130, 1)' }}
                        >
                            <div className="flex">
                                <div className="flex_justify">
                                    <Image src={require('../../assets/zx.png')} style={{ height: getUnit(16), width: getUnit(47) }} />
                                </div>
                                <div className="flex_1" style={{ marginLeft: getUnit(10) }}>张** | 157****0813  已成功贷款200000元！</div>
                            </div>
                        </div>
                    }
                />
                <PriceBox className="flex_center">
                    <Image src={require('../../assets/info.png')} style={{ width: '100%' }} />
                    <PriceInfo>
                        <div className="flex">
                            <div className="flex_1">
                                <PriceT className="flex_center">借款金额</PriceT>
                                <PriceL className="flex_center">￥50,0000</PriceL>
                            </div>
                            <div className="flex_1">
                                <PriceT className="flex_center">借款期限</PriceT>
                                <PriceL className="flex_center">3个月</PriceL>
                            </div>
                            <div className="flex_1">
                                <PriceT className="flex_center">利息（元）</PriceT>
                                <PriceL className="flex_center">￥360.24</PriceL>
                            </div>
                        </div>
                        <div className="flex_column">
                            <div style={{ padding: `0 ${getUnit(15)}` }}>
                                <LSlider
                                    defaultValue={26}
                                    min={appData.minPirce}
                                    max={appData.maxPrice}
                                />
                            </div>
                            <div className="flex" style={{ marginTop: getUnit(20) }}>
                                <SliderLabel className="flex_1">￥{appData.minPirce}</SliderLabel>
                                <SliderLabel className="flex_1" style={{ textAlign: 'right' }}>￥{appData.maxPrice}</SliderLabel>
                            </div>
                        </div>
                        <div className="flex_column">
                            <div style={{ padding: `0 ${getUnit(15)}` }}>
                                <LSlider
                                    defaultValue={26}
                                    min={0}
                                    max={30}
                                />

                            </div>
                            <div className="flex" style={{ marginTop: getUnit(20) }}>
                                <SliderLabel className="flex_1">3个月</SliderLabel>
                                <SliderLabel className="flex_1" style={{ textAlign: 'right' }}>36个月</SliderLabel>
                            </div>
                        </div>
                        <div style={{ padding: `0 ${getUnit(15)}` }}>
                            <LButton onClick={this.handleRequireRend}>申请贷款</LButton>
                        </div>
                        <div style={{ padding: `0 ${getUnit(15)}`, marginTop: getUnit(25) }}>
                            <CheckBox
                                options={[{
                                    label: <div style={{ fontSize: getUnit(12) }}>我已阅读<span style={{ color: '#4F9BFF', fontSize: getUnit(12) }}>《隐私政策》</span>隐私信息将严格保密</div>,
                                    value: true
                                }]}
                                value={[true]}
                            />
                        </div>
                    </PriceInfo>
                </PriceBox>
            </MobileLayout>
        )
    }

    public componentDidMount() {
        // this.getData()
    }

    private handleView = (id: string) => {
        const { err } = this.state
        const { history } = this.props
        if (err !== null) {
            this.setState({
                visible: true
            })
        } else {
            history.push(`/news/${id}`)
        }
    }

    private handleRequireRend = () => {
        const {userInfo, history} = this.props
        console.log(userInfo)
        if(userInfo && userInfo.id){
            let Info = userInfo.userInfo
            if(Info && Info.status){
                if(Info.status === 3){
                    history.push('/requireRend')
                }else if(Info.status === 2){
                    history.push('/authenBank')
                }else if(Info.status === 1){
                    history.push('/authenInfo')
                }else {
                    history.push('/authen')
                }
            }else{
                history.push('/authen')
            }
        }else{
            history.push('/login')
        }
    }

    private getData = async () => {
        try {
            const data = await http('wxapp/goods/goodsList')
            const { dispatch } = this.props
            dispatch({ type: SET_HOME_DATA, data: data.data })
        } catch (data) {
            Toast.info({
                content: data.msg || '服务器繁忙,请稍后再试',
            })
        }
    }
}

export default connect(
    ({ appData, userInfo }: IInitState) => ({
        appData, userInfo
    })
)(withRouter(Home))