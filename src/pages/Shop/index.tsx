import React, { Component } from 'react'
import { http } from 'src/utils'
import { Toast, MobileLayout, Button, Image } from 'components'
import { RouteComponentProps, withRouter } from 'react-router-dom'
import styled from 'styled-components'
import { connect } from 'react-redux'
import { IInitState } from 'src/store/state'
import { getUnit, ButtonThemeData, BorderRadius } from 'src/components/lib/utils'


interface IState { }

const shopBtnTheme = new ButtonThemeData({
    borderRadius: BorderRadius.all(30),
    width: 120,
    height: 35,
    fontSize: 18
})

const Header = styled.div`
    height: ${getUnit(55)};
`


class Shop extends Component<RouteComponentProps<any>, IState> {

    public state: IState = {
    }

    public render(): JSX.Element {
        return (
            <MobileLayout>

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