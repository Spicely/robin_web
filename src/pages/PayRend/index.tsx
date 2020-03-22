import React, { Component, Fragment } from 'react'
import { MobileLayout, Button, NavBar } from 'components'
import { RouteComponentProps, withRouter, } from 'react-router-dom'
import styled from 'styled-components'
import { IInitState, IGlobal } from 'src/store/state'
import { getUnit, NavBarThemeData, Color, IconThemeData } from 'src/components/lib/utils'
import { connect, DispatchProp } from 'react-redux'
import moment from 'moment'


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

const PriceBox = styled.div`
    position: relative;
	padding: ${getUnit(12)} ${getUnit(15)};
	padding-Bottom: ${getUnit(22)};
	display: flex;
	flex-direction: column;
	background: white;
	border-radius: ${getUnit(5)};
	width: 92%;
	margin: 0 auto;
`

const Hang = styled.div`
	display: flex;
	flex-direction: row;
	align-items: center;
	justify-content:flex-start;
	width: 100%;
`
const Date = styled.div`
	width: ${getUnit(85)};
	color: #9BA1AF;
	text-align: left;
	font-weight: 700;
`
const Dot = styled.div`
	width: ${getUnit(10)};
	height: ${getUnit(10)};
	border: 1px solid #0BB3FE;
	font-weight: 700;
	border-radius: 50%;
`
const Money = styled.div`
	flex:auto;
	font-weight: 700;
	margin-left: ${getUnit(10)};
	text-align: left;
`
const Zi = styled.div`
	color: #9BA1AF;
	font-weight: 700;
`

const Partition = styled.div`
	width: ${getUnit(90)};
	height: ${getUnit(42)};
	border-right: 1px solid #0BB3FE;
`
const LButton = styled(Button)`
    margin-top: ${getUnit(30)};
    width: 70%;
    height: ${getUnit(45)};
    background: linear-gradient(45deg,#2F99FD,#284AFE);
    border-radius: ${getUnit(5)};
    color: #FFFFFF;
    font-family: PingFang SC;
    font-weight: 700;
    border: 0;
	font-size: ${getUnit(16)};
`

class Shop extends Component<IProps & DispatchProp, IState> {

	public state: IState = {
		data: [],
		coo: [],
		visible: false,
		err: null
	}

	public render(): JSX.Element {
		const { userInfo } = this.props
		return (
			<MobileLayout
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
				{
					userInfo.order ? (
						<div>
							<PriceBox className="flex_center" style={{ width: '100%' }}>
								<div style={{ display: 'flex', justifyContent: 'center', fontWeight: 700, fontSize: getUnit(16) }}>
									{moment(userInfo.order.createdAt).add(1, 'M').format('MM月DD日')}应还
								</div>
								<div
									style={{
										display: 'flex', justifyContent: 'center', width: '87%',
										fontWeight: 700, fontSize: getUnit(30), color: 'rgba(69, 134, 254, 1)',
										background: 'rgba(243, 253, 255, 1)', marginTop: getUnit(10)
									}}
								>
									{userInfo.order.repayPrice}
								</div>
								<div style={{ display: 'flex', justifyContent: 'center', width: '80%', textAlign: 'center', fontSize: getUnit(14), color: '#9BA1AF', flexWrap: 'wrap' }}>
									请每月务必按时还款，不然逾期会影响您的征信并会受到相应的责任
							</div>
							</PriceBox>
							<PriceBox className="flex_center" style={{ marginTop: getUnit(15), padding: getUnit(15) }}>
								<div className="flex_row" style={{ width: '100%', fontWeight: 900, fontSize: getUnit(16), marginBottom: getUnit(10) }}>剩余还款计划</div>
								{
									Array.from({ length: userInfo.order.term }).map((i, index: number) => {
										return (
											<Fragment key={index}>
												<Hang>
													<Date>{moment(userInfo.order ? userInfo.order.createdAt : '').add(index + 2, 'M').format('MM月DD日')}</Date>
													<Dot></Dot>
													<Money>{userInfo.order ? userInfo.order.repayPrice : ''}</Money>
													<Zi>待还款</Zi>
												</Hang>
												{index === Array.from({ length: userInfo.order ? userInfo.order.term : 0 }).length - 1 ? null : <div style={{ width: '100%' }}><Partition></Partition></div>}
											</Fragment>
										)
									})
								}

							</PriceBox>
							<div style={{ display: 'flex', justifyContent: 'center', marginBottom: getUnit(40) }}>
								<LButton onClick={this.handleSign}>还款</LButton>
							</div>
						</div>
					) : null
				}
			</MobileLayout>
		)
	}

	public componentDidMount() {
		// this.getData()
	}

	private handleSign = () => {
        /* const { history } = this.props
        history.push('/protocol') */
	}

	private handleBack = () => {
		const { history } = this.props
		history.goBack()
	}

}
export default connect(
	({ appData, userInfo }: IInitState) => ({
		appData,
		userInfo
	})
)(withRouter(Shop))