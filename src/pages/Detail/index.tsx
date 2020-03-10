import React, { Component } from 'react'
import { Divider } from 'antd'
import { Image, MobileLayout, Toast, Carousel, NavBar, Icon, Item, Gird } from 'components'
import { http, imgUrl } from '../../utils'
import { CarouselThemeData, getUnit, IconThemeData } from 'src/components/lib/utils'
import { withRouter, RouteComponentProps } from 'react-router-dom'
import styled from 'styled-components'
import { IGoodsData } from 'src/store/state'

interface IState {
    data: IGoodsData
}

const carouselTheme = new CarouselThemeData({
    height: 306,
    dotBorderRadius: 0,
})
const iconTheme = new IconThemeData({
    size: 14
})

const ShopItemLabel = styled.div`
    font-size: ${getUnit(10)};
    color: rgb(128, 128, 128);
    margin: 0 ${getUnit(8)};
`

const ShopItemTitle = styled.div`
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    font-size: ${getUnit(14)};
    text-overflow: ellipsis;
    max-height: ${getUnit(42)};
    display: -webkit-box;
    overflow: hidden;
`

const ShopItemPirce = styled.div`
    font-size: ${getUnit(27)};
    color: rgba(87, 183, 43, 1);
    font-style: normal;
    font-weight: 700;
`

const ShopHtml = styled.div`
    background: #fff;
    margin-top: ${getUnit(10)};
`

class Detail extends Component<RouteComponentProps<{ id: string }>, IState> {

    public state: IState = {
        data: {
            goods_id: 0,
            goods_name: '',
            goods_price: 0,
            platform_price: 0,
            goods_number: 0,
            image_url: '',
        },
    }

    public render(): JSX.Element {
        const { data } = this.state
        return (
            <MobileLayout
                backgroundColor="rgb(248, 248, 248)"
                appBar={
                    <NavBar
                        left={
                            <div>
                                <Icon icon="ios-arrow-back" />
                            </div>
                        }
                        divider={false}
                        onBack={this.handleBack}
                    />
                }
            >
                <Carousel
                    theme={carouselTheme}
                    dotColor="rgb(51, 51, 51)"
                    autoplay
                >
                    <Image src={require('../../assets/3.png')} style={{ width: '100%' }} />
                    <Image src={require('../../assets/3.png')} style={{ width: '100%' }} />
                </Carousel>
                <Item
                    style={{ marginTop: getUnit(10), paddingBottom: getUnit(10) }}
                    title={
                        <div>
                            <div className="flex">
                                <div style={{ color: 'rgba(87, 183, 43, 1)', fontSize: getUnit(16), position: 'relative', top: getUnit(12) }}>¥</div>
                                <ShopItemPirce>{data.goods_price}</ShopItemPirce>
                                <div className="flex_justify" style={{ marginLeft: getUnit(5) }}>
                                    <div className="flex_justify" style={{ background: 'rgb(32, 32, 32)', color: '#fff', height: getUnit(18), fontSize: getUnit(11) }}>特价</div>
                                </div>
                            </div>
                            <ShopItemTitle>{data.goods_name}</ShopItemTitle>
                        </div>
                    }
                />
                <Gird
                    style={{ marginTop: getUnit(10) }}
                >
                    <Gird.Item
                        title="配送"
                        value="四川省成都市锦江区"
                        link
                        flexType="value"
                    />
                    <Gird.Item
                        title="运费"
                        value="包邮"
                        flexType="value"
                    />
                    <Gird.Item
                        title="销量"
                        value="87996"
                        flexType="value"
                    />
                    <Gird.Item
                        title={
                            <div className="flex">
                                <div className="flex_justify">
                                    <Icon icon="ios-checkmark-circle-outline" theme={iconTheme} />
                                </div>
                                <ShopItemLabel className="flex_justify">正品保证</ShopItemLabel>
                                <div className="flex_justify">
                                    <Icon icon="ios-checkmark-circle-outline" theme={iconTheme} />
                                </div>
                                <ShopItemLabel className="flex_justify">店铺发货&售后</ShopItemLabel>
                            </div>
                        }
                    />
                    <ShopHtml>
                        <div className="flex_center">
                            <div style={{ width: getUnit(180) }}>
                                <Divider orientation="center">
                                    <div style={{ fontSize: getUnit(14) }}>图文详情</div>
                                </Divider>
                            </div>
                        </div>
                    </ShopHtml>
                </Gird>
            </MobileLayout>
        )
    }

    public componentDidMount() {
        this.getData()
    }

    private handleBack = () => {
        const { history } = this.props
        history.goBack()
    }

    private getData = async () => {
        try {
            const close = Toast.loading()
            const { params } = this.props.match
            const res = await http('wxapp/goods/goodsShow', {
                gid: params.id
            })
            this.setState({
                data: res.data
            })
            close()
        } catch (data) {
            Toast.info({
                content: data.msg || '服务器繁忙,请稍后再试',
            })
        }
    }
}

export default withRouter(Detail)