import React, { Component } from 'react'
import { Tag } from 'antd'
import { MobileLayout, NavBar, Toast, Image } from 'components'
import styled from 'styled-components'
import { getUnit } from 'src/components/lib/utils'
import moment from 'moment'
import { http, imgUrl } from 'src/utils'
import { Link } from 'react-router-dom'

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

const OrganItemLabel = styled.div`
    height: ${getUnit(60)};
    overflow: hidden;
    text-overflow: ellipsis;
    padding: 0 ${getUnit(10)};
`

export default class TeamList extends Component<any, any> {

    public state = {
        data: []
    }

    private page = 1

    public render(): JSX.Element {
        const { data } = this.state
        return (
            <MobileLayout
                appBar={
                    <NavBar
                        left={null}
                        title="团队列表"
                        titleCenter
                        fixed
                    />
                }
                onGetData={this.getData}
            >
                <div
                    style={{
                        padding: `0 ${getUnit(10)}`
                    }}
                >
                    {
                        data.map((i: any, k) => (
                            <OrganItem key={k}>
                                <Link to={`/team/${i.id}`}>
                                    <OrganItemTitle>【{i.name}】</OrganItemTitle>
                                    <div className="flex">
                                        <div>
                                            <Image src={imgUrl + i.image} style={{ width: getUnit(80), height: getUnit(60) }} />
                                        </div>
                                        <OrganItemLabel className="flex_1" dangerouslySetInnerHTML={{ __html: i.text }} />
                                    </div>
                                </Link>
                            </OrganItem>
                        ))
                    }
                </div>
            </MobileLayout>
        )
    }

    private getData = async (success: () => void) => {
        try {
            const data = await http('news/team_list', {
                page: this.page++,
                number: 10
            })
            if (data.msg && data.msg.length) {
                success()
            }
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