import React, { Component } from 'react'
import { Divider } from 'antd'
import { Image, MobileLayout, Toast, Carousel, NavBar, Icon, Item, Gird, Button, Colors } from 'components'
import { http, imgUrl } from '../../utils'
import { CarouselThemeData, getUnit, IconThemeData, ButtonThemeData, Border, Color, NavBarThemeData } from 'src/components/lib/utils'
import { withRouter, RouteComponentProps } from 'react-router-dom'
import styled from 'styled-components'
import { IGoodsData } from 'src/store/state'

interface IState {
    data: any
}

const carouselTheme = new CarouselThemeData({
    height: 306,
    dotBorderRadius: 0,
})
const iconTheme = new IconThemeData({
    size: 14
})

const cartBtnTheme = new ButtonThemeData({
    height: 50,
    border: Border.all({ width: 0 }),
    buttonColor: Color.fromRGB(87, 183, 43),
    color: Color.fromRGB(255, 255, 255)
})

const payBtnTheme = new ButtonThemeData({
    height: 50,
    border: Border.all({ width: 0 }),
    buttonColor: Color.fromRGB(0, 0, 0),
    color: Color.fromRGB(255, 255, 255)
})

const PayItem = styled.div`
    width: ${getUnit(55)};
    padding: ${getUnit(5)} 0;
    background: #fff;
`

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
            goods_contents: '',
            imgs: []
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
                        theme={new NavBarThemeData({ navBarColor: Color.fromRGBO(255, 255, 255, 0) })}
                        fixed
                        divider={false}
                        onBack={this.handleBack}
                    />
                }
                footer={
                    <div className="flex">
                        <PayItem>
                            <div className="flex_center">
                                <Icon icon="msg" />
                            </div>
                            <div className="flex_center" style={{ fontSize: getUnit(12) }}>客服</div>
                        </PayItem>
                        <PayItem>
                            <div className="flex_center">
                                <Icon icon="shop-car" />
                            </div>
                            <div className="flex_center" style={{ fontSize: getUnit(12) }}>购物</div>
                        </PayItem>
                        <Button className="flex_1" mold="primary" theme={cartBtnTheme} onClick={this.handleCartAdd}>加入购物车</Button>
                        <Button className="flex_1" mold="primary" theme={payBtnTheme} onClick={this.handleToView.bind(this, 'order')} >立即购买</Button>
                    </div>
                }
            >
                <Carousel
                    theme={carouselTheme}
                    dotColor="rgb(51, 51, 51)"
                    autoplay
                >
                    {
                        data.imgs.map((i: string, index: number) => {
                            return (<Image src={imgUrl + i} style={{ width: '100%' }} key={index} />)
                        })
                    }
                </Carousel>
                <Item
                    style={{ marginTop: getUnit(10), paddingBottom: getUnit(10) }}
                    title={
                        <div>
                            <div className="flex">
                                <div style={{ color: 'rgba(87, 183, 43, 1)', fontSize: getUnit(16), position: 'relative', top: getUnit(12) }}>¥</div>
                                <ShopItemPirce>{data.goods_price}</ShopItemPirce>
                                <div className="flex_justify" style={{ marginLeft: getUnit(5) }}>
                                    <div className="flex_justify" style={{ background: 'rgb(32, 32, 32)', color: '#fff', height: getUnit(18), fontSize: getUnit(11), padding: `0 ${getUnit(5)}` }}>特价</div>
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
                        value={<div>{data.goods_number}</div>}
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
                                <div dangerouslySetInnerHTML={{ __html: data.goods_contents }} />
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

    private handleToView = async (url: string) => {
        const close = Toast.loading()
        try {
            const { params } = this.props.match
            const { history } = this.props
            const { msg, data } = await http('/wxapp/goods/addShoppingCart', {
                gid: params.id,
                num: 1
            })
            Toast.info({
                content: msg
            })
            close()
            history.push(`/${url}/${data}`)
        } catch (data) {
            close()
            Toast.info({
                content: data.msg || '服务器繁忙,请稍后再试',
            })
        }
    }

    private handleBack = () => {
        const { history } = this.props
        history.goBack()
    }

    private getData = async () => {
        const close = Toast.loading()
        try {
            const { params } = this.props.match
            const { data } = await http('wxapp/goods/goodsShow', {
                gid: params.id
            })
            this.setState({
                data
            })
            close()
        } catch (data) {
            close()
            Toast.info({
                content: data.msg || '服务器繁忙,请稍后再试',
            })
        }
    }

    private handleCartAdd = async () => {
        const close = Toast.loading()
        try {
            const { params } = this.props.match
            const { msg } = await http('/wxapp/goods/addShoppingCart', {
                gid: params.id,
                num: 1
            })
            Toast.info({
                content: msg
            })
            close()
        } catch (data) {
            close()
            Toast.info({
                content: data.msg || '服务器繁忙,请稍后再试',
            })
        }
    }
}

export default withRouter(Detail)