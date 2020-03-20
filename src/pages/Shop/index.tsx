import React, { Component } from 'react'
import { http } from 'src/utils'
import { Toast, MobileLayout, Button, Image, Item, Icon, CheckBox } from 'components'
import { Slider } from 'antd-mobile'
import { RouteComponentProps, withRouter, Link } from 'react-router-dom'
import styled from 'styled-components'
import { IInitState, IGlobal } from 'src/store/state'
import { getUnit, ButtonThemeData, BorderRadius,ItemThemeData } from 'src/components/lib/utils'
import { SET_HOME_DATA } from 'src/store/actions'
import { connect, DispatchProp } from 'react-redux'


interface IState {
	data: any[]
	coo: any[]
	visible: boolean
	err: null | any
}

interface IProps extends RouteComponentProps {
    appData: IGlobal.AppData
}
const Header = styled.div`
    height: ${getUnit(188)};
    background: linear-gradient(to bottom,#2848FE ,#4C97FE);
	padding: 0 ${getUnit(30)} 0 ${getUnit(17)};
	display:flex;
	flex-direction: column;
	justify-content: center;
	position:relative;
`
const Lighting = styled.div`
	position: absolute;
    height: ${getUnit(76)};
	width: ${getUnit(76)};
    background: url(${require('../../assets/dd.png')});
	background-size: 100% 100%;
	right: 8%;
`

const PriceBox = styled.div`
    position: relative;
	padding: ${getUnit(12)} ${getUnit(15)};
	display: flex;
	flex-direction: column;
	background: white;
	border-radius: ${getUnit(5)} ${getUnit(5)} 0 0;
	width: 95%;
	margin: 0 auto;
`
const ItemWrapper = styled.div`
	display: flex;
	flex-direction: row;
	align-items: center;
	width: 100%;
	margin: ${getUnit(10)} 0;
`
const Title = styled.div`
	flex: none;
	font-size: ${getUnit(14)};
	font-weight: 700;
`
const Dashed = styled.div`
	flex: auto;
	display: flex;
	overflow:hidden;
	color: #E4E4E4;
	border-bottom: 1px dashed;
`
const Dignity = styled.div`
	flex: none;
	font-size: ${getUnit(14)};
	font-weight: 700;
`
const Partition = styled.div`
	display:flex;
	flex-direction: row;
	height: ${getUnit(20)};
	width: 95%;
	margin: 0 auto;
	background: white;
`
const Qiu = styled.div`
	flex: none;
	height: ${getUnit(20)};
	width: ${getUnit(20)};
	background: rgb(245,245,245);
	border-radius: 50%;
	z-index:100;
`
const LButton = styled(Button)`
    margin-top: ${getUnit(30)};
    width: 70%;
    height: ${getUnit(45)};
    background: linear-gradient(45deg,#2F99FD,#284AFE);
    border-radius: ${getUnit(5)};
    color: white;
    font-family: PingFang SC;
    font-weight: 500;
    border: 0;
    font-size: ${getUnit(16)};
`

// class Shop extends Component<RouteComponentProps<any>, IState> {
class Shop extends Component<IProps & DispatchProp, IState> {

    public state: IState = {
		data: [],
		coo: [],
		visible: false,
		err: null
    }

    public render(): JSX.Element {
		const { appData } = this.props
        return (
            <MobileLayout style={{background: 'rgb(245,245,245)'}}>
				<Header>
				    <div
				    	style={{ fontSize: getUnit(14),color: 'rgba(255, 255, 255, 0.5)' }}
				    >
				    	订单状态
				    </div>
					<div 
						style={{ fontSize: getUnit(19), color: 'rgba(255, 255, 255, 1)',marginTop: getUnit(10) }}
					>
						待支付工本费
					</div>
					<div
						style={{ fontSize: getUnit(12), color: 'rgba(255, 255, 255, 0.5)',marginTop: getUnit(30) }}
					>
						借款订单号: ABFDF3459ZMJHX23J3LQPZ
					</div>
					<Lighting></Lighting>
				</Header>
				<PriceBox className="flex_center" style={{marginTop: getUnit(-30),paddingBottom: getUnit(5)}}>
					<ItemWrapper>
						<Title>借贷金额</Title>
						<Dashed/>
						<Dignity>50,0000元</Dignity>
					</ItemWrapper>
					<ItemWrapper>
						<Title>收款账户</Title>
						<Dashed/>
						<Dignity>622848 410012344570</Dignity>
					</ItemWrapper>
					<ItemWrapper>
						<Title>月费率</Title>
						<Dashed/>
						<Dignity>0.006%</Dignity>
					</ItemWrapper>
					<ItemWrapper>
						<Title>借贷期限</Title>
						<Dashed/>
						<Dignity>6个月</Dignity>
					</ItemWrapper>
					<ItemWrapper style={{marginBottom: 0}}>
						<Title>起始日期</Title>
						<Dashed/>
						<Dignity>2020/03/14-2020/09/14</Dignity>
					</ItemWrapper>
				</PriceBox>
				<Partition style={{marginTop: getUnit(-1)}}>
					<Qiu style={{marginLeft: getUnit(-10)}}></Qiu>
					<div style={{flex:1}}></div>
					<Qiu style={{marginRight: getUnit(-10)}}></Qiu>
				</Partition>
				<PriceBox style={{borderRadius: `0 0 ${getUnit(5)} ${getUnit(5)}`,marginTop: getUnit(-1),paddingTop: 0}}>
					<ItemWrapper style={{marginTop: 0}}>
						<Title>工本费</Title>
						<Dashed/>
						<Dignity></Dignity>
					</ItemWrapper>
					<div style={{color:'#2F99FD'}}>
						工本费是验证客户还款能力，请联系在线客服申请账号支付本次贷款金融服务费，服务费支付成功即可到账，服务费是贷款金额的5%，按时还款满3个月后系统退回工本费
					</div>
				</PriceBox>
				<div style={{display: 'flex',justifyContent:'center'}}>
					<LButton>提现</LButton>
				</div>
            </MobileLayout>
        )
    }

    public componentDidMount() {
        // this.getData()
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
    // private getData = async () => {
    //     try {
    //         const { match } = this.props
    //         const data = await http('news/team_info', {
    //             id: match.params.id
    //         })
    //         this.setState({
    //             ...data.msg
    //         })
    //     } catch (data) {
    //         Toast.info({
    //             content: data.msg || '服务器繁忙,请稍后再试',
    //         })
    //     }
    // }

    private handleBack = () => {
        const { history } = this.props
        history.goBack()
    }

}



// export default connect(
//     ({ homeData }: IInitState) => ({
//         homeData
//     })
// )(withRouter(Shop))


export default connect(
    ({ appData }: IInitState) => ({
        appData
    })
)(withRouter(Shop))