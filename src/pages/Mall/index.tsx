import React, { Component } from 'react'
import { Image, MobileLayout, Toast, Carousel } from 'components'
import { http, imgUrl } from '../../utils'
import { CarouselThemeData, getUnit } from 'src/components/lib/utils'
import { withRouter, Link, RouteComponentProps } from 'react-router-dom'
import styled from 'styled-components'
import { IGlobal, IInitState } from 'src/store/state'
import { connect } from 'react-redux'
import { SET_SHOP_DATA } from 'src/store/actions'

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
        const { banner, shopData } = this.props
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
                    {
                        banner.map((i: any, index: number) => {
                            return (
                                <Image src={imgUrl + i.image_url} style={{ width: '100%' }} key={index} />
                            )
                        })
                    }
                </Carousel>
                <div style={{ padding: getUnit(10), paddingTop: 0 }}>
                    {
                        shopData.goods_data.map((i: any, index: number) => {
                            return (
                                <ShopItemView key={index}>
                                    <Link to={`/detail/${i.goods_id}`}>
                                        <div
                                            className="flex_center"
                                            style={{ padding: getUnit(10) }}
                                        >
                                            <Image src={imgUrl + i.image_url} style={{ width: getUnit(120), height: getUnit(120) }} />
                                            <div style={{ paddingTop: getUnit(8), position: 'relative', width: '100%'}}>
                                                <ShopItemTitle>{i.goods_name}</ShopItemTitle>
                                                <div className="flex">
                                                    <ShopItemPirce>¥{i.goods_price}</ShopItemPirce>
                                                    <div className="flex_justify" style={{ fontSize: getUnit(10), color: 'rgb(16, 16, 16)' }}>通兑</div>
                                                </div>
                                                <div style={{ fontSize: getUnit(12), color: 'rgb(130, 130, 130)' }}>已售卖{i.goods_discount}</div>
                                                <ShopLogo />
                                            </div>
                                        </div>
                                    </Link>
                                </ShopItemView>
                            )
                        })}

                </div>
            </MobileLayout>
        )
    }

    public componentDidMount() {
        this.getData()
    }

    private getData = async () => {
        try {
            const data = await http('/wxapp/goods/goodsList')
            const { dispatch } = this.props
            dispatch({ type: SET_SHOP_DATA, data: data.data })
        } catch (data) {
            Toast.info({
                content: data.msg || '服务器繁忙,请稍后再试',
            })
        }
    }
}

export default connect(
    ({ banner, shopData }: IInitState) => ({
        banner,
        shopData
    })
)(withRouter(Mall))