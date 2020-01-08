import React, { Component, ChangeEvent } from 'react'
import { http, imgUrl } from 'src/utils'
import { Toast, MobileLayout, NavBar, Image, Dialog, Textarea, Button, ScrollView } from 'components'
import { RouteComponentProps } from 'react-router-dom'
import styled, { keyframes, createGlobalStyle, css } from 'styled-components'
import { getUnit, DialogThemeData, TextareaThemeData, ButtonThemeData, Color } from 'src/components/lib/utils'
import BorderRadius from 'src/components/lib/utils/BorderRadius'

interface IState {
    name: string
    text: string
    job: string
    job_time: number
    img: string
    dataList: any[]
    warehouse: string
    visibleQ1: boolean
    visibleQ2: boolean
    price_s: string
    price: string
    code: string
    queryText: string
    warning_string: string
    warning_text: string
    nature: string
    section: string
}

const InfoToa = styled.div<{ statusColor: 'red' | 'yel' }>`
    width: 100%;
    height: ${getUnit(68)};
    left: ${getUnit(1)};
    ${({ statusColor }) => {
        if (statusColor === 'red') return css`background-color: red;`
        else return css`background-color: rgba(255, 231, 0, 0.73);`
    }}
    /* border-color: rgb(187, 187, 187);
    border-width: ${getUnit(1)};
    border-style: solid; */
    color: rgb(0, 0, 0);
    font-size: ${getUnit(14)};
    padding: 0px;
    margin-top: ${getUnit(10)};
    line-height: ${getUnit(20)};
    padding: ${getUnit(10)} ${getUnit(20)};
    font-weight: normal;
    font-style: normal;
    opacity: 1;
`
const InfoLabel = styled.div`
    font-family: PingFangSC;
    font-weight: 400;
    font-size: ${getUnit(12)};
    color: rgb(255, 152, 0);
    font-style: normal;
    letter-spacing: 0;
    line-height: ${getUnit(22)};
    text-decoration: none;
    overflow: auto;
    padding-left: ${getUnit(10)};
    
`

const InfoItem = styled.div`
    line-height: ${getUnit(40)};
    border-top: ${getUnit(1)} solid rgba(187,187,187,1);
    border-bottom: ${getUnit(1)} solid rgba(187,187,187,1);
    margin-top: ${getUnit(10)};
    padding: 0 ${getUnit(10)};
    font-family: PingFangSC;
    font-weight: 400;
    font-size: ${getUnit(20)};
    color: #101010;
    font-style: normal;
    letter-spacing: 0;
    text-decoration: none;
`

const InfoLe = styled.div`
    font-family: PingFangSC;
    font-weight: 400;
    font-size: ${getUnit(14)};
    color: rgb(16, 16, 16);
    font-style: normal;
    letter-spacing: 0;
    line-height: ${getUnit(22)};
    text-decoration: none;
`

const InfoLw = styled.div`
    font-family: PingFangSC;
    font-weight: 400;
    font-size: ${getUnit(16)};
    color: rgba(229, 28, 35, 1);
    font-style: normal;
    letter-spacing: 0;
    line-height: ${getUnit(22)};
    text-decoration: none;
`

const QueryList = styled.div`
    padding: ${getUnit(10)} ${getUnit(20)};
    border-bottom: ${getUnit(1)} solid rgba(187,187,187,1);
`

const QueryFooter = styled.div`
    height: ${getUnit(57)};
    text-align: center;
    font-family: PingFangSC;
    font-weight: 400;
`

const QueryFooterLeft = styled.div`
    height: 100%;
    font-size: ${getUnit(20)};
    color: rgb(16, 16, 16);
    width:  ${getUnit(120)};
`
const QueryFooterRight = styled.div`
    height: 100%;
    font-size: ${getUnit(20)};
    color: rgb(255, 255, 255);
    background: rgba(17, 15, 15, 0.93);
    width:  ${getUnit(120)};
`

const vslipToUp = keyframes`
    from {
        transform: translate3d(0, 100vh, 0);
    }

    to {
        transform: translate3d(0, 33%, 0);
    }
`

const vslipToBottom = keyframes`
    from {
        transform: translate3d(0, 33%, 0);
    }

    to {
        transform: translate3d(0, 100vh, 0);
    }
`

