import React, { Component } from 'react'
import { MobileLayout, Button, Image } from 'components'
import { RouteComponentProps, withRouter } from 'react-router-dom'
import styled from 'styled-components'
import { IInitState, IGlobal } from 'src/store/state'
import { getUnit } from 'src/components/lib/utils'
import { connect, DispatchProp } from 'react-redux'
import { Steps } from 'antd-mobile'
import Xx from '../Xx'
const Step = Steps.Step;

interface IState {
	data: any[]
	coo: any[]
	visible: boolean
	err: null | any
}

interface IProps extends RouteComponentProps {
	appData: IGlobal.AppData
	userInfo: IGlobal.UserInfo
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
	margin: 0 ${getUnit(15)};
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

const LSteps = styled(Steps)`
    .am-steps-item-process .am-steps-item-icon > .am-steps-icon {
        line-height: 22px;
    }
    .am-steps-item-title div {
        font-weight: initial !important;
    }
`

class Shop extends Component<IProps & DispatchProp, IState> {

	public state: IState = {
		data: [],
		coo: [],
		visible: false,
		err: null
	}

	public render(): JSX.Element {
		const { appData, userInfo } = this.props
		return (
			<MobileLayout style={{ background: 'rgb(245,245,245)' }}>
				{
					(userInfo.order && userInfo.userInfo) ? (
						<div>
							<Header>
								<div
									style={{ fontSize: getUnit(14), color: 'rgba(255, 255, 255, 0.5)' }}
								>
									订单状态
				    			</div>
								<div
									style={{ fontSize: getUnit(19), color: 'rgba(255, 255, 255, 1)', marginTop: getUnit(10) }}
								>
									{this.getStatus(userInfo.order.status)}
								</div>
								<div
									style={{ fontSize: getUnit(12), color: 'rgba(255, 255, 255, 0.5)', marginTop: getUnit(30) }}
								>
									借款订单号: {userInfo.order.orderId}
								</div>
								<Lighting></Lighting>
							</Header>
							<PriceBox className="flex_center" style={{ marginTop: getUnit(-30), paddingBottom: getUnit(5) }}>
								<ItemWrapper>
									<Title>借贷金额</Title>
									<Dashed />
									<Dignity>{userInfo.order.price}元</Dignity>
								</ItemWrapper>
								<ItemWrapper>
									<Title>收款账户</Title>
									<Dashed />
									<Dignity>{this.formatBankNumber(userInfo.userInfo.bankCard)}</Dignity>
								</ItemWrapper>
								<ItemWrapper>
									<Title>月费率</Title>
									<Dashed />
									<Dignity>{appData.serviceRate}%</Dignity>
								</ItemWrapper>
								<ItemWrapper>
									<Title>借贷期限</Title>
									<Dashed />
									<Dignity>{userInfo.order.term}个月</Dignity>
								</ItemWrapper>
								<ItemWrapper style={{ marginBottom: 0 }}>
									<Title>起始日期</Title>
									<Dashed />
									<Dignity>2020/03/14-2020/09/14</Dignity>
								</ItemWrapper>
							</PriceBox>
							<Partition style={{ marginTop: getUnit(-1) }}>
								<Qiu style={{ marginLeft: getUnit(-10) }}></Qiu>
								<div style={{ flex: 1 }}></div>
								<Qiu style={{ marginRight: getUnit(-10) }}></Qiu>
							</Partition>
							<PriceBox style={{ borderRadius: `0 0 ${getUnit(5)} ${getUnit(5)}`, marginTop: getUnit(-1), paddingTop: 0 }}>
								<ItemWrapper style={{ marginTop: 0 }}>
									<Title>工本费</Title>
									<Dashed />
									<Dignity></Dignity>
								</ItemWrapper>
								<div style={{ color: '#2F99FD' }}>
									{userInfo.order.describeStatus}
								</div>
							</PriceBox>
							{/* <div style={{ display: 'flex', justifyContent: 'center', marginBottom: getUnit(30) }}>
								<LButton>提现</LButton>
							</div> */}
						</div>
					) : <Xx />
				}
			</MobileLayout>
		)
	}

	private formatBankNumber = (bankNumber: string): string => {
		return bankNumber.substr(0, 4) + "*** ********" + bankNumber.substr(-4);
	}

	private getStatus = (number: number): string => {
		switch (number) {
			case 0: return '工本费';
			case 1: return '质押金';
			case 2: return '放款成功';
			case 3: return '订单冻结';
			case 4: return '订单解冻，需回档';
			case 5: return '信用不足';
			case 6: return '流水不足';
			case 7: return '提现成功，出款中';
			case 8: return '退款，维护中';
			case 9: return '待激活';
			case 10: return '银行卡异常';
			case 11: return '收取保险费';
			case 12: return '预付前1期费用';
			case 13: return '预付前2期费用';
			case 14: return '预付前3期费用';
			case 15: return '预付前4期费用';
			case 16: return '预付前5期费用';
			case 17: return '预付前7期费用';
			case 18: return '资金对冲';
			default: return '';
		}
	}

}

export default connect(
	({ appData, userInfo }: IInitState) => ({
		appData,
		userInfo
	})
)(withRouter(Shop))