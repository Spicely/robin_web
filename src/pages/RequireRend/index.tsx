import React, { Component, MouseEvent } from 'react'
import { http } from 'src/utils'
import { Toast, MobileLayout, Button, NavBar, CheckBox, Dialog } from 'components'
import { Picker } from 'antd-mobile'
import { RouteComponentProps, withRouter, } from 'react-router-dom'
import styled from 'styled-components'
import { IInitState, IGlobal } from 'src/store/state'
import { getUnit, NavBarThemeData, Color, IconThemeData, DialogThemeData } from 'src/components/lib/utils'
import { SET_USERINFO_DATA } from 'src/store/actions'
import { connect, DispatchProp } from 'react-redux'
import moment from 'moment'


interface IState {
	data: any[]
	coo: any[]
	visible: boolean
	err: null | any
	money: number
	month: number
	val: any
}

const dialogTheme = new DialogThemeData({
	height: '100%',
	width: '100%'
})

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
		val: '',
	}

	private education = [{
		label: '流动资金',
		value: '流动资金',
	}, {
		label: '支付货款',
		value: '支付货款',
	}, {
		label: '生产经营',
		value: '生产经营',
	}, {
		label: '购房',
		value: '购房',
	}, {
		label: '购车',
		value: '购车',
	}, {
		label: '装修',
		value: '装修',
	}, {
		label: '旅游',
		value: '旅游',
	}, {
		label: '教育留学',
		value: '教育留学',
	}, {
		label: '其他',
		value: '其他',
	}]

	public render(): JSX.Element {
		const { userInfo, appData } = this.props
		const { money, month, val, visible } = this.state
		return (
			<MobileLayout
				appBar={
					<NavBar
						theme={new NavBarThemeData({
							navBarColor: Color.fromRGBO(0, 0, 0, 0),
							iconTheme: new IconThemeData({
								color: Color.fromRGB(255, 255, 255)
							})

						})}
						onBack={this.handleBack}
						divider={false}
						fixed
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
						<Dashed />
						<Dignity>{this.formatBankNumber(userInfo.userInfo?.bankCard || '')}</Dignity>
					</ItemWrapper>
					<ItemWrapper>
						<Title>月费率</Title>
						<Dashed />
						<Dignity>{appData.serviceRate}%</Dignity>
					</ItemWrapper>
					<ItemWrapper>
						<Title>借贷期限</Title>
						<Dashed />
						<Dignity>{month}个月</Dignity>
					</ItemWrapper>
					<ItemWrapper>
						<Title>起始日期</Title>
						<Dashed />
						<Dignity>{moment().format('YYYY/MM/DD')}-{moment().add(month, 'M').format('YYYY/MM/DD')}</Dignity>
					</ItemWrapper>
					<ItemWrapper>
						<Title>首次还款日</Title>
						<Dashed />
						<Dignity>{moment().add(1, 'M').format('MM/DD')}</Dignity>
					</ItemWrapper>
					<ItemWrapper>
						<Title>还款日</Title>
						<Dashed />
						<Dignity>每月12日</Dignity>
					</ItemWrapper>
					<ItemWrapper>
						<Title>贷款用途</Title>
						<Dashed />
						<Picker
							data={this.education}
							cols={1}
							value={val}
							onOk={this.handlePickerValue}
						>
							<Dignity style={{ color: '#2F99FD' }}>{val || '请选择'}</Dignity>
						</Picker>
					</ItemWrapper>
					<div style={{ padding: `0 0 0 ${getUnit(15)}`, marginTop: getUnit(25) }}>
						<CheckBox
							options={[{
								label: <div style={{ fontSize: getUnit(12) }}>我已阅读
							<span style={{ color: '#4F9BFF', fontSize: getUnit(12) }} onClick={this.handleYS}>《隐私政策》</span>
								隐私信息将严格保密</div>,
								value: true
							}]}
							value={[true]}
						/>
					</div>
				</PriceBox>
				<Dialog
					visible={visible}
					footer={
						<Button mold="primary" onClick={() => this.setState({ visible: false })} style={{ height: getUnit(35) }}>确认</Button>
					}
					onClose={() => this.setState({ visible: false })}
					theme={dialogTheme}
				>
					<div dangerouslySetInnerHTML={{ __html: appData.agreement }} />
				</Dialog>
				<div style={{ display: 'flex', justifyContent: 'center' }}>
					<LButton onClick={this.handleSign}>签署借款协议</LButton>
				</div>
			</MobileLayout>
		)
	}

	private handlePickerValue = (data: any) => {
		this.setState({
			val: data[0]
		})
	}

	private handleYS = (e: MouseEvent<HTMLSpanElement>) => {
		this.setState({ visible: true })
		e.stopPropagation()
	}

	public componentDidMount = () => {
		this.getcc()
	}
	private getcc = () => {
		const state: any = this.props.location.state || {}
		if (state.money && state.month) {
			this.setState({
				money: state.money,
				month: state.month
			})
		}
	}

	private handleSign = async () => {
		const { history, userInfo, dispatch } = this.props
		const { val } = this.state
		if (!val) {
			Toast.info({
				content: '请选择贷款用途'
			})
			return
		}
		const close = Toast.loading()
		try {
			const { data } = await http('/user/creatOrder', { price: this.state.money, term: this.state.month, userId: userInfo.id, purpose: val })
			userInfo.order = data
			dispatch({ type: SET_USERINFO_DATA, data: { ...userInfo } })
			close()
			history.replace({ pathname: '/protocol', state: { orderId: data.id } })
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

	private formatBankNumber = (bankNumber: string): string => {
		return bankNumber.substr(0, 4) + "*** ********" + bankNumber.substr(-4);
	}

}



// export default connect(
//     ({ homeData }: IInitState) => ({
//         homeData
//     })
// )(withRouter(Shop))


export default connect(
	({ appData, userInfo }: IInitState) => ({
		appData, userInfo
	})
)(withRouter(Shop))