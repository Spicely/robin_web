import React, { Component } from 'react'
import { RouteComponentProps } from 'react-router-dom'
import { MobileLayout, NavBar, Form, Toast, CountDown, Image } from 'components'
import { verify } from 'muka'
import { IFormFun, IFormItem } from 'src/components/lib/Form'
import { getUnit, NavBarThemeData, Color, IconThemeData } from 'src/components/lib/utils'
import { http } from '../../utils'
import { connect, DispatchProp } from 'react-redux'
import styled from 'styled-components'
import { IGlobal, IInitState } from 'src/store/state'


interface IProps {
    appData: IGlobal.AppData
}

class AboutMe extends Component<IProps & RouteComponentProps & DispatchProp, any> {

    public render(): JSX.Element {
        const { appData } = this.props
        return (
            <MobileLayout
                backgroundColor="#fff"
                appBar={
                    <NavBar
                        style={{ background: 'rgba(0,0,0,0)' }}
                        divider={false}
                        titleCenter
                        onBack={this.handleBack}
                        title="关于我们"
                    />
                }
            >
                <div dangerouslySetInnerHTML={{ __html: appData.about }} style={{ marginTop: getUnit(50), padding: getUnit(10) }} />
            </MobileLayout>
        )
    }


    private handleBack = () => {
        const { history } = this.props
        history.goBack()
    }
}

export default connect(
    ({ appData }: IInitState) => ({
        appData
    })
)(AboutMe as any)