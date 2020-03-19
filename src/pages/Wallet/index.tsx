import React, { Component } from 'react'
import { http } from 'src/utils'
import { Toast, MobileLayout, NavBar, Item, Image, Button } from 'components'
import { RouteComponentProps } from 'react-router-dom'
import { getUnit, NavBarThemeData, IconThemeData, Color, ButtonThemeData, BorderRadius } from 'src/components/lib/utils'
import styled from 'styled-components'

const TText = styled.div`
    font-size: ${getUnit(16)};
    font-family: PingFang SC;
    font-weight: 400;
    line-height: ${getUnit(24)};
    color: rgba(34,34,34,1);
`

const LText = styled.div`
    font-size: ${getUnit(14)};
    font-family: PingFang SC;
    font-weight: 400;
    line-height:${getUnit(24)};
    color: rgba(155,161,175,1);
`

const defButton = new ButtonThemeData({
    width: 150,
    height: 45,
    buttonColor: Color.fromRGB(214, 232, 250),
    color: Color.fromRGB(47, 153, 253),
    fontSize: 16,
    borderRadius: BorderRadius.all(5),
})

const backButton = new ButtonThemeData({
    width: 150,
    height: 45,
    buttonColor: Color.fromRGB(47, 153, 253),
    color: Color.fromRGB(255, 255, 255),
    fontSize: 16,
    borderRadius: BorderRadius.all(5),
})

interface IState {
}

export default class Wallet extends Component<RouteComponentProps<any>, IState> {

    public state: IState = {}

    public render(): JSX.Element {
        return (
            <MobileLayout
                backgroundColor="#fff"
                appBar={
                    <NavBar
                        theme={new NavBarThemeData({
                            navBarColor: Color.fromRGB(255, 255, 255),
                            iconTheme: new IconThemeData({
                                color: Color.fromRGB(0, 0, 0)
                            })

                        })}
                        onBack={this.handleBack}
                        divider={false}
                    />
                }
            >
                <div style={{ paddingTop: getUnit(80) }}>
                    <div className="flex_center">
                        <Image
                            src={require('../../assets/search.png')}
                            style={{ width: getUnit(116), height: getUnit(116) }}
                        />
                    </div>
                    <TText className="flex_center">您的认证资料已提交！</TText>
                    <LText className="flex_center">我们会尽快审核您的资料，请耐心等待～</LText>
                    <div className="flex" style={{ padding: `0 ${getUnit(20)}`, marginTop: getUnit(60) }}>
                        <div className="flex_1 flex_center">
                            <Button mold="primary" theme={defButton} onClick={this.lookStatus}>
                                查看审核状态
                            </Button>
                        </div>
                        <div className="flex_1 flex_center">
                            <Button mold="primary" theme={backButton} onClick={this.handleBack}>
                                返回首页
                            </Button>
                        </div>
                    </div>
                </div>
            </MobileLayout>
        )
    }

    public componentDidMount() {
        this.getData()
    }
    private lookStatus = async () => {
        const { history} = this.props
        history.push('/team')
    }
    private getData = async () => {
        // try {
        //     const { match } = this.props
        //     const data = await http('news/get_mechanism_info', {
        //         id: match.params.id
        //     })
        //     this.setState({
        //         ...data.msg
        //     })
        // } catch (data) {
        //     Toast.info({
        //         content: data.msg || '服务器繁忙,请稍后再试',
        //     })
        // }
    }

    private handleBack = () => {
        const { history } = this.props
        history.goBack()
    }

}