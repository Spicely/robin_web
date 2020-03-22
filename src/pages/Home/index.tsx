import React, { Component } from 'react'
import { Image, MobileLayout, Item, Button, CheckBox, Notice, Toast } from 'components'
import { Slider, Carousel } from 'antd-mobile'
import { getUnit, ItemThemeData } from 'src/components/lib/utils'
import { withRouter, RouteComponentProps, Link } from 'react-router-dom'
import styled from 'styled-components'
import { IInitState, IGlobal } from 'src/store/state'
import { connect, DispatchProp } from 'react-redux'
import { SET_SELECTED_DATA } from 'src/store/actions'
import { random } from 'lodash'
import { http, baseUrl } from 'src/utils'

interface IState {
    data: any[]
    coo: any[]
    items: any[]
    visible: boolean
    err: null | any
    money: number
    month: number
    price: string
}

interface IProps extends RouteComponentProps {
    appData: IGlobal.AppData
    userInfo: IGlobal.UserInfo
}

const LSlider = styled(Slider) <any>`
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
    margin-top: ${getUnit(20)};
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
    top: ${getUnit(170)};
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
        items: [],
        visible: false,
        err: null,
        money: 0,
        month: 0,
        price: '0'
    }

    public render(): JSX.Element {
        const { appData } = this.props
        const { money, month, price, data, items } = this.state
        const marks: any = {}
        appData.months.forEach((i) => {
            marks[i] = ''
        })
        return (
            <MobileLayout
                backgroundColor="#fff"
            >
                <Header>
                    <Carousel style={{ height: '100%' }} autoplay>
                        {
                            items.map((i, index: number) => {
                                return <Image src={baseUrl + i.img} style={{ height: getUnit(188), width: '100%' }} key={index} />
                            })
                        }
                    </Carousel>
                </Header>
                <Item
                    theme={itmeTheme}
                    lineType="none"
                    title={
                        <div
                            className="flex_justify"
                            style={{ fontSize: getUnit(12), color: 'rgba(130, 130, 130, 1)' }}
                        >
                            <div className="flex" style={{ width: '100%' }}>
                                <div className="flex_justify">
                                    <Image src={require('../../assets/zx.png')} style={{ height: getUnit(16), width: getUnit(47) }} />
                                </div>
                                <div className="flex_1" style={{ marginLeft: getUnit(10), overflow: 'hidden' }}>
                                    <Notice
                                        value={data}
                                        effect="scrollY"
                                    />
                                </div>
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
                                <PriceL className="flex_center">￥{money}</PriceL>
                            </div>
                            <div className="flex_1">
                                <PriceT className="flex_center">借款期限</PriceT>
                                <PriceL className="flex_center">{month}个月</PriceL>
                            </div>
                            <div className="flex_1">
                                <PriceT className="flex_center">利息（元）</PriceT>
                                <PriceL className="flex_center">￥{price}</PriceL>
                            </div>
                        </div>
                        <div className="flex_column">
                            <div style={{ padding: `0 ${getUnit(15)}` }}>
                                <LSlider
                                    defaultValue={money}
                                    min={appData.minPirce}
                                    max={appData.maxPrice}
                                    onChange={this.moneyChange}
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
                                    defaultValue={month}
                                    min={appData.months[0] || 0}
                                    max={appData.months[appData.months.length - 1] || 0}
                                    onChange={this.monthChange}
                                    marks={marks}
                                    step={null}
                                />

                            </div>
                            <div className="flex" style={{ marginTop: getUnit(15) }}>
                                <SliderLabel className="flex_1">{appData.months[0] || 0}个月</SliderLabel>
                                <SliderLabel className="flex_1" style={{ textAlign: 'right' }}>{appData.months[appData.months.length - 1] || 0}个月</SliderLabel>
                            </div>
                        </div>
                        <div style={{ padding: `0 ${getUnit(15)}` }}>
                            <LButton onClick={this.handleRequireRend}>申请贷款</LButton>
                        </div>
                        <div style={{ padding: `0 0 0 ${getUnit(15)}`, marginTop: getUnit(15) }}>
                            <CheckBox style={{ display: 'flex', alignItems: 'flex_start' }}
                                options={[{
                                    label: <div style={{ fontSize: getUnit(12) }}>
                                        我已阅读
                                            <Link to={{ pathname: 'privacryPolice' }}><span style={{ color: '#4F9BFF', fontSize: getUnit(12) }}>《隐私政策》</span></Link>
                                            隐私信息将严格保密
                                        </div>,
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

    private names: string[] = ["王", "李", "张", "刘", "陈", "杨", "黄", "赵", "吴", "周", "徐", "孙", "马", "朱", "胡", "郭", "何", "高", "林", "罗", "郑", "梁", "谢", "宋", "唐", "许", "韩", "冯", "邓", "曹", "彭", "曾", "萧", "田", "董", "潘", "袁", "于", "蒋", "蔡", "余", "杜", "叶", "程", "苏", "魏", "吕", "丁", "任", "沈", "姚", "卢", "姜", "崔", "钟", "谭", "陆", "汪", "范", "金", "石", "廖", "贾", "夏", "韦", "傅", "方", "白", "邹", "孟", "熊", "秦", "邱", "江", "尹", "薛", "阎", "段", "雷", "侯", "龙", "史", "陶", "黎", "贺", "顾", "毛", "郝", "龚", "邵", "万", "钱", "严", "覃", "武戴", "莫", "孔", "向", "汤"]

    private phone: number[] = [3, 4, 5, 7, 8]

    public componentDidMount() {
        const { appData } = this.props
        const price = (((appData.initPrice || appData.minPirce) + appData.serviceRate * (appData.initPrice || appData.minPirce)) / (appData.initMonth || appData.months[0])).toFixed(2)
        const data: any = []
        Array.from({ length: 100 }).forEach((i) => {
            data.push({
                label: `${this.names[random(0, this.names.length - 1)]}${Array.from({ length: random(2, 3) }).map(_ => '').join('*')} | 1${this.phone[random(0, this.phone.length - 1)]}${random(0, 9)}****${random(0, 9)}${random(0, 9)}${random(0, 9)}${random(0, 9)}  已成功贷款${random(appData.minPirce, appData.maxPrice)}元`
            })
        })
        console.log(data)
        this.setState({
            money: appData.initPrice || appData.minPirce,
            month: appData.initMonth || appData.months[0],
            price,
            data,
        })
        this.getData()
    }

    private getData = async () => {
        try {
            const close = Toast.loading()
            const { data } = await http('/user/carouselList')
            this.setState({
                items: data
            })
            close()
        } catch (e) {
            Toast.info({
                content: e.msg || '网络不稳定'
            })
        }
    }

    private moneyChange = (val: any) => {
        const { appData } = this.props
        const { month } = this.state
        const price = ((Number(val) + Number(appData.serviceRate) * Number(val)) / month).toFixed(2)
        this.setState({
            money: val,
            price,
        })
    }
    private monthChange = (val: any) => {
        const { appData } = this.props
        const { money } = this.state
        const price = ((Number(money) + Number(appData.serviceRate) * Number(money)) / val).toFixed(2)
        this.setState({
            month: val,
            price,
        })
    }

    private handleRequireRend = () => {
        const { userInfo, history, dispatch } = this.props
        if (userInfo && userInfo.id) {
            let Info = userInfo.userInfo
            if (Info && Info.status) {
                if (Info.status === 3) {
                    if (Info.examineStatus !== 2) {
                        history.push('/team')
                        return
                    }
                    if (!userInfo.order) {
                        history.push({
                            pathname: '/requireRend',
                            state: { money: this.state.money, month: this.state.month }
                        })
                    } else {
                        if (!userInfo.order.autograph) {
                            history.push({
                                pathname: '/protocol',
                                state: { orderId: userInfo.order.id }
                            })
                        } else {
                            dispatch({ type: SET_SELECTED_DATA, data: 1 })
                        }
                    }
                } else if (Info.status === 2) {
                    history.push('/authenBank')
                } else if (Info.status === 1) {
                    history.push('/authenInfo')
                } else {
                    history.push('/authen')
                }
            } else {
                history.push('/authen')
            }
        } else {
            history.push('/login')
        }
    }
}

export default connect(
    ({ appData, userInfo }: IInitState) => ({
        appData, userInfo
    })
)(withRouter(Home))