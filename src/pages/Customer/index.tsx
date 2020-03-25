import React, { Component } from 'react'
import { http, Empty } from 'src/utils'
import { Toast, MobileLayout, NavBar, Item } from 'components'
import { RouteComponentProps } from 'react-router-dom'
import { getUnit, ItemThemeData } from 'src/components/lib/utils'
import moment from 'moment'

interface IState {
    data: any[]
}

const itemTheme = new ItemThemeData({
    minHeight: 60
})

export default class Customer extends Component<RouteComponentProps<any>, IState> {

    public state: IState = {
        data: []
    }

    public render(): JSX.Element {
        const { data } = this.state
        return (
            <MobileLayout
                backgroundColor="rgb(248, 248, 248)"
                emptyElement={<Empty />}
                appBar={
                    <NavBar
                        onBack={this.handleBack}
                        title="我的客户"
                        titleCenter
                    />
                }
            >
                {
                    data.length ? (
                        <div style={{ padding: getUnit(10) }}>
                            {
                                data.map((i, index: number) => {
                                    return (
                                        <Item
                                            key={index}
                                            theme={itemTheme}
                                            title={
                                                <div className="flex">
                                                    <div>
                                                        <div style={{ fontSize: getUnit(13) }} >{i.user_nickname || '11'}</div>
                                                        <div style={{ fontSize: getUnit(14) }}>￥{i.price || 0}</div>
                                                    </div>
                                                    <div
                                                        className="flex_1"
                                                        style={{ color: 'rgb(194, 194, 194)', fontSize: getUnit(10) }}
                                                    >
                                                        {moment(i.created_time * 1000).format('YYYY-MM-DD HH:mm:ss')}
                                                    </div>
                                                    <div>
                                                        <div style={{ textAlign: 'right', color: 'rgb(194, 194, 194)', fontSize: getUnit(10) }}>{i.user_phone}</div>
                                                        <div style={{ textAlign: 'right', color: 'rgb(194, 194, 194)', fontSize: getUnit(10) }}>邀请码：{i.code}</div>
                                                    </div>
                                                </div>
                                            }
                                            link={null}
                                        />
                                    )
                                })
                            }
                        </div>
                    ) : null
                }

            </MobileLayout>
        )
    }

    public componentDidMount() {
        this.getData()
    }


    private getData = async () => {
        const close = Toast.loading()
        try {
            const { data } = await http('/wxapp/users/customer')
            close()
            this.setState({
                data
            })
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

}