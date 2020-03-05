import React, { Component } from 'react'
import { Image, MobileLayout, Toast, Carousel } from 'components'
import { http, imgUrl } from '../../utils'
import { CarouselThemeData, getUnit } from 'src/components/lib/utils'
import { withRouter, Link } from 'react-router-dom'
import styled from 'styled-components'

interface IState {
    data: any[]
    coo: any[]
    visible: boolean
    err: null | any
}

const carouselTheme = new CarouselThemeData({
    height: 108
})

const ShopItemView = styled.div`
    display: inline-block;
    width: calc(50% - ${getUnit(3)});
    margin-top: ${getUnit(10)};
    background: #fff;
    height: ${getUnit(200)};
    :nth-child(odd) {
        margin-right: ${getUnit(3)};
    }
    :nth-child(even) {
        margin-left: ${getUnit(3)};
    }
`

const ShopItemTitle = styled.div`
    word-wrap: normal;
    font-size: ${getUnit(13)};
    overflow: hidden;
    text-overflow: ellipsis;
`

const ShopItemPirce = styled.div`
    font-size: ${getUnit(14)};
    color: #101010;
    font-style: normal;
    font-weight: 700;
`

const ShopLogo = styled.div`
    background-image: url(${require('../../assets/v2_q5u3ps.png')}) ;
    background-size: 80%;
    background-repeat: no-repeat;
    background-position: center;
    background-color: rgb(30, 30, 30);
    width: ${getUnit(20)};
    height: ${getUnit(20)};
    border-radius: 50%;
    position: absolute;
    bottom: ${getUnit(5)};
    right: ${getUnit(5)};
`

class Mall extends Component<any, IState> {

    public state: IState = {
        data: [],
        coo: [],
        visible: false,
        err: null
    }

    public render(): JSX.Element {
        return (
            <MobileLayout
                backgroundColor="rgb(248, 248, 248)"
                appBar={
                    <Carousel
                        theme={carouselTheme}
                        dotType="circular"
                        dotColor="rgb(51, 51, 51)"
                        autoplay
                    >
                        <Image src={require('../../assets/1.png')} style={{ width: '100%' }} />
                        <Image src={require('../../assets/2.png')} style={{ width: '100%' }} />
                    </Carousel>
                }
            >
                <div style={{ padding: getUnit(10), paddingTop: 0 }}>
                    <ShopItemView>
                        <Link to="/detail">
                            <div
                                className="flex_center"
                                style={{ padding: getUnit(10) }}
                            >
                                <Image src={require('../../assets/3.png')} style={{ width: getUnit(120), height: getUnit(120) }} />
                                <div style={{ paddingTop: getUnit(8), position: 'relative' }}>
                                    <ShopItemTitle>史丹利复合肥料2019款...</ShopItemTitle>
                                    <div className="flex">
                                        <ShopItemPirce>¥10000</ShopItemPirce>
                                        <div className="flex_justify" style={{ fontSize: getUnit(10), color: 'rgb(16, 16, 16)' }}>通兑</div>
                                    </div>
                                    <div style={{ fontSize: getUnit(12), color: 'rgb(130, 130, 130)' }}>已售卖1200</div>
                                    <ShopLogo />
                                </div>
                            </div>
                        </Link>
                    </ShopItemView>
                    <ShopItemView>
                        <div
                            className="flex_center"
                            style={{ padding: getUnit(10) }}
                        >
                            <Image src={require('../../assets/3.png')} style={{ width: getUnit(120), height: getUnit(120) }} />
                            <div style={{ paddingTop: getUnit(8), position: 'relative' }}>
                                <ShopItemTitle>史丹利复合肥料2019款...</ShopItemTitle>
                                <div className="flex">
                                    <ShopItemPirce>¥10000</ShopItemPirce>
                                    <div className="flex_justify" style={{ fontSize: getUnit(10), color: 'rgb(16, 16, 16)' }}>通兑</div>
                                </div>
                                <div style={{ fontSize: getUnit(12), color: 'rgb(130, 130, 130)' }}>已售卖1200</div>
                                <ShopLogo />
                            </div>
                        </div>
                    </ShopItemView>
                    <ShopItemView>
                        <div
                            className="flex_center"
                            style={{ padding: getUnit(10) }}
                        >
                            <Image src={require('../../assets/3.png')} style={{ width: getUnit(120), height: getUnit(120) }} />
                            <div style={{ paddingTop: getUnit(8), position: 'relative' }}>
                                <ShopItemTitle>史丹利复合肥料2019款...</ShopItemTitle>
                                <div className="flex">
                                    <ShopItemPirce>¥10000</ShopItemPirce>
                                    <div className="flex_justify" style={{ fontSize: getUnit(10), color: 'rgb(16, 16, 16)' }}>通兑</div>
                                </div>
                                <div style={{ fontSize: getUnit(12), color: 'rgb(130, 130, 130)' }}>已售卖1200</div>
                                <ShopLogo />
                            </div>
                        </div>
                    </ShopItemView>
                    <ShopItemView>
                        <div
                            className="flex_center"
                            style={{ padding: getUnit(10) }}
                        >
                            <Image src={require('../../assets/3.png')} style={{ width: getUnit(120), height: getUnit(120) }} />
                            <div style={{ paddingTop: getUnit(8), position: 'relative' }}>
                                <ShopItemTitle>史丹利复合肥料2019款...</ShopItemTitle>
                                <div className="flex">
                                    <ShopItemPirce>¥10000</ShopItemPirce>
                                    <div className="flex_justify" style={{ fontSize: getUnit(10), color: 'rgb(16, 16, 16)' }}>通兑</div>
                                </div>
                                <div style={{ fontSize: getUnit(12), color: 'rgb(130, 130, 130)' }}>已售卖1200</div>
                                <ShopLogo />
                            </div>
                        </div>
                    </ShopItemView>
                    <ShopItemView>
                        <div
                            className="flex_center"
                            style={{ padding: getUnit(10) }}
                        >
                            <Image src={require('../../assets/3.png')} style={{ width: getUnit(120), height: getUnit(120) }} />
                            <div style={{ paddingTop: getUnit(8), position: 'relative' }}>
                                <ShopItemTitle>史丹利复合肥料2019款...</ShopItemTitle>
                                <div className="flex">
                                    <ShopItemPirce>¥10000</ShopItemPirce>
                                    <div className="flex_justify" style={{ fontSize: getUnit(10), color: 'rgb(16, 16, 16)' }}>通兑</div>
                                </div>
                                <div style={{ fontSize: getUnit(12), color: 'rgb(130, 130, 130)' }}>已售卖1200</div>
                                <ShopLogo />
                            </div>
                        </div>
                    </ShopItemView>
                </div>
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

    private handleQ1Close = () => {
        this.setState({
            visible: false
        })
    }

    private getData = async () => {
        try {
            // const des = await http('news/is_user')
            // const data = await http('news/index')
            // const coo = await http('news/cooperation')
            // this.setState({
            //     data: data.msg,
            //     coo: coo.msg,
            //     err: isObject(des.msg) ? des.msg : null
            // })
        } catch (data) {
            Toast.info({
                content: data.msg || '服务器繁忙,请稍后再试',
            })
        }
    }
}

export default withRouter(Mall)