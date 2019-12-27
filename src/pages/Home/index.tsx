import React, { Component } from 'react'
import { ScrollView, NavBar, ShopList, MobileLayout } from 'components'

interface IState {

}

export default class Home extends Component<any, IState> {

    public render(): JSX.Element {
        return (
            <MobileLayout
                appBar={
                    <NavBar
                        left={null}
                        title="测试2"
                        fixed
                    />
                }
            >
                <ShopList
                    data={[{
                        price: 20,
                        title: '好味道',
                        describe: '的的撒的',
                        imgUrl: 'https://i.muka.site/pixiv/pixiv_2019_04_27/74350218_p0.png'
                    }, {
                        price: 20,
                        title: '好味道',
                        describe: '的的撒的',
                        imgUrl: 'https://i.muka.site/pixiv/pixiv_2019_04_27/74350218_p0.png'
                    }, {
                        price: 20,
                        title: '好味道',
                        describe: '的的撒的',
                        imgUrl: 'https://i.muka.site/pixiv/pixiv_2019_04_27/74350218_p0.png'
                    }, {
                        price: 20,
                        title: '好味道',
                        describe: '的的撒的',
                        imgUrl: 'https://i.muka.site/pixiv/pixiv_2019_04_27/74350218_p0.png'
                    }, {
                        price: 20,
                        title: '好味道',
                        describe: '的的撒的',
                        imgUrl: 'https://i.muka.site/pixiv/pixiv_2019_04_27/74350218_p0.png'
                    }, {
                        price: 20,
                        title: '好味道',
                        describe: '的的撒的',
                        imgUrl: 'https://i.muka.site/pixiv/pixiv_2019_04_27/74350218_p0.png'
                    }, {
                        price: 20,
                        title: '好味道',
                        describe: '的的撒的',
                        imgUrl: 'https://i.muka.site/pixiv/pixiv_2019_04_27/74350218_p0.png'
                    }, {
                        price: 20,
                        title: '好味道',
                        describe: '的的撒的',
                        imgUrl: 'https://i.muka.site/pixiv/pixiv_2019_04_27/74350218_p0.png'
                    }]}
                />
            </MobileLayout>
        )
    }
}