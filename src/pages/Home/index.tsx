import React, { Component } from 'react'
import { NavBar, Image, MobileLayout, Toast, Dialog } from 'components'
import { http, imgUrl } from '../../utils'
import { getUnit, DialogThemeData } from 'src/components/lib/utils'
import { withRouter } from 'react-router-dom'

interface IState {
    data: any[]
    coo: any[]
    visible: boolean
    err: null | any
}

const queryTheme = new DialogThemeData({
    width: '70%',
    height: 245,
})

class Home extends Component<any, IState> {

    public state: IState = {
        data: [],
        coo: [],
        visible: false,
        err: null
    }

    public render(): JSX.Element {
        const { data, coo, visible, err } = this.state
        return (
            <MobileLayout
                style={{
                    padding: `0 ${getUnit(10)}`
                }}
                appBar={
                    <NavBar
                        left={null}
                        title="涨乐乐"
                        titleCenter
                        fixed
                    />
                }
            >
                {
                    data.map((i, k) => (
                        <div key={k} onClick={this.handleView.bind(this, i.id)}>
                            <Image
                                src={imgUrl + i.img}
                                style={{
                                    height: getUnit(160),
                                    width: '100%',
                                    marginTop: getUnit(10),
                                    borderRadius: getUnit(5)
                                }}
                            />
                        </div>
                    ))
                }
                {
                    coo.map((i, k) => {
                        return (
                            <a key={k} href={i.url} style={{ width: '25%', marginTop: getUnit(10), display: 'inline-block' }}>
                                <Image src={imgUrl + i.image} />
                                <div className="flex_center" style={{ marginTop: getUnit(5) }}>{i.name}</div>
                            </a>
                        )
                    })
                }

                {err !== null && (
                    <Dialog
                        title="无访问权限"
                        visible={visible}
                        theme={queryTheme}
                        onClose={this.handleQ1Close}
                        onOk={this.handleQ1Close}
                    >
                        <div style={{ padding: getUnit(20) }}>
                            <div style={{ lineHeight: getUnit(45) }}>联系人: {err.name}</div>
                            <div style={{ lineHeight: getUnit(45) }}>微信号: {err.wx_code}</div>
                            <Image src={imgUrl + err.image} style={{ width: getUnit(140) }} />
                        </div>
                    </Dialog>
                )}

            </MobileLayout>
        )
    }

    public componentDidMount() {
        this.getData()
    }

    private handleView = (id: string) => {
        const { err } = this.state
        const { history } = this.props
        if (err !== null) {
            this.setState({
                visible: true
            })
        } else {
            history.push(`/news/${id}`)
        }
    }

    private handleQ1Close = () => {
        this.setState({
            visible: false
        })
    }

    private getData = async () => {
        try {
            const des = await http('news/is_user')
            const data = await http('news/index')
            const coo = await http('news/cooperation')
            this.setState({
                data: data.msg,
                coo: coo.msg,
                err: des.msg
            })
        } catch (data) {
            Toast.info({
                content: data.msg || '服务器繁忙,请稍后再试',
            })
        }
    }
}

export default withRouter(Home)