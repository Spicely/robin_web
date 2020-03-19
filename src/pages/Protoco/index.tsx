import React, { Component } from 'react'
import { http } from 'src/utils'
import { Toast, MobileLayout, Button,NavBar, Image, Item, Icon, CheckBox } from 'components'
import { Slider } from 'antd-mobile'
import { RouteComponentProps, withRouter, Link } from 'react-router-dom'
import styled from 'styled-components'
import { IInitState, IGlobal } from 'src/store/state'
import { getUnit,NavBarThemeData,Color,IconThemeData} from 'src/components/lib/utils'
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

const PriceBox = styled.div`
    position: relative;
	padding: ${getUnit(12)} ${getUnit(15)};
	padding-Bottom: ${getUnit(22)}
	display: flex;
	flex-direction: column;
	background: white;
	border-radius: ${getUnit(5)};
	width: 100%;
	margin: 0 auto;
`
const LButton = styled(Button)`
    margin-top: ${getUnit(30)};
    width: 40%;
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
		err: null
    }

    public render(): JSX.Element {
		const { appData } = this.props
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
			style={{background: 'white'}}>
				<PriceBox className="flex_center">
					<div style={{display:'flex',justifyContent:'center',fontWeight: 700,fontSize: getUnit(14),background:'grey',width:'100%',padding:getUnit(15)}}>
						合同放置区域
					</div>
					<div className='flex_center' style={{background:'red',width:'100%',height: getUnit(200),padding:getUnit(15),marginTop:getUnit(15)}}>画布签名区域</div>
				</PriceBox>
				<div style={{display: 'flex',justifyContent:'space-around'}}>
					<LButton style={{background: '#D6E8FA',color:'skyBlue'}}>重写</LButton>
					<LButton>提交</LButton>
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