import React, { Component } from 'react'
import { http } from 'src/utils'
import { Toast, MobileLayout, NavBar } from 'components'
import { RouteComponentProps } from 'react-router-dom'
import styled from 'styled-components'
import { getUnit } from 'src/components/lib/utils'
import { Tag } from 'antd'
import moment from 'moment'

interface IState {
    title: string
    text: string
    keywords: string
    time: number
}

const InfoTitle = styled.div`
    font-family: PingFangSC;
    font-weight: 400;
    font-size: ${getUnit(20)};
    color: rgb(16, 16, 16);
    font-style: normal;
    letter-spacing: 0;
    line-height: ${getUnit(28)};
    text-decoration: none;
`

const InfoItem = styled.div`
    line-height: ${getUnit(40)};
    border-top: ${getUnit(1)} solid rgba(187,187,187,1);
    border-bottom: ${getUnit(1)} solid rgba(187,187,187,1);
    margin-top: ${getUnit(10)};
    padding: 0 ${getUnit(10)};
`

export default class OrganInfo extends Component<RouteComponentProps<any>, IState> {

    public state: IState = {
        title: '',
        text: '',
        keywords: '',
        time: 0
    }

    public render(): JSX.Element {
        const { title, keywords, time, text } = this.state
        return (
            <MobileLayout
                appBar={
                    <NavBar
                        onBack={this.handleBack}
                        title="机构详情"
                        titleCenter
                        fixed
                    />
                }
            >
                <div style={{ padding: `0 ${getUnit(10)}` }}>
                    <InfoTitle>{title}</InfoTitle>
                    <div style={{ marginTop: getUnit(10) }}>
                        <Tag color="blue">{keywords}</Tag>
                    </div>
                </div>
                <InfoItem className="flex">
                    <div className="flex_1">来源：{keywords}</div>
                    <div>{time ? moment(time * 1000).format('YYYY-MM-DD HH:mm') : ''}</div>
                </InfoItem>
                <div className="gl" style={{ padding: getUnit(10) }} dangerouslySetInnerHTML={{ __html: text }} />
            </MobileLayout>
        )
    }

    public componentDidMount() {
        this.getData()
    }

    private getData = async () => {
        try {
            const { match } = this.props
            const data = await http('news/get_mechanism_info', {
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