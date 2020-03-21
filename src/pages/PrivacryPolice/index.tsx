import React, { Component } from 'react'
import { RouteComponentProps } from 'react-router-dom'
import { MobileLayout, NavBar, Form, Toast, CountDown, Image } from 'components'
import { verify } from 'muka'
import { IFormFun, IFormItem } from 'src/components/lib/Form'
import { getUnit, NavBarThemeData, Color, IconThemeData } from 'src/components/lib/utils'
import { http } from '../../utils'
import { connect, DispatchProp } from 'react-redux'
import styled from 'styled-components'


interface IState {
    about: any
}

class PrivacryPolice extends Component<RouteComponentProps & DispatchProp, IState> {
    public state: IState = {
        about: ''
    }

    public render(): JSX.Element {
        const { about } = this.state
        return (
            <MobileLayout
                backgroundColor="#fff"
                appBar={
                    <NavBar
                        theme={new NavBarThemeData({
                            navBarColor: Color.fromRGB(255, 255, 255),
                            iconTheme: new IconThemeData({
                                color: Color.fromRGB(0, 0, 0)
                            })

                        })}
                        title="隐私协议"
                        style={{ background: 'rgba(0,0,0,0)' }}
                        divider={false}
                        titleCenter
                        onBack={this.handleBack}
                    />
                }
            >
                <div dangerouslySetInnerHTML={{ __html: about }} style={{ padding: getUnit(10) }} />
            </MobileLayout>
        )
    }


    public componentDidMount() {
        this.getConfig()
    }
    private handleBack = () => {
        const { history } = this.props
        history.goBack()
    }
    private getConfig = async () => {
        try {
            const data = await http('/user/getConfig')
            this.setState({
                about: data.data.agreement
            })
        } catch (e) {
            console.log(e)
            console.log('----------用户信息错误-------------')
        }
    }
}

export default connect(
    ({ token }: any) => ({
        token
    })
)(PrivacryPolice as any)