import React, { Component } from 'react'
import { http, imgUrl } from 'src/utils'
import { Toast, MobileLayout, NavBar, Image, ScrollView } from 'components'
import { RouteComponentProps } from 'react-router-dom'
import styled from 'styled-components'
import { getUnit } from 'src/components/lib/utils'
import { Tag } from 'antd'

interface IState {
    name: string
    text: string
    job: string
    job_time: number
    image: string
}

const InfoList = styled.div`
   width: ${getUnit(134)};
    height: ${getUnit(167)};
    left: ${getUnit(6)};
    top: ${getUnit(333)};
    z-index: 14;
    border-color: rgb(187, 187, 187);
    border-width: ${getUnit(1)};
    border-style: solid;
    font-size: ${getUnit(14)};
    padding: 0px;
    line-height: ${getUnit(20)};
    font-weight: normal;
    font-style: normal;
    opacity: 1;
    display: inline-block;
    margin-right: ${getUnit(10)};
`

const InfoItem = styled.div`
    line-height: ${getUnit(40)};
    border-top: ${getUnit(1)} solid rgba(187,187,187,1);
    border-bottom: ${getUnit(1)} solid rgba(187,187,187,1);
    margin-top: ${getUnit(10)};
    padding: 0 ${getUnit(10)};
`

export default class TeamInfo extends Component<RouteComponentProps<any>, IState> {

    public state: IState = {
        name: '',
        text: '',
        job: '',
        image: '',
        job_time: 0
    }

    public render(): JSX.Element {
        const { image, job_time, name, text, job } = this.state
        return (
            <MobileLayout
                appBar={
                    <NavBar
                        onBack={this.handleBack}
                        title="详情"
                        titleCenter
                        fixed
                    />
                }
            >
                <div style={{ padding: `0 ${getUnit(10)}` }}>
                    {image ? <Image src={imgUrl + image} style={{ width: '100%', height: getUnit(140) }} /> : null}
                </div>
                <InfoItem className="flex">
                    <div className="flex_1">基本信息</div>
                </InfoItem>
                <div style={{ marginTop: getUnit(10), padding: `0 ${getUnit(10)}` }}>
                    <div>姓名：{name}</div>
                    <div>工作职位：{job}</div>
                    <div>工作年限：{job_time}年</div>
                </div>
                <InfoItem className="flex">
                    <div className="flex_1">团队介绍</div>
                </InfoItem>
                <div style={{ padding: getUnit(10) }} dangerouslySetInnerHTML={{ __html: text }} />
            </MobileLayout>
        )
    }

    public componentDidMount() {
        this.getData()
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
        } catch (e) {
            Toast.info({
                content: '服务器繁忙,请稍后再试',
            })
        }
    }

    private handleBack = () => {
        const { history } = this.props
        history.goBack()
    }

}