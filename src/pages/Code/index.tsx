import React, { Component } from 'react'
import { Toast, MobileLayout, NavBar, Item } from 'components'
import { RouteComponentProps } from 'react-router-dom'
import { getUnit, ItemThemeData } from 'src/components/lib/utils'
import moment from 'moment'
import { connect } from 'react-redux'
import { IInitState, IGlobal } from 'src/store/state'
import CopyToClipboard from 'react-copy-to-clipboard'

interface IProps {
    userInfo: IGlobal.UserInfo
}


class Code extends Component<IProps & RouteComponentProps<any>, any> {


    public render(): JSX.Element {
        const { userInfo } = this.props
        return (
            <MobileLayout
                backgroundColor="rgb(248, 248, 248)"
                appBar={
                    <NavBar
                        onBack={this.handleBack}
                        title="我的邀请码"
                        titleCenter
                    />
                }
            >
                <div style={{ padding: getUnit(10) }}>
                    <CopyToClipboard text={userInfo.code} onCopy={this.handlePress}>
                        <div>
                            <Item
                                title={userInfo.code}
                                value={<div style={{ color: 'rgba(87, 183, 43, 1)' }}>复制</div>}
                                link={null}
                            />
                        </div>
                    </CopyToClipboard>
                </div>

            </MobileLayout>
        )
    }

    private handlePress = () => {
        Toast.info({
            content: '复制成功'
        })
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
)(Code)