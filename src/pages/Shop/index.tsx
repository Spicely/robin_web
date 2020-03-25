import React, { Component } from 'react'
import { http, Empty } from 'src/utils'
import { Toast, MobileLayout, Button, Image } from 'components'
import { RouteComponentProps, withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import { IInitState } from 'src/store/state'
import { ButtonThemeData, BorderRadius, getUnit } from 'src/components/lib/utils'


interface IState { }

const shopBtnTheme = new ButtonThemeData({
    borderRadius: BorderRadius.all(30),
    width: 120,
    height: 35,
    fontSize: 18
})


class Shop extends Component<RouteComponentProps<any>, IState> {

    public state: IState = {
    }

    public render(): JSX.Element {
        return (
            <MobileLayout
                emptyElement={
                    <div style={{ marginTop: getUnit(100) }}>
                        <div className="flex_center">
                            <Image src={require('../../assets/v2_q5w0tr.png')} style={{ height: getUnit(77), width: getUnit(77) }} />
                        </div>
                        <div className="flex_center" style={{ color: 'rgba(163, 163, 163, 1)', fontSize: getUnit(15), lineHeight: getUnit(40) }}>您的购物车有点寂寞</div>
                        <div className="flex_center">
                            <Button mold="primary" theme={shopBtnTheme}>去购物</Button>
                        </div>
                    </div>
                }
            >

            </MobileLayout>
        )
    }

    public componentDidMount() {
        // this.getData()
    }

    private getData = async () => {
        try {
            const { match } = this.props
            const data = await http('news/team_info', {
                id: match.params.id
            })
            this.setState({
                ...data.msg
            })
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
    ({ homeData }: IInitState) => ({
        homeData
    })
)(withRouter(Shop))