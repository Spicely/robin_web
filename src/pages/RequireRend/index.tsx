import React, { Component } from 'react'
import { http } from 'src/utils'
import { Toast, MobileLayout, Button, NavBar, Image, Item, Icon, CheckBox } from 'components'
import { Slider } from 'antd-mobile'
import { RouteComponentProps, withRouter, Link } from 'react-router-dom'
import styled from 'styled-components'
import { IInitState, IGlobal } from 'src/store/state'
import { getUnit, NavBarThemeData, Color, IconThemeData } from 'src/components/lib/utils'
import { SET_HOME_DATA } from 'src/store/actions'
import { connect, DispatchProp } from 'react-redux'


interface IState {
	data: any[]
	coo: any[]
	visible: boolean
	err: null | any
	money: number
	month: number
}

interface IProps extends RouteComponentProps {
	appData: IGlobal.AppData,
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
	width:  92%;
	margin:  0 auto;
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

// class Shop extends Component<RouteComponentProps<any>, IState> {
class Shop extends Component<IProps & DispatchProp, IState> {

	public state: IState = {
		data: [],
		coo: [],
		visible: false,
		err: null,
		money: 6000,
		month: 3,
	}

	public render(): JSX.Element {
		const { appData } = this.props
		const { money, month } = this.state
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
				style={{ background: 'linear-gradient(to bottom,#1F83FE ,#FFFFFF)' }}>
				<PriceBox className="flex_center" style={{ marginTop: getUnit(70) }}>
					<div style={{ display: 'flex', justifyContent: 'center', fontWeight: 700, fontSize: getUnit(14) }}>
						借款金额(元)
					</div>
					<div
						style={{
							display: 'flex', justifyContent: 'center', width: '87%',
							fontWeight: 700, fontSize: getUnit(30), color: 'rgba(69, 134, 254, 1)',
							background: 'rgba(243, 253, 255, 1)', marginTop: getUnit(10)
						}}
					>
						￥{money}
					</div>
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
						<Dignity>{month}个月</Dignity>
					</ItemWrapper>
					<ItemWrapper>
						<Title>起始日期</Title>
						<Dashed/>
						<Dignity>2020/03/14-2020/09/14</Dignity>
					</ItemWrapper>
					<ItemWrapper>
						<Title>首次还款日</Title>
						<Dashed/>
						<Dignity>04/12</Dignity>
					</ItemWrapper>
					<ItemWrapper>
						<Title>还款日</Title>
						<Dashed/>
						<Dignity>每月12日</Dignity>
					</ItemWrapper>
					<ItemWrapper>
						<Title>贷款用途</Title>
						<Dashed/>
						<Dignity style={{ color: '#2F99FD' }}>请选择</Dignity>
					</ItemWrapper>
					<div style={{ padding: `0 0 0 ${getUnit(15)}`, marginTop: getUnit(25) }}>
						<CheckBox
							options={[{
								label: <div style={{ fontSize: getUnit(12) }}>我已阅读
								<Link to={{pathname: 'privacryPolice'}}>><span style={{ color: '#4F9BFF', fontSize: getUnit(12) }}>《隐私政策》</span></Link>
								隐私信息将严格保密</div>,
								value: true
							}]}
							value={[true]}
						/>
					</div>
				</PriceBox>
				<div style={{ display: 'flex', justifyContent: 'center' }}>
					<LButton onClick={this.handleSign}>签署借款协议</LButton>
				</div>
			</MobileLayout>
		)
	}

	public componentDidMount = () => {
		this.getcc()
	}
	private getcc = () => {
		const state: any = this.props.location.state || {}
		console.log(state.money, state.month)
		if(state.money && state.month){
			this.setState({
				money: state.money,
				month: state.month
			})
		}
	}

	private handleSign = async () => {
		const { history,userInfo } = this.props
		const close = Toast.loading()
		try {
			const data = await http('/user/creatOrder', { price:this.state.money,term: this.state.month,userId: userInfo.id,purpose: '其他' })
			console.log(data)
			close()
			history.replace({ pathname: '/protocol', state: { orderId: data.data.id} })
		} catch (e) {
			close()
			Toast.info({
				content: e.msg || '认证失败'
			})
		}
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
	({ appData,userInfo }: IInitState) => ({
		appData,userInfo
	})
)(withRouter(Shop))