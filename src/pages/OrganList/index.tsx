import React, { Component } from 'react'
import { Tag } from 'antd'
import { MobileLayout, NavBar, Toast } from 'components'
import styled from 'styled-components'
import { getUnit } from 'src/components/lib/utils'
import moment from 'moment'
import { http } from 'src/utils'

const OrganItem = styled.div`
    border-bottom: ${getUnit(1)} solid #ccc;
    padding: ${getUnit(10)} 0;
    :last-child {
        border: 0;
    }
`

const OrganItemTitle = styled.p`
    font-family: PingFangSC;
    font-weight: 400;
    font-size: ${getUnit(14)};
    color: #101010;
    font-style: normal;
    letter-spacing: 0;
    line-height: ${getUnit(22)};
    text-decoration: none;
`

const OrganItemLabel = styled.p`
    font-family: PingFangSC;
    font-weight: 400;
    font-size: ${getUnit(12)};
    color: rgba(16, 16, 16, 0.69);
    font-style: normal;
    letter-spacing: 0;
    line-height: ${getUnit(20)};
    text-decoration: none;
`

export default class OrganList extends Component<any, any> {

    public state = {
        data: []
    }

    public render(): JSX.Element {
        const { data } = this.state
        return (
            <MobileLayout
                appBar={
                    <NavBar
                        left={null}
                        title="机构观点"
                        titleCenter
                        fixed
                    />
                }
            >
                <div
                    style={{
                        padding: `0 ${getUnit(10)}`
                    }}
                >
                    {
                        data.map((i: any, k) => (
                            <OrganItem key={k}>
                                <OrganItemTitle>【{i.title}】</OrganItemTitle>
                                <div className="flex">
                                    <div className="flex_1">
                                        <OrganItemLabel><Tag color="blue">{i.keywords}</Tag></OrganItemLabel>
                                    </div>
                                    <div className="flex_justify">{moment(i.time * 1000).format('YYYY-MM-DD HH:mm')}</div>
                                </div>
                            </OrganItem>
                        ))
                    }
                </div>
            </MobileLayout>
        )
    }

    public componentDidMount() {
        this.getData()
    }

    private getData = async () => {
        try {
            const data = await http('news/get_mechanism', {
                page: 1,
                number: 10
            })
            this.setState({
                data: data.msg || []
            })
        } catch (e) {
            Toast.info({
                content: '服务器繁忙,请稍后再试',
            })
        }
    }
}