const GlobalStyle = createGlobalStyle`
    .vslipUp {
        transform: translate3d(0, 100vh, 0);
        animation: ${vslipToUp} 0.5s 0.2s forwards cubic-bezier(0.3, 0.23, 0.22, 1.04);
    }

    .vslipBottom {
        animation: ${vslipToBottom} 0.5s forwards;
    }
`

const queryTheme = new DialogThemeData({
    width: '70%',
    height: 245,
})

const queryListheme = new DialogThemeData({
    width: '100%',
    height: '60%',
})

export default class Query extends Component<RouteComponentProps<any>, IState> {

    public state: IState = {
        name: '',
        text: '',
        job: '',
        price_s: '',
        price: '',
        warehouse: '',
        dataList: [],
        img: '',
        job_time: 0,
        code: '',
        visibleQ1: false,
        visibleQ2: false,
        queryText: '',
        warning_string: '',
        warning_text: '',
        nature: '',
        section: '',
    }

    private page = 1

    public render(): JSX.Element {
        const { match } = this.props
        const { img, visibleQ1, visibleQ2, text, dataList, warehouse, price_s, price, code, queryText, warning_string, warning_text, nature, section } = this.state
        return (
            <MobileLayout
                appBar={
                    <NavBar
                        onBack={this.handleBack}
                        title={match.params.title}
                        titleCenter
                        fixed
                    />
                }
                footer={
                    <QueryFooter className="flex mk_divider_top">
                        <QueryFooterLeft className="flex_center" onClick={this.handleQ1list}>提问</QueryFooterLeft>
                        <QueryFooterRight className="flex_1 flex_center" onClick={this.handleQ2list}>查看问题</QueryFooterRight>
                    </QueryFooter>
                }
            >
                <GlobalStyle />
                <div style={{ padding: `0 ${getUnit(10)}` }}>
                    {img ? <Image src={imgUrl + img} style={{ width: '100%', height: getUnit(140), borderRadius: getUnit(5) }} /> : null}
                </div>
                {(warning_string || warning_text) && <InfoToa statusColor={warning_string ? 'red' : 'yel'} className="flex">
                    <div>
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            aria-hidden="true"
                            width="24"
                            height="24"
                            viewBox="0 0 576 512"
                            style={{ fill: 'rgb(255, 152, 0)' }}
                        >
                            <path d="M576 240c0-23.63-12.95-44.04-32-55.12V32.01C544 23.26 537.02 0 512 0c-7.12 0-14.19 2.38-19.98 7.02l-85.03 68.03C364.28 109.19 310.66 128 256 128H64c-35.35 0-64 28.65-64 64v96c0 35.35 28.65 64 64 64h33.7c-1.39 10.48-2.18 21.14-2.18 32 0 39.77 9.26 77.35 25.56 110.94 5.19 10.69 16.52 17.06 28.4 17.06h74.28c26.05 0 41.69-29.84 25.9-50.56-16.4-21.52-26.15-48.36-26.15-77.44 0-11.11 1.62-21.79 4.41-32H256c54.66 0 108.28 18.81 150.98 52.95l85.03 68.03a32.023 32.023 0 0 0 19.98 7.02c24.92 0 32-22.78 32-32V295.13C563.05 284.04 576 263.63 576 240zm-96 141.42l-33.05-26.44C392.95 311.78 325.12 288 256 288v-96c69.12 0 136.95-23.78 190.95-66.98L480 98.58v282.84z"></path>
                        </svg>
                    </div>
                    <InfoLabel className="flex_1">
                        {warning_string || warning_text}
                    </InfoLabel>
                </InfoToa>}
                <InfoItem className="flex">
                    <div className="flex_1">【实战教学指导】</div>
                </InfoItem>
                <div className="flex" style={{ marginTop: getUnit(10), textAlign: 'center' }}>
                    <div className="flex_1">
                        <InfoLe >止盈价</InfoLe>
                        <InfoLw>￥：{price}</InfoLw>
                    </div>
                    <div className="flex_1">
                        <InfoLe >止损价</InfoLe>
                        <InfoLw>￥：{price_s}</InfoLw>
                    </div>
                    <div className="flex_1">
                        <InfoLe >仓位</InfoLe>
                        <InfoLw>{warehouse}</InfoLw>
                    </div>
                </div>
                <div className="mk_divider_top" style={{ marginTop: getUnit(10), padding: `0 ${getUnit(10)}` }}>
                    <div style={{ fontSize: getUnit(14), color: '#000' }}>股票代码：{code}</div>
                    <div style={{ fontSize: getUnit(14), color: '#000' }}>价格区间：{section}</div>
                    <div style={{ fontSize: getUnit(14), color: '#000' }}>案列性质：{nature}年</div>
                </div>
                <InfoItem className="flex">
                    <div className="flex_1">案列逻辑</div>
                </InfoItem>


                <div style={{ padding: getUnit(10) }} dangerouslySetInnerHTML={{ __html: text }} />
                <Dialog
                    title="提问"
                    visible={visibleQ1}
                    theme={queryTheme}
                    onClose={this.handleQ1Close}
                    footer={
                        <Button
                            mold="primary"
                            theme={
                                new ButtonThemeData({ buttonColor: Color.fromRGB(67, 219, 93), borderRadius: BorderRadius.all(20) })
                            }
                            onClick={this.handleQuery}
                        >
                            确定
                        </Button>
                    }
                >
                    <Textarea
                        placeholder="请输入内容"
                        style={{ height: '100%', border: 0 }}
                        value={queryText}
                        onChange={this.handleQueryText}
                        theme={
                            new TextareaThemeData({
                                height: '100%'
                            })
                        }
                    />
                </Dialog>
                <Dialog
                    title="提问列表"
                    visible={visibleQ2}
                    theme={queryListheme}
                    footer={null}
                    onClose={this.handleQ2Close}
                    animateInClass="vslipUp"
                    animateOutClass="vslipBottom"
                >
                    <ScrollView
                        scrollY
                        height="100%"
                        onGetData={this.handleFirst}
                    >
                        {
                            dataList.map((i, k) => {
                                return (
                                    <QueryList key={k}>
                                        <div className="flex">
                                            <div style={{ color: 'rgb(16, 16, 16)', fontSize: getUnit(14) }}>提问：</div>
                                            <div className="flex_1" style={{ color: 'rgb(16, 16, 16)', fontSize: getUnit(14) }}>{i.msg_text}</div>
                                        </div>
                                        <div className="flex" style={{ marginTop: getUnit(10) }}>
                                            <div style={{ color: 'rgba(229, 28, 35, 1)', fontSize: getUnit(14), paddingTop: getUnit(5) }}>回复：</div>
                                            <div className="flex_1" style={{ color: 'rgba(229, 28, 35, 1)', fontSize: getUnit(14), borderTop: `${getUnit(1)} dashed rgba(187,187,187,1)`, paddingTop: getUnit(5) }}>{i.msg_hd_text}</div>
                                        </div>
                                    </QueryList>
                                )
                            })
                        }
                    </ScrollView>
                </Dialog>


            </MobileLayout>
        )
    }

    public componentDidMount() {
        this.getData()
    }

    private handleQuery = () => {
        const { queryText } = this.state
        if (!queryText) {
            Toast.info({
                content: '请输入内容'
            })
            return
        }
        const { match } = this.props
        const close = Toast.loading()
        http('news/question', {
            news_id: match.params.id,
            text: queryText
        }).then((data: any) => {
            close()
            this.setState({
                queryText: '',
                visibleQ1: false
            })
            Toast.info({
                content: data.msg
            })
        }).catch((data: any) => {
            close()
            Toast.info({
                content: data.msg || '服务器繁忙,请稍后再试',
            })
        })
    }

    private handleFirst = (success: () => void) => {
        const { match } = this.props
        const close = Toast.loading()
        http('news/hd_question', {
            order_id: match.params.id,
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
                queryText: '',
                visibleQ1: false,
                dataList
            })
        }).catch((data: any) => {
            close()
            Toast.info({
                content: data.msg || '服务器繁忙,请稍后再试',
            })
        })
    }

    private handleQ1list = () => {
        this.setState({
            visibleQ1: true
        })
    }

    private handleQueryText = (e: ChangeEvent<HTMLTextAreaElement>) => {
        this.setState({
            queryText: e.target.value
        })
    }

    private handleQ2list = () => {
        this.setState({
            visibleQ2: true
        })
    }

    private handleQ1Close = () => {
        this.setState({
            visibleQ1: false
        })
    }

    private handleQ2Close = () => {
        this.setState({
            visibleQ2: false
        })
    }

    private getData = async () => {
        try {
            const { match } = this.props
            const data = await http('news/get_order_info', {
                order_id: match.params.id
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