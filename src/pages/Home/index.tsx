import React, { Component } from 'react'
import { Image, MobileLayout, Toast, Carousel, Item, Icon, Button } from 'components'
import { http, imgUrl } from '../../utils'
import { CarouselThemeData, getUnit, ItemThemeData, ButtonThemeData, BorderRadius } from 'src/components/lib/utils'
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
    homeData: IGlobal.HomeData
}

const ItemView = styled.div`
    height: ${getUnit(100)};
    background: #fff;
    margin-top: ${getUnit(6)};
    padding: ${getUnit(10)};
`

const carouselTheme = new CarouselThemeData({
    height: 108
})

const itmeTheme = new ItemThemeData({
    minHeight: 40
})

const buttonTheme = new ButtonThemeData({
    height: 35,
    borderRadius: BorderRadius.all(5)
})

class Home extends Component<IProps & DispatchProp, IState> {

    public state: IState = {
        data: [],
        coo: [],
        visible: false,
        err: null
    }

    public render(): JSX.Element {
        const { homeData } = this.props
        return (
            <MobileLayout
                backgroundColor="rgb(248, 248, 248)"
            >
                <Carousel
                    theme={carouselTheme}
                    dotType="circular"
                    dotColor="rgb(51, 51, 51)"
                    autoplay
                >
                    <Image src={require('../../assets/1.png')} style={{ width: '100%' }} />
                    <Image src={require('../../assets/2.png')} style={{ width: '100%' }} />
                </Carousel>
                <Item
                    title={
                        <div className="flex">
                            <Icon icon="md-alarm" />
                            <div
                                className="flex_justify"
                                style={{ fontSize: getUnit(14), color: 'rgb(16, 16, 16)', marginLeft: getUnit(10) }}
                            >
                                限时秒杀
                            </div>
                        </div>
                    }
                />
                <Item
                    theme={itmeTheme}
                    lineType="none"
                    title={
                        <div
                            className="flex_justify"
                            style={{ fontSize: getUnit(12), color: 'rgba(130, 130, 130, 1)' }}
                        >
                            每日精选 . 限时限量 . 全场包邮
                         </div>
                    }
                />
                {
                    homeData.goods_data.map((i, index: number) => {
                        return (
                            <Link key={index} to={`/detail/${i.goods_id}`}>
                                <ItemView className="flex" >
                                    <Image src={imgUrl + i.image_url} style={{ width: getUnit(80), height: getUnit(80) }} />
                                    <div className="flex_1" style={{ marginLeft: getUnit(10) }}>
                                        <div style={{ fontSize: getUnit(14), color: 'rgb(16, 16, 16)', lineHeight: getUnit(20) }}>{i.goods_name}</div>
                                        <div style={{ fontSize: getUnit(12), color: 'rgba(130, 130, 130, 1)', lineHeight: getUnit(20) }}>每日限额{i.goods_number}件</div>
                                        <div style={{ fontSize: getUnit(13), color: 'rgba(87, 183, 43, 1)', lineHeight: getUnit(20) }}>08:08</div>
                                        <div style={{ fontSize: getUnit(16), color: '#000', fontWeight: 700, lineHeight: getUnit(20) }}>¥{i.platform_price}</div>
                                    </div>
                                    <div className="flex_column">
                                        <div className="flex_1" />
                                        <Button
                                            mold="primary"
                                            theme={buttonTheme}
                                        >
                                            <div style={{ fontSize: getUnit(11) }}>爆卖2548件</div>
                                            <div style={{ fontSize: getUnit(13) }}>马上抢</div>
                                        </Button>
                                    </div>
                                </ItemView>
                            </Link>
                        )
                    })
                }
            </MobileLayout>
        )
    }

    public componentDidMount() {
        this.getData()
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
    ({ homeData }: IInitState) => ({
        homeData
    })
)(withRouter(Home))