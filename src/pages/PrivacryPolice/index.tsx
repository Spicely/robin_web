import React, { Component } from 'react'
import { RouteComponentProps } from 'react-router-dom'
import { MobileLayout } from 'components'
import { getUnit } from 'src/components/lib/utils'
import { connect, DispatchProp } from 'react-redux'
import { IInitState, IGlobal } from 'src/store/state'

interface IProps {
    appData: IGlobal.AppData
}

interface IState {
    about: any
}

class PrivacryPolice extends Component<IProps & RouteComponentProps & DispatchProp, IState> {
    public state: IState = {
        about: ''
    }

    public render(): JSX.Element {
        const { appData } = this.props
        return (
            <MobileLayout
                backgroundColor="#fff"

            >
                <iframe src={appData.serviceLink}  style={{border: 0, width: '100%', height: '100%'}}/>
            </MobileLayout>
        )
    }
}

export default connect(
    ({ appData }: IInitState) => ({
        appData
    })
)(PrivacryPolice as any)