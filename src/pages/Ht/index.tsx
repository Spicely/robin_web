import React, { Component } from 'react'
import { RouteComponentProps } from 'react-router-dom'
import { MobileLayout, NavBar, Toast } from 'components'
import { getUnit } from 'src/components/lib/utils'
import { http, baseUrl } from '../../utils'
import { connect, DispatchProp } from 'react-redux'
import { IGlobal, IInitState } from 'src/store/state'


interface IProps {
    userInfo: IGlobal.UserInfo
}

interface IState {
    html: string
}

class Ht extends Component<IProps & RouteComponentProps & DispatchProp, IState> {

    public state: IState = {
        html: ''
    }

    public render(): JSX.Element {
        const { html } = this.state
        return (
            <MobileLayout
                backgroundColor="#fff"
                appBar={
                    <NavBar
                        divider={false}
                        titleCenter
                        onBack={this.handleBack}
                        title="我的合同"
                    />
                }
            >
                <div dangerouslySetInnerHTML={{ __html: html }} style={{ marginTop: getUnit(50), padding: getUnit(10) }} />
            </MobileLayout>
        )
    }

    public componentDidMount() {
        this.getData()
    }

    private getData = async () => {
        try {
            const { userInfo } = this.props
            const close = Toast.loading()
            const { data } = await http('user/getUserTemplate', { userId: userInfo.id })
            this.setState({
                html: data.contractTemplate.replace('｛借款人签名｝', `<img src="${baseUrl + (userInfo.order ? userInfo.order.autograph : '')}" style='height: 56px'/>`)
            })
            close()
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
    ({ userInfo }: IInitState) => ({
        userInfo
    })
)(Ht as any)