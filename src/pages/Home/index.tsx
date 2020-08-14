import React, { Component } from 'react'
import { Image, MobileLayout, Toast, Carousel, Item, Icon, Button } from 'components'
import { http, imgUrl } from '../../utils'
import { CarouselThemeData, getUnit, ItemThemeData, ButtonThemeData, BorderRadius } from 'src/components/lib/utils'
import { withRouter, RouteComponentProps, Link } from 'react-router-dom'
import styled from 'styled-components'
import { SET_HOME_DATA, SET_BANNER_DATA } from 'src/store/actions'
import { IInitState, IGlobal } from 'src/store/state'
import { connect, DispatchProp } from 'react-redux'
import { Divider } from 'antd'

interface IState {
    data: any[]
    coo: any[]
    visible: boolean
    err: null | any
}

interface IProps extends RouteComponentProps {
    homeData: IGlobal.HomeData
    banner: IGlobal.IBanner[]
}

const ItemView = styled.div`
    height: ${getUnit(100)};
    background: #fff;
    margin-top: ${getUnit(6)};
    padding: ${getUnit(10)};
`

const ITag = styled.div`
    background: #000;
    right: 0;
    top: ${getUnit(10)};
    z-index: 64;
    background-color: rgb(32, 32, 32);
    border: none;
    color: rgb(255, 255, 255);
    border-radius: ${getUnit(5)} 0;
    font-size: ${getUnit(11)};
    text-align: center;
    line-height: ${getUnit(16)};
    position: absolute;
    padding: ${getUnit(2)} ${getUnit(3)};
`


const carouselTheme = new CarouselThemeData({
    height: 170
})

const itmeTheme = new ItemThemeData({
    minHeight: 80
})

const buttonTheme = new ButtonThemeData({
    height: 35,
    borderRadius: BorderRadius.all(5)
})

class Home extends Component<IProps & DispatchProp, IState> {

    public state: any = {
        data: [],
        coo: [],
        banner: [],
        visible: false,
        err: null
    }

    public render(): JSX.Element {
        const { homeData, banner } = this.state
        return (
            <MobileLayout
                backgroundColor="#fff"
            >
                <Carousel
                    theme={carouselTheme}
                    dotType="circular"
                    dotColor="rgb(51, 51, 51)"
                    autoplay
                    style={{ margin: getUnit(10), borderRadius: getUnit(10) }}
                >
                    <Image src={require('../../assets/1.jpg')} style={{ width: '100%' }} />
                    <Image src={require('../../assets/2.jpg')} style={{ width: '100%' }} />
                </Carousel>
                <div style={{height: getUnit(70)}}>
                    <div className="flex" style={{paddingTop: getUnit(5)}}>
                        <div className="flex_1 flex_center">
                            <Image src={require('../../assets/2.png')} style={{ width: getUnit(40) }} />
                            <div>转会记录</div>
                        </div>
                        <div className="flex_1 flex_center">
                            <Image src={require('../../assets/2.png')} style={{ width: getUnit(40) }} />
                            <div>获奖荣誉</div>
                        </div>
                        <div className="flex_1 flex_center">
                            <Image src={require('../../assets/2.png')} style={{ width: getUnit(40) }} />
                            <div>交锋记录</div>
                        </div>
                        <div className="flex_1 flex_center">
                            <Image src={require('../../assets/2.png')} style={{ width: getUnit(40) }} />
                            <div>商城订单</div>
                        </div>
                    </div>
                </div>
                <Carousel
                    theme={carouselTheme}
                    dotType="circular"
                    dotColor="rgb(51, 51, 51)"
                    autoplay
                    style={{ margin: getUnit(10), borderRadius: getUnit(10) }}
                >
                    <Image src={require('../../assets/1.jpg')} style={{ width: '100%' }} />
                    <Image src={require('../../assets/2.jpg')} style={{ width: '100%' }} />
                </Carousel>
                <Divider/>
                <div className="flex_center" style={{fontSize: getUnit(20)}}> 
                    本期球星--“卡卡”
                </div>
                <div className="flex" style={{padding: getUnit(10)}}>
                    <Image src={require('../../assets/2.jpg')} style={{width: getUnit(80), height: getUnit(80), borderRadius: getUnit(5)}}/>
                    <div style={{marginLeft: getUnit(10)}}>
                        里卡多·伊泽克森·多斯·桑托斯·雷特，1982年出生于巴西。巴西利亚,巴西足球运动员、前巴西国家队的核心人物，司职前腰，绰号“卡卡”
                    </div>
                </div>
                <div style={{margin: getUnit(10), background: '#d8d8d8', padding: getUnit(10)}}>
                    <div style={{fontSize: getUnit(12)}}>足球运动员  进攻性中场</div>
                    <div style={{fontSize: getUnit(12)}}>带球反击、长途奔袭、突破过人、传切远射！</div>
                    <div style={{fontSize: getUnit(12)}}>巴西圣保罗，AC米兰，皇家马德里，奥兰多城</div>
                    <div style={{fontSize: getUnit(12)}}>2007世界足球先生，世界杯冠军，欧冠冠军</div>
                </div>
            </MobileLayout>
        )
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
}

export default connect(
    ({ homeData, banner }: IInitState) => ({
        homeData,
        banner
    })
)(withRouter(Home))