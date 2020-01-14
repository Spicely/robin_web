import React, { Component } from 'react'
import { http, imgUrl } from 'src/utils'
import { Toast, MobileLayout, NavBar, Image } from 'components'
import { RouteComponentProps, Link } from 'react-router-dom'
import styled from 'styled-components'
import { getUnit } from 'src/components/lib/utils'
import { Tag } from 'antd'

interface IState {
    dataList: any[]
}

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
    margin: 0;
`

const OrganItemLabel = styled.div`
    height: ${getUnit(60)};
    overflow: hidden;
    text-overflow: ellipsis;
    padding: 0 ${getUnit(10)};
`

export default class News extends Component<RouteComponentProps<any>, IState> {

    private page = 1

    public state: IState = {
        dataList: []
    }

    public render(): JSX.Element {
        const { dataList } = this.state
        return (
            <MobileLayout
                onGetData={this.getData}
                appBar={
                    <NavBar
                        onBack={this.handleBack}
                        title="新闻列表"
                        titleCenter
                        fixed
                    />
                }
            >
                {
                    dataList.map((i: any, k) => (
                        <OrganItem key={k}>
                            <Link to={`/query/${i.id}/${i.name}`}>
                                <div className="flex">
                                    {i.state === 1 && <Tag color="red" style={{ marginLeft: getUnit(10) }}>最新</Tag>}
                                    {i.state === 2 && <Tag color="yellow" style={{ marginLeft: getUnit(10) }}>更新</Tag>}
                                    <OrganItemTitle>【{i.name}】</OrganItemTitle>
                                </div>
                                <div className="flex">
                                    <div>
                                        <div>
                                            <OrganItemLabel className="flex_1" dangerouslySetInnerHTML={{ __html: i.text }} />
                                        </div>

                                    </div>
                                    <div style={{ padding: `0 ${getUnit(10)}` }}>
                                        <Image src={imgUrl + i.img} style={{ width: getUnit(80), height: getUnit(60) }} />
                                    </div>
                                </div>
                                <div className="flex">
                                    <div className="flex_1"><Tag color="blue" style={{ marginLeft: getUnit(10), background: '#1890ff', borderRadius: getUnit(20) }}><span style={{ color: 'white' }}>{i.keyword}</span></Tag></div>
                                    <div style={{ marginRight: getUnit(10) }}>{i.state === 1 ? i.time : i.update_time}</div>
                                </div>
                            </Link>
                        </OrganItem>
                    ))
                }
            </MobileLayout>
        )
    }

    private getData = (success: () => void) => {
        const { match } = this.props
        const close = Toast.loading()
        http('news/get_order', {
            model_id: match.params.id,
            number: 10,
            page: this.page++
        }).then((data: any) => {
            let { dataList } = this.state
            dataList = dataList.concat(data.msg)
            if (data.msg.length) {
                success()
            }
            close()
            this.setState({
                dataList
            })
        }).catch((data: any) => {
            close()
            Toast.info({
                content: data.msg || '服务器繁忙,请稍后再试',
            })
        })
    }

    private handleBack = () => {
        const { history } = this.props
        history.goBack()
    }

